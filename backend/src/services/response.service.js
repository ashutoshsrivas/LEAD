import { db } from "../config/db.js";

export const saveResponses = async ({ participant_id, responses }) => {
  
  const inserted = [];

  for (const r of responses) {
    const [row] = await db.query(
      "INSERT INTO responses (participant_id, question_id, answer_value) VALUES (?, ?, ?)",
      [participant_id, r.question_id, r.answer_value]
    );
    inserted.push(row.insertId);
  }

  return inserted;
};
