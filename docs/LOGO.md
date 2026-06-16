# Logo — StreamMate Enterprise

Complete reference for the StreamMate logo: assets, variants, React component API, Android integration, and usage guidelines.

---

## Asset Inventory

| File                                      | Format | Size         | Purpose                                     |
|-------------------------------------------|--------|--------------|---------------------------------------------|
| `public/favicon.svg`                      | SVG    | 100×100 vbox | Browser tab favicon                         |
| `public/logo-icon.svg`                    | SVG    | 512×512 vbox | Standalone icon — high-res web/print        |
| `public/logo-full.svg`                    | SVG    | 900×200 vbox | Full logo with wordmark — OG images, email  |
| `public/android/ic_launcher_foreground.svg` | SVG  | 108×108 dp   | Android adaptive icon — foreground layer    |
| `public/android/ic_launcher_background.svg` | SVG  | 108×108 dp   | Android adaptive icon — background layer    |
| `public/android/ic_launcher_monochrome.svg` | SVG  | 108×108 dp   | Android 12+ monochrome / Material You layer |
| `src/components/Logo.tsx`                 | React  | —            | Web portal — all variants                   |

---

## Logo Anatomy

```
┌──────────────────────────────────┐
│  ╔═══════╗  StreamMate           │
│  ║   S   ║  ─────────           │
│  ╚═══════╝  "Stream" = semibold  │
│              "Mate"  = light/60% │
└──────────────────────────────────┘
       │
       ├─ Top-left bracket    ┐ 2-sided corner in #00d4ff (1.5px)
       └─ Bottom-right bracket┘
           Icon box: #000a1e bg, rgba(255,255,255,0.08) border
           Letter S: #00d4ff (cyan), font-weight 700, Barlow
```

### Elements

| Element          | Color              | Font                    | Notes                       |
|------------------|--------------------|-------------------------|-----------------------------|
| Icon box bg      | `#000a1e` at 85%   | —                       | Dark navy fill              |
| Icon box border  | `rgba(255,255,255,0.08)` | —                 | Barely visible edge         |
| Top-left bracket | `#00d4ff`          | —                       | 2 sides: top + left, 1.5px  |
| Bottom-right bracket | `#00d4ff`      | —                       | 2 sides: bottom + right, 1.5px |
| "S" letter       | `#00d4ff`          | Barlow 700              | Cyan to match brackets      |
| "Stream" text    | `#ffffff`          | Barlow 600              | Full opacity white          |
| "Mate" text      | `rgba(255,255,255,0.6)` | Barlow 300         | Desaturated for hierarchy   |

---

## React Component

**File:** `src/components/Logo.tsx`

### Props

| Prop      | Type                              | Default    | Description                        |
|-----------|-----------------------------------|------------|------------------------------------|
| `size`    | `'sm' \| 'md' \| 'lg'`            | `'md'`     | Icon box + text size               |
| `variant` | `'full' \| 'icon' \| 'wordmark'`  | `'full'`   | Which parts to render              |
| `theme`   | `'color' \| 'white' \| 'mono'`    | `'color'`  | Accent color scheme                |

### Variant Reference

| Variant      | Renders                   | Use when                                   |
|--------------|---------------------------|--------------------------------------------|
| `'full'`     | Icon box + wordmark       | Default — all pages                        |
| `'icon'`     | Icon box only             | Favicon fallback, compact nav, app icon    |
| `'wordmark'` | "StreamMate" text only    | Footer, email signature, already-branded context |

### Theme Reference

| Theme     | Accent color             | Use when                                    |
|-----------|--------------------------|---------------------------------------------|
| `'color'` | `#00d4ff` (cyan)         | Dark backgrounds — default brand use        |
| `'white'` | `#ffffff` (pure white)   | Solid dark fills where cyan reads poorly    |
| `'mono'`  | `rgba(255,255,255,0.7)` | Monochrome prints, screenshots, overlays    |

### Size Reference

| Size   | Box (px) | Font class   | Bracket (px) |
|--------|----------|--------------|--------------|
| `'sm'` | 34       | `text-base`  | 6            |
| `'md'` | 46       | `text-xl`    | 8            |
| `'lg'` | 56       | `text-2xl`   | 10           |

### Usage Examples

```tsx
import Logo from '../components/Logo';

// Default — full color logo, medium size
<Logo />

// Icon only — nav bar, compact header
<Logo variant="icon" size="sm" />

// Large hero splash
<Logo size="lg" />

// White theme — on a colored background
<Logo theme="white" />

// Wordmark only — footer
<Logo variant="wordmark" size="sm" />

// Icon only, white, large — loading splash
<Logo variant="icon" size="lg" theme="white" />
```

---

## SVG Assets — Usage Guide

### Favicon (`public/favicon.svg`)

Already wired in `index.html`:

```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg" sizes="any" />
<link rel="apple-touch-icon" href="/logo-icon.svg" />
```

SVG favicons are supported in all modern browsers. For legacy browser support (IE, old Edge), export `favicon.svg` to a 32×32 `favicon.ico` and add:

```html
<link rel="icon" href="/favicon.ico" sizes="32x32" />
```

### Full Logo (`public/logo-full.svg`)

Dimensions: **900×200** (4.5:1 ratio). Use for:

