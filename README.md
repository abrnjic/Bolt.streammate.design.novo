# StreamMate Enterprise — Design Portal

Enterprise-grade media management portal built with React, TypeScript, Vite, and Tailwind CSS.
Dark space-themed UI with cyan accents, animated starfield background, and a two-screen flow (Landing → Login).

---

## Quick Start

```bash
npm install
npm run dev        # development server at http://localhost:5173
npm run build      # production build to /dist
npm run typecheck  # TypeScript type checking only
```

**Requirements:** Node.js 18+, npm 9+

---

## Tech Stack

| Layer        | Technology                       | Version  |
|--------------|----------------------------------|----------|
| Framework    | React                            | 18.3.x   |
| Language     | TypeScript                       | 5.5.x    |
| Bundler      | Vite                             | 5.4.x    |
| Styling      | Tailwind CSS                     | 3.4.x    |
| Icons        | lucide-react                     | 0.344.x  |
| Database     | Supabase (`@supabase/supabase-js`) | 2.57.x  |
| Fonts        | Google Fonts (Barlow + Space Mono) | CDN    |

---

## Project Structure

```
/
├── index.html                  # Entry HTML + Google Fonts link tags
├── src/
│   ├── main.tsx                # React DOM root mount
│   ├── App.tsx                 # Root component — page state machine (landing | login)
│   ├── index.css               # Global styles, CSS variables, utility classes, keyframes
│   ├── components/
│   │   ├── StarField.tsx       # Animated starfield background (180 deterministic stars)
│   │   ├── Logo.tsx            # StreamMate brand logo with bracket decoration
│   │   └── Footer.tsx          # Shared bottom footer bar (links + version info)
│   └── pages/
│       ├── LandingPage.tsx     # Hero landing page with CTA
│       └── LoginPage.tsx       # Login form page with feature tags
├── docs/
│   ├── DESIGN_SYSTEM.md        # Colors, typography, spacing, CSS variables
│   ├── COMPONENTS.md           # Component API reference with props and usage
│   └── ANIMATIONS.md           # Keyframe and transition reference
├── tailwind.config.js
├── vite.config.ts
└── tsconfig.app.json
```

---

## Navigation Flow

```
LandingPage  ──[ENTER PLATFORM]──►  LoginPage
LoginPage    ──[← Back]──────────►  LandingPage
```

State lives in `App.tsx` as a simple `'landing' | 'login'` union type.
No router library is used — single `useState` is sufficient for this two-screen flow.

---

## Environment Variables

The project includes Supabase integration via `.env`:

```env
VITE_SUPABASE_URL=https://<project-id>.supabase.co
VITE_SUPABASE_ANON_KEY=<anon-key>
```

These are pre-populated in the hosted environment. For local development, copy `.env.example` (if present) or set them manually. Never commit real keys to version control.

---

## Further Reading

- [Logo](./docs/LOGO.md) — SVG assets, favicon, Android icons, React component API, usage rules
- [Design System](./docs/DESIGN_SYSTEM.md) — colors, typography, spacing, CSS classes
- [Components](./docs/COMPONENTS.md) — props reference and usage examples
- [Animations](./docs/ANIMATIONS.md) — keyframes, transition utilities, timing guide
