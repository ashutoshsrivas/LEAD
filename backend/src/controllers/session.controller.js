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

export const getSessionByToken = async (req, res) => {
  try {
    const data = await SessionService.getSessionByToken(req.params.token);
    if (!data) {
      return res.status(404).json({ error: 'Session not found for this token' });
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
