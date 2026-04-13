# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server with HMR
npm run build     # Production build to dist/
npm run preview   # Preview production build locally
npm run lint      # Run ESLint
```

## Stack

- **React 19** + **Vite 8** (JSX, ES modules)
- **Tailwind CSS v4** — configured via `@import "tailwindcss"` in `src/index.css` with `@theme` block (no `tailwind.config.js`)
- **@vitejs/plugin-react** (Oxc-based transform)

## Architecture

Single-page marketing/landing site for an AI Tutor product. No routing — `App.jsx` renders only `<Home />`.

```
src/
  pages/Home.jsx         # Assembles all sections in order
  components/
    Navbar.jsx
    Footer.jsx
  sections/              # One file per landing page section
    Hero.jsx
    Stats.jsx            # Currently commented out in Home.jsx
    Features.jsx
    HowItWorks.jsx
    AIEdge.jsx
    Pricing.jsx          # Currently commented out in Home.jsx
    Testimonials.jsx
    FAQ.jsx
    FinalCTA.jsx
  index.css              # Global styles, Tailwind import, @theme tokens
```

## Design System

All design tokens live in the `@theme` block in `src/index.css`. Use these semantic Tailwind classes rather than raw hex values:

- **Colors**: `bg-primary`, `text-on-surface`, `bg-surface-container`, `text-tertiary`, etc.
- **Fonts**: `font-headline` (Manrope), `font-body` / `font-label` (Inter)
- **Icons**: Material Symbols Outlined via Google Fonts CDN — use `<span className="material-symbols-outlined">icon_name</span>`
- **Hero background**: `.hero-gradient` (dark navy → brand red) + `.grid-overlay` (dot pattern)

Brand primary color is `#af101a` (deep red). Tertiary is `#005f7b` (teal/blue).
