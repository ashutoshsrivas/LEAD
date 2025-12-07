# tscore.py — self-calibrating scorer with optional fixed norms
# -------------------------------------------------------------
# pip install pandas numpy openpyxl XlsxWriter

import pandas as pd
import numpy as np
import json
import os

# ---------- helpers

def normalize_item(row):
    adj = row['response']
    if int(row.get('reverse', 0)) == 1:
        adj = row['max'] + row['min'] - row['response']
    return (adj - row['min']) / (row['max'] - row['min']) * 100.0

def melt_wide_to_long(responses_wide: pd.DataFrame) -> pd.DataFrame:
    id_cols = ['participant_id','company_id','assessment_version','submitted_at']
    id_cols_present = [c for c in id_cols if c in responses_wide.columns]
    item_ids = [c for c in responses_wide.columns if c not in id_cols_present]
    long = responses_wide.melt(id_vars=id_cols_present, value_vars=item_ids,
                               var_name='item_id', value_name='response')
    long = long.dropna(subset=['response'])
    long['timestamp'] = long.get('submitted_at')
    if 'company_id' not in long.columns:
        long['company_id'] = None
    if 'assessment_version' not in long.columns:
        long['assessment_version'] = None
    return long[['participant_id','company_id','assessment_version','item_id','response','timestamp']]

def safe_t_score(score, mean, sd):
    if pd.isna(score) or pd.isna(mean) or pd.isna(sd) or sd <= 0:
        return np.nan
    return 50.0 + 10.0 * (score - mean) / sd

def build_empirical_norms(df, construct_col, value_col):
    g = (
        df.dropna(subset=[construct_col, value_col])
          .groupby(construct_col)[value_col]
          .agg(['mean','std','count'])
          .reset_index()
          .rename(columns={
              construct_col: 'construct_id',
              'mean': 'mean_norm',
              'std': 'sd_norm',
              'count': 'n'
          })
    )
    g['construct_type'] = construct_col
    g.loc[(g['sd_norm'] == 0) & (g['n'] >= 1), 'sd_norm'] = 1e-6
    return g[['construct_type','construct_id','mean_norm','sd_norm','n']]

# ---------- main

