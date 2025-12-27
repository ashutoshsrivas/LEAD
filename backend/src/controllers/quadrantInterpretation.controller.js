import * as QuadrantInterpretationService from "../services/quadrantInterpretation.service.js";

export const getQuadrantInterpretation = async (req, res) => {
  try {
    const { matrix, quadrant } = req.body || {};
    if (!matrix || !quadrant) {
      return res.status(400).json({ error: "matrix and quadrant are required" });
    }

    const row = await QuadrantInterpretationService.findQuadrantInterpretation({ matrix, quadrant });
    if (!row) return res.status(404).json({ error: "No matching quadrant interpretation found" });
    return res.json(row);
  } catch (err) {
    console.error("quadrant interpretation lookup error", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
