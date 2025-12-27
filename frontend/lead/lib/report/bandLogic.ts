export interface Band {
  label: string;
  meaning: string;
  coach: string;
}

export function getBand(score: number): Band | null {
  // Define your band thresholds and mappings
  if (score >= 80) {
    return {
      label: "Excellent",
      meaning: "Strong performance across all dimensions",
      coach: "Maintain momentum and mentor others"
    };
  } else if (score >= 60) {
    return {
      label: "Good",
      meaning: "Solid performance with room for growth",
      coach: "Focus on developing key competencies"
    };
  } else if (score >= 40) {
    return {
      label: "Developing",
      meaning: "Performance shows potential but needs improvement",
      coach: "Create an action plan for targeted development"
    };
  } else {
    return {
      label: "Needs Support",
      meaning: "Significant support required",
      coach: "Establish regular check-ins and clear milestones"
    };
  }
}
