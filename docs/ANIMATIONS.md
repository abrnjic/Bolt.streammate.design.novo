# Animations — StreamMate Enterprise

Complete reference for all keyframe animations, CSS transition utilities, and timing guidelines.

---

## Overview

All animations are defined in `src/index.css`. The design uses **three animation categories**:

| Category              | Purpose                                             |
|-----------------------|-----------------------------------------------------|
| **Entrance animations** | Fade-up stagger when a page first renders          |
| **Ambient animations**  | Continuous star twinkle in the background          |
| **Micro-interactions**  | Button hover, input focus, link hover              |

No JavaScript-driven animations. Everything runs via CSS `animation` and `transition` properties.

---

## Keyframes

### `fadeUp`

Entrance animation — element slides up 22px and fades from invisible to visible.

```css
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(22px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

**Duration:** 700ms  
**Easing:** `ease`  
**Fill mode:** `forwards` (element stays visible after animation ends)

---

### `fadeIn`

Simple opacity fade with no movement. Used for fast overlays or page-level fades.

```css
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
```

**Duration:** 500ms  
**Easing:** `ease`

---

### `twinkle`

Ambient animation for star dots in `<StarField />`. Each star has an individual `--star-opacity` custom property so the star dims relative to its own base brightness (not a fixed value).

```css
@keyframes twinkle {
  0%, 100% { opacity: var(--star-opacity, 0.4); }
  50%       { opacity: calc(var(--star-opacity, 0.4) * 0.25); }
}
```

At the midpoint, each star dims to 25% of its base opacity, creating a gentle pulse.

**Duration:** 2.5s – 6.5s (per-star, set via inline `style`)  
**Delay:** 0s – 5s (per-star, set via inline `style`)  
**Easing:** `ease-in-out`  
**Iteration:** `infinite`

How it's applied per star:

```tsx
<div
  style={{
    animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
    ['--star-opacity' as string]: s.opacity,
  }}
/>
```

> **Why `--star-opacity` as a CSS variable?**  
> Native `opacity` cannot be interpolated relative to itself in a keyframe. Using a custom property lets each star maintain its own brightness level while the keyframe drives the relative change.

---

### `cursorBlink`

Blinking cursor character. Used with the `.cursor-blink` utility class.

```css
@keyframes cursorBlink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}

.cursor-blink::after {
  content: '_';
  animation: cursorBlink 1s step-end infinite;
  color: #00d4ff;
}
```

**Easing:** `step-end` (hard cut, not gradual fade — matches terminal cursor behavior)

---

## Entrance Animation Utility Classes

Staggered entrance classes for page-level elements. Each defers the start of the animation by an additional 150ms.

| Class                  | Delay   | Usage                                |
|------------------------|---------|--------------------------------------|
| `.animate-fade-up`     | 0ms     | First element on screen (Logo)       |
| `.animate-fade-in`     | 0ms     | Fade only — no Y movement            |
| `.animate-fade-up-d1`  | 150ms   | Second element (H1 heading)          |
| `.animate-fade-up-d2`  | 300ms   | Third element (subtitle)             |
| `.animate-fade-up-d3`  | 450ms   | Fourth element (CTA button / card)   |
| `.animate-fade-up-d4`  | 600ms   | Fifth element (tags, secondary)      |

**Important:** All delayed classes start with `opacity: 0` in their CSS rule. This prevents a flash of visible content before the animation begins:

```css
.animate-fade-up-d1 {
  opacity: 0;  /* hidden until animation fires */
  animation: fadeUp 0.7s ease 0.15s forwards;
}
```

### Usage Example (page enter sequence)

```tsx
<div className="animate-fade-up">       <Logo />       </div>  {/* 0ms   */}
<h1  className="animate-fade-up-d1">    Heading        </h1>   {/* 150ms */}
<p   className="animate-fade-up-d2">    Subtitle       </p>    {/* 300ms */}
<button className="animate-fade-up-d3"> CTA            </button>{/* 450ms */}
<div className="animate-fade-up-d4">    Tags           </div>  {/* 600ms */}
```

---

## Micro-Interaction Transitions

These are applied via the `.btn-cyan`, `.input-field`, `.lang-btn`, and `.footer-link` utility classes. No extra work needed — just apply the class.

### Button (`.btn-cyan`)

| Trigger  | Property          | Value                                      | Duration |
|----------|-------------------|--------------------------------------------|----------|
| `:hover` | `background-color`| `#00d4ff` → `#22e8ff`                     | 200ms    |
| `:hover` | `box-shadow`      | none → `0 0 24px rgba(0,212,255,0.45)`    | 200ms    |
| `:active`| `transform`       | `scale(1)` → `scale(0.98)`                | 100ms    |

### Input Field (`.input-field`)

| Trigger  | Property       | Value                                               | Duration |
|----------|----------------|-----------------------------------------------------|----------|
| `:focus` | `border-color` | `rgba(255,255,255,0.08)` → `rgba(0,212,255,0.5)` | 200ms    |
| `:focus` | `background`   | `rgba(255,255,255,0.04)` → `rgba(255,255,255,0.06)` | 200ms  |

### Language Button (`.lang-btn`)

| Trigger  | Property       | Value                                               | Duration |
|----------|----------------|-----------------------------------------------------|----------|
| `:hover` | `background`   | `rgba(255,255,255,0.04)` → `rgba(255,255,255,0.07)` | 200ms  |
| `:hover` | `border-color` | `rgba(255,255,255,0.1)` → `rgba(255,255,255,0.2)` | 200ms    |

### Footer Links (`.footer-link`)

| Trigger  | Property | Value                                              | Duration |
|----------|----------|----------------------------------------------------|----------|
| `:hover` | `color`  | `rgba(255,255,255,0.3)` → `rgba(255,255,255,0.65)` | 200ms  |

### Inline hover (LoginPage card links)

Card inner links (Privacy Policy, Forgot Password, Support Access) use inline `onMouseEnter`/`onMouseLeave` handlers instead of CSS classes because they need individual color targets:

```tsx
onMouseEnter={(e) => (e.currentTarget.style.color = '#22e8ff')}
onMouseLeave={(e) => (e.currentTarget.style.color = '#00d4ff')}
```

---

## Timing Guidelines

| Use case                        | Duration | Easing       |
|---------------------------------|----------|--------------|
| Entrance / page load            | 700ms    | `ease`       |
| Color / background transition   | 200ms    | `ease`       |
| Transform (scale, translate)    | 100ms    | `ease`       |
| Ambient loop (stars)            | 2.5–6.5s | `ease-in-out`|
| Blink cursor                    | 1s       | `step-end`   |

**Rule:** Keep interactive transitions under 200ms. Anything slower feels sluggish at this density of UI.

---

## Adding a New Entrance Element

To add a sixth staggered element (e.g., a sub-heading after the tags), add a new class to `src/index.css`:

```css
.animate-fade-up-d5 {
  opacity: 0;
  animation: fadeUp 0.7s ease 0.75s forwards;
}
```

Then apply it in JSX:

```tsx
<div className="animate-fade-up-d5">Your new element</div>
```

Keep delays at 150ms increments for a consistent rhythm.
