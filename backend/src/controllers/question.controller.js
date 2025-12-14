import * as QuestionService from "../services/question.service.js";

export const listQuestions = async (req, res) => {
  try {
    const data = await QuestionService.listQuestions();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
