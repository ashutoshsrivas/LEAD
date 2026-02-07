import { db } from "../config/db.js";

const BAND_RULES = [
  { label: "Transformational", min: 70 },
  { label: "Strength", min: 60 },
  { label: "Balanced", min: 45 },
  { label: "Development", min: 35 },
  { label: "Risk", min: 0 },
];

const mapGunaKey = (key) => {
  if (!key) return null;
  const normalized = key.toLowerCase();
  if (normalized.startsWith("sattva")) return "S";
  if (normalized.startsWith("rajas")) return "R";
  if (normalized.startsWith("tamas")) return "T";
  return key.trim().charAt(0).toUpperCase();
};

const computeDominantGuna = (guna_pct = {}) => {
  const entries = Object.entries(guna_pct).filter(([, v]) => typeof v === "number");
  if (!entries.length) return null;
  const sorted = entries.sort((a, b) => b[1] - a[1]);
  const [first, second, third] = sorted;
  const primary = mapGunaKey(first[0]);
  if (!primary) return null;

  // If the second is within 5 points of the first, treat as combined; same for third.
  if (second && Math.abs(first[1] - second[1]) <= 5) {
    const secondCode = mapGunaKey(second[0]);
    if (third && Math.abs(second[1] - third[1]) <= 5 && Math.abs(first[1] - third[1]) <= 5) {
      const thirdCode = mapGunaKey(third[0]);
      return [primary, secondCode, thirdCode].filter(Boolean).join("");
    }
    return [primary, secondCode].filter(Boolean).join("");
  }

  return primary;
};

const computeBand = (score) => {
  if (typeof score !== "number") return null;
  const rule = BAND_RULES.find((r) => score >= r.min);
  return rule?.label || null;
};

const fetchExecutiveSummary = async (dominant_guna, overall_band) => {
  if (!dominant_guna || !overall_band) return null;
  const [rows] = await db.query(
    `SELECT TRIM(dominant_guna) as dominant_guna,
            TRIM(\` overall_band\`) as overall_band,
            TRIM(\` leadership_profile\`) as leadership_profile,
            TRIM(\`Summary\`) as summary
     FROM executivesummary
     WHERE TRIM(dominant_guna) = ? AND TRIM(\` overall_band\`) = ?
     LIMIT 1`,
    [dominant_guna, overall_band]
  );
  return rows?.[0] || null;
};

export const listResults = async (session_id) => {
  if (session_id) {
    const [rows] = await db.query(
      `SELECT r.*, p.name as participant_name, p.session_id, s.session_name, s.company_name
       FROM results r
       JOIN participants p ON r.participant_id = p.participant_id
       JOIN sessions s ON p.session_id = s.session_id
       WHERE p.session_id = ?
       ORDER BY r.result_id DESC`,
      [session_id]
    );
    return rows;
  }
  const [rows] = await db.query(
    `SELECT r.*, p.name as participant_name, p.session_id, s.session_name, s.company_name
     FROM results r
     JOIN participants p ON r.participant_id = p.participant_id
     JOIN sessions s ON p.session_id = s.session_id
     ORDER BY r.result_id DESC`
  );
  return rows;
};

export const getResultByParticipant = async (participant_id) => {
  const [[row]] = await db.query(
    `SELECT r.*, p.name as participant_name, p.session_id, s.session_name, s.company_name
     FROM results r
     JOIN participants p ON r.participant_id = p.participant_id
     JOIN sessions s ON p.session_id = s.session_id
     WHERE r.participant_id = ? LIMIT 1`,
    [participant_id]
  );
  if (!row) return row;

  let parsed;
  try {
    parsed = typeof row.result_json === "string" ? JSON.parse(row.result_json) : row.result_json;
  } catch (err) {
    parsed = null;
  }

  const dominant_guna = computeDominantGuna(parsed?.guna_norm_pct);
  const overall_band = computeBand(parsed?.overall_T ?? parsed?.overall_raw);
  const executive_summary = await fetchExecutiveSummary(dominant_guna, overall_band);

  return {
    ...row,
    dominant_guna,
    overall_band,
    executive_summary,
  };
};
