# company_report.py — Aggregate LEAD company report with org mixed-Guṇa + optional clustering
# Requires: pandas, numpy, matplotlib, jinja2, pdfkit (wkhtmltopdf), openpyxl
# Optional: scikit-learn for clustering (pip install scikit-learn)

import os, math, base64
from io import BytesIO
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from jinja2 import Environment, FileSystemLoader, select_autoescape

SCORES_XLS      = "scores_demo.xlsx"               # from tscore.py
PLAYBOOK_XLSX   = "LEAD_Consultant_Playbook.xlsx"  # with Org_* and Quadrant sheets
OUTDIR          = "reports/company"
COMPANY_ID      = None   # set ID or keep None for ALL
LOGO_PATH       = "assets/logo.png"

BRAND  = "#24405A"; ACCENT = "#4B89DC"; BG = "#F6F8FB"; CARD = "#FFFFFF"; MUTED = "#5A6B7C"

# Optional clustering toggle
RUN_CLUSTERING = True
try:
    from sklearn.preprocessing import StandardScaler
    from sklearn.cluster import KMeans
    from sklearn.metrics import silhouette_score
    SKLEARN_OK = True
except Exception:
    SKLEARN_OK = False
    RUN_CLUSTERING = False

plt.rcParams["figure.facecolor"] = "white"

# ----- utils

def b64_uri(path):
    if not os.path.exists(path): return ""
    return "data:image/png;base64," + base64.b64encode(open(path,"rb").read()).decode("utf-8")

def fig_to_data_uri(fig):
    buf = BytesIO()
    fig.savefig(buf, format="png", dpi=200, bbox_inches="tight")
    buf.seek(0)
    uri = "data:image/png;base64," + base64.b64encode(buf.read()).decode("utf-8")
    plt.close(fig)
    return uri

def band_for_T(t):
    if pd.isna(t): return "—"
    if t >= 60: return "Strength"
    if t >= 46: return "Balanced"
    if t >= 0:  return "Development"
    return "—"

def guna_mix_label(norm_dict):
    S = float(norm_dict.get("Sattva",0.0))
    R = float(norm_dict.get("Rajas",0.0))
    T = float(norm_dict.get("Tamas",0.0))
    arr = sorted([("S",S),("R",R),("T",T)], key=lambda x: x[1], reverse=True)
    top, second, third = arr[0], arr[1], arr[2]
    if (top[1] - third[1]) <= 7.0:
        return "SRT"
    if abs(top[1]-second[1]) <= 7.0 and top[1] >= 30.0 and second[1] >= 30.0:
        pair = "".join(sorted([top[0], second[0]]))
        return {"SR":"SR","RS":"SR","ST":"ST","TS":"ST","RT":"RT","TR":"RT"}.get(pair, top[0])
    return top[0]

# ----- load playbook

def load_playbook(path=PLAYBOOK_XLSX):
    res = {"org_pillar": {}, "org_guna": {}, "org_quad": {}, "org_guna_mix": {}}
    if not os.path.exists(path): return res
    xls = pd.ExcelFile(path)

    if "Org_Pillar_Guides" in xls.sheet_names:
        op = pd.read_excel(xls, "Org_Pillar_Guides")
        for _,r in op.iterrows():
            p = str(r["pillar"]).strip().upper()[:1]
            z = str(r["zone"]).strip()
            res["org_pillar"].setdefault(p, [])
            res["org_pillar"][p].append({
                "zone": z,
                "min": float(r.get("range_min", 0)),
                "max": float(r.get("range_max", 100)),
                "meaning": str(r.get("organizational_meaning","")).strip(),
                "recommendation": str(r.get("recommendation","")).strip(),
            })

    if "Org_Guna_Profiles" in xls.sheet_names:
        og = pd.read_excel(xls, "Org_Guna_Profiles")
        for _,r in og.iterrows():
            g = str(r["guna"]).strip().title()
            res["org_guna"][g] = {
                "metaphor": str(r.get("organizational_metaphor","")).strip(),
                "tone": str(r.get("cultural_tone","")).strip(),
                "risks": str(r.get("risks","")).strip(),
                "focus": str(r.get("development_focus","")).strip(),
            }

    if "Org_Quadrant_Insights" in xls.sheet_names:
        oq = pd.read_excel(xls, "Org_Quadrant_Insights")
        for _,r in oq.iterrows():
            m = str(r["matrix"]).strip()
            q = str(r["quadrant"]).strip().upper()
            res["org_quad"].setdefault(m, {})
            res["org_quad"][m][q] = {
                "org_archetype": str(r.get("org_archetype","")).strip(),
                "narrative": str(r.get("organizational_narrative","")).strip(),
                "coach": str(r.get("coach_focus","")).strip(),
            }

    if "Org_Guna_Mix_Profiles" in xls.sheet_names:
        mg = pd.read_excel(xls, "Org_Guna_Mix_Profiles")
        for _,r in mg.iterrows():
            res["org_guna_mix"][str(r["mix_code"]).strip().upper()] = {
                "metaphor": str(r.get("org_metaphor","")).strip(),
                "tone": str(r.get("cultural_tone","")).strip(),
                "risks": str(r.get("risks","")).strip(),
                "focus": str(r.get("development_focus","")).strip(),
            }

    for p, rows in res["org_pillar"].items():
        rows.sort(key=lambda x: (-x["min"], x["max"]))
    return res

