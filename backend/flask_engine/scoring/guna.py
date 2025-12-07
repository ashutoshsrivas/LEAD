def compute_guna(df):
    sattva = df[df["trait"] == "Sattva"]["scaled"].mean()
    rajas = df[df["trait"] == "Rajas"]["scaled"].mean()
    tamas = df[df["trait"] == "Tamas"]["scaled"].mean()

    total = sattva + rajas + tamas
    return {
        "T": {
            "Sattva": sattva,
            "Rajas": rajas,
            "Tamas": tamas,
        },
        "NormPct": {
            "Sattva": sattva / total * 100 if total else 0,
            "Rajas": rajas / total * 100 if total else 0,
            "Tamas": tamas / total * 100 if total else 0,
        }
    }
