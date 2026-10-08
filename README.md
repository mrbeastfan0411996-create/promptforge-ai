# PromptForge AI

> Open-source prompt engineering workbench for designing, evaluating, saving and exporting production-ready AI instructions.

[![CI](https://github.com/YOUR_USERNAME/promptforge-ai/actions/workflows/ci.yml/badge.svg)](https://github.com/YOUR_USERNAME/promptforge-ai/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Why this project exists

Prompt quality is often treated as trial and error. PromptForge turns common prompt-engineering practices into a repeatable workflow:

1. Draft a structured instruction.
2. Evaluate observable components.
3. Iterate using explicit feedback.
4. Save reusable prompts locally.
5. Export a portable JSON record.

The evaluator is deliberately deterministic. It is a heuristic quality checklist, not a claim that a prompt can be assigned an objective "AI quality score."

## Features

- Prompt Playground with live character and word metrics
- Six-component deterministic evaluator: role, goal, context, constraints, output, criteria
- Curated templates for marketing, research, engineering and product work
- Local saved-prompt library
- Portable `promptforge.prompt.v2` JSON export
- Provider-neutral core architecture
- Local-first privacy model; no API key required
- Responsive desktop/mobile UI
- Automated unit tests
- GitHub Actions CI
- GitHub Pages deployment workflow

## Tech stack

- React 18
- TypeScript
- Vite
- Vitest
- Lucide React
- CSS
- Browser LocalStorage

## Local development

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

Tests:

```bash
npm test
```

Type check:

```bash
npm run check
```

## Architecture

```text
src/
├── data/
│   └── templates.ts       # curated prompt templates
├── lib/
│   └── evaluator.ts       # pure evaluation + export logic
├── main.tsx               # application state and UI
└── styles.css             # responsive design system

tests/
└── evaluator.test.ts       # evaluator unit tests

.github/workflows/
├── ci.yml                  # typecheck + tests + build
└── deploy.yml              # GitHub Pages deployment
```

## Evaluation methodology

The evaluator checks six observable components. Each component has a fixed maximum weight:

| Component | Weight |
|---|---:|
| Role | 16 |
| Goal | 20 |
| Context | 16 |
| Constraints | 16 |
| Output | 16 |
| Criteria | 16 |

Signals are detected with transparent regular-expression rules. The implementation intentionally avoids calling an external model for scoring, making the result reproducible and inspectable.

## Privacy

Core functionality runs in the browser. Prompts are stored in LocalStorage and are not transmitted by this application. If an external AI provider is added in a future release, that integration should be explicit and documented separately.

## Roadmap

- [ ] OpenAI-compatible provider adapter
- [ ] Gemini-compatible provider adapter
- [ ] Local Ollama adapter
- [ ] Prompt version history and diffs
- [ ] Evaluation benchmark datasets
- [ ] Import/export of template packs
- [ ] Accessibility audit and keyboard-first navigation

## Responsible use

PromptForge is a developer tool. It does not guarantee that a prompt will produce correct, safe or reliable model output. Model outputs should be validated according to the risk of the application.

## License

MIT — see [LICENSE](LICENSE).
