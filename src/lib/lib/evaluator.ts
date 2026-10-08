export type PromptParts = {
  role: string;
  goal: string;
  context: string;
  constraints: string;
  output: string;
  criteria: string;
};

export type Score = {
  total: number;
  grade: "Excellent" | "Strong" | "Needs work";
  breakdown: Array<{
    key: keyof PromptParts;
    label: string;
    score: number;
    note: string;
  }>;
};

const rules: Array<{
  key: keyof PromptParts;
  label: string;
  patterns: RegExp[];
  weight: number;
}> = [
  {
    key: "role",
    label: "Role",
    patterns: [/\b(you are|act as|role|expert|assistant)\b/i],
    weight: 16,
  },
  {
    key: "goal",
    label: "Goal",
    patterns: [
      /\b(create|write|generate|analy[sz]e|build|design|explain|produce|goal|objective)\b/i,
    ],
    weight: 20,
  },
  {
    key: "context",
    label: "Context",
    patterns: [
      /\b(context|background|audience|product|customer|scenario|given)\b/i,
    ],
    weight: 16,
  },
  {
    key: "constraints",
    label: "Constraints",
    patterns: [
      /\b(must|don't|do not|avoid|limit|max|minimum|constraint|only|format)\b/i,
    ],
    weight: 16,
  },
  {
    key: "output",
    label: "Output",
    patterns: [
      /\b(output|return|respond|format|json|table|bullets|steps|structure)\b/i,
    ],
    weight: 16,
  },
  {
    key: "criteria",
    label: "Criteria",
    patterns: [
      /\b(criteria|quality|success|accurate|verify|check|edge case|rubric|test)\b/i,
    ],
    weight: 16,
  },
];

export function evaluatePrompt(prompt: string): Score {
  const normalized = prompt.trim();

  const breakdown = rules.map((rule) => {
    const hit = rule.patterns.some((pattern) =>
      pattern.test(normalized),
    );

    const score =
      normalized.length === 0
        ? 0
        : hit
          ? rule.weight
          : Math.max(0, rule.weight - 8);

    const note = hit
      ? "Observable signal detected."
      : "Add an explicit signal for this component.";

    return {
      key: rule.key,
      label: rule.label,
      score,
      note,
    };
  });

  const total = Math.round(
    breakdown.reduce((sum, item) => sum + item.score, 0),
  );

  const grade =
    total >= 85
      ? "Excellent"
      : total >= 65
        ? "Strong"
        : "Needs work";

  return {
    total,
    grade,
    breakdown,
  };
}

export function extractParts(prompt: string): PromptParts {
  const lines = prompt.split("\n");

  const valueAfter = (labels: string[]) => {
    const line = lines.find((item) =>
      labels.some((label) =>
        item.toLowerCase().startsWith(label),
      ),
    );

    return line
      ? line.split(":").slice(1).join(":").trim()
      : "";
  };

  return {
    role: valueAfter(["role:", "you are:"]),
    goal: valueAfter(["goal:", "task:", "objective:"]),
    context: valueAfter(["context:", "background:"]),
    constraints: valueAfter(["constraints:", "rules:"]),
    output: valueAfter(["output:", "format:"]),
    criteria: valueAfter(["criteria:", "success:"]),
  };
}

export function exportPromptRecord(prompt: string) {
  return {
    schema: "promptforge.prompt.v2",
    exportedAt: new Date().toISOString(),
    prompt,
    evaluation: evaluatePrompt(prompt),
  };
}
