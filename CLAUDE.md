# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

**SecuredChatGPT – "Projet" feature prototype.** A responsive, fully mocked (no real backend/AI) clickable prototype built as a Next.js app and deployed on Vercel. It adds a personal knowledge-space ("Projet") to an internal SaaS ChatGPT-like platform used by ~30 000 monthly users.

## Stack

- **Next.js** + **Tailwind CSS** — `tailwind.config.js` must consume tokens from `design.md` only; never hardcode hex values
- **Lucide React** — the only icon library; never use icons from Figma exports
- **Vercel** — deployment target (project: `chat-conversationnel`, org: `team_5id6tm06aS5kXX5c5osJtNwy`)
- **Components** — build with:
  - **Radix UI** for behaviour (accessibility, keyboard, focus management)
  - **shadcn/ui** for component primitives

## Development commands

```bash
npm install        # install dependencies
npm run dev        # local dev server (http://localhost:3000)
npm run build      # production build
npm run lint       # ESLint
```

## Design constraints (non-negotiable)

- Responsive: mobile + desktop
- WCAG AA accessibility
- Light & dark mode
- All colors/spacing/radius/typography exclusively from tokens in `design.md` — never invent values
- Lucide React icons only

## Key reference files (read in this order before implementing)

1. `build-context.md` — feature scope, user flows, and explicit out-of-scope items
2. `spec.md` — screen-by-screen states, flows, and what is mocked *(to be created)*
3. `design.md` — design tokens *(to be created)*
4. `References/` — screenshots of the existing SecuredChatGPT UI to match
5. `Public/Images/` — avatar and images to use

## Feature scope summary

**Project management:** create, rename (max 15 chars), delete (with confirmation pop-up), pin.

**Source management:** upload files → appears in "Sources" tab; handle duplicates, unsupported formats, oversized files; preview (pop-up) or download; delete.

**Working inside a project:** create contextualised chats from the project bar; chat appears in project "Chats" tab + sidebar "Discussions" with distinct icon (vs. non-project chats); reference source files as clickable links in responses; web search toggle via "+" menu (persistent tag until manually removed); pin/delete chats.

**Required screen states:** empty and populated states for project list and sidebar section; expired project banner.

## What is mocked

Everything — no real AI responses, no real file parsing, no real backend. All data lives in client-side state (or mock JSON). File uploads, chat responses, web search, source references in answers are all simulated.
