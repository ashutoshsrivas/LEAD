import { db } from "../config/db.js";

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
  return row;
};
