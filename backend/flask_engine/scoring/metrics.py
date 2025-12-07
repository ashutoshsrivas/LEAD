import numpy as np

def t_score(series):
    if len(series) == 0:
        return np.nan
    mean = np.mean(series)
    sd = np.std(series)
    return 50 + 10 * ((mean - 50) / (sd if sd else 1))
