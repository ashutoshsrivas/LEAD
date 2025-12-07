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

  return { session_id, link_token };
};

export const listSessions = async () => {
  const [rows] = await db.query("SELECT * FROM sessions ORDER BY session_id DESC");
  return rows;
};

export const getSession = async (session_id) => {
  const [rows] = await db.query("SELECT * FROM sessions WHERE session_id = ?", [session_id]);
  return rows[0];
};
