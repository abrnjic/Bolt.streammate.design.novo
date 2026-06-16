# Components — StreamMate Enterprise

API reference, props, and usage examples for every component in the project.

---

## Component Map

```
src/
├── components/
│   ├── StarField.tsx    # Background layer — rendered once in App.tsx
│   ├── Logo.tsx         # Brand mark — used in both pages
│   └── Footer.tsx       # Bottom bar — used in both pages
└── pages/
    ├── LandingPage.tsx  # Route: 'landing'
    └── LoginPage.tsx    # Route: 'login'
```

---

## `<StarField />`

**File:** `src/components/StarField.tsx`

Renders 180 decorative star dots as absolutely-positioned `<div>` elements fixed to the viewport. Uses a deterministic pseudo-random number generator (no `Math.random()`) so the star layout is identical on every render and server-side render.

### Props

None. This is a pure presentational component with no configuration.

### Usage

```tsx
// Always place as the first child of the root div in App.tsx
<div className="min-h-screen relative overflow-hidden" style={{ background: '#060b18' }}>
  <StarField />
  {/* page content */}
</div>
```

### Implementation Details

Stars are generated at **module level** (outside the component function) so they are computed once at import time, not on every render:

```ts
const STARS = Array.from({ length: 180 }, (_, i) => {
  const x       = ((i * 7919 + 31337) % 10000) / 100;  // 0–100 %
  const y       = ((i * 6271 + 13337) % 10000) / 100;  // 0–100 %
  const opacity = 0.12 + ((i * 3571) % 100) / 200;      // 0.12–0.62
  const size    = i % 11 === 0 ? 2 : i % 5 === 0 ? 1.5 : 1; // px
  const duration = 2.5 + ((i * 1327) % 100) / 25;       // 2.5–6.5 s
  const delay    = ((i * 2347) % 100) / 20;              // 0–5 s
  return { x, y, opacity, size, duration, delay };
});
```

Each star uses the `twinkle` keyframe animation with individual `--star-opacity` CSS custom property for correct opacity interpolation (see [Animations](./ANIMATIONS.md)).

### Customization

| Concern         | Where to change                          |
|-----------------|------------------------------------------|
| Star count      | `Array.from({ length: 180 }, ...)`       |
| Size ratio      | Modulo conditions (`i % 11`, `i % 5`)    |
| Brightness      | Opacity formula `0.12 + ((i*3571)%100)/200` |
| Twinkle speed   | `duration` formula                       |

---

## `<Logo />`

**File:** `src/components/Logo.tsx`

Brand mark for StreamMate. Renders a square icon with "S" letter and corner bracket decorations, followed by the "StreamMate" wordmark.

### Props

| Prop   | Type                   | Default | Description                        |
|--------|------------------------|---------|------------------------------------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'`  | Controls icon box and text sizing  |

### Size Reference

| Size  | Box (px) | Letter class   | Text class   | Bracket (px) |
|-------|----------|----------------|--------------|--------------|
| `'sm'`| 34       | `text-base`    | `text-lg`    | 6            |
| `'md'`| 46       | `text-xl`      | `text-2xl`   | 8            |
| `'lg'`| 56       | `text-2xl`     | `text-3xl`   | 10           |

### Usage

```tsx
import Logo from '../components/Logo';

// Default (medium) — used in both pages
<Logo />

// Large variant — e.g., for a splash/onboarding screen
<Logo size="lg" />

// Small variant — e.g., inside a nav bar
<Logo size="sm" />
```

### Anatomy

```
┌ ─ ─ ─ ─ ─ ─ ┐
  ╔════════╗   StreamMate
  ║   S    ║   ^^^^^^^^^^
  ╚════════╝   "Stream" → font-weight 600, text-white
└ ─ ─ ─ ─ ─ ─ ┘  "Mate" → font-weight 300, text-white/60
      │
      └── Top-left: 2-side cyan border (borderTop + borderLeft)
      └── Bottom-right: 2-side cyan border (borderBottom + borderRight)
```

