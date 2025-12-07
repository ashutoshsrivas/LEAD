def matrix_insights(matrices):
    strengths = []
    risks = []
    for m in matrices:
        if m["quadrant"] == "Q1":
            strengths.append(f"{m['name']} — High Strength")
        else:
            risks.append(f"{m['name']} — Development Area")
    return strengths, risks
