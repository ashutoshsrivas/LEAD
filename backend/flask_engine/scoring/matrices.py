def compute_matrix(df, matrix_name, x_trait, y_trait):
    x_val = df.loc[df["trait"] == x_trait, "scaled"].mean()
    y_val = df.loc[df["trait"] == y_trait, "scaled"].mean()

    # Determine quadrant based on your logic
    quadrant = None
    if x_val >= 50 and y_val >= 50: quadrant = "Q1"
    elif x_val < 50 and y_val >= 50: quadrant = "Q2"
    elif x_val < 50 and y_val < 50: quadrant = "Q3"
    else: quadrant = "Q4"

    return {
        "name": matrix_name,
        "x": x_val,
        "y": y_val,
        "quadrant": quadrant
    }