The bracket decoration uses two `<span>` elements with `position: absolute`, each with 2 sides of a `1.5px #00d4ff` border:

```tsx
// Top-left bracket
<span style={{ top:0, left:0, width:bracketSize, height:bracketSize,
  borderTop: '1.5px solid #00d4ff', borderLeft: '1.5px solid #00d4ff' }} />

// Bottom-right bracket
<span style={{ bottom:0, right:0, width:bracketSize, height:bracketSize,
  borderBottom: '1.5px solid #00d4ff', borderRight: '1.5px solid #00d4ff' }} />
```

---

## `<Footer />`

**File:** `src/components/Footer.tsx`

Fixed bottom bar present on all pages. Left side contains navigation links; right side shows version and environment metadata.

### Props

| Prop         | Type     | Default       | Description                                         |
|--------------|----------|---------------|-----------------------------------------------------|
| `activeLink` | `string` | `'support'`   | ID of the link to highlight in cyan (`--cyan` color)|

### Link IDs

| ID         | Label              |
|------------|--------------------|
| `'privacy'`| Privacy Policy     |
| `'terms'`  | Terms of Service   |
| `'gdpr'`   | GDPR Information   |
| `'support'`| Support            |

### Usage

```tsx
import Footer from '../components/Footer';

// Highlight "Support" link (default)
<Footer />

// Highlight a different link
<Footer activeLink="privacy" />
```

### Version Metadata (right side)

The right side of the footer is hardcoded in `Footer.tsx`. Update these values when releasing a new version:

```tsx
<span>v4.0.0-RC.1</span>
<span>SM-2024-02</span>
<span className="flex items-center gap-1">
  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
  PRODUCTION
</span>
<span>© 2026 STREAMMATE ENTERPRISE</span>
```

The green dot (`bg-emerald-400`) indicates production environment. Replace with `bg-amber-400` (staging) or `bg-red-400` (maintenance) as needed.

### Layout

`Footer` uses `position: fixed; bottom: 0; left: 0; right: 0` so it floats above page content. Page content must have sufficient bottom padding (`pb-16` or `pb-20`) to avoid overlap.

---

## `<LandingPage />`

**File:** `src/pages/LandingPage.tsx`

Full-viewport hero screen. Sole purpose: present the brand and navigate to the login page.

### Props

| Prop      | Type         | Description                             |
|-----------|--------------|-----------------------------------------|
| `onEnter` | `() => void` | Called when "ENTER PLATFORM" is clicked |

### Usage

```tsx
import LandingPage from './pages/LandingPage';

<LandingPage onEnter={() => setPage('login')} />
```

### Layout Structure

```
[flex col, min-h-screen]
  ├── Top bar (flex, justify-end)
  │     └── <lang-btn> "Hrvatski ▾"
  │
  ├── Main (flex-1, items-center, justify-center)
  │     └── [max-w-4xl, text-center]
  │           ├── <Logo size="md" />
  │           ├── <h1> hero heading  (font-thin, clamp font-size)
  │           ├── <p>  subtitle      (Space Mono, cyan highlights)
  │           └── <button .btn-cyan> "ENTER PLATFORM →"
  │
  └── <Footer activeLink="support" />
```

### Subtitle Markup

The subtitle uses inline `<span>` elements for the cyan-colored words:

```tsx
<p>
  Built for,{' '}
  <span style={{ color: '#00d4ff' }}>Media Providers</span>.
  {' '}Designed for{' '}
  <span style={{ color: '#00d4ff' }}>Growth</span>.
</p>
```

### Animation Sequence

Each major element fades up in sequence using staggered CSS animation classes:

| Element       | Class                  | Delay  |
|---------------|------------------------|--------|
| Logo          | `.animate-fade-up`     | 0ms    |
| H1 heading    | `.animate-fade-up-d1`  | 150ms  |
| Subtitle      | `.animate-fade-up-d2`  | 300ms  |
| CTA button    | `.animate-fade-up-d3`  | 450ms  |

