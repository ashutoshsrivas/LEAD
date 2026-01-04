import { db } from "../config/db.js";
import crypto from "crypto";

export const createSession = async ({ session_name, session_description, company_name }) => {
  
  const [rows] = await db.query(
    "INSERT INTO sessions (session_name, session_description, company_name) VALUES (?, ?, ?)",
    [session_name, session_description, company_name]
  );

  const session_id = rows.insertId;

  // Generate link token
  const link_token = crypto.randomBytes(12).toString("hex");

  await db.query(
    "INSERT INTO session_links (session_id, link_token) VALUES (?, ?)",
    [session_id, link_token]
  );

  // return the full session record (includes link_token via left join)
  return await getSession(session_id);
};

export const listSessions = async () => {
  // include link_token from session_links when available
  const [rows] = await db.query(
    `SELECT s.*, l.link_token
     FROM sessions s
     LEFT JOIN session_links l ON s.session_id = l.session_id
     ORDER BY s.session_id DESC`
  );
  return rows;
};

export const getSession = async (session_id) => {
  const [rows] = await db.query(
    `SELECT s.*, l.link_token
     FROM sessions s
     LEFT JOIN session_links l ON s.session_id = l.session_id
     WHERE s.session_id = ? LIMIT 1`,
    [session_id]
  );
  return rows[0];
};

export const getSessionByToken = async (token) => {
  const [rows] = await db.query(
    "SELECT s.* FROM sessions s JOIN session_links l ON s.session_id = l.session_id WHERE l.link_token = ? LIMIT 1",
    [token]
  );
  return rows[0];
};

export const updateSession = async (session_id, { session_name, session_description, company_name, archived }) => {
  // Ensure archived column exists (best-effort)
  try {
    await db.query("ALTER TABLE sessions ADD COLUMN IF NOT EXISTS archived TINYINT DEFAULT 0");
  } catch (e) {
    // ignore if not supported
  }

  const updates = [];
  const params = [];
  if (typeof session_name !== 'undefined') { updates.push('session_name = ?'); params.push(session_name); }
  if (typeof session_description !== 'undefined') { updates.push('session_description = ?'); params.push(session_description); }
  if (typeof company_name !== 'undefined') { updates.push('company_name = ?'); params.push(company_name); }
  if (typeof archived !== 'undefined') { updates.push('archived = ?'); params.push(archived ? 1 : 0); }
  if (updates.length === 0) return await getSession(session_id);

  const sql = `UPDATE sessions SET ${updates.join(', ')} WHERE session_id = ?`;
  params.push(session_id);
  await db.query(sql, params);
  return await getSession(session_id);
};

export const exportSession = async (session_id) => {
  // fetch session
  const session = await getSession(session_id);

  // fetch participants and their responses for the session
  const [rows] = await db.query(
    `SELECT p.*, r.response_id, r.question_id, r.answer_value
     FROM participants p
     LEFT JOIN responses r ON p.participant_id = r.participant_id
     WHERE p.session_id = ?
     ORDER BY p.participant_id DESC`,
    [session_id]
  );

  // group responses by participant
  const participantsMap = {};
  rows.forEach((row) => {
    const pid = row.participant_id;
    participantsMap[pid] = participantsMap[pid] || { participant_id: pid, name: row.name, email: row.email, phone: row.phone, designation: row.designation, department: row.department, company: row.company, responses: [] };
    if (row.response_id) {
      participantsMap[pid].responses.push({ question_id: row.question_id, answer_value: row.answer_value });
    }
  });

  const participants = Object.values(participantsMap);

  return { session, participants };
};
