# participant_report7.py — FINAL (Leadership Type from playbook + details)
# Keeps your existing layout/logic. Only adds: leadership type selection from
# Leadership_Types (title, desc, narrative, behaviors, risks, coach_actions).
#pip install matplotlib
#python -m pip install matplotlib
#python -m pip install jinja2

import os, math, base64
from io import BytesIO
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from jinja2 import Environment, FileSystemLoader, select_autoescape

SCORES_XLS      = "scores_demo.xlsx"
OUTDIR          = "reports/participants"
LOGO_PATH       = "assets/logo.png"
PLAYBOOK_XLSX   = "LEAD_Consultant_Playbook.xlsx"

# Sizing (unchanged)
MATRIX_FIGSIZE  = (2.8, 2.8)
LEAD_BAR_SIZE   = (4.6, 2.2)
GUNA_FIGSIZE    = (2.4, 2.4)
GUNA_RADAR_SIZE = (2.4, 2.4)

# Theme (unchanged)
BRAND  = "#24405A"; ACCENT = "#4B89DC"; BG = "#F6F8FB"; CARD = "#FFFFFF"; MUTED = "#5A6B7C"

def _qcode_and_label(qraw: str):
    if not isinstance(qraw, str): return "", ""
    s = qraw.strip()
    q = s[:2].upper() if s.upper().startswith("Q") else s.upper()
    label = ""
    p1 = s.find("("); p2 = s.rfind(")")
    if p1 != -1 and p2 != -1 and p2 > p1:
        label = s[p1:p2+1].strip()
    return q, label

def load_playbook(path=PLAYBOOK_XLSX):
    pb = {"band_logic": [], "pillar_guides": {}, "quadrant": {}, "guna_profiles": {}, "lead_types": []}
    if not os.path.exists(path): return pb
    xls = pd.ExcelFile(path)

    if "Band_Logic" in xls.sheet_names:
        bl = pd.read_excel(xls, "Band_Logic")
        for _,r in bl.iterrows():
            pb["band_logic"].append({
                "min": float(r["band_min_T"]),
                "max": float(r["band_max_T"]),
                "label": str(r["band_label"]).strip(),
                "meaning": str(r.get("meaning","")).strip(),
                "coach": str(r.get("coach_message","")).strip()
            })
        pb["band_logic"].sort(key=lambda x: (-x["min"], x["max"]))

    if "Pillar_Guides" in xls.sheet_names:
        pg = pd.read_excel(xls, "Pillar_Guides")
        for _,r in pg.iterrows():
            p = str(r["pillar"]).strip().upper()[:1]
            pb["pillar_guides"][p] = {
                "name": str(r.get("name","")).strip(),
                "definition": str(r.get("definition","")).strip(),
                "high_T": str(r.get("high_T","")).strip(),
                "mid_T":  str(r.get("mid_T","")).strip(),
                "low_T":  str(r.get("low_T","")).strip(),
                "one_liner": str(r.get("one_liner","")).strip(),
            }

    if "Quadrant_Interpretation" in xls.sheet_names:
        qi = pd.read_excel(xls, "Quadrant_Interpretation")
        for _,r in qi.iterrows():
            m = str(r["matrix"]).strip()
            qraw = str(r["quadrant"]).strip()
            qcode, qlabel = _qcode_and_label(qraw)
            if not m or qcode not in {"Q1","Q2","Q3","Q4"}: continue
            pb["quadrant"].setdefault(m, {})
            pb["quadrant"][m][qcode] = {
                "label": qlabel,
                "x": str(r.get("x_axis","X")).strip(),
                "y": str(r.get("y_axis","Y")).strip(),
                "narrative": str(r.get("narrative","")).strip(),
                "signals": str(r.get("signals","")).strip(),
                "coach": str(r.get("coach_actions","")).strip()
            }

    if "Guna_Profiles" in xls.sheet_names:
        gp = pd.read_excel(xls, "Guna_Profiles")
        for _,r in gp.iterrows():
            prof = str(r["profile"]).strip().title()
            pb["guna_profiles"][prof] = {
                "mood": str(r.get("leadership_mood","")).strip(),
                "shadow": str(r.get("shadow_risk","")).strip(),
                "balance": str(r.get("balance_strategy","")).strip(),
                "metaphor": str(r.get("metaphor","")).strip()
            }

    # UPDATED: Leadership_Types with narrative/behaviors/risks/coach
    if "Leadership_Types" in xls.sheet_names:
        lt = pd.read_excel(xls, "Leadership_Types")
        for _, r in lt.iterrows():
            pb["lead_types"].append({
                "guna_dom":      str(r.get("guna_dom","")).strip().title(),          # Sattva/Rajas/Tamas or mix if used
                "dom_pillar":    str(r.get("dom_pillar","")).strip().upper()[:1],   # L/E/A/D
                "min_T": float(r.get("min_T", 0)) if pd.notna(r.get("min_T", np.nan)) else 0,
                "min_E": float(r.get("min_E", 0)) if pd.notna(r.get("min_E", np.nan)) else 0,
                "title":         str(r.get("title","")).strip(),
                "desc":          str(r.get("desc","")).strip(),
                "narrative":     str(r.get("narrative","")).strip(),
                "behaviors":     str(r.get("behaviors","")).strip(),
                "risks":         str(r.get("risks","")).strip(),
                "coach_actions": str(r.get("coach_actions","")).strip(),
            })
    return pb

