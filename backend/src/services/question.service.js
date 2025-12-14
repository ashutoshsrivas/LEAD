import { db } from "../config/db.js";

export const listQuestions = async () => {
  // The questions table uses `item_id` and `text` columns.
  // Alias them to `question_id` and `question_text` so frontend expects work unchanged.
  const [rows] = await db.query(
    `SELECT
       item_id AS question_id,
       text AS question_text,
       matrix_id,
       trait,
       \`min\`,
       \`max\`,
       \`reverse\`,
       weight,
       lead_pillar,
       lead_quadrant_hint
     FROM questions
     ORDER BY item_id ASC`
  );
  return rows;
};