PB = load_playbook()

# ----- load scored data

def load_scores():
    xls = pd.ExcelFile(SCORES_XLS)
    pillar_T  = pd.read_excel(xls, "pillar_T")
    guna_pct  = pd.read_excel(xls, "guna_pct")
    guna_T    = pd.read_excel(xls, "guna_T") if "guna_T" in xls.sheet_names else pd.DataFrame()
    matrix_xy = pd.read_excel(xls, "matrix_xy")
    return pillar_T, guna_pct, guna_T, matrix_xy

# ----- aggregation helpers

def compute_pillar_agg(pillar_T: pd.DataFrame):
    df = pillar_T.copy()
    df["pillar"] = df["construct"].astype(str).str.strip().str.upper().str[0]
    grp = df.groupby("pillar")["T"].agg(["mean","std","count"]).reset_index()
    grp.rename(columns={"mean":"mean_T","std":"sd_T","count":"n"}, inplace=True)

    band_tab = []
    for p in ["L","E","A","D"]:
        subset = df[df["pillar"]==p]
        n = len(subset)
        if n == 0:
            band_tab.append({"pillar": p, "pct_strength": np.nan, "pct_balanced": np.nan, "pct_development": np.nan})
            continue
        s = (subset["T"] >= 60).mean()*100
        b = ((subset["T"] >= 46) & (subset["T"] < 60)).mean()*100
        d = (subset["T"] < 46).mean()*100
        band_tab.append({"pillar": p, "pct_strength": s, "pct_balanced": b, "pct_development": d})
    band_df = pd.DataFrame(band_tab)

    out = grp.merge(band_df, on="pillar", how="left")
    return out

def compute_org_pillar_narrative(pillar_agg: pd.DataFrame):
    rows = []
    for _, r in pillar_agg.iterrows():
        p = r["pillar"]; mean_T = r["mean_T"]
        zone = band_for_T(mean_T)
        meaning = recommendation = ""
        if p in PB["org_pillar"]:
            for rule in PB["org_pillar"][p]:
                if mean_T >= rule["min"] and mean_T <= rule["max"]:
                    meaning = rule["meaning"]; recommendation = rule["recommendation"]; break
        rows.append({"pillar": p, "zone": zone, "meaning": meaning, "recommendation": recommendation})
    return pd.DataFrame(rows)

def participant_norm(row):
    S,R,T = float(row.get("Sattva",0)), float(row.get("Rajas",0)), float(row.get("Tamas",0))
    s = S+R+T
    if s<=0: return {"Sattva":0,"Rajas":0,"Tamas":0}
    return {"Sattva":S/s*100.0, "Rajas":R/s*100.0, "Tamas":T/s*100.0}