PLAYBOOK = load_playbook()

def band_for_T(t):
    if pd.isna(t): return None
    for b in PLAYBOOK.get("band_logic", []):
        if t >= b["min"] and t <= b["max"]:
            return b
    if t >= 60: return {"label":"Strength","meaning":"Above average.","coach":""}
    if t >= 45: return {"label":"Balanced Zone","meaning":"Typical range.","coach":""}
    if t >= 40: return {"label":"Development","meaning":"Needs focus.","coach":""}
    return {"label":"Intensive Support","meaning":"Significant uplift needed.","coach":""}

def band_class_and_label(t: float):
    b = band_for_T(t) or {"label": "—"}
    label = b["label"]
    lab = "Strength" if "Strength" in label else \
          "Balanced" if "Balanced" in label else \
          "Development" if "Develop" in label else \
          "Intensive"
    cls = lab.lower().replace(" ", "-")
    return cls, lab

def read_scores():
    xls = pd.ExcelFile(SCORES_XLS)
    trait_T   = pd.read_excel(xls, "trait_T")
    pillar_T  = pd.read_excel(xls, "pillar_T")
    guna_pct  = pd.read_excel(xls, "guna_pct")
    guna_T    = pd.read_excel(xls, "guna_T") if "guna_T" in xls.sheet_names else pd.DataFrame()
    guna_bd   = pd.read_excel(xls, "guna_breakdown") if "guna_breakdown" in xls.sheet_names else pd.DataFrame()
    matrix_xy = pd.read_excel(xls, "matrix_xy")
    for df in (trait_T, pillar_T, guna_T):
        if not df.empty and "construct" in df.columns:
            df["construct"] = df["construct"].astype(str).str.strip().str.upper().str[0]
    return trait_T, pillar_T, guna_pct, guna_T, guna_bd, matrix_xy

def b64_uri(path):
    if not os.path.exists(path): return ""
    return "data:image/png;base64," + base64.b64encode(open(path,"rb").read()).decode("utf-8")

def clip01(v):
    if pd.isna(v): return np.nan
    return max(0.0, min(100.0, float(v)))

def fig_to_data_uri(fig):
    buf = BytesIO()
    fig.savefig(buf, format="png", dpi=200, bbox_inches="tight")
    buf.seek(0)
    out = "data:image/png;base64," + base64.b64encode(buf.read()).decode("utf-8")
    plt.close(fig)
    return out

def quadrant_chart_uri(matrix_name, x, y, labx="X", laby="Y"):
    x = clip01(x); y = clip01(y)
    fig, ax = plt.subplots(figsize=MATRIX_FIGSIZE)
    ax.scatter([x],[y], s=150)
    ax.axhline(50, linestyle="--", linewidth=0.9); ax.axvline(50, linestyle="--", linewidth=0.9)
    ax.set_xlim(0,100); ax.set_ylim(0,100)
    ax.set_xlabel(labx); ax.set_ylabel(laby); ax.set_title(matrix_name)
    return fig_to_data_uri(fig)