---

## `<LoginPage />`

**File:** `src/pages/LoginPage.tsx`

Login form screen. Contains a glassmorphism card with email/password fields and links to navigate back.

### Props

| Prop     | Type         | Description                              |
|----------|--------------|------------------------------------------|
| `onBack` | `() => void` | Called when the "← Back" button is clicked |

### Usage

```tsx
import LoginPage from './pages/LoginPage';

<LoginPage onBack={() => setPage('landing')} />
```

### Local State

| State          | Type      | Initial | Description                       |
|----------------|-----------|---------|-----------------------------------|
| `email`        | `string`  | `''`    | Controlled email input            |
| `password`     | `string`  | `''`    | Controlled password input         |
| `showPassword` | `boolean` | `false` | Toggles password visibility       |
| `remember`     | `boolean` | `true`  | "Remember session" checkbox state |

### Layout Structure

```
[flex col, min-h-screen]
  ├── Top bar (flex, justify-between)
  │     ├── "← Back" button
  │     └── <lang-btn> "Hrvatski ▾"
  │
  ├── Main (flex-1, items-center, justify-center)
  │     └── [max-w-[340px], flex col, items-center]
  │           ├── <Logo size="md" />
  │           ├── <h1> "StreamMate Enterprise"
  │           ├── <p>  subtitle
  │           │
  │           └── <div .card-glass>
  │                 ├── Secure Gateway badge
  │                 ├── <form>
  │                 │     ├── Email field (+ Mail icon)
  │                 │     ├── Password field (+ Eye/EyeOff toggle)
  │                 │     ├── Remember session checkbox + Forgot Password
  │                 │     └── LOGIN VIA GATEWAY button
  │                 └── Card footer (links + copyright)
  │
  ├── Feature tags (flex-wrap, 5 .tag-pill items)
  └── <Footer activeLink="support" />
```

### Secure Gateway Badge

```tsx
<div style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)' }}>
  <Shield size={11} />
  <span>SECURE GATEWAY</span>
  <span />  {/* vertical divider */}
  <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff]" />  {/* MFA dot */}
  <span>MFA READY</span>
</div>
```

### Custom Checkbox

The "Remember session" checkbox is a styled `<button>` (not a native `<input type="checkbox">`), which allows full style control:

```tsx
<button
  type="button"
  onClick={() => setRemember(!remember)}
  style={{
    background: remember ? '#00d4ff' : 'rgba(255,255,255,0.05)',
    border:     remember ? 'none'    : '1px solid rgba(255,255,255,0.15)',
  }}
>
  {remember && <Check size={10} color="#000" strokeWidth={3} />}
</button>
```

### Form Submit

`handleLogin` is wired to `onSubmit`. Currently a no-op — connect to Supabase auth here:

```tsx
const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) { /* handle error */ }
};
```

### Feature Tags

Five tags rendered from an array. To add/remove tags, edit the array in `LoginPage.tsx`:

```tsx
const FEATURE_TAGS = [
  '* Enterprise White Label',
  '* Multi-Tenant',
  '* GDPR Ready',
  '* Dynamic Branding',
  '* Marketplace Themes',
];
```

---

## `<App />`

**File:** `src/App.tsx`

Root component. Manages the page state machine and renders the appropriate page.

### State

```ts
type Page = 'landing' | 'login';
const [page, setPage] = useState<Page>('landing');
```

### Render Tree

```tsx
<div style={{ background: '#060b18' }}>
  <StarField />                                        {/* fixed, z-0 */}
  {page === 'landing'
    ? <LandingPage onEnter={() => setPage('login')} />
    : <LoginPage   onBack={() => setPage('landing')} />
  }
</div>
```

`StarField` is outside the conditional so it persists across page transitions without remounting or restarting animations.
