// Guna detection logic - determines dominant guna mix and profile details
// Based on normalized percentages of Sattva, Rajas, and Tamas

export interface GunaProfile {
  label: string;
  rule_hint: string;
  metaphor: string;
  remarks: string;
  rec: string;
}

export function detectGunaCode(guna: Record<string, number>): string {
  const sattva = guna["Sattva"] || 0;
  const rajas = guna["Rajas"] || 0;
  const tamas = guna["Tamas"] || 0;

  const total = sattva + rajas + tamas;
  if (total === 0) return "Unknown";

  const sattvaPercent = (sattva / total) * 100;
  const rajasPercent = (rajas / total) * 100;
  const tamasPercent = (tamas / total) * 100;

  return determineMix(sattvaPercent, rajasPercent, tamasPercent);
}

export function detectGuna(guna: Record<string, number>): GunaProfile {
  const sattva = guna["Sattva"] || 0;
  const rajas = guna["Rajas"] || 0;
  const tamas = guna["Tamas"] || 0;

  // Normalize to percentages if needed
  const total = sattva + rajas + tamas;
  if (total === 0) {
    return getGunaProfile("Unknown");
  }

  const sattvaPercent = (sattva / total) * 100;
  const rajasPercent = (rajas / total) * 100;
  const tamasPercent = (tamas / total) * 100;

  // Determine dominant mix using the same logic as backend
  const mix = determineMix(sattvaPercent, rajasPercent, tamasPercent);

  return getGunaProfile(mix);
}

function determineMix(
  sattva: number,
  rajas: number,
  tamas: number
): string {
  const arr = sorted([
    { label: "Sattva", value: sattva },
    { label: "Rajas", value: rajas },
    { label: "Tamas", value: tamas },
  ]);

  const top = arr[0];
  const second = arr[1];
  const third = arr[2];

  // If all three are close (within 7%), it's a balanced mix
  if (top.value - third.value <= 7.0) {
    return "SRT";
  }

  // If top two are close and both >= 30%, it's a pair
  if (
    Math.abs(top.value - second.value) <= 7.0 &&
    top.value >= 30.0 &&
    second.value >= 30.0
  ) {
    const pair = sortedPair(top.label, second.label);
    return pair;
  }

  // Otherwise, it's the dominant one
  return top.label;
}

function sorted(
  arr: Array<{ label: string; value: number }>
): Array<{ label: string; value: number }> {
  return [...arr].sort((a, b) => b.value - a.value);
}

function sortedPair(a: string, b: string): string {
  const codes = {
    Sattva: "S",
    Rajas: "R",
    Tamas: "T",
  } as Record<string, string>;

  const pair = [codes[a], codes[b]].sort().join("");
  const pairMap: Record<string, string> = {
    RS: "SR",
    TS: "ST",
    TR: "RT",
  };

  return pairMap[pair] || pair;
}

function getGunaProfile(mix: string): GunaProfile {
  // Profile definitions based on the Guṇa system
  // These should match the backend's playbook profiles

  const profiles: Record<string, GunaProfile> = {
    Sattva: {
      label: "Sattva (Harmony & Light)",
      rule_hint:
        "Predominance of clarity, equilibrium, and constructive energy",
      metaphor: "Clear Sky — Brightness, clarity, and expansiveness",
      remarks:
        "Sattvic nature seeks knowledge, balance, and growth. It brings peace and purposefulness to leadership.",
      rec: "Sustain your clarity and share it with others. Use wisdom to guide decisions and cultivate harmony in your teams.",
    },
    Rajas: {
      label: "Rajas (Activity & Passion)",
      rule_hint: "Predominance of action, energy, and dynamic momentum",
      metaphor: "Fire — Heat, movement, and transformative power",
      remarks:
        "Rajasic nature drives ambition, initiative, and change. It brings momentum but can create intensity and imbalance.",
      rec: "Channel your energy toward meaningful goals. Pair action with reflection to maintain balance and avoid burnout.",
    },
    Tamas: {
      label: "Tamas (Inertia & Darkness)",
      rule_hint:
        "Predominance of heaviness, resistance, and lack of clarity",
      metaphor:
        "Dense Cloud — Heaviness, obscurity, and resistance to change",
      remarks:
        "Tamasic nature brings groundedness but can lead to inertia, resistance, or lack of vision.",
      rec: "Energize yourself through movement, learning, and engagement. Break inertia and seek clarity on your direction.",
    },
    SR: {
      label: "Sattva-Rajas Balance",
      rule_hint:
        "Blend of harmony and action — wisdom paired with dynamic execution",
      metaphor: "Sunrise — Light emerging with warmth and movement",
      remarks:
        "This blend combines clarity of vision (Sattva) with drive to execute (Rajas). It's a powerful combination for leadership.",
      rec: "Leverage your ability to think clearly and act decisively. Continue to ground decisions in wisdom.",
    },
    ST: {
      label: "Sattva-Tamas Balance",
      rule_hint:
        "Blend of clarity and groundedness — understanding tempered by stability",
      metaphor: "Mountain Peak — Clear vision grounded in solid foundation",
      remarks:
        "This blend offers wisdom with stability. It can bring steadiness but may lack the energy for rapid change.",
      rec: "Build on your grounded wisdom. Add intentional energy and initiative to move ideas forward.",
    },
    RT: {
      label: "Rajas-Tamas Balance",
      rule_hint:
        "Blend of action and resistance — high energy but sometimes unfocused",
      metaphor: "Storm — Powerful energy with unclear direction",
      remarks:
        "This blend brings action and momentum but may lack clarity. Energy can feel scattered or overwhelming.",
      rec: "Ground your energy with clear goals and periods of reflection. Seek wisdom to direct your momentum purposefully.",
    },
    SRT: {
      label: "Balanced Trinity",
      rule_hint:
        "All three Guṇas in near-equal balance — versatility and adaptability",
      metaphor: "Still Water Reflecting All — Responsive to all conditions",
      remarks:
        "Rare and valuable balance. You can access clarity, action, and groundedness as needed. Adapt naturally to different contexts.",
      rec: "Cultivate awareness of which quality each situation calls for. Your natural flexibility is a strength.",
    },
    Unknown: {
      label: "Energy Profile",
      rule_hint: "Insufficient data to determine dominant Guṇa",
      metaphor: "Emerging Light",
      remarks: "Your energy profile is still forming. Engage more to reveal your natural patterns.",
      rec: "Continue to explore and reflect on your natural tendencies and preferences.",
    },
  };

  return profiles[mix] || profiles.Unknown;
}
