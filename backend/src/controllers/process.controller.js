import * as ProcessService from "../services/process.service.js";

export const processParticipant = async (req, res) => {
  try {
    const data = await ProcessService.processParticipant(req.params.participant_id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
