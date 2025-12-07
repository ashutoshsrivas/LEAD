def compute_pillars(df):
    pillars = {}
    for p in ["L", "E", "A", "D"]:
        pillars[p] = df[df["lead_pillar"].str.contains(p)]["scaled"].mean()
    return pillars
