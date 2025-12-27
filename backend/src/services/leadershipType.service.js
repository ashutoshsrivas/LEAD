import { db } from "../config/db.js";

export const findLeadershipType = async ({ guna, pillar, profile_level }) => {
  const [rows] = await db.query(
    `SELECT
        TRIM(\`guna\`) AS guna,
        TRIM(\` pillar\`) AS pillar,
        TRIM(\`Profile_level\`) AS profile_level,
        \` Insight\` AS Insight,
        \` behaviors\` AS behaviors,
        \` risks\` AS risks,
        \` Focus\` AS Focus
     FROM leadership_type
     WHERE TRIM(\`guna\`) = TRIM(?)
       AND TRIM(\` pillar\`) = TRIM(?)
       AND TRIM(\`Profile_level\`) = TRIM(?)
     LIMIT 1`,
    [guna, pillar, profile_level]
  );

  return rows[0];
};
