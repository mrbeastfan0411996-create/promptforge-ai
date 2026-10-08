export type Template = {
  id: string;
  title: string;
  category: string;
  description: string;
  prompt: string;
};

export const templates: Template[] = [
  {
    id: "ugc-ad",
    title: "UGC Ad Director",
    category: "Marketing",
    description:
      "Generate a short-form product ad with strict visual and dialogue continuity.",
    prompt: `Role: You are a senior UGC advertising director.
Goal: Create a 30-second vertical product advertisement for [PRODUCT].
Context: Audience is [AUDIENCE]. Product benefit is [BENEFIT]. Platform is Instagram Reels.
Constraints: Use 3 scenes of 10 seconds. Keep product geometry, identity, wardrobe and location consistent. No glitches, duplicated dialogue, stuttering, text artifacts or impossible hand motion.
Output: Return a scene-by-scene production plan with visual direction, camera movement, spoken dialogue and on-screen text.
Criteria: The result must be realistic, concise, conversion-focused and production-ready.`,
  },
  {
    id: "research",
    title: "Research Analyst",
    category: "Research",
    description:
      "Turn a broad question into a structured, evidence-aware research brief.",
    prompt: `Role: You are a rigorous research analyst.
Goal: Analyze [QUESTION] and produce a decision-ready brief.
Context: The audience is [AUDIENCE]. The decision deadline is [DATE]. Prioritize primary or authoritative evidence.
Constraints: Separate facts, assumptions and inferences. Flag uncertainty. Do not invent citations or statistics.
Output: Return executive summary, key findings, evidence table, counterarguments, risks and recommended next actions.
Criteria: Claims should be specific, traceable and internally consistent.`,
  },
  {
    id: "code-review",
    title: "Production Code Review",
    category: "Engineering",
    description:
      "Review code for correctness, security, maintainability and test gaps.",
    prompt: `Role: You are a senior software engineer performing a production code review.
Goal: Review the supplied code for correctness, security, performance and maintainability.
Context: Runtime is [RUNTIME]. Users are [USERS]. Critical path is [PATH].
Constraints: Do not rewrite unrelated code. Distinguish confirmed defects from suggestions. Prioritize high-impact findings.
Output: Return findings with severity, file/area, reasoning, minimal fix and test recommendation, followed by a concise summary.
Criteria: Every critical finding must be actionable and explain why it matters.`,
  },
  {
    id: "product-spec",
    title: "Product Spec Builder",
    category: "Product",
    description:
      "Convert a product idea into an implementable MVP specification.",
    prompt: `Role: You are a senior product manager and systems designer.
Goal: Turn [IDEA] into an MVP specification.
Context: Target users are [USERS]. Business goal is [GOAL]. Constraints include [BUDGET/TIME].
Constraints: Prefer the smallest viable scope. Identify dependencies and explicitly reject non-essential features.
Output: Return problem statement, personas, user stories, acceptance criteria, architecture, data model, milestones and risks.
Criteria: Each feature must map to a user outcome and have testable acceptance criteria.`,
  },
];