def lead_bar_uri(pillar_T, pid, order=("L","E","A","D")):
    vals = [pillar_T.loc[(pillar_T["participant_id"]==pid) & (pillar_T["construct"]==c), "T"].mean() for c in order]
    fig, ax = plt.subplots(figsize=LEAD_BAR_SIZE)
    ax.bar(order, vals, edgecolor="black")
    ax.axhline(50, linestyle="--", linewidth=1); ax.set_ylim(20, 80)
    for i,v in enumerate(vals):
        if pd.notna(v): ax.text(i, v+1, f"{v:.1f}", ha="center", va="bottom", fontsize=9)
    ax.set_title("LEAD Pillars (T)")
    return fig_to_data_uri(fig)

def guna_pie_uri_norm(s_norm, r_norm, t_norm):
    fig, ax = plt.subplots(figsize=GUNA_FIGSIZE)
    ax.pie([s_norm, r_norm, t_norm], labels=["Sattva","Rajas","Tamas"], autopct="%1.1f%%")
    ax.set_title("Guṇa Profile (Normalized)")
    return fig_to_data_uri(fig)

def guna_radar_uri(s_norm, r_norm, t_norm):
    angles = np.linspace(0, 2*np.pi, 3, endpoint=False).tolist()
    vals = [s_norm, r_norm, t_norm]
    vals_loop = vals + [vals[0]]
    angles_loop = angles + [angles[0]]
    fig, ax = plt.subplots(figsize=GUNA_RADAR_SIZE, subplot_kw=dict(polar=True))
    ax.plot(angles_loop, vals_loop); ax.fill(angles_loop, vals_loop, alpha=0.15)
    ax.set_thetagrids(np.degrees(angles), ["S","R","T"]); ax.set_ylim(0, 100)
    ax.set_title("S–R–T Balance")
    return fig_to_data_uri(fig)

def compute_guna_display(row_like, guna_bd_part=None):
    S = float(row_like.get("Sattva",0.0)); R = float(row_like.get("Rajas",0.0)); T = float(row_like.get("Tamas",0.0))
    raw_sum = S+R+T
    s_norm=r_norm=t_norm=0.0
    if raw_sum > 0:
        s_norm, r_norm, t_norm = S/raw_sum*100.0, R/raw_sum*100.0, T/raw_sum*100.0

    earn = {"Sattva": S, "Rajas": R, "Tamas": T}
    poss = {"Sattva": 1.0, "Rajas": 1.0, "Tamas": 1.0}
    if guna_bd_part is not None and not guna_bd_part.empty:
        for g in ["Sattva","Rajas","Tamas"]:
            rowg = guna_bd_part[guna_bd_part["guna"]==g]
            if not rowg.empty:
                earn[g] = float(rowg["earned"].iloc[0])
                poss[g] = max(1.0, float(rowg["possible"].iloc[0]))
    tri = []
    for g,val in earn.items():
        tri.append((g, val/poss[g], {"Sattva":s_norm,"Rajas":r_norm,"Tamas":t_norm}[g]))
    tri.sort(key=lambda x: (x[1], x[2]), reverse=True)
    dominant = tri[0][0] if tri else ""

    return {"raw_pct":{"Sattva":S,"Rajas":R,"Tamas":T},
            "norm_pct":{"Sattva":s_norm,"Rajas":r_norm,"Tamas":t_norm},
            "dominant": dominant}

