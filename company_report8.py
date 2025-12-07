# company_report4.py
# Requires: pandas, numpy, matplotlib, jinja2, pdfkit (wkhtmltopdf), openpyxl, xlsxwriter
import os, json
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from jinja2 import Environment, FileSystemLoader

# -------------- Load norms/config -----------------
with open("norms.json", "r", encoding="utf-8") as f:
    NORM = json.load(f)

BRAND      = NORM["colors"]["brand"]
ACCENT     = NORM["colors"]["accent"]
BG         = NORM["colors"]["background"]
CARD       = NORM["colors"]["card"]
MUTED      = NORM["colors"]["muted"]
PILLAR_TXT = NORM["copy"]["lead_pillars_blurb"]
GUNA_TXT   = NORM["copy"]["guna_blurb"]
GUNA_ROUND = int(NORM["bands"]["guna"]["round"])

# -------------- Paths & template env --------------
XLS = "scores_demo.xlsx"   # produced by tscore.py
OUT = "reports_company"
os.makedirs(OUT, exist_ok=True)

env = Environment(loader=FileSystemLoader("templates"))

# -------------- Helpers (charts) ------------------
def ensure_dir(d):
    os.makedirs(d, exist_ok=True)
    return d

def as_file_uri(path):
    return "file:///" + os.path.abspath(path).replace("\\", "/")

def bar_image(values, labels, title, outdir, fname="bar.png", color=BRAND):
    charts = ensure_dir(os.path.join(outdir, "charts"))
    fig, ax = plt.subplots(figsize=(4.8, 3.2))
    ax.bar(labels, values, color=color)
    ax.set_title(title); ax.set_ylim(0, 100)
    for i, v in enumerate(values):
        ax.text(i, min(v + 2, 99.5), f"{v:.1f}%", ha='center', va='bottom', fontsize=9)
    plt.tight_layout()
    path = os.path.join(charts, fname)
    fig.savefig(path, dpi=160)
    plt.close(fig)
    return as_file_uri(path)

def quadrant_centroid_scatter(matrix_name, points, outdir, fname="quad_scatter.png", color=BRAND):
    charts = ensure_dir(os.path.join(outdir, "charts"))
    fig, ax = plt.subplots(figsize=(3.6, 3.6))
    if len(points) > 0:
        xs = [max(0, min(100, p[0])) for p in points]
        ys = [max(0, min(100, p[1])) for p in points]
        ax.scatter(xs, ys, s=30, color="#999999", alpha=0.4)
        cx, cy = np.nanmean(xs), np.nanmean(ys)
        ax.scatter([cx], [cy], s=180, color=color, edgecolor="white", linewidth=1.2)
    ax.axhline(50, color='gray', linestyle='--', linewidth=0.7)
    ax.axvline(50, color='gray', linestyle='--', linewidth=0.7)
    ax.set_xlim(0, 100); ax.set_ylim(0, 100)
    labx, laby = "X", "Y"
    if " vs " in matrix_name:
        sp = matrix_name.split(" vs ")
        if len(sp) == 2: labx, laby = sp[0], sp[1]
    ax.set_xlabel(labx); ax.set_ylabel(laby)
    ax.set_title(matrix_name + " — centroid")
    plt.tight_layout()
    path = os.path.join(charts, fname)
    fig.savefig(path, dpi=160)
    plt.close(fig)
    return as_file_uri(path)

