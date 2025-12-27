export interface BandDefinition {
  min: number;
  max: number;
  label: string;
  meaning: string;
  coach: string;
}

export const BAND_TABLE: BandDefinition[] = [
  {
    min: 70,
    max: 100,
    label: "Transformational",
    meaning:
      "Exceptional, role-model level. Consistently demonstrates the construct even under stress.",
    coach:
      "Scale your positive deviance—codify routines, mentor others, and protect time for reflection.",
  },
  {
    min: 60,
    max: 69.99,
    label: "Strength",
    meaning:
      "Above average, reliable performance across contexts.",
    coach:
      "Sustain via habits. Identify conditions that derail you and build pre-commitments.",
  },
  {
    min: 45,
    max: 59.99,
    label: "Balanced Zone",
    meaning:
      "Within typical range. Stable but may not be distinctive.",
    coach:
      "Choose one micro-improvement and track it weekly. Seek one stretch assignment.",
  },
  {
    min: 35,
    max: 44.99,
    label: "Development Zone",
    meaning:
      "Below desired level; risk of inconsistent impact.",
    coach:
      "Add structure: cue-routine-reward loops, coaching feedback, and peer accountability.",
  },
  {
    min: 0,
    max: 34.99,
    label: "Risk / Blind Spot",
    meaning:
      "Significant derailment risk; likely visible to others.",
    coach:
      "Prioritize this area in a 90-day plan. Practice daily, review weekly, and escalate to sponsorship.",
  },
];

export function getBand(score: number) {
  return BAND_TABLE.find((b) => score >= b.min && score <= b.max);
}
