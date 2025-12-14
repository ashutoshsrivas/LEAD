import * as ResultService from "../services/result.service.js";

export const listResults = async (req, res) => {
  try {
    const session_id = req.query.session_id;
    const data = await ResultService.listResults(session_id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getResult = async (req, res) => {
  try {
    const participant_id = req.params.participant_id;
    const data = await ResultService.getResultByParticipant(participant_id);
    if (!data) return res.status(404).json({ error: 'Result not found' });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
