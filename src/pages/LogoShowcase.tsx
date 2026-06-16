import { ArrowLeft, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import Logo from '../components/Logo';

interface LogoShowcaseProps {
  onBack: () => void;
}

type LogoVariant = 'full' | 'icon' | 'wordmark';
type LogoTheme = 'color' | 'white' | 'mono';
type LogoSize = 'sm' | 'md' | 'lg';

const MONO_LABEL: Record<string, string> = { fontFamily: 'Space Mono, monospace' };

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <div className="relative group">
      <pre
        className="text-xs leading-relaxed overflow-x-auto px-5 py-4 rounded-sm"
        style={{
          fontFamily: 'Space Mono, monospace',
          background: 'rgba(0,0,0,0.4)',
          border: '1px solid rgba(255,255,255,0.07)',
          color: 'rgba(255,255,255,0.75)',
        }}
      >
        {code}
      </pre>
      <button
        onClick={copy}
        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm"
        style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
      >
        {copied
          ? <Check size={11} style={{ color: '#00d4ff' }} />
          : <Copy size={11} style={{ color: 'rgba(255,255,255,0.5)' }} />}
        <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.58rem', color: copied ? '#00d4ff' : 'rgba(255,255,255,0.5)', letterSpacing: '0.05em' }}>
          {copied ? 'COPIED' : 'COPY'}
        </span>
      </button>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span
        style={{
          fontFamily: 'Space Mono, monospace',
          fontSize: '0.62rem',
          letterSpacing: '0.18em',
          color: '#00d4ff',
        }}
      >
        {children}
      </span>
      <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
    </div>
  );
}

function Cell({ label, dark = false, children }: { label: string; dark?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <div
        className="flex items-center justify-center rounded-sm py-8 px-6"
        style={{
          background: dark ? '#060b18' : 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.07)',
          minHeight: 96,
        }}
      >
        {children}
      </div>
      <span
        style={{
          fontFamily: 'Space Mono, monospace',
          fontSize: '0.58rem',
          color: 'rgba(255,255,255,0.3)',
          letterSpacing: '0.08em',
          textAlign: 'center',
        }}
      >
        {label}
      </span>
    </div>
  );
}

function ColorSwatch({ name, hex, opacity }: { name: string; hex: string; opacity?: string }) {
  const [copied, setCopied] = useState(false);
  const display = opacity ? `rgba(${opacity})` : hex;
  const copy = () => {
    navigator.clipboard.writeText(display).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button
      onClick={copy}
      className="flex flex-col gap-2 group"
    >
      <div
        className="w-full h-14 rounded-sm transition-transform group-hover:scale-[1.03]"
        style={{
          background: opacity ? `rgba(${opacity})` : hex,
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      />
      <div className="text-left">
        <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.6rem', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.05em' }}>
          {name}
        </div>
        <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.56rem', color: copied ? '#00d4ff' : 'rgba(255,255,255,0.3)', letterSpacing: '0.04em' }}>
          {copied ? 'COPIED' : display}
        </div>
      </div>
    </button>
  );
}

