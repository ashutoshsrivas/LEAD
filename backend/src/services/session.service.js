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