def compute_guna_agg(guna_pct: pd.DataFrame, guna_T: pd.DataFrame):
    if guna_pct.empty:
        return {"mean_norm": {"Sattva":0,"Rajas":0,"Tamas":0}, "dom_dist": {}, "guna_T_mean": {}}

    norms = [participant_norm(row) for _,row in guna_pct.iterrows()]
    mean_norm = {k: float(np.mean([n[k] for n in norms])) for k in ["Sattva","Rajas","Tamas"]}

    doms = []
    for _,row in guna_pct.iterrows():
        n = participant_norm(row)
        doms.append({"S":"Sattva","R":"Rajas","T":"Tamas","SRT":"SRT","SR":"SR","ST":"ST","RT":"RT"}[guna_mix_label(n)])
    dom_dist = {}
    total = len(doms)
    for k in ["Sattva","Rajas","Tamas","SR","ST","RT","SRT"]:
        dom_dist[k] = 100.0 * sum(1 for x in doms if x==k) / total if total>0 else 0.0

    if guna_T is not None and not guna_T.empty:
        gt = guna_T.copy()
        gt["guna"] = gt["construct"].map({"S":"Sattva","R":"Rajas","T":"Tamas"})
        guna_T_mean = gt.groupby("guna")["T"].mean().to_dict()
    else:
        guna_T_mean = {}
    return {"mean_norm": mean_norm, "dom_dist": dom_dist, "guna_T_mean": guna_T_mean}

def compute_matrix_quadrants(matrix_xy: pd.DataFrame):
    if matrix_xy.empty: return pd.DataFrame(columns=["matrix","Q1","Q2","Q3","Q4","n"])
    df = matrix_xy.copy()
    df["quadrant"] = df["quadrant"].astype(str).str.upper()
    tab = (df.groupby(["matrix","quadrant"])["participant_id"].count().reset_index(name="cnt"))
    total = tab.groupby("matrix")["cnt"].sum().reset_index(name="n")
    pivot = tab.pivot(index="matrix", columns="quadrant", values="cnt").fillna(0)
    for q in ["Q1","Q2","Q3","Q4"]:
        if q not in pivot.columns: pivot[q] = 0
    pivot = pivot[["Q1","Q2","Q3","Q4"]].reset_index()
    out = pivot.merge(total, on="matrix", how="left")
    for q in ["Q1","Q2","Q3","Q4"]:
        out[q] = np.where(out["n"]>0, out[q]/out["n"]*100.0, 0.0)
    return out

# ----- charts

def bar_lead_company(pillar_agg: pd.DataFrame):
    order = ["L","E","A","D"]
    df = pillar_agg.set_index("pillar").reindex(order)
    means = df["mean_T"].values
    errs  = df["sd_T"].fillna(0).values
    fig, ax = plt.subplots(figsize=(5.2, 2.4))
    ax.bar(order, means, yerr=errs, capsize=4, edgecolor="black")
    ax.axhline(50, linestyle="--", linewidth=1); ax.set_ylim(20, 80)
    ax.set_title("LEAD Pillars — Mean ± SD (T)")
    return fig_to_data_uri(fig)

def pie_guna(mean_norm):
    vals = [mean_norm["Sattva"], mean_norm["Rajas"], mean_norm["Tamas"]]
    fig, ax = plt.subplots(figsize=(2.6, 2.6))
    ax.pie(vals, labels=["Sattva","Rajas","Tamas"], autopct="%1.1f%%")
    ax.set_title("Company Guṇa (Normalized Mean)")
    return fig_to_data_uri(fig)

def radar_guna(mean_norm):
    angles = np.linspace(0, 2*np.pi, 3, endpoint=False).tolist()
    vals = [mean_norm["Sattva"], mean_norm["Rajas"], mean_norm["Tamas"]]
    vals_loop = vals + [vals[0]]
    angles_loop = angles + [angles[0]]
    fig, ax = plt.subplots(figsize=(2.6, 2.6), subplot_kw=dict(polar=True))
    ax.plot(angles_loop, vals_loop); ax.fill(angles_loop, vals_loop, alpha=0.15)
    ax.set_thetagrids(np.degrees(angles), ["S","R","T"]); ax.set_ylim(0, 100)
    ax.set_title("S–R–T Balance (Company)")
    return fig_to_data_uri(fig)