def executive_summary(pid, pillar_T, guna_pct, guna_T, guna_bd, matrix_xy):
    # Pillar stats
    p = pillar_T[pillar_T["participant_id"]==pid].copy()
    if "value" not in p.columns and "score" in p.columns: p.rename(columns={"score":"value"}, inplace=True)
    p["pillar"] = p["construct"]
    lead = {row["pillar"]: {"T": float(row["T"]), "raw": float(row.get("value", np.nan))} for _,row in p.iterrows()}
    for k in ["L","E","A","D"]: lead.setdefault(k, {"T": np.nan, "raw": np.nan})

    T_vals = [v["T"] for v in lead.values() if not math.isnan(v["T"])]
    raw_vals = [v["raw"] for v in lead.values() if not math.isnan(v["raw"])]
    overall_T = float(np.nanmean(T_vals)) if T_vals else np.nan
    overall_raw = float(np.nanmean(raw_vals)) if raw_vals else np.nan

    pairs = [(k, v["T"], v["raw"]) for k,v in lead.items() if not math.isnan(v["T"])]
    pairs.sort(key=lambda x: (x[1], x[2] if not math.isnan(x[2]) else -1e9), reverse=True)
    dom_pillar = pairs[0][0] if pairs else None

    guide_map = PLAYBOOK.get("pillar_guides", {})
    def pick_para(k, T):
        g = guide_map.get(k, {})
        band = (band_for_T(T) or {}).get("label","")
        if "Strength" in band: return g.get("high_T","")
        if "Balanced" in band: return g.get("mid_T","")
        if "Development" in band or "Support" in band: return g.get("low_T","")
        return ""
    pillar_lines = []
    for k in ["L","E","A","D"]:
        T = lead[k]["T"]; raw = lead[k]["raw"]
        if math.isnan(T): continue
        band_label = (band_for_T(T) or {}).get("label","—")
        para = pick_para(k, T)
        pillar_lines.append(f"<b>{k}</b> (Raw {raw:.1f}, T {T:.1f} — {band_label}): {para}")

    # Guṇa stats
    g = guna_pct[guna_pct["participant_id"]==pid]
    gbd = guna_bd[guna_bd["participant_id"]==pid] if not guna_bd.empty else None
    guna = {"raw_pct":{"Sattva":0,"Rajas":0,"Tamas":0},"norm_pct":{"Sattva":0,"Rajas":0,"Tamas":0},"dominant":""}
    if not g.empty: guna = compute_guna_display(g.iloc[0], gbd)
    gt = {}
    if guna_T is not None and not guna_T.empty:
        sub = guna_T[guna_T["participant_id"]==pid]
        for code, full in {"S":"Sattva","R":"Rajas","T":"Tamas"}.items():
            row = sub[sub["construct"]==code]
            gt[full] = float(row["T"].iloc[0]) if not row.empty else float("nan")

    # Leadership type from playbook
    guna_dom = guna.get("dominant","")
    lt_title, lt_desc = None, None
    lt_narr, lt_beh, lt_risks, lt_coach = None, None, None, None

    for rule in PLAYBOOK.get("lead_types", []):
        if rule["guna_dom"] == guna_dom and rule["dom_pillar"] == (dom_pillar or ""):
            ok_T=True; ok_E=True
            if rule.get("min_T",0)>0:
                if math.isnan(lead[dom_pillar]["T"]) or lead[dom_pillar]["T"]<rule["min_T"]:
                    ok_T=False
            if rule.get("min_E",0)>0:
                E = lead.get("E",{}).get("T", np.nan)
                if math.isnan(E) or E<rule["min_E"]:
                    ok_E=False
            if ok_T and ok_E:
                lt_title = rule["title"]
                lt_desc  = rule["desc"]
                lt_narr  = rule.get("narrative","")
                lt_beh   = rule.get("behaviors","")
                lt_risks = rule.get("risks","")
                lt_coach = rule.get("coach_actions","")
                break

    # Fallbacks if no exact row matches (kept as in your version)
    if not lt_title:
        if guna_dom=="Sattva" and dom_pillar in ("L","D"):
            lt_title="Dharmic Steward-Leader"; lt_desc="Values-driven, collective orientation with steadiness."
        elif guna_dom=="Rajas" and dom_pillar in ("A","D"):
            lt_title="Ambitious Executor"; lt_desc="Outcome-first, high drive; pair with stakeholder safeguards."
        elif guna_dom=="Tamas" and dom_pillar in ("E","L"):
            lt_title="Stability-First Administrator"; lt_desc="Prefers order; build bias-to-action and focus."
        else:
            lt_title="Balanced Developer"; lt_desc="Mixed pattern; cultivate Sattva, channel Rajas, reduce Tamas."
        lt_narr, lt_beh, lt_risks, lt_coach = "", "", "", ""

    dom_one_liner = ""
    if dom_pillar and dom_pillar in guide_map: dom_one_liner = guide_map[dom_pillar].get("one_liner","") or ""

    # Matrix highlights & summary (unchanged)
    mhl_strengths, mhl_watchouts, summary_rows = [], [], []
    qpb = PLAYBOOK.get("quadrant", {})
    msub = matrix_xy[matrix_xy["participant_id"]==pid]
    for _, row in msub.iterrows():
        M = str(row["matrix"]); qcode = str(row.get("quadrant","")).upper()
        cell = qpb.get(M, {}).get(qcode, {})
        lab = cell.get("label","")
        xname = cell.get("x","X"); yname = cell.get("y","Y")
        nar = cell.get("narrative","").strip() or f"{qcode} posture on {xname} vs. {yname}."
        sig = cell.get("signals","").strip() or f"Watch {xname} & {yname} trade-offs."
        coa = cell.get("coach","").strip() or "Pick one weekly practice and track outcomes."
        pretty = f"{M} → <b>{qcode}</b> {lab} — <i>{nar}</i><br/><b>Signals:</b> {sig}<br/><b>Coach:</b> {coa}"
        (mhl_strengths if qcode=="Q1" else mhl_watchouts).append(pretty)
        arche = nar.split("—")[0].strip() if "—" in nar else nar
        summary_rows.append({"matrix": M, "quadrant": f"{qcode} {lab}".strip(), "archetype": arche, "coach": coa, "qcode": qcode})

    coach_line = (band_for_T(overall_T) or {}).get("coach","")

    insights = []
    for k in ["L","E","A","D"]:
        T = lead[k]["T"]
        if math.isnan(T): continue
        b = band_for_T(T) or {}
        label = b.get("label","")
        if (k == dom_pillar) or ("Balanced" not in label):
            one = guide_map.get(k, {}).get("one_liner","")
            insights.append({"pillar": k, "band": label, "line": one})

    return {
        "overall_T": overall_T, "overall_raw": overall_raw,
        "dom_pillar": dom_pillar, "dom_one_liner": dom_one_liner,
        "lead_type_title": lt_title, "lead_type_desc": lt_desc,
        "lead_type_narrative": lt_narr, "lead_type_behaviors": lt_beh,
        "lead_type_risks": lt_risks, "lead_type_coach": lt_coach,
        "pillar_lines": pillar_lines, "pillar_insights": insights,
        "matrix_strengths": mhl_strengths, "matrix_watchouts": mhl_watchouts,
        "matrix_summary": summary_rows, "guna": guna, "guna_T": gt, "coach_line": coach_line
    }