- Open Graph / Twitter card meta image (scale to 1200×267 when embedding)
- Email header (scale to 200×44 for standard email width)
- Print materials

```html
<!-- Meta tags (update index.html) -->
<meta property="og:image" content="https://yourdomain.com/logo-full.svg" />
<meta name="twitter:image" content="https://yourdomain.com/logo-full.svg" />
```

### Icon (`public/logo-icon.svg`)

Dimensions: **512×512** (1:1). Use for:

- PWA manifest icon (`manifest.json`)
- Slack / GitHub / internal tool integration icons
- Printed materials requiring square format

PWA manifest entry:

```json
{
  "icons": [
    { "src": "/logo-icon.svg", "sizes": "any", "type": "image/svg+xml", "purpose": "any maskable" }
  ]
}
```

---

## Android Integration

### File Structure

```
app/src/main/res/
  mipmap-mdpi/    ic_launcher.png         48×48 px
  mipmap-hdpi/    ic_launcher.png         72×72 px
  mipmap-xhdpi/   ic_launcher.png         96×96 px
  mipmap-xxhdpi/  ic_launcher.png        144×144 px
  mipmap-xxxhdpi/ ic_launcher.png        192×192 px
  mipmap-anydpi-v26/
    ic_launcher.xml              ← adaptive icon manifest
    ic_launcher_round.xml        ← round variant
```

### Adaptive Icon Manifest (`ic_launcher.xml`)

```xml
<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@color/ic_launcher_background"/>
    <foreground android:drawable="@drawable/ic_launcher_foreground"/>
    <monochrome android:drawable="@drawable/ic_launcher_monochrome"/>
</adaptive-icon>
```

### Background Color Resource (`res/values/colors.xml`)

```xml
<resources>
    <color name="ic_launcher_background">#FF060B18</color>
</resources>
```

Note: Android color format is `#AARRGGBB`. The `FF` prefix means fully opaque.

### Export PNGs from SVG

Use Inkscape (CLI) to export at each required density:

```bash
# Install: https://inkscape.org
ICON="public/android/ic_launcher_foreground.svg"

inkscape --export-type=png --export-width=48   --export-filename="ic_launcher_foreground_mdpi.png"    $ICON
inkscape --export-type=png --export-width=72   --export-filename="ic_launcher_foreground_hdpi.png"    $ICON
inkscape --export-type=png --export-width=96   --export-filename="ic_launcher_foreground_xhdpi.png"   $ICON
inkscape --export-type=png --export-width=144  --export-filename="ic_launcher_foreground_xxhdpi.png"  $ICON
inkscape --export-type=png --export-width=192  --export-filename="ic_launcher_foreground_xxxhdpi.png" $ICON
inkscape --export-type=png --export-width=512  --export-filename="ic_launcher_foreground_playstore.png" $ICON
```

Or use Android Studio's **Image Asset Studio**:
1. Right-click `app/res` → **New → Image Asset**
2. Select **Launcher Icons (Adaptive and Legacy)**
3. Foreground layer: import `ic_launcher_foreground.svg`
4. Background layer: **Color** → enter `#060B18`
5. Monochrome layer: import `ic_launcher_monochrome.svg`

### Play Store

The Play Store requires a **512×512 PNG** icon. Export:

```bash
inkscape --export-type=png --export-width=512 \
  --export-background="#060b18" \
  --export-filename="play_store_512.png" \
  public/logo-icon.svg
```

---

## Clearspace Rules

Minimum clearspace around the logo equals **the height of the bracket** on all sides.

```
         ↑ 1× bracket height
    ←1×  [LOGO]  1×→
         ↓ 1× bracket height
```

| Component size | Bracket height | Min clearspace |
|----------------|---------------|----------------|
| `sm` (34px)    | 6px           | 6px all sides  |
| `md` (46px)    | 8px           | 8px all sides  |
| `lg` (56px)    | 10px          | 10px all sides |
| SVG icon (512) | 60px          | 60px all sides |

---

## Usage Rules

### Do

- Use on dark backgrounds (`#060b18` or darker)
- Maintain aspect ratio — never stretch or squish
- Use the React component in the web portal (it respects the design system)
- Use SVG files for any external / non-React context

### Do Not

- Do not change `#00d4ff` bracket color to any other accent
- Do not place the logo on light or white backgrounds without switching to `theme="white"`
- Do not add drop shadows, glows, or filters to the logo
- Do not use the "S" letter alone without brackets (it loses identity)
- Do not reorder "Stream" and "Mate" or change their font weights
- Do not embed the logo at sizes below 28px wide (icon) — use a simplified mark

---

## Font Availability in SVG

The SVG files reference Barlow via `@import url('https://fonts.googleapis.com/css2?family=Barlow:wght@700...')`.

This works when:
- The SVG is loaded in a browser with internet access
- The SVG is embedded in HTML (`<img src>` may NOT load external fonts)

For production / offline use, one of these approaches is required:
1. **Convert "S" to a path** in Inkscape: **Path → Object to Path** on the text element
2. **Base64 embed the font** in `<defs><style>@font-face { src: url("data:...") }`
3. **Use Android Studio Image Asset Studio** which rasterizes correctly regardless

For system-font fallback, the SVG uses `font-family="Barlow, 'Arial Black', Arial, sans-serif"` which degrades gracefully.
