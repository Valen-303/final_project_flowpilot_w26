# FlowPilot

> **Your AI, orchestrated.**

A concept product showcase site for a fictional AI workflow automation platform.
Built as the final project for SI 539 (Winter 2026) by **Valen Hu**.

## About

FlowPilot imagines the next step for AI tools: instead of one-time conversations, let non-technical users build multi-step AI workflows visually. This site presents that concept through a product landing page with a visual narrative and interactive elements.

## Tech Stack

- **HTML5** — semantic structure, accessible markup
- **CSS3** — custom design system, CSS Grid & Flexbox, responsive
- **Vanilla JS** — minimal (hamburger menu toggle)
- **Fonts** — Geist (display) + Inter (body) via Google Fonts

## Structure

```
flowpilot/
├── index.html
├── styles/
│   ├── variables.css   # Design tokens (colors, typography, spacing)
│   ├── base.css        # Reset, typography, utility classes
│   └── components.css  # All component styles
└── scripts/
    └── nav.js          # Mobile hamburger toggle
```

## Design System

Dark-tech aesthetic inspired by Linear, Vercel, and Cursor. Key tokens:

- **Primary brand**: `#7C3AED` (violet)
- **Display font**: Geist 600
- **Body font**: Inter 400/500
- **Base grid**: 8px

Full design spec in [DESIGN_SPEC.md](./DESIGN_SPEC.md).

## Status

Week 2 static completion.

**Shipped**
- Fully responsive landing page with 6 sections
- Custom design system with CSS variables
- Mobile navigation with accessible hamburger menu
- WCAG 2.1 AA considerations (skip link, focus states, semantic HTML)

**Coming in Week 3**
- Use Cases page
- Interactive How It Works tab switcher
- Workflow panel idle animations
- Scroll-triggered reveal animations
- Full accessibility audit (WAVE, aXe, W3C validation)

## Local preview

Just open `index.html` in a browser. No build step required.

```bash
# Or serve locally with Python:
python -m http.server 8080
# Then visit http://localhost:8080
```

## Live site

Deployed via GitHub Pages: _(link after deployment)_

## License

Concept project for educational purposes. Not a real product.
