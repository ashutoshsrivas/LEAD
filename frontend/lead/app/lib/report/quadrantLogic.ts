// Quadrant interpretation logic for matrix analysis

export interface QuadrantLabel {
  code: string;
  title: string;
  description: string;
  x: string;
  y: string;
}

// Default quadrant definitions (non-interpretive placeholders)
const DEFAULT_QUADRANTS: Record<string, QuadrantLabel> = {
  Q1: {
    code: "Q1",
    title: "Quadrant Q1",
    description: "",
    x: "X",
    y: "Y",
  },
  Q2: {
    code: "Q2",
    title: "Quadrant Q2",
    description: "",
    x: "X",
    y: "Y",
  },
  Q3: {
    code: "Q3",
    title: "Quadrant Q3",
    description: "",
    x: "X",
    y: "Y",
  },
  Q4: {
    code: "Q4",
    title: "Quadrant Q4",
    description: "",
    x: "X",
    y: "Y",
  },
};

export function getQuadrantLabel(quadrant: string): QuadrantLabel {
  return DEFAULT_QUADRANTS[quadrant] || DEFAULT_QUADRANTS.Q1;
}

export function getQuadrantColor(quadrant: string): string {
  const colors: Record<string, string> = {
    Q1: "#10b981", // green - strength
    Q2: "#f59e0b", // amber - developing
    Q3: "#ef4444", // red - development area
    Q4: "#f59e0b", // amber - developing
  };
  return colors[quadrant] || "#6b7280";
}

export function getQuadrantDescription(quadrant: string): string {
  const descriptions: Record<string, string> = {
    Q1: "",
    Q2: "",
    Q3: "",
    Q4: "",
  };
  return descriptions[quadrant] || "";
}
