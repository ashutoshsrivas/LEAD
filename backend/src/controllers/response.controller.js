import * as ResponseService from "../services/response.service.js";

export const saveResponses = async (req, res) => {
  try {
    const data = await ResponseService.saveResponses(req.body);
    res.json({ status: "ok", inserted: data.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
