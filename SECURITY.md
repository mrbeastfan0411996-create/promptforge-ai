# Security Policy

PromptForge currently runs entirely in the browser. It does not request, transmit, or store provider API keys.

If an AI provider integration is added, credentials must be handled server-side or through a secure user-managed secret mechanism. Do not place private API keys in client-side JavaScript or Vite environment variables exposed to the browser.

Please report suspected security issues privately to the repository maintainer rather than opening a public issue with exploit details.