function AssetCard({ path, label, viewBox, purpose, preview }: {
  path: string; label: string; viewBox: string; purpose: string; preview: React.ReactNode;
}) {
  return (
    <div
      className="flex flex-col rounded-sm overflow-hidden"
      style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}
    >
      <div
        className="flex items-center justify-center py-10"
        style={{ background: 'rgba(0,0,0,0.3)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        {preview}
      </div>
      <div className="px-4 py-3 flex flex-col gap-1">
        <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.65rem', color: 'rgba(255,255,255,0.8)', letterSpacing: '0.05em' }}>
          {label}
        </span>
        <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.55rem', color: '#00d4ff', letterSpacing: '0.04em' }}>
          {path}
        </span>
        <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.55rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.04em' }}>
          viewBox: {viewBox}
        </span>
        <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.55rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.03em', marginTop: 2 }}>
          {purpose}
        </span>
      </div>
    </div>
  );
}

const VARIANTS: LogoVariant[] = ['full', 'icon', 'wordmark'];
const THEMES: LogoTheme[] = ['color', 'white', 'mono'];
const SIZES: LogoSize[] = ['sm', 'md', 'lg'];

export default function LogoShowcase({ onBack }: LogoShowcaseProps) {
  const [activeVariant, setActiveVariant] = useState<LogoVariant>('full');
  const [activeTheme, setActiveTheme] = useState<LogoTheme>('color');
  const [activeSize, setActiveSize] = useState<LogoSize>('md');

  return (
    <div className="min-h-screen relative z-10">
      {/* Header */}
      <div
        className="sticky top-0 z-20 flex items-center justify-between px-8 py-4"
        style={{
          background: 'rgba(6,11,24,0.92)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <button
          onClick={onBack}
          className="flex items-center gap-2 transition-colors"
          style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.72rem', letterSpacing: '0.05em', color: 'rgba(255,255,255,0.45)' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.8)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
        >
          <ArrowLeft size={13} />
          Back
        </button>
        <div className="flex flex-col items-center">
          <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.2em', color: '#00d4ff' }}>
            DEVELOPER DOCS
          </span>
          <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.7)' }}>
            Brand & Logo Guidelines
          </span>
        </div>
        <div
          className="flex items-center gap-2"
          style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.25)' }}
        >
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
          v4.0.0-RC.1
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-14 flex flex-col gap-16">

        {/* ─── Hero ─────────────────────────────────────── */}
        <div className="flex flex-col items-center text-center gap-4">
          <Logo size="lg" />
          <p
            style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '0.72rem',
              letterSpacing: '0.08em',
              color: 'rgba(255,255,255,0.4)',
              maxWidth: 520,
            }}
          >
            Official brand assets, usage rules, and implementation reference for the StreamMate Enterprise design system.
          </p>
        </div>

        {/* ─── Interactive playground ───────────────────── */}
        <section>
          <SectionLabel>LOGO PLAYGROUND</SectionLabel>
          <div
            className="rounded-sm overflow-hidden"
            style={{ border: '1px solid rgba(255,255,255,0.07)' }}
          >
            {/* Controls */}
            <div
              className="flex flex-wrap items-center gap-6 px-6 py-4"
              style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
            >
              {/* variant */}
              <div className="flex flex-col gap-1.5">
                <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.3)' }}>VARIANT</span>
                <div className="flex gap-1">
                  {VARIANTS.map((v) => (
                    <button
                      key={v}
                      onClick={() => setActiveVariant(v)}
                      className="px-3 py-1.5 rounded-sm transition-all"
                      style={{
                        fontFamily: 'Space Mono, monospace',
                        fontSize: '0.6rem',
                        letterSpacing: '0.06em',
                        background: activeVariant === v ? '#00d4ff' : 'rgba(255,255,255,0.04)',
                        color: activeVariant === v ? '#000' : 'rgba(255,255,255,0.5)',
                        border: `1px solid ${activeVariant === v ? '#00d4ff' : 'rgba(255,255,255,0.08)'}`,
                      }}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
              {/* theme */}
              <div className="flex flex-col gap-1.5">
                <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.3)' }}>THEME</span>
                <div className="flex gap-1">
                  {THEMES.map((t) => (
                    <button
                      key={t}
                      onClick={() => setActiveTheme(t)}
                      className="px-3 py-1.5 rounded-sm transition-all"
                      style={{
                        fontFamily: 'Space Mono, monospace',
                        fontSize: '0.6rem',
                        letterSpacing: '0.06em',
                        background: activeTheme === t ? '#00d4ff' : 'rgba(255,255,255,0.04)',
                        color: activeTheme === t ? '#000' : 'rgba(255,255,255,0.5)',
                        border: `1px solid ${activeTheme === t ? '#00d4ff' : 'rgba(255,255,255,0.08)'}`,
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              {/* size */}
              <div className="flex flex-col gap-1.5">
                <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.3)' }}>SIZE</span>
                <div className="flex gap-1">
                  {SIZES.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setActiveSize(sz)}
                      className="px-3 py-1.5 rounded-sm transition-all"
                      style={{
                        fontFamily: 'Space Mono, monospace',
                        fontSize: '0.6rem',
                        letterSpacing: '0.06em',
                        background: activeSize === sz ? '#00d4ff' : 'rgba(255,255,255,0.04)',
                        color: activeSize === sz ? '#000' : 'rgba(255,255,255,0.5)',
                        border: `1px solid ${activeSize === sz ? '#00d4ff' : 'rgba(255,255,255,0.08)'}`,
                      }}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {/* Preview */}
            <div
              className="flex items-center justify-center"
              style={{ minHeight: 160, background: '#060b18' }}
            >
              <Logo variant={activeVariant} theme={activeTheme} size={activeSize} />
            </div>
            {/* Generated code */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <CodeBlock
                code={`import Logo from '../components/Logo';\n\n<Logo variant="${activeVariant}" theme="${activeTheme}" size="${activeSize}" />`}
              />
            </div>
          </div>
        </section>

        {/* ─── All variants matrix ──────────────────────── */}
        <section>
          <SectionLabel>ALL VARIANTS</SectionLabel>
          <div className="flex flex-col gap-10">
            {THEMES.map((theme) => (
              <div key={theme}>
                <div className="flex items-center gap-2 mb-4">
                  <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)' }}>
                    theme="{theme}"
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {VARIANTS.map((variant) => (
                    <Cell key={variant} label={`variant="${variant}"`} dark>
                      <Logo variant={variant} theme={theme} size="md" />
                    </Cell>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Size reference ───────────────────────────── */}
        <section>
          <SectionLabel>SIZE REFERENCE</SectionLabel>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {SIZES.map((sz) => (
              <Cell key={sz} label={`size="${sz}"`} dark>
                <Logo size={sz} />
              </Cell>
            ))}
          </div>
        </section>

        {/* ─── Favicon sizes ────────────────────────────── */}
        <section>
          <SectionLabel>FAVICON AT ACTUAL SIZES</SectionLabel>
          <div className="flex flex-wrap items-end gap-8">
            {[16, 32, 64, 128].map((px) => (
              <div key={px} className="flex flex-col items-center gap-3">
                <div
                  className="flex items-center justify-center rounded-sm"
                  style={{
                    width: 96,
                    height: 96,
                    background: 'rgba(0,0,0,0.4)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <img
                    src="/favicon.svg"
                    alt="favicon"
                    width={px}
                    height={px}
                    style={{ imageRendering: 'pixelated' }}
                  />
                </div>
                <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.58rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.06em' }}>
                  {px}×{px}px
                </span>
              </div>
            ))}
          </div>
          <p
            className="mt-5"
            style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.62rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.03em', lineHeight: 1.8 }}
          >
            SVG favicons scale losslessly. At 16px the "S" letterform remains legible due to the high-contrast cyan (#00d4ff) on dark (#060b18) background.
          </p>
        </section>

        {/* ─── SVG Asset inventory ──────────────────────── */}
        <section>
          <SectionLabel>SVG ASSET INVENTORY</SectionLabel>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <AssetCard
              path="public/favicon.svg"
              label="Favicon"
              viewBox="0 0 100 100"
              purpose="Browser tab, bookmarks, PWA shortcut"
              preview={<img src="/favicon.svg" alt="favicon" width={56} height={56} />}
            />
            <AssetCard
              path="public/logo-icon.svg"
              label="Logo Icon"
              viewBox="0 0 512 512"
              purpose="Standalone icon — web, print, high-res contexts"
              preview={<img src="/logo-icon.svg" alt="logo icon" height={56} />}
            />
            <AssetCard
              path="public/logo-full.svg"
              label="Logo Full"
              viewBox="0 0 900 200"
              purpose="Full wordmark — OG images, email header, print"
              preview={<img src="/logo-full.svg" alt="logo full" height={40} style={{ maxWidth: 180 }} />}
            />
            <AssetCard
              path="public/android/ic_launcher_foreground.svg"
              label="Android Foreground"
              viewBox="0 0 108 108"
              purpose="Adaptive icon foreground layer (108dp)"
              preview={<img src="/android/ic_launcher_foreground.svg" alt="android fg" height={56} />}
            />
            <AssetCard
              path="public/android/ic_launcher_background.svg"
              label="Android Background"
              viewBox="0 0 108 108"
              purpose="Adaptive icon background layer (108dp)"
              preview={
                <div
                  style={{ width: 56, height: 56, borderRadius: '50%', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <img src="/android/ic_launcher_background.svg" alt="android bg" width={56} height={56} />
                </div>
              }
            />
            <AssetCard
              path="public/android/ic_launcher_monochrome.svg"
              label="Android Monochrome"
              viewBox="0 0 108 108"
              purpose="Material You monochrome layer (Android 12+)"
              preview={<img src="/android/ic_launcher_monochrome.svg" alt="android mono" height={56} />}
            />
          </div>
        </section>

        {/* ─── Color tokens ─────────────────────────────── */}
        <section>
          <SectionLabel>COLOR TOKENS</SectionLabel>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            <ColorSwatch name="Cyan (Primary)" hex="#00d4ff" />
            <ColorSwatch name="Cyan Hover" hex="#22e8ff" />
            <ColorSwatch name="Background" hex="#060b18" />
            <ColorSwatch name="Icon Box" hex="#000a1e" />
            <ColorSwatch name="Icon Box BG" opacity="0,10,30,0.8" />
            <ColorSwatch name="Glass Card" opacity="255,255,255,0.025" />
            <ColorSwatch name="Border Dim" opacity="255,255,255,0.07" />
            <ColorSwatch name="Text Muted" opacity="255,255,255,0.5" />
          </div>
          <div className="mt-6">
            <CodeBlock
              code={`:root {\n  --cyan: #00d4ff;\n  --cyan-hover: #22e8ff;\n  --bg: #060b18;\n  --icon-box: #000a1e;\n  --border: rgba(255,255,255,0.07);\n  --text-muted: rgba(255,255,255,0.5);\n}`}
            />
          </div>
        </section>

        {/* ─── React component API ──────────────────────── */}
        <section>
          <SectionLabel>REACT COMPONENT API</SectionLabel>
          <div
            className="rounded-sm overflow-hidden"
            style={{ border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <table className="w-full text-left">
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  {['Prop', 'Type', 'Default', 'Values'].map((h) => (
                    <th
                      key={h}
                      className="px-5 py-3"
                      style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.1em', color: '#00d4ff' }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { prop: 'variant', type: 'string', def: '"full"', vals: '"full" | "icon" | "wordmark"' },
                  { prop: 'theme', type: 'string', def: '"color"', vals: '"color" | "white" | "mono"' },
                  { prop: 'size', type: 'string', def: '"md"', vals: '"sm" | "md" | "lg"' },
                ].map((row, i) => (
                  <tr
                    key={row.prop}
                    style={{
                      borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                      background: i % 2 === 0 ? 'rgba(255,255,255,0.015)' : 'transparent',
                    }}
                  >
                    <td className="px-5 py-3.5" style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.62rem', color: '#00d4ff', letterSpacing: '0.04em' }}>{row.prop}</td>
                    <td className="px-5 py-3.5" style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.62rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.04em' }}>{row.type}</td>
                    <td className="px-5 py-3.5" style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.62rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.04em' }}>{row.def}</td>
                    <td className="px-5 py-3.5" style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.62rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.04em' }}>{row.vals}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4">
            <CodeBlock
              code={`// Default full logo\n<Logo />\n\n// Icon-only, small\n<Logo variant="icon" size="sm" />\n\n// Wordmark on light background (wrap in dark container)\n<Logo variant="wordmark" theme="white" size="lg" />\n\n// Monochrome variant (e.g. footer, watermark)\n<Logo variant="full" theme="mono" size="sm" />`}
            />
          </div>
        </section>

        {/* ─── Do / Don't ───────────────────────────────── */}
        <section>
          <SectionLabel>DO / DON'T</SectionLabel>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* DO */}
            <div
              className="rounded-sm overflow-hidden"
              style={{ border: '1px solid rgba(0,212,255,0.2)' }}
            >
              <div
                className="px-5 py-3 flex items-center gap-2"
                style={{ background: 'rgba(0,212,255,0.06)', borderBottom: '1px solid rgba(0,212,255,0.1)' }}
              >
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
                <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.62rem', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.7)' }}>DO</span>
              </div>
              <ul className="px-5 py-4 flex flex-col gap-2.5">
                {[
                  'Use the React component — never recreate SVG manually',
                  'Maintain bracket corner proportions at all sizes',
                  'Use cyan #00d4ff on dark backgrounds only',
                  'Use theme="white" on very dark or image backgrounds',
                  'Use theme="mono" for subtle/secondary placements',
                  'Link to /logo-full.svg for email and OG image headers',
                  'Use Android adaptive icons — never the full SVG on Android',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span style={{ color: '#00d4ff', fontSize: '0.6rem', marginTop: 2 }}>+</span>
                    <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.62rem', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.03em', lineHeight: 1.7 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* DON'T */}
            <div
              className="rounded-sm overflow-hidden"
              style={{ border: '1px solid rgba(255,60,60,0.15)' }}
            >
              <div
                className="px-5 py-3 flex items-center gap-2"
                style={{ background: 'rgba(255,60,60,0.05)', borderBottom: '1px solid rgba(255,60,60,0.1)' }}
              >
                <span className="inline-block w-2 h-2 rounded-full bg-red-400" />
                <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.62rem', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.7)' }}>DON'T</span>
              </div>
              <ul className="px-5 py-4 flex flex-col gap-2.5">
                {[
                  'Never rotate or skew the logo',
                  'Never change the "S" letterform or font weight',
                  'Never use on light/white backgrounds without a dark wrapper',
                  'Never stretch or squash the icon box aspect ratio',
                  'Never add drop shadow, glow effects, or outline strokes',
                  'Never use the icon below 24×24px rendered size',
                  'Never place the logo inside a circle or badge shape',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span style={{ color: '#ff5c5c', fontSize: '0.6rem', marginTop: 2 }}>×</span>
                    <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.62rem', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.03em', lineHeight: 1.7 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ─── HTML / static usage ──────────────────────── */}
        <section>
          <SectionLabel>HTML / STATIC USAGE</SectionLabel>
          <CodeBlock
            code={`<!-- Favicon -->\n<link rel="icon" type="image/svg+xml" href="/favicon.svg" sizes="any" />\n<link rel="apple-touch-icon" href="/logo-icon.svg" />\n\n<!-- OG / Social -->\n<meta property="og:image" content="/logo-full.svg" />\n<meta name="twitter:card" content="summary_large_image" />\n\n<!-- PWA Manifest -->\n{\n  "icons": [\n    { "src": "/logo-icon.svg", "sizes": "512x512", "type": "image/svg+xml", "purpose": "any maskable" }\n  ]\n}`}
          />
        </section>

        {/* Footer pad */}
        <div className="h-8" />
      </div>
    </div>
  );
}
