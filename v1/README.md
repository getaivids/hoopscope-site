# Hoopscope Website (v1)

This project is a modern, responsive basketball analytics platform landing page with AI-driven content features.

## Key Improvements
- Switched from Gemini API placeholder to OpenAI API integration template (see `main.js`).
- **Performance:** Lazy loading for images, Intersection Observer for animation.
- **Accessibility:** Improved keyboard navigation, alt text, focus handling.
- **Responsiveness:** Mobile-first Layout via Tailwind + custom CSS.
- **AI Features:**
  - Workout plan generator now uses OpenAI API via `/api/openai-completions` proxy endpoint for security (not direct in client)
  - Blog summary and Q&A use robust error handling and improved context delivery to OpenAI
- **SEO:**
  - Semantic heading hierarchy
  - Preload critical hero image
  - Metadata improvements (title/descriptions)
- **Best Practices:**
  - All code modularized (`main.js`) and documented
  - Strict environment variable usage for API keys (not hardcoded in client)

## Code Organization
- `/v1/index.html` — Main static site shell
- `/v1/main.js` — Business logic and AI features (JS)
- `/v1/README.md` — This file
- `/v1/CHANGELOG.md` — Changelog/report of this version

## Running Locally
1. Serve `/v1/` with any static server
2. Set up your own backend endpoint `/api/openai-completions` that securely calls OpenAI with your API key via environment variable.
3. Environment example:
   ```
   export OPENAI_API_KEY=sk-xxxx
   ```

For full documentation and suggested backend code, see below or reach out to the maintainers.

## Contributor Notes
- Branches and PRs encouraged for each feature set or blog cycle.
- See CHANGELOG.md for full change documentation.
- Docs and component comments require updates for any future major UI/AI changes.
