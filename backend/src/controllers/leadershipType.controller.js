import * as LeadershipTypeService from "../services/leadershipType.service.js";

export const getLeadershipType = async (req, res) => {
  try {
    const { guna, pillar, profile_level } = req.body || {};
    if (!guna || !pillar || !profile_level) {
      return res.status(400).json({ error: "guna, pillar, and profile_level are required" });
    }

    const row = await LeadershipTypeService.findLeadershipType({ guna, pillar, profile_level });
    if (!row) return res.status(404).json({ error: "No matching leadership type found" });
    return res.json(row);
  } catch (err) {
    console.error("leadershipType lookup error", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
