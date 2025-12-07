import * as ParticipantService from "../services/participant.service.js";

export const addParticipant = async (req, res) => {
  try {
    const data = await ParticipantService.addParticipant(req.body);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const listParticipants = async (req, res) => {
  try {
    const data = await ParticipantService.listParticipants(req.params.session_id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