def stacked_quadrant_bars(matrix_pct_row):
    vals = [matrix_pct_row.get(q,0) for q in ["Q1","Q2","Q3","Q4"]]
    colors = ["#EAF6EE","#FFF7E6","#FDECEC","#EAF1FF"]
    fig, ax = plt.subplots(figsize=(3.8, 0.5))
    left = 0
    for v,c in zip(vals, colors):
        ax.barh([0], [v], left=left, color=c, edgecolor="black", linewidth=0.3)
        left += v
    ax.set_xlim(0,100); ax.set_yticks([]); ax.set_xticks([0,25,50,75,100])
    ax.set_title("Q1/Q2/Q3/Q4 %")
    return fig_to_data_uri(fig)

# ----- clustering

def cluster_company(pillar_T, guna_pct):
    if not RUN_CLUSTERING or not SKLEARN_OK:
        return None
    p = pillar_T.copy()
    p["pillar"] = p["construct"].astype(str).str.upper().str[0]
    pivT = p.pivot_table(index="participant_id", columns="pillar", values="T", aggfunc="mean")
    g = guna_pct.set_index("participant_id")[["Sattva","Rajas","Tamas"]]
    g_norm = g.div(g.sum(axis=1).replace(0,np.nan), axis=0) * 100.0
    feats = pivT.join(g_norm, how="inner").dropna()
    if feats.shape[0] < 8:
        return None
    X = feats.values
    from sklearn.preprocessing import StandardScaler
    X = StandardScaler().fit_transform(X)

    from sklearn.cluster import KMeans
    from sklearn.metrics import silhouette_score

    best = {"score": -1, "k": None, "model": None, "labels": None}
    for k in [2,3,4,5]:
        km = KMeans(n_clusters=k, n_init="auto", random_state=42)
        labels = km.fit_predict(X)
        if len(set(labels)) == 1:
            continue
        sil = silhouette_score(X, labels)
        if sil > best["score"]:
            best = {"score": sil, "k": k, "model": km, "labels": labels}
    if best["model"] is None:
        return None
    feats["cluster"] = best["labels"]
    out = []
    for c in sorted(feats["cluster"].unique()):
        sub = feats[feats["cluster"]==c]
        row = {"cluster": int(c), "n": int(sub.shape[0]), "pct": round(sub.shape[0]/feats.shape[0]*100.0,1)}
        for col in ["L","E","A","D","Sattva","Rajas","Tamas"]:
            row[col] = round(sub[col].mean(),1)
        out.append(row)
    return {"k": best["k"], "silhouette": round(best["score"],3), "table": out}

# ----- context & render

