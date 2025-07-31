# Hoopscope: Data-Driven Training & Analytics Platform

## About
Hoopscope is an analytics-focused basketball community platform that empowers players and coaches with actionable data, AI-powered training plans, and elite content. The codebase is fully responsive, uses TailwindCSS, and features OpenAI-based AI features (migrated from Gemini API). Blog system and training helpers are deeply integrated for basketball skill improvement.

## Developer Guide
### Folder Structure (Google Drive & Repo)
- `SiteCode/` – All site HTML/CSS/JS and resources
- `Blog/` – Markdown/HTML content for posts, ideas, and drafts
- `changelog.txt` – Track all deploys & improvements

### API Keys
- **Do NOT hardcode** OpenAI or any private API keys in code. Keys must be kept in a .env or secure proxy/backend layer. See sample `.env.example` and `/api` server.
- Local dev: use a node/express (or similar) proxy for OpenAI calls, never from the browser.

### GitHub Workflow
- Feature PRs must branch from main.
- All PRs require descriptive commits and changelog entry.
- Pull Requests for: AI changes, blog system enhancements, core design updates
- Issues tracked for bugs, accessibility gaps, performance improvements

### AI Workflow (OpenAI Integration)
- AI queries go via `/api/ai-proxy` with key on server only
- Error handling must be user-friendly (show errors, not just fail silently)
- Prompts should focus on actionable detail and user value

### Blog & Content
- Blog posts are in HTML or Markdown, stored in `Blog/` as individual files
- Metadata (title, author, seo) required per post
- Blog helper uses AI for summaries, questions – proxied via OpenAI
- Suggestions for blog topics should remain data-driven and relevant to basketball improvement

### Performance and Accessibility
- All images: `<img loading="lazy" ...>` for perf
- LMS color contrast, keyboard nav, alt attributes checked
- Responsive to mobile/tablet/desktop – use Chrome dev tools to verify major breakpoints

### Contributions
- See `CONTRIBUTING.md` (if exists) for coding and design standards
- All contributors should log major changes in the changelog

---
For questions: support@hoopscope.ai

Sent from Den
