import * as SessionService from "../services/session.service.js";

export const createSession = async (req, res) => {
  try {
    const data = await SessionService.createSession(req.body);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const listSessions = async (req, res) => {
  try {
    const data = await SessionService.listSessions();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getSession = async (req, res) => {
  try {
    const data = await SessionService.getSession(req.params.session_id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
