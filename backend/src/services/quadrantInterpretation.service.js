import { db } from "../config/db.js";

export const findQuadrantInterpretation = async ({ matrix, quadrant }) => {
  const [rows] = await db.query(
    `SELECT
        TRIM(\`matrix\`) AS matrix,
        TRIM(\`x_axis\`) AS x_axis,
        TRIM(\`y_axis\`) AS y_axis,
        TRIM(\`quadrant\`) AS quadrant_label,
        \`narrative\` AS narrative,
        \`Development Focus:\` AS development_focus
     FROM \`quadrant-interpretation\`
     WHERE LOWER(TRIM(\`matrix\`)) LIKE CONCAT(LOWER(TRIM(?)), '%')
       AND TRIM(\`quadrant\`) LIKE CONCAT(TRIM(?), '%')
     LIMIT 1`,
    [matrix, quadrant]
  );

  return rows[0];
};