# -------------- Archetype map per matrix ----------
# Q1 = High X, High Y; Q2 = Low X, High Y; Q3 = Low X, Low Y; Q4 = High X, Low Y
QMAP = {
    "Selflessness vs. Clarity": {
        "Q1": {"name":"Dharmic Steward", "snap":"Trusted, principled, decisive.", "focus":"Codify decisions; mentor successors."},
        "Q2": {"name":"Benevolent Idealist", "snap":"Caring but indecisive.", "focus":"Increase clarity, prioritization, follow-through."},
        "Q3": {"name":"Chaotic Opportunist", "snap":"Reactive, unclear, self-protective.", "focus":"Values reset; define standards; add transparency."},
        "Q4": {"name":"Ambitious Executor", "snap":"High drive, lower empathy.", "focus":"Stakeholder checks; ethics gates; pacing."}
    },
    "Association vs. Openness": {
        "Q1": {"name":"Dharmic Integrator", "snap":"Seeks wise counsel and applies it.", "focus":"Scale coaching; formalize mentorship lattice."},
        "Q2": {"name":"Neutral Adapter", "snap":"Listens more than acts.", "focus":"Set adoption KPIs; convert advice to routines."},
        "Q3": {"name":"Isolated Egoist", "snap":"Closed and poorly networked.", "focus":"Open feedback channels; rotate advisors."},
        "Q4": {"name":"Selective Learner", "snap":"Opens up but slow to apply.", "focus":"Short cycles from insight to decision."}
    },
    "Dharma vs. Desire": {
        "Q1": {"name":"Righteous Conqueror", "snap":"Ambitious yet duty-bound.", "focus":"Guard against overreach; succession & governance."},
        "Q2": {"name":"Dharmic Renunciate", "snap":"Selfless, low ambition.", "focus":"Add goals; build ownership; protect energy."},
        "Q3": {"name":"Destructive Egoist", "snap":"Self-serving, exploitative.", "focus":"Ethics reset, transparency, board oversight."},
        "Q4": {"name":"Dharmic Leader", "snap":"Humility with moral clarity.", "focus":"Increase scale & boldness; codify principles."}
    },
    "Fear vs. Responsibility": {
        "Q1": {"name":"Dharmic Warrior", "snap":"Calm under pressure, acts with duty.", "focus":"Institutionalize crisis playbooks."},
        "Q2": {"name":"Courageous Steward", "snap":"Manages fear, leans into duty.", "focus":"Stretch targets; build moral courage muscles."},
        "Q3": {"name":"Detached Bystander", "snap":"Low fear, low duty; disengaged.", "focus":"Re-contract role; accountability & cadence."},
        "Q4": {"name":"Reluctant Responder", "snap":"Duty felt but fear delays.", "focus":"Shadowing, decision scaffolds, coaching reps."}
    },
    "Knowledge vs. Application": {
        "Q1": {"name":"Dharmic Executor", "snap":"Wise and effective; theory to practice.", "focus":"Scale; apprenticeship; document patterns."},
        "Q2": {"name":"Functional Leader", "snap":"Competent doer, modest reflection.", "focus":"Deepen principles; after-action reviews."},
        "Q3": {"name":"Unaware Drifter", "snap":"Neither learning nor doing well.", "focus":"Capability reset; learning plan; guardrails."},
        "Q4": {"name":"Passive Intellectual", "snap":"Knows but doesn’t apply.", "focus":"Shrink cycle time; pilot & iterate."}
    },
    "Time vs. Collective Orientation": {
        "Q1": {"name":"Dharmic Statesman", "snap":"Long-term + collective good.", "focus":"Invest in patient capital; institutional design."},
        "Q2": {"name":"Short-Term Idealist", "snap":"Collective but short-term.", "focus":"Add strategy horizon; build durable systems."},
        "Q3": {"name":"Opportunistic Exploiter", "snap":"Immediate self-gain.", "focus":"Ethics gates; stakeholder governance."},
        "Q4": {"name":"Detached Planner", "snap":"Long-term but self-centred.", "focus":"Stakeholder co-design; align incentives."}
    }
}

# -------------- Load scored workbook --------------
if not os.path.exists(XLS):
    raise FileNotFoundError(f"Missing {XLS}. Run tscore.py first.")

trait_T   = pd.read_excel(XLS, sheet_name="trait_T")
pillar_T  = pd.read_excel(XLS, sheet_name="pillar_T")
guna_pct  = pd.read_excel(XLS, sheet_name="guna_pct")
matrix_xy = pd.read_excel(XLS, sheet_name="matrix_xy")

# -------------- Company loop ----------------------
companies = trait_T[["participant_id"]].copy()
# Pull company_id if present in raw scoring? If not, assume single org or add a mapping sheet.
# Here we infer company from pillar_T or trait_T if present; else assign "Company-001".
if "company_id" in trait_T.columns:
    comp_map = trait_T[["participant_id","company_id"]].drop_duplicates()
