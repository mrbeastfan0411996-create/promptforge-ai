# PromptForge AI

PromptForge is a privacy-first prompt engineering workbench for designing, evaluating and exporting production-ready AI instructions.

![Status](https://img.shields.io/badge/status-active-7c5cff)
![License](https://img.shields.io/badge/license-MIT-green)
![TypeScript](https://img.shields.io/badge/TypeScript-React-blue)

## Why this project exists

Prompt quality is often treated as a matter of trial and error. PromptForge makes the process explicit: compose a structured instruction, run a transparent deterministic quality check, reuse templates, and export a portable prompt record.

## Features

- **Prompt Playground** — focused editor with word/character metrics.
- **Deterministic Evaluator** — checks six observable prompt components: role, goal, context, constraints, output format and quality criteria.
- **Reusable Templates** — marketing, research, engineering and product workflows.
- **Portable Export** — export a JSON prompt record for versioning or downstream workflows.
- **Privacy-first local mode** — no server, telemetry or API key required for the core workbench.
- **Responsive UI** — desktop and mobile layouts.
- **CI build check** — GitHub Actions verifies that the application builds.
- **Provider-agnostic architecture** — the UI does not lock the project to one AI vendor.

## Tech stack

React + TypeScript + Vite + Lucide Icons + CSS.

## Run locally

```bash
npm install
npm run dev
```

Then open the local Vite URL shown in your terminal.

Production build:

```bash
npm run build
```

## Architecture

```text
src/
  main.tsx       # application, prompt state, templates and evaluator
  styles.css     # responsive design system
public/          # static assets
.github/
  workflows/    # CI build validation
```

The current version deliberately keeps AI execution out of the browser. If a model provider is added later, API credentials should be handled by a server-side adapter rather than shipped in client code.

## Evaluation methodology

The evaluator is intentionally transparent. It uses deterministic regular-expression checks rather than claiming that a heuristic score represents actual model quality. A future version can add model-based evaluation as an optional, clearly labeled layer.

## Security principles

- Never commit API keys or secrets.
- Keep provider credentials server-side.
- Treat model output as untrusted data.
- Log only what is necessary for debugging.
- Make external AI calls opt-in and visible to the user.

## Roadmap

- [ ] Server-side provider adapters (OpenAI-compatible, Gemini-compatible and local models)
- [ ] Prompt version history
- [ ] Side-by-side model evaluation
- [ ] JSON Schema based prompt packs
- [ ] Optional local embeddings/search
- [ ] Automated prompt regression tests

## Contribution

Issues and pull requests are welcome. Keep changes focused, documented and reproducible.

## License

MIT
