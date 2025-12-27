export interface LeadPillarDefinition {
  code: string;
  fullName: string;
  meaning: string;
  guidance: string;
}

export const LEAD_PILLARS: Record<string, LeadPillarDefinition> = {
  L: {
    code: "L",
    fullName: "Loka-saṅgraha",
    meaning:
      "Purpose is expanding, supported by healthy habits. Strengthen clarity through quarterly resets and sharper prioritization.",
    guidance:
      "Strengthen clarity through quarterly resets and sharper prioritization.",
  },
  E: {
    code: "E",
    fullName: "Equanimity",
    meaning:
      "You recover well from stress but sometimes delay responses. Define escalation cues and conduct 'pre-fire drills' to maintain speed with calm.",
    guidance:
      "Define escalation cues and conduct 'pre-fire drills' to maintain speed with calm.",
  },
  A: {
    code: "A",
    fullName: "Association",
    meaning:
      "Curiosity drives learning, though unfiltered inputs may create noise. Do a source audit and form a trusted mentor panel to refine discernment.",
    guidance:
      "Do a source audit and form a trusted mentor panel to refine discernment.",
  },
  D: {
    code: "D",
    fullName: "Dharma",
    meaning:
      "Fair and process-driven, though complex decisions may slow. Practice gray-zone simulations and build a principles playbook to act with clarity and courage.",
    guidance:
      "Practice gray-zone simulations and build a principles playbook to act with clarity and courage.",
  },
};

export function getLeadPillar(code: string): LeadPillarDefinition | undefined {
  return LEAD_PILLARS[code];
}
