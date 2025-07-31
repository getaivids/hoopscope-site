# Hoopscope Website & Blog System – GitHub Documentation

## Overview
This project powers the Hoopscope site, offering basketball analytics, data-driven training plans, and a blog. It is now fully integrated with OpenAI for AI helpers, Google Drive for content/code versioning, and uses best web practices for performance and accessibility.

## GitHub Workflow
- All site and blog code is kept in /SiteCode and /Blog for clarity and mirrored in the repo.
- Please use descriptive commit messages (e.g., 'feat(AI): migrate to OpenAI API, add error handling')
- Major features, design, or blog mechanism changes go through feature branches and pull requests.
- Keep all PRs and push descriptions concise; document breaking or user-facing changes in the changelog and/or README.

## Coding Standards
- No private API keys in the codebase/client; use environment variables or a backend proxy to pass sensitive info (see code samples).
- Responsive, accessible design is mandatory.
- JS: All API fetches with error handling; user-friendly feedback on failure.
- Images: Use loading="lazy" for performance.

## Content/Blog System
- Each blog post has clear metadata (title, author, category, publish date, description for SEO).
- Posts enhanced and reviewed for clarity, value, and engagement with a focus on basketball analytics or skill improvement.
- New blog/research ideas should be committed in blog-topics-recommendations.txt and discussed before drafting.

## Versioning
- All updates/major edits also pushed to Google Drive as backup.
- Changelog maintained for each release/deploy.

---
For any issues, see CONTRIBUTING.md or contact support@hoopscope.ai

Sent from Den
