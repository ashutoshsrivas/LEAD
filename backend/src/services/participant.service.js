import { db } from "../config/db.js";

export const addParticipant = async ({ session_id, name, email, phone, designation, department, company }) => {

  const [rows] = await db.query(
    "INSERT INTO participants (session_id, name, email, phone, designation, department, company) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [session_id, name, email, phone, designation, department, company]
  );

  return { participant_id: rows.insertId };
};

export const listParticipants = async (session_id) => {
  const [rows] = await db.query(
    "SELECT * FROM participants WHERE session_id = ? ORDER BY participant_id DESC",
    [session_id]
  );
  return rows;
};