def build_context(pid, trait_T, pillar_T, guna_pct, guna_T, guna_bd, matrix_xy):
    ex = executive_summary(pid, pillar_T, guna_pct, guna_T, guna_bd, matrix_xy)
    bar_uri = lead_bar_uri(pillar_T, pid)
    s_norm = ex["guna"]["norm_pct"]["Sattva"]; r_norm = ex["guna"]["norm_pct"]["Rajas"]; t_norm = ex["guna"]["norm_pct"]["Tamas"]
    guna_uri  = guna_pie_uri_norm(s_norm, r_norm, t_norm)
    radar_uri = guna_radar_uri(s_norm, r_norm, t_norm)

    g_dominant = ex["guna"]["dominant"] or ""
    gprof = PLAYBOOK.get("guna_profiles",{}).get(g_dominant, {})
    g_pb = {"mood": gprof.get("mood",""), "shadow": gprof.get("shadow",""), "balance": gprof.get("balance","")}
    g_met = gprof.get("metaphor","")

    p_rows = pillar_T[pillar_T["participant_id"]==pid].copy()
    if "value" not in p_rows.columns and "score" in p_rows.columns: p_rows.rename(columns={"score":"value"}, inplace=True)
    p_rows["pillar"] = p_rows["construct"].astype(str).str.strip().str.upper().str[0]
    pillars_map = {k: {"T": float("nan")} for k in ["L","E","A","D"]}
    for _, r in p_rows.iterrows():
        k = r["pillar"]
        if k in pillars_map: pillars_map[k]["T"] = float(r.get("T", float("nan")))
    ctx_pillars = []
    for k in ["L","E","A","D"]:
        tval = pillars_map[k]["T"]
        if not math.isnan(tval): cls, lab = band_class_and_label(tval)
        else: cls, lab = ("","—")
        ctx_pillars.append({"pillar": k, "T": tval, "badge_class": cls, "badge_label": lab})

    cards = []
    qpb = PLAYBOOK.get("quadrant", {})
    mdf = matrix_xy[matrix_xy["participant_id"]==pid].dropna(subset=["x","y"]).copy()
    for _, row in mdf.iterrows():
        M = str(row["matrix"]); x=float(row["x"]); y=float(row["y"]); qcode=str(row.get("quadrant","")).upper()
        axes = qpb.get(M, {})
        any_cell = next(iter(axes.values()), {})
        labx = any_cell.get("x","X"); laby = any_cell.get("y","Y")
        chart_uri = quadrant_chart_uri(M, x, y, labx, laby)

        def row_or_default(code):
            cell = axes.get(code, {})
            narrative = cell.get("narrative") or {
                "Q1":"High X/High Y","Q2":"Low X/High Y","Q3":"Low/Low","Q4":"High/Low"
            }[code].replace("X",labx).replace("Y",laby)
            signals = cell.get("signals","Reflect on recent decisions affecting "+labx+" and "+laby+".")
            coach   = cell.get("coach","Pick one weekly practice and track outcomes.")
            return {"quadrant": code, "narrative": narrative, "signals": signals, "coach": coach, "highlight": (code==qcode)}

        rows = [row_or_default(code) for code in ("Q1","Q2","Q3","Q4")]
        cards.append({"name": M, "chart_uri": chart_uri, "x": x, "y": y, "quadrant": qcode or "—", "rows": rows})

    ctx = {
        "participant_id": pid,
        "logo_uri": b64_uri(LOGO_PATH),
        "brand": BRAND, "accent": ACCENT, "bg": BG, "card": CARD, "muted": MUTED,
        "overall_T": ex["overall_T"], "overall_raw": ex["overall_raw"],
        "dom_pillar": ex["dom_pillar"] or "—", "dom_one_liner": ex["dom_one_liner"],
        "lead_type_title": ex["lead_type_title"], "lead_type_desc": ex["lead_type_desc"],
        "lead_type_narrative": ex["lead_type_narrative"],
        "lead_type_behaviors": ex["lead_type_behaviors"],
        "lead_type_risks": ex["lead_type_risks"],
        "lead_type_coach": ex["lead_type_coach"],
        "pillar_lines": ex["pillar_lines"], "pillar_insights": ex["pillar_insights"],
        "matrix_strengths": ex["matrix_strengths"], "matrix_watchouts": ex["matrix_watchouts"],
        "matrix_summary": ex["matrix_summary"], "coach_line": ex["coach_line"],
        "guna_dominant": g_dominant, "guna_norm_pct": ex["guna"]["norm_pct"], "guna_raw_pct": ex["guna"]["raw_pct"],
        "guna_T": ex["guna_T"], "guna_pb": g_pb, "guna_metaphor": g_met,
        "guna_img": guna_uri, "guna_radar_img": radar_uri,
        "guna_blurb": ("Dominant Guṇa is identified by the highest share of earned points relative to each Guṇa’s own maximum; "
                       "Leaning normalizes Guṇa shares so S+R+T=100 for comparison. T-scores compare you to a reference group (mean 50, SD 10)."),
        "pillars": ctx_pillars, "lead_bar_img": bar_uri,
        "lead_pillars_blurb": "Use LEAD with your Guṇa profile—express Sattva across L, E, A, D.",
        "matrices": cards,
    }
    return ctx

def render(ctx):
    env = Environment(loader=FileSystemLoader("templates"), autoescape=select_autoescape(["html"]))
    tpl = env.get_template("participant_report.html")
    html = tpl.render(ctx=ctx)
    out_html = os.path.join(OUTDIR, ctx["participant_id"], f"{ctx['participant_id']}_report.html")
    os.makedirs(os.path.dirname(out_html), exist_ok=True)
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
    trait_T, pillar_T, guna_pct, guna_T, guna_bd, matrix_xy = read_scores()
    if pillar_T.empty: raise SystemExit("No pillar_T found. Run tscore.py first.")
    pids = sorted(pd.unique(pillar_T["participant_id"]))
    for pid in pids:
        ctx = build_context(pid, trait_T, pillar_T, guna_pct, guna_T, guna_bd, matrix_xy)
        render(ctx)