else:
    comp_map = pd.DataFrame({"participant_id": trait_T["participant_id"].unique(),
                             "company_id": ["Company-001"] * trait_T["participant_id"].nunique()})

for company_id, members in comp_map.groupby("company_id"):
    pids = set(members["participant_id"])
    outdir = os.path.join(OUT, f"{company_id}")
    ensure_dir(outdir)

    # Pillars mean (L-E-A-D ordering)
    p = pillar_T[pillar_T["participant_id"].isin(pids)].pivot_table(
        index="construct", values="T", aggfunc="mean"
    )
    # enforce order L,E,A,D, include NaN as 0
    pillars_order = ["L","E","A","D"]
    pillar_rows = []
    for c in pillars_order:
        v = float(p.loc[c]["T"]) if c in p.index else np.nan
        pillar_rows.append({"pillar": c, "T": v})

    # Guna profile (mean %) + textual summary
    g = guna_pct[guna_pct["participant_id"].isin(pids)][["Sattva","Rajas","Tamas"]]
    g_mean = g.mean().round(GUNA_ROUND) if not g.empty else pd.Series({"Sattva":0,"Rajas":0,"Tamas":0})
    # dominant & leaning
    dom = g_mean.idxmax()
    lean = g_mean.drop(dom).idxmax()
    guna_summary = {
        "sattva": float(g_mean.get("Sattva", 0.0)),
        "rajas":  float(g_mean.get("Rajas", 0.0)),
        "tamas":  float(g_mean.get("Tamas", 0.0)),
        "dominant": dom,
        "leaning": lean
    }

    # Per-matrix visuals + archetype tables
    company_mx = matrix_xy[matrix_xy["participant_id"].isin(pids)].dropna(subset=["matrix"])
    matrices = []
    for m in sorted(company_mx["matrix"].dropna().unique()):
        sub = company_mx[company_mx["matrix"] == m].dropna(subset=["x","y"])
        # quadrant percent bars
        q_counts = sub["quadrant"].value_counts(dropna=False).to_dict()
        total = max(1, int(sub.shape[0]))
        qvals = [100.0 * q_counts.get(q, 0) / total for q in ["Q1","Q2","Q3","Q4"]]
        qbar = bar_image(qvals, ["Q1","Q2","Q3","Q4"], f"{m} — Quadrant Distribution", outdir, fname=f"{m}_bars.png")
        # centroid scatter
        pts = list(zip(sub["x"].clip(0,100), sub["y"].clip(0,100)))
        qscatter = quadrant_centroid_scatter(m, pts, outdir, fname=f"{m}_centroid.png")

        # archetype table rows
        arows = []
        qdef = QMAP.get(m, QMAP.get("Selflessness vs. Clarity"))
        for q in ["Q1","Q2","Q3","Q4"]:
            rec = qdef.get(q, {"name":"—","snap":"—","focus":"—"})
            arows.append({
                "quadrant": q,
                "archetype": rec["name"],
                "snapshot":  rec["snap"],
                "focus":     rec["focus"]
            })

        matrices.append({
            "name": m,
            "bar_uri": qbar,
            "scatter_uri": qscatter,
            "archetypes": arows
        })

    # Assemble context
    ctx = {
        "company_id": company_id,
        "brand": BRAND, "accent": ACCENT, "bg": BG, "card": CARD, "muted": MUTED,
        "lead_pillars": pillar_rows,
        "lead_pillars_blurb": PILLAR_TXT,
        "guna": guna_summary,
        "guna_blurb": GUNA_TXT,
        "matrices": matrices,
        "logo_uri": as_file_uri(os.path.join("assets","logo.png"))
    }

    # Render HTML
    tpl = env.get_template("company_report.html")
    html = tpl.render(ctx=ctx)
    html_path = os.path.join(outdir, f"{company_id}_report.html")
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(html)
    print("✓ HTML:", html_path)

    # Optional PDF (needs wkhtmltopdf installed and on PATH)
    try:
        import pdfkit
        pdfkit.from_file(html_path, os.path.join(outdir, f"{company_id}_report.pdf"),
                         options={"enable-local-file-access": "", "quiet": ""})
        print("✓ PDF:", os.path.join(outdir, f"{company_id}_report.pdf"))
    except Exception as e:
        print("! PDF skipped:", e)