def build_context():
    pillar_T, guna_pct, guna_T, matrix_xy = load_scores()

    # Optional company filter if you carry company_id in sheets:
    if COMPANY_ID is not None:
        # Only filter where company_id exists; otherwise treat as ALL
        if "company_id" in pillar_T.columns:
            pids = set(pillar_T.loc[pillar_T["company_id"]==COMPANY_ID, "participant_id"])
            pillar_T = pillar_T[pillar_T["participant_id"].isin(pids)]
        if "company_id" in guna_pct.columns:
            guna_pct = guna_pct[guna_pct["company_id"]==COMPANY_ID]
        if "company_id" in guna_T.columns:
            guna_T = guna_T[guna_T["company_id"]==COMPANY_ID]
        if "company_id" in matrix_xy.columns:
            matrix_xy = matrix_xy[matrix_xy["company_id"]==COMPANY_ID]

    p_agg = compute_pillar_agg(pillar_T)
    p_narr = compute_org_pillar_narrative(p_agg)
    g_agg = compute_guna_agg(guna_pct, guna_T)
    m_pct = compute_matrix_quadrants(matrix_xy)

    overall_mean_T = p_agg["mean_T"].mean() if not p_agg.empty else float("nan")

    # org guna mix interpretation
    mix_code = guna_mix_label(g_agg["mean_norm"])
    org_mix = PB.get("org_guna_mix", {}).get(mix_code, {})
    org_guna_primary = max(g_agg["mean_norm"].items(), key=lambda kv: kv[1])[0] if g_agg["mean_norm"] else None
    org_guna_blurb = PB.get("org_guna", {}).get(org_guna_primary or "", {})

    # charts
    bar_uri   = bar_lead_company(p_agg) if not p_agg.empty else ""
    pie_uri   = pie_guna(g_agg["mean_norm"]) if g_agg["mean_norm"] else ""
    radar_uri = radar_guna(g_agg["mean_norm"]) if g_agg["mean_norm"] else ""

    # matrix cards
    matrix_cards = []
    for _,row in m_pct.iterrows():
        matrix = row["matrix"]
        q1,q2,q3,q4 = float(row["Q1"]), float(row["Q2"]), float(row["Q3"]), float(row["Q4"])
        dom_q = max([("Q1",q1),("Q2",q2),("Q3",q3),("Q4",q4)], key=lambda x: x[1])[0]
        insight = PB.get("org_quad", {}).get(matrix, {}).get(dom_q, {})
        bar = stacked_quadrant_bars(row)
        matrix_cards.append({
            "matrix": matrix, "Q1": q1, "Q2": q2, "Q3": q3, "Q4": q4, "n": int(row["n"]),
            "dominant": dom_q,
            "org_archetype": insight.get("org_archetype",""),
            "org_narrative": insight.get("narrative",""),
            "coach": insight.get("coach",""),
            "bar_uri": bar
        })

    # pillar rows
    pillar_rows = []
    for _, r in p_agg.iterrows():
        p = r["pillar"]; meanT = float(r["mean_T"]); sdT = float(r["sd_T"]) if not pd.isna(r["sd_T"]) else float("nan")
        band = band_for_T(meanT)
        expl = p_narr.loc[p_narr["pillar"]==p].iloc[0] if (p in p_narr["pillar"].values) else None
        pillar_rows.append({
            "pillar": p, "mean_T": meanT, "sd_T": sdT,
            "pct_strength": float(r["pct_strength"]), "pct_balanced": float(r["pct_balanced"]), "pct_development": float(r["pct_development"]),
            "zone": band,
            "meaning": expl["meaning"] if expl is not None else "",
            "recommendation": expl["recommendation"] if expl is not None else ""
        })

    # clustering
    cluster = cluster_company(pillar_T, guna_pct)

    ctx = {
        "company_id": COMPANY_ID or "ALL",
        "logo_uri": b64_uri(LOGO_PATH),
        "brand": BRAND, "accent": ACCENT, "bg": BG, "card": CARD, "muted": MUTED,

        "overall_mean_T": overall_mean_T,
        "bar_lead_uri": bar_uri,

        "guna_mean_norm": g_agg["mean_norm"],
        "guna_dom_dist": g_agg["dom_dist"],
        "guna_T_mean": g_agg["guna_T_mean"],
        "guna_pie_uri": pie_uri,
        "guna_radar_uri": radar_uri,

        "org_guna_primary": org_guna_primary,
        "org_guna_metaphor": org_guna_blurb.get("metaphor",""),
        "org_guna_tone": org_guna_blurb.get("tone",""),
        "org_guna_risks": org_guna_blurb.get("risks",""),
        "org_guna_focus": org_guna_blurb.get("focus",""),

        "guna_mix_code": mix_code,
        "org_mix_metaphor": org_mix.get("metaphor",""),
        "org_mix_tone": org_mix.get("tone",""),
        "org_mix_risks": org_mix.get("risks",""),
        "org_mix_focus": org_mix.get("focus",""),

        "pillar_rows": pillar_rows,
        "matrix_cards": matrix_cards,

        "cluster": cluster
    }
    return ctx

def render(ctx):
    os.makedirs(OUTDIR, exist_ok=True)
    env = Environment(loader=FileSystemLoader("templates"), autoescape=select_autoescape(["html"]))
    tpl = env.get_template("company_report.html")
    html = tpl.render(ctx=ctx)
    out_html = os.path.join(OUTDIR, f"company_{ctx['company_id']}_report.html")
    open(out_html, "w", encoding="utf-8").write(html)
    print("✔ HTML saved:", out_html)
    try:
        import pdfkit
        pdf_path = out_html.replace(".html",".pdf")
        pdfkit.from_file(out_html, pdf_path, options={"enable-local-file-access": None})
        print("✔ PDF saved:", pdf_path)
    except Exception as e:
        print("ℹ PDF skipped:", e)

if __name__ == "__main__":
    ctx = build_context()
    render(ctx)
