# Design System — StreamMate Enterprise

Complete reference for colors, typography, spacing, and CSS utility classes.

---

## CSS Custom Properties (Variables)

Defined in `src/index.css` at `:root`. Use these everywhere — never hardcode hex values.

```css
:root {
  --cyan: #00d4ff;   /* Primary accent — buttons, highlights, active states */
  --bg:   #060b18;   /* Page background — applied to body and root div       */
}
```

---

## Color System

### Background Palette

| Token              | Value               | Usage                                      |
|--------------------|---------------------|--------------------------------------------|
| `--bg`             | `#060b18`           | Full-page background                       |
| `rgba(0,10,30,0.8)`| —                   | Logo icon box background                   |
| `rgba(255,255,255,0.025)` | —          | Card/panel background (`.card-glass`)      |
| `rgba(255,255,255,0.04)`  | —          | Input field background (`.input-field`)    |
| `rgba(255,255,255,0.04)`  | —          | Tag pill background (`.tag-pill`)          |

### Accent

| Token     | Value      | Usage                                              |
|-----------|------------|----------------------------------------------------|
| `--cyan`  | `#00d4ff`  | Button fill, link color, MFA dot, checkbox fill    |
| `#22e8ff` | —          | Cyan hover state (slightly brighter)               |

### Text Opacity Scale

All text is white (`#ffffff`) at varying opacities. Never use gray hex values — use `rgba(255,255,255, X)`:

| Opacity | Tailwind equivalent       | Usage                                   |
|---------|---------------------------|-----------------------------------------|
| `1.0`   | `text-white`              | Primary headings, input values          |
| `0.70`  | `text-white/70`           | Logo "Mate" suffix, language selector   |
| `0.65`  | `text-white/65`           | Language button text                    |
| `0.50`  | `text-white/50`           | Back button, top-bar secondary actions  |
| `0.45`  | `text-white/45`           | Tag pill text                           |
| `0.40`  | —                         | Language button text                    |
| `0.35`  | —                         | Form labels, subtitle text              |
| `0.30`  | `text-white/30`           | Footer links (inactive)                 |
| `0.25`  | —                         | Card inner links                        |
| `0.20`  | —                         | Input placeholder, icon color           |
| `0.15`  | —                         | Card copyright, footer version text     |

### Border Colors

| Value                          | Usage                                        |
|--------------------------------|----------------------------------------------|
| `rgba(255,255,255,0.08)`       | Card border, input field border              |
| `rgba(255,255,255,0.10)`       | Tag pills, language button, logo box         |
| `rgba(255,255,255,0.07)`       | Secure gateway badge                         |
| `rgba(0,212,255,0.50)`         | Input border on focus                        |
| `#00d4ff` (1.5px solid)        | Logo bracket corner decoration               |

### Status Colors

| Color           | Value       | Usage                    |
|-----------------|-------------|--------------------------|
| Emerald (green) | Tailwind `bg-emerald-400` | PRODUCTION status dot |

---

## Typography

Two font families are loaded via Google Fonts in `index.html`. Do not use other fonts.

```html
<link href="https://fonts.googleapis.com/css2?family=Barlow:wght@100;200;300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
```

### Barlow — Display / Body Font

Used for all headings, body text, and buttons.

| Weight  | Class            | Usage                                          |
|---------|------------------|------------------------------------------------|
| 100     | `font-thin`      | Hero heading on LandingPage                    |
| 200     | `font-extralight`| —                                              |
| 300     | `font-light`     | Login page title "StreamMate Enterprise"       |
| 400     | `font-normal`    | General body copy                              |
| 500     | `font-medium`    | —                                              |
| 600     | `font-semibold`  | Logo "Stream" text, CTA button label           |
| 700     | `font-bold`      | Logo "S" letter                                |

**Hero heading size** — fluid with `clamp()`:
```css
font-size: clamp(2.6rem, 7vw, 5.2rem);
font-weight: 100;
letter-spacing: -0.01em;
line-height: 1.12;
```

**Login page title:**
```css
font-size: 1.65rem;
font-weight: 300;
letter-spacing: 0.02em;
```

### Space Mono — Technical / Label Font

Used for all uppercase labels, monospace code-like elements, and footer text.

| Context                    | Size     | Letter-spacing | Transform  |
|----------------------------|----------|----------------|------------|
| Form labels (E-MAIL etc.)  | `0.62rem`| `0.12em`       | uppercase  |
| Subtitle / tagline         | `0.80rem`| `0.05em`       | normal     |
| Button labels              | `0.72rem`| `0.15em`       | uppercase  |
| Footer links               | `0.58rem`| `0.10em`       | uppercase  |
| Footer version string      | `0.58rem`| `0.07em`       | uppercase  |
| Tag pills                  | `0.62rem`| `0.06em`       | normal     |
| Input placeholder          | `0.78rem`| default        | normal     |
| Card inner links           | `0.58rem`| `0.05em`       | normal     |
| Secure badge               | `0.60rem`| `0.10em`       | uppercase  |

