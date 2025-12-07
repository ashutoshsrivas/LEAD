from scoring.metrics import t_score
from scoring.matrices import compute_matrix
from scoring.guna import compute_guna
from scoring.pillars import compute_pillars
from scoring.insights import matrix_insights

def build_context(df, participant):

    # Compute pillar scores
    pillars = compute_pillars(df)

    # Overall score
    overall_raw = df["scaled"].mean()
    overall_T = t_score(df["scaled"])

    # Matrices (same 6 from your existing template)
    matrices = [
        compute_matrix(df, "Selflessness vs. Clarity", "Selflessness", "Clarity"),
        compute_matrix(df, "Time vs. Collective", "Time", "Collective"),
        compute_matrix(df, "Knowledge vs. Application", "Knowledge", "Application"),
        compute_matrix(df, "Association vs. Openness", "Association", "Openness"),
        compute_matrix(df, "Fear vs. Responsibility", "Fear", "Responsibility"),
        compute_matrix(df, "Dharma vs. Desire", "Dharma", "Desire"),
    ]

    # Matrix insights
    strengths, risks = matrix_insights(matrices)

    # Guna
    guna = compute_guna(df)

    # Build final context
    ctx = {
        "participant_id": participant["participant_id"],
        "name": participant["name"],
        "pillars": pillars,
        "overall_T": overall_T,
        "overall_raw": overall_raw,
        "matrices": matrices,
        "matrix_strengths": strengths,
        "matrix_watchouts": risks,
        "guna_T": guna["T"],
        "guna_norm_pct": guna["NormPct"],
    }

    return ctx
