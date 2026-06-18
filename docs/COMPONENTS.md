# Components — StreamMate Enterprise

API reference, props, and usage examples for every component in the project.

---

## Component Map

```
src/
├── components/
│   ├── StarField.tsx    # Background layer — rendered once in App.tsx
│   ├── Logo.tsx         # Brand mark — used in all pages
│   └── Footer.tsx       # Bottom bar — used in web pages
└── pages/
    ├── LandingPage.tsx  # Route: 'landing'
    ├── LoginPage.tsx    # Route: 'login'
    ├── LogoShowcase.tsx # Route: 'showcase'
    └── AndroidDesign.tsx # Route: 'android'  ← contains LoadingScreen + LoginScreen
```

---

## `<StarField />`

**File:** `src/components/StarField.tsx`

Renders the background layer: a CSS dot-grid pattern plus a central blue radial glow. Fixed to the viewport, renders once in `App.tsx` and persists across all page transitions.

### Props

None. Pure presentational component.

### Usage

```tsx
// Always place as the first child of the root div in App.tsx
<div className="min-h-screen relative overflow-hidden" style={{ background: '#030c18' }}>
  <StarField />
  {/* page content */}
</div>
```

### Implementation

Two CSS layers stacked inside a `position: fixed; inset: 0` container:

```css
/* Layer 1 — dot grid */
background-image: radial-gradient(circle, rgba(90,160,220,0.38) 1px, transparent 1px);
background-size: 28px 28px;

/* Layer 2 — central glow */
background: radial-gradient(ellipse 70% 55% at 50% 48%,
  rgba(0,90,200,0.30) 0%,
  rgba(0,50,140,0.18) 40%,
  transparent 70%);
```

### Customization

| Concern         | Where to change                    |
|-----------------|------------------------------------|
| Dot density     | `background-size: 28px 28px`       |
| Dot brightness  | `rgba(90,160,220,0.38)` alpha value|
| Glow spread     | `ellipse 70% 55%` values           |
| Glow color      | `rgba(0,90,200,...)` hue           |

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

## Android App Screens

**File:** `src/pages/AndroidDesign.tsx`

Standalone developer reference page that showcases interactive phone mockups for the Android app. Accessed via the Footer "Android" link.

All Android screen components are **private** to `AndroidDesign.tsx` (not exported). They are rendered inside `<PhoneFrame>` wrappers which add the device bezel, side buttons, punch-hole camera, and home indicator.

---

### Screen Navigation Flow

```
App Launch
    │
    ▼
┌─────────────────────────────────────────────────────────────┐
│  LOADING SCREEN  (automatic, ~1–2 s)                        │
│  Auth state check runs in background                        │
│  No user interaction possible                               │
└──────────────────────────────────────────────────────────────┘
    │                           │
    ▼ Session found             ▼ No session
  Home Screen              WELCOME SCREEN  (user-initiated)
                                │
                                ▼
                           LOGIN SCREEN
```

> **Key distinction:** The Loading Screen is automatic and non-interactive. The Welcome Screen is the first place a user can actually do something — it persists until they tap a CTA.

---

### `LoadingScreen` (internal component)

**Purpose:** Splash screen. Shown immediately on app boot while auth state is resolved.

**Rules:**
- Zero interactive elements — no buttons, no text other than the logo
- Must never linger longer than necessary — dismiss as soon as auth check resolves
- Always navigates **forward** (Home or Welcome); never navigates back

```
┌────────────────────────────┐
│  [status bar — transparent] │
│                             │
│                             │
│          [LOGO md]          │  ← only element
│                             │
│                             │
│  [home indicator]           │
└─────────────────────────────┘
```

| Prop | — | None. Auto-dismiss is wired to the auth listener. |

---

### `WelcomeScreen` (planned / not yet mocked)

**Purpose:** First interactive screen for unauthenticated users. Presents brand identity and provides explicit navigation to Login.

**Rules:**
- Must have at least one primary CTA button ("Get Started" → LoginScreen)
- Logo should use `size="lg"` — more visual weight than the Loading Screen logo
- Optionally include tagline, feature bullets, or a background animation
- User must actively tap to proceed; never auto-dismisses

```
┌─────────────────────────────┐
│  [status bar]               │
│                             │
│       [LOGO  lg]            │
│   "Tagline / value prop"    │
│                             │
│   [ GET STARTED → ]  (CTA)  │
│   [ Learn more    ]  (sec.) │
│                             │
│  [home indicator]           │
└─────────────────────────────┘
```

> Difference from LoadingScreen at a glance: LoadingScreen = **logo only, automatic**. WelcomeScreen = **logo + text + buttons, user-controlled**.

---

### `LoginScreen` (internal component, interactive mockup)

**Purpose:** Authentication. Three access methods selectable via tab bar.

| Method        | Description                                              |
|---------------|----------------------------------------------------------|
| **Code**      | 8-character segmented input (`XXXX–XXXX`) + VERIFY CODE  |
| **QR Code**   | Camera viewfinder with animated scan line                |
| **Advanced**  | Collapsible panel — XC Codes (URL/user/pass) or M3U URL  |

Advanced Setup is hidden by default to reduce visual noise on the default view.

---

### `PhoneFrame` (internal component)

Wraps any screen content in a realistic Android phone bezel. Dimensions: **280 × 588 px**. Corner radius: **42 px** (outer) / **35 px** (screen).

```tsx
<PhoneFrame label="LOADING SCREEN  —  SPLASH">
  <LoadingScreen />
</PhoneFrame>
```

`label` appears below the device in Space Mono, 0.6rem, muted white.

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
