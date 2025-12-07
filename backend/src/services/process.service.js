import { db } from "../config/db.js";
import axios from "axios";

export const processParticipant = async (participant_id) => {

  // Get participant info
  const [[participant]] = await db.query("SELECT * FROM participants WHERE participant_id = ?", [participant_id]);

  // Get responses
  const [responses] = await db.query("SELECT * FROM responses WHERE participant_id = ?", [participant_id]);

  // Get questions
  const [questions] = await db.query("SELECT * FROM questions");

  // Call Flask
  const flask = await axios.post("http://localhost:4000/process", {
    participant,
    responses,
    questions
  });

  const result = flask.data;

  await db.query(
    "INSERT INTO results (participant_id, result_json) VALUES (?, ?)",
    [participant_id, JSON.stringify(result)]
  );

  return result;
};