---

## Spacing System

Base unit is `4px` (Tailwind default). All spacing uses multiples of `4px`.

| Scale | Value  | Common usage                              |
|-------|--------|-------------------------------------------|
| 1     | 4px    | Inner gaps, small separators             |
| 2     | 8px    | Tag gap, badge inner gap                 |
| 3     | 12px   | Logo-to-text gap (12px)                  |
| 4     | 16px   | Input horizontal padding                 |
| 5     | 20px   | Top-bar padding                          |
| 6     | 24px   | Card inner padding horizontal (28px = 7) |
| 7     | 28px   | Card padding-x                           |
| 12    | 48px   | Logo bottom margin on LandingPage        |

---

## CSS Utility Classes

All defined in `src/index.css`. Use these instead of inline Tailwind one-offs.

### `.btn-cyan`

Solid cyan button. Apply to `<button>` elements.

```css
.btn-cyan {
  background-color: var(--cyan);  /* #00d4ff */
  color: #000;
  letter-spacing: 0.15em;
  font-weight: 600;
  transition: background-color 0.2s, transform 0.1s, box-shadow 0.2s;
}
.btn-cyan:hover  { background-color: #22e8ff; box-shadow: 0 0 24px rgba(0,212,255,0.45); }
.btn-cyan:active { transform: scale(0.98); }
```

Always pair with `font-family: 'Space Mono'` and uppercase text.

---

### `.input-field`

Dark, low-contrast form input.

```css
.input-field {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  color: #fff;
  transition: border-color 0.2s, background 0.2s;
}
.input-field:focus {
  border-color: rgba(0,212,255,0.5);
  background: rgba(255,255,255,0.06);
}
.input-field::placeholder {
  color: rgba(255,255,255,0.2);
  font-family: 'Space Mono', monospace;
  font-size: 0.78rem;
}
```

Use `rounded-sm` (2px) for the border radius to keep the hard-edged tech aesthetic.

---

### `.card-glass`

Glassmorphism panel/card.

```css
.card-glass {
  background: rgba(255,255,255,0.025);
  border: 1px solid rgba(255,255,255,0.07);
  backdrop-filter: blur(10px);
}
```

Always use `rounded-sm` (2px) to stay consistent with the sharp-edge design language.

---

### `.tag-pill`

Small feature/badge tag.

```css
.tag-pill {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.45);
  font-family: 'Space Mono', monospace;
  font-size: 0.62rem;
  letter-spacing: 0.06em;
  padding: 0.32rem 0.75rem;
  border-radius: 2px;
}
```

Prefix tag text with `*` (e.g., `* Enterprise White Label`).

---

### `.lang-btn`

Language/locale selector button in the top-right corner.

```css
.lang-btn {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.65);
  font-family: 'Space Mono', monospace;
  font-size: 0.68rem;
  letter-spacing: 0.05em;
  display: flex; align-items: center; gap: 0.4rem;
  padding: 0.35rem 0.75rem;
  border-radius: 3px;
}
.lang-btn:hover { background: rgba(255,255,255,0.07); border-color: rgba(255,255,255,0.2); }
```

Always includes a `Globe` icon (14px), label text, and `ChevronDown` icon (10px).

---

### `.footer-link` / `.footer-link.active`

Footer navigation links.

```css
.footer-link {
  color: rgba(255,255,255,0.3);
  font-family: 'Space Mono', monospace;
  font-size: 0.58rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.footer-link:hover  { color: rgba(255,255,255,0.65); }
.footer-link.active { color: var(--cyan); }
```

---

## Design Language Principles

1. **Hard edges** — use `rounded-sm` (2px) or `rounded-none`. Avoid `rounded-lg` / `rounded-full` except for small dots.
2. **Low-opacity layering** — build depth through `rgba(255,255,255, X)` layers, never opaque gray fills.
3. **Monospace for data** — any label, code, version string, or badge uses `Space Mono`.
4. **Thin weight headings** — hero text is `font-weight: 100`. Heaviness reads as noise in this aesthetic.
5. **Cyan is sacred** — only use `#00d4ff` for interactive/active elements. Never decorate with it.
6. **No border-radius on cards** — `rounded-sm` maximum. The UI feels engineered, not friendly.