def score_lead(excel_path: str,
               output_prefix: str = "scores_demo",
               use_fixed_norms: bool = False,
               fixed_norms_path: str = "norms.xlsx"):
    # Load workbook
    xls = pd.ExcelFile(excel_path)
    items_bank  = pd.read_excel(xls, 'items_bank')
    quad_rules  = pd.read_excel(xls, 'quadrant_rules')
    pillar_map  = pd.read_excel(xls, 'pillar_mapping')

    # Responses
    resp_long = pd.read_excel(xls, 'responses_long') if 'responses_long' in xls.sheet_names else pd.DataFrame()
    if 'responses_wide' in xls.sheet_names:
        rw = pd.read_excel(xls, 'responses_wide')
        if not rw.empty:
            resp_long = pd.concat([resp_long, melt_wide_to_long(rw)], ignore_index=True)
    if resp_long.empty:
        raise ValueError("No responses found. Fill 'responses_wide' or 'responses_long' in the template.")

    # Merge metadata & clean
    cols = ['item_id','matrix_id','trait','min','max','reverse','weight']
    df = resp_long.merge(items_bank[cols], on='item_id', how='left')
    df = df.dropna(subset=['trait'])
    df['response'] = pd.to_numeric(df['response'], errors='coerce')
    df = df.dropna(subset=['response'])
    df['min']     = pd.to_numeric(df['min'], errors='coerce').fillna(1)
    df['max']     = pd.to_numeric(df['max'], errors='coerce').fillna(5)
    df['reverse'] = pd.to_numeric(df['reverse'], errors='coerce').fillna(0)
    df['weight']  = pd.to_numeric(df['weight'], errors='coerce').fillna(1.0)

    # Normalized item * weight
    df['norm_item'] = df.apply(normalize_item, axis=1) * df['weight'].astype(float)

    # ----- Trait scores
    trait = (
        df.groupby(['participant_id','trait'])
          .agg(score=('norm_item','mean'), n_items=('item_id','count'))
          .reset_index()
    )

    # ----- Matrix XY + quadrant
    wide = trait.pivot(index='participant_id', columns='trait', values='score')
    rows = []
    for _, r in quad_rules.iterrows():
        M, X, Y = r['matrix'], r['trait_1'], r['trait_2']
        if X not in wide.columns and Y not in wide.columns:
            continue
        for pid, row in wide.iterrows():
            xv, yv = row.get(X, np.nan), row.get(Y, np.nan)
            q = None
            if pd.notna(xv) and pd.notna(yv):
                q = 'Q1' if (xv>=50 and yv>=50) else ('Q2' if (xv<50 and yv>=50) else ('Q3' if (xv<50 and yv<50) else 'Q4'))
            rows.append({'participant_id': pid, 'matrix': M, 'x': xv, 'y': yv, 'quadrant': q})
    matrix_xy = pd.DataFrame(rows)

    # ----- Guna breakdown (earned/possible/pct) + pct pivot + T
    guna_items = items_bank[items_bank['trait'].isin(['Sattva','Rajas','Tamas'])][
        ['item_id','trait','min','max','reverse','weight']
    ].rename(columns={'trait':'guna'})
    if not guna_items.empty:
        base = df[['participant_id','item_id','norm_item']].copy()
        # possible points per item = weight * 100
        gmeta = guna_items[['item_id','guna','weight']].rename(columns={'weight':'g_weight'})
        resp_g = base.merge(gmeta, on='item_id', how='inner')
        if not resp_g.empty:
            resp_g['possible'] = resp_g['g_weight'].astype(float) * 100.0
            gsum = (
                resp_g.groupby(['participant_id','guna'])
                      .agg(earned=('norm_item','sum'), possible=('possible','sum'))
                      .reset_index()
            )
            gsum['pct'] = np.where(gsum['possible']>0, gsum['earned']/gsum['possible']*100.0, np.nan)
            guna_breakdown = gsum.copy()
            guna_pct = gsum.pivot(index='participant_id', columns='guna', values='pct').reset_index().fillna(0)
        else:
            guna_breakdown = pd.DataFrame(columns=['participant_id','guna','earned','possible','pct'])
            guna_pct = pd.DataFrame(columns=['participant_id','Sattva','Rajas','Tamas'])
    else:
        guna_breakdown = pd.DataFrame(columns=['participant_id','guna','earned','possible','pct'])
        guna_pct = pd.DataFrame(columns=['participant_id','Sattva','Rajas','Tamas'])

    # ----- Pillar scores
    t_for_p = trait.merge(pillar_map, on='trait', how='inner')
    t_for_p['score_signed'] = np.where(t_for_p['weight']>=0, t_for_p['score'], 100 - t_for_p['score'])
    t_for_p['w'] = t_for_p['weight'].abs()
    pillar = (
        t_for_p.groupby(['participant_id','pillar'])
               .apply(lambda g: pd.Series({
                   'score': (g['score_signed']*g['w']).sum()/g['w'].sum() if g['w'].sum()>0 else np.nan,
                   'n_traits': g.shape[0]
               }))
               .reset_index()
    )

    # ===== Norms: fixed or empirical
    if use_fixed_norms and os.path.exists(fixed_norms_path):
        nx = pd.ExcelFile(fixed_norms_path)
        trait_norms  = pd.read_excel(nx, 'norms_trait')
        guna_norms   = pd.read_excel(nx, 'norms_guna')
        pillar_norms = pd.read_excel(nx, 'norms_pillar')
    else:
        trait_norms  = build_empirical_norms(trait.rename(columns={'trait':'construct','score':'value'}),'construct','value')
        if not guna_pct.empty:
            guna_long   = guna_pct.melt(id_vars='participant_id', var_name='construct', value_name='value')
            guna_norms  = build_empirical_norms(guna_long, 'construct','value')
        else:
            guna_norms  = pd.DataFrame(columns=['construct_type','construct_id','mean_norm','sd_norm','n'])
        if not pillar.empty:
            pillar_tmp  = pillar.rename(columns={'pillar':'construct','score':'value'})
            pillar_norms= build_empirical_norms(pillar_tmp, 'construct','value')
        else:
            pillar_norms= pd.DataFrame(columns=['construct_type','construct_id','mean_norm','sd_norm','n'])

    # ===== T-scores
    trait_T = trait.rename(columns={'trait':'construct'}).merge(
        trait_norms.rename(columns={'construct_id':'construct'})[['construct','mean_norm','sd_norm']],
        on='construct', how='left'
    )
    trait_T['T'] = trait_T.apply(lambda r: safe_t_score(r['score'], r['mean_norm'], r['sd_norm']), axis=1)

    if not guna_pct.empty:
        guna_long = guna_pct.melt(id_vars='participant_id', var_name='construct', value_name='pct').merge(
            guna_norms.rename(columns={'construct_id':'construct'})[['construct','mean_norm','sd_norm']],
            on='construct', how='left'
        )
        guna_long['T'] = guna_long.apply(lambda r: safe_t_score(r['pct'], r['mean_norm'], r['sd_norm']), axis=1)
        guna_T = guna_long
    else:
        guna_T = pd.DataFrame(columns=['participant_id','construct','pct','mean_norm','sd_norm','T'])

    if not pillar.empty:
        pillar_T = pillar.rename(columns={'pillar':'construct','score':'value'}).merge(
            pillar_norms.rename(columns={'construct_id':'construct'})[['construct','mean_norm','sd_norm']],
            on='construct', how='left'
        )
        pillar_T['T'] = pillar_T.apply(lambda r: safe_t_score(r['value'], r['mean_norm'], r['sd_norm']), axis=1)
    else:
        pillar_T = pd.DataFrame(columns=['participant_id','construct','value','mean_norm','sd_norm','T'])

    # ===== Save outputs
    with pd.ExcelWriter(f"{output_prefix}.xlsx", engine="xlsxwriter") as w:
        df.to_excel(w, sheet_name="responses_scored", index=False)
        trait_T.to_excel(w, sheet_name="trait_T", index=False)
        pillar_T.to_excel(w, sheet_name="pillar_T", index=False)
        guna_pct.to_excel(w, sheet_name="guna_pct", index=False)
        guna_T.to_excel(w, sheet_name="guna_T", index=False)
        guna_breakdown.to_excel(w, sheet_name="guna_breakdown", index=False)
        matrix_xy.to_excel(w, sheet_name="matrix_xy", index=False)

        trait_norms.to_excel(w, sheet_name="norms_trait", index=False)
        guna_norms.to_excel(w, sheet_name="norms_guna", index=False)
        pillar_norms.to_excel(w, sheet_name="norms_pillar", index=False)

    bundle = {
        "generated_at": pd.Timestamp.utcnow().isoformat(),
        "trait_T": trait_T.to_dict(orient="records"),
        "pillar_T": pillar_T.to_dict(orient="records"),
        "guna_pct": guna_pct.to_dict(orient="records"),
        "guna_T": guna_T.to_dict(orient="records"),
        "guna_breakdown": guna_breakdown.to_dict(orient="records"),
        "matrix_xy": matrix_xy.to_dict(orient="records"),
        "norms": {
            "trait": trait_norms.to_dict(orient="records"),
            "guna": guna_norms.to_dict(orient="records"),
            "pillar": pillar_norms.to_dict(orient="records"),
        },
        "norms_source": "fixed" if (use_fixed_norms and os.path.exists(fixed_norms_path)) else "empirical"
    }
    with open(f"{output_prefix}.json","w", encoding="utf-8") as f:
        json.dump(bundle, f, indent=2)

    print(f"✅ Scoring complete → {output_prefix}.xlsx and {output_prefix}.json "
          f"(norms: {'fixed' if (use_fixed_norms and os.path.exists(fixed_norms_path)) else 'empirical'})")

if __name__ == "__main__":
    score_lead(
        "lead_collection_template.xlsx",
        "scores_demo",
        use_fixed_norms=False,
        fixed_norms_path="norms.xlsx"
    )
