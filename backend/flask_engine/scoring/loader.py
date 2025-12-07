import pandas as pd

def prepare_data(responses, questions):

    df_r = pd.DataFrame(responses)
    df_q = pd.DataFrame(questions)

    df = df_r.merge(df_q, left_on="question_id", right_on="item_id", how="left")

    # Apply reverse scoring
    df["norm"] = df.apply(
        lambda r: (6 - r["answer_value"]) if r["reverse"] == 1 else r["answer_value"],
        axis=1
    )

    # Convert to 0–100 scale
    df["scaled"] = (df["norm"] - df["min"]) / (df["max"] - df["min"]) * 100

    return df
