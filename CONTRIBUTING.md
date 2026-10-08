# Contributing

Thanks for contributing to PromptForge AI.

## Development

```bash
npm install
npm run check
npm test
npm run build
```

## Pull requests

- Keep changes focused.
- Add or update tests for evaluator behavior.
- Do not add API keys or secrets.
- Document user-visible behavior changes.
- Prefer small, reviewable commits.

## Code style

Use TypeScript strict mode. Keep pure logic in `src/lib` where practical and avoid coupling evaluation logic to UI components.
