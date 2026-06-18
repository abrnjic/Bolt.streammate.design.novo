import { ArrowLeft, QrCode, Key, ChevronDown, ChevronUp, Wifi, Battery, Signal, Eye, EyeOff, Link } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import Logo from '../components/Logo';

interface AndroidDesignProps {
  onBack: () => void;
}

// ─── Status Bar ────────────────────────────────────────────────────────────────
function StatusBar({ light = false }: { light?: boolean }) {
  const [time, setTime] = useState(() => {
    const n = new Date();
    return `${n.getHours().toString().padStart(2, '0')}:${n.getMinutes().toString().padStart(2, '0')}`;
  });
  useEffect(() => {
    const t = setInterval(() => {
      const n = new Date();
      setTime(`${n.getHours().toString().padStart(2, '0')}:${n.getMinutes().toString().padStart(2, '0')}`);
    }, 10000);
    return () => clearInterval(t);
  }, []);

  const color = light ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.6)';
  return (
    <div className="flex items-center justify-between px-5 pt-2 pb-1" style={{ height: 28 }}>
      <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.58rem', color, letterSpacing: '0.04em' }}>{time}</span>
      <div className="flex items-center gap-1" style={{ color }}>
        <Signal size={10} />
        <Wifi size={10} />
        <Battery size={10} />
      </div>
    </div>
  );
}

// ─── Phone Frame ───────────────────────────────────────────────────────────────
function PhoneFrame({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-5">
      <div
        className="relative flex-shrink-0"
        style={{
          width: 280,
          height: 588,
          borderRadius: 42,
          background: 'linear-gradient(160deg, #1c1c1e 0%, #0d0d0f 100%)',
          border: '1.5px solid rgba(255,255,255,0.1)',
          boxShadow:
            '0 0 0 1px rgba(0,0,0,0.8), 0 40px 100px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.07), inset 0 -1px 0 rgba(0,0,0,0.4)',
          padding: 8,
        }}
      >
        {/* Side buttons */}
        <div
          className="absolute"
          style={{
            left: -3, top: 100, width: 3, height: 32, borderRadius: '2px 0 0 2px',
            background: 'linear-gradient(180deg, #242424, #1a1a1a)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        />
        <div
          className="absolute"
          style={{
            left: -3, top: 144, width: 3, height: 28, borderRadius: '2px 0 0 2px',
            background: 'linear-gradient(180deg, #242424, #1a1a1a)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        />
        <div
          className="absolute"
          style={{
            right: -3, top: 120, width: 3, height: 52, borderRadius: '0 2px 2px 0',
            background: 'linear-gradient(180deg, #242424, #1a1a1a)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        />

        {/* Screen */}
        <div
          className="w-full h-full overflow-hidden flex flex-col"
          style={{ borderRadius: 35, background: '#060b18' }}
        >
          {/* Punch-hole camera */}
          <div className="absolute" style={{ top: 14, left: '50%', transform: 'translateX(-50%)', zIndex: 20 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#0a0a0c' }} />
          </div>
          {children}
        </div>

        {/* Home indicator */}
        <div
          className="absolute bottom-3 left-1/2 -translate-x-1/2"
          style={{ width: 100, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.18)' }}
        />
      </div>

      <span style={{
        fontFamily: 'Space Mono, monospace',
        fontSize: '0.6rem',
        letterSpacing: '0.14em',
        color: 'rgba(255,255,255,0.3)',
      }}>
        {label}
      </span>
    </div>
  );
}

// ─── Loading Screen (Splash) ───────────────────────────────────────────────────
// Shown on app boot while auth state is resolved. Pure brand moment — no interaction.
// Auto-dismisses: if session exists → Home; if not → Welcome Screen.
function LoadingScreen() {
  return (
    <div className="flex-1 flex flex-col" style={{ background: '#060b18' }}>
      <StatusBar />
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Logo size="md" />
        </div>
      </div>
      {/* Bottom safe area */}
      <div style={{ height: 24 }} />
    </div>
  );
}

// ─── QR Scanner placeholder ────────────────────────────────────────────────────
function QrScanner() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="relative flex items-center justify-center"
        style={{ width: 168, height: 168 }}
      >
        {/* Corner brackets */}
        {[
          { top: 0, left: 0, bt: `2px solid #00d4ff`, bl: `2px solid #00d4ff`, bb: 'none', br: 'none' },
          { top: 0, right: 0, bt: `2px solid #00d4ff`, br: `2px solid #00d4ff`, bb: 'none', bl: 'none' },
          { bottom: 0, left: 0, bb: `2px solid #00d4ff`, bl: `2px solid #00d4ff`, bt: 'none', br: 'none' },
          { bottom: 0, right: 0, bb: `2px solid #00d4ff`, br: `2px solid #00d4ff`, bt: 'none', bl: 'none' },
        ].map((pos, i) => (
          <span
            key={i}
            className="absolute"
            style={{ width: 20, height: 20, ...pos as React.CSSProperties }}
          />
        ))}

        {/* Fake QR grid */}
        <div
          className="grid"
          style={{
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: 2,
            width: 112,
            opacity: 0.15,
          }}
        >
          {Array.from({ length: 49 }).map((_, i) => {
            const row = Math.floor(i / 7);
            const col = i % 7;
            const isCorner =
              (row < 3 && col < 3) ||
              (row < 3 && col > 3) ||
              (row > 3 && col < 3);
            const filled = isCorner || Math.random() > 0.5;
            return (
              <div
                key={i}
                style={{
                  width: 12, height: 12,
                  background: filled ? 'rgba(255,255,255,0.8)' : 'transparent',
                  borderRadius: 1,
                }}
              />
            );
          })}
        </div>

        {/* Scan line animation */}
        <div
          className="absolute left-3 right-3"
          style={{
            height: 1,
            background: 'linear-gradient(90deg, transparent, #00d4ff, transparent)',
            animation: 'scanLine 2s ease-in-out infinite',
            top: '40%',
          }}
        />
      </div>

      <p style={{
        fontFamily: 'Space Mono, monospace',
        fontSize: '0.6rem',
        color: 'rgba(255,255,255,0.35)',
        letterSpacing: '0.06em',
        textAlign: 'center',
        lineHeight: 1.8,
      }}>
        Point camera at your<br />StreamMate QR code
      </p>
    </div>
  );
}

// ─── Access Code Input ─────────────────────────────────────────────────────────
function CodeInput() {
  const [code, setCode] = useState(['', '', '', '', '', '', '', '']);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (i: number, val: string) => {
    const ch = val.replace(/[^A-Za-z0-9]/g, '').toUpperCase().slice(-1);
    const next = [...code];
    next[i] = ch;
    setCode(next);
    if (ch && i < 7) refs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[i] && i > 0) refs.current[i - 1]?.focus();
  };

  return (
    <div className="flex flex-col items-center gap-5 w-full">
      <div className="flex items-center gap-1.5">
        {code.map((ch, i) => (
          <>
            {i === 4 && (
              <span key="sep" style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.7rem', marginInline: 2 }}>—</span>
            )}
            <input
              key={i}
              ref={(el) => { refs.current[i] = el; }}
              type="text"
              value={ch}
              maxLength={1}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className="text-center transition-colors"
              style={{
                width: 26, height: 32,
                background: ch ? 'rgba(0,212,255,0.08)' : 'rgba(255,255,255,0.04)',
                border: `1.5px solid ${ch ? '#00d4ff' : 'rgba(255,255,255,0.1)'}`,
                borderRadius: 4,
                color: '#00d4ff',
                fontFamily: 'Space Mono, monospace',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.05em',
                outline: 'none',
                caretColor: '#00d4ff',
              }}
            />
          </>
        ))}
      </div>
      <p style={{
        fontFamily: 'Space Mono, monospace',
        fontSize: '0.55rem',
        color: 'rgba(255,255,255,0.25)',
        letterSpacing: '0.06em',
        textAlign: 'center',
      }}>
        Enter the 8-digit access code
      </p>
      <button
        className="w-full py-3 rounded-sm transition-all"
        style={{
          background: code.every(c => c) ? '#00d4ff' : 'rgba(255,255,255,0.05)',
          border: `1px solid ${code.every(c => c) ? '#00d4ff' : 'rgba(255,255,255,0.08)'}`,
          color: code.every(c => c) ? '#000' : 'rgba(255,255,255,0.25)',
          fontFamily: 'Space Mono, monospace',
          fontSize: '0.6rem',
          letterSpacing: '0.14em',
          cursor: code.every(c => c) ? 'pointer' : 'default',
        }}
      >
        VERIFY CODE
      </button>
    </div>
  );
}

// ─── Manual Form ───────────────────────────────────────────────────────────────
function ManualForm() {
  const [xcUrl, setXcUrl] = useState('');
  const [xcUser, setXcUser] = useState('');
  const [xcPass, setXcPass] = useState('');
  const [m3uUrl, setM3uUrl] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [tab, setTab] = useState<'xc' | 'm3u'>('xc');

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '8px 10px',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 4,
    color: '#fff',
    fontFamily: 'Space Mono, monospace',
    fontSize: '0.6rem',
    letterSpacing: '0.03em',
    outline: 'none',
  };
  const labelStyle: React.CSSProperties = {
    fontFamily: 'Space Mono, monospace',
    fontSize: '0.52rem',
    color: 'rgba(255,255,255,0.3)',
    letterSpacing: '0.12em',
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* XC / M3U tabs */}
      <div className="flex rounded-sm overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
        {(['xc', 'm3u'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="flex-1 py-2 transition-colors"
            style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '0.55rem',
              letterSpacing: '0.1em',
              background: tab === t ? 'rgba(0,212,255,0.12)' : 'transparent',
              color: tab === t ? '#00d4ff' : 'rgba(255,255,255,0.3)',
              borderRight: t === 'xc' ? '1px solid rgba(255,255,255,0.08)' : 'none',
            }}
          >
            {t === 'xc' ? 'XC CODES' : 'M3U URL'}
          </button>
        ))}
      </div>

      {tab === 'xc' ? (
        <div className="flex flex-col gap-2.5">
          <div className="flex flex-col gap-1">
            <span style={labelStyle}>SERVER URL</span>
            <input
              value={xcUrl}
              onChange={(e) => setXcUrl(e.target.value)}
              placeholder="http://provider.com:8080"
              style={{ ...inputStyle, caretColor: '#00d4ff' }}
            />
          </div>
          <div className="flex flex-col gap-1">
            <span style={labelStyle}>USERNAME</span>
            <input
              value={xcUser}
              onChange={(e) => setXcUser(e.target.value)}
              placeholder="username"
              style={{ ...inputStyle, caretColor: '#00d4ff' }}
            />
          </div>
          <div className="flex flex-col gap-1">
            <span style={labelStyle}>PASSWORD</span>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                value={xcPass}
                onChange={(e) => setXcPass(e.target.value)}
                placeholder="••••••••"
                style={{ ...inputStyle, paddingRight: 28, caretColor: '#00d4ff' }}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-2 top-1/2 -translate-y-1/2"
                style={{ color: 'rgba(255,255,255,0.25)' }}
              >
                {showPass ? <EyeOff size={11} /> : <Eye size={11} />}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          <span style={labelStyle}>M3U PLAYLIST URL</span>
          <div className="relative">
            <input
              value={m3uUrl}
              onChange={(e) => setM3uUrl(e.target.value)}
              placeholder="http://provider.com/get.php?..."
              style={{ ...inputStyle, paddingLeft: 28, caretColor: '#00d4ff' }}
            />
            <Link size={11} className="absolute left-2 top-1/2 -translate-y-1/2" style={{ color: 'rgba(255,255,255,0.2)' }} />
          </div>
        </div>
      )}

      <button
        className="w-full py-2.5 rounded-sm mt-1"
        style={{
          background: '#00d4ff',
          color: '#000',
          fontFamily: 'Space Mono, monospace',
          fontSize: '0.58rem',
          letterSpacing: '0.14em',
        }}
      >
        CONNECT
      </button>
    </div>
  );
}

// ─── Login Screen ──────────────────────────────────────────────────────────────
function LoginScreen() {
  const [method, setMethod] = useState<'code' | 'qr'>('code');
  const [showManual, setShowManual] = useState(false);

  return (
    <div className="flex-1 flex flex-col overflow-hidden" style={{ background: '#060b18' }}>
      <StatusBar light />

      {/* Logo */}
      <div className="flex flex-col items-center pt-6 pb-5 flex-shrink-0">
        <Logo size="sm" />
        <span
          style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: '0.52rem',
            letterSpacing: '0.14em',
            color: 'rgba(255,255,255,0.25)',
            marginTop: 6,
          }}
        >
          ENTERPRISE ACCESS
        </span>
      </div>

      {/* Method tabs */}
      <div className="flex mx-5 rounded-sm overflow-hidden flex-shrink-0" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
        {([
          { id: 'code', icon: <Key size={10} />, label: 'CODE' },
          { id: 'qr', icon: <QrCode size={10} />, label: 'QR CODE' },
        ] as const).map((m) => (
          <button
            key={m.id}
            onClick={() => { setMethod(m.id); setShowManual(false); }}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 transition-all"
            style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '0.56rem',
              letterSpacing: '0.1em',
              background: method === m.id ? 'rgba(0,212,255,0.1)' : 'transparent',
              color: method === m.id ? '#00d4ff' : 'rgba(255,255,255,0.3)',
              borderRight: m.id === 'code' ? '1px solid rgba(255,255,255,0.08)' : 'none',
            }}
          >
            {m.icon}
            {m.label}
          </button>
        ))}
      </div>

      {/* Content area — scrollable */}
      <div className="flex-1 overflow-y-auto flex flex-col px-5 pt-5 pb-3">
        <div className="flex-1 flex flex-col items-center justify-start">
          {method === 'code' && <CodeInput />}
          {method === 'qr' && <QrScanner />}
        </div>

        {/* Manual expand */}
        <div className="flex flex-col gap-0 mt-4">
          <button
            onClick={() => setShowManual(!showManual)}
            className="flex items-center justify-center gap-1.5 py-2 transition-all"
            style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '0.54rem',
              letterSpacing: '0.1em',
              color: showManual ? '#00d4ff' : 'rgba(255,255,255,0.2)',
            }}
          >
            {showManual ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
            ADVANCED SETUP
          </button>

          {showManual && (
            <div
              className="mt-2 pt-3"
              style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
            >
              <ManualForm />
            </div>
          )}
        </div>
      </div>

      {/* Safe area */}
      <div style={{ height: 20 }} />
    </div>
  );
}

// ─── Spec Badge ─────────────────────────────────────────────────────────────────
function SpecBadge({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.52rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em' }}>{label}</span>
      <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.62rem', color: '#00d4ff', letterSpacing: '0.05em' }}>{value}</span>
    </div>
  );
}

// ─── SectionLabel ──────────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.62rem', letterSpacing: '0.18em', color: '#00d4ff' }}>
        {children}
      </span>
      <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function AndroidDesign({ onBack }: AndroidDesignProps) {
  return (
    <div className="min-h-screen relative z-10">
      {/* Scan line keyframe */}
      <style>{`
        @keyframes scanLine {
          0%, 100% { transform: translateY(0px); opacity: 0.8; }
          50% { transform: translateY(80px); opacity: 0.3; }
        }
      `}</style>

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
            Android App Design
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

        {/* Intro */}
        <div className="flex flex-col items-center text-center gap-3">
          <h1 style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 200, fontSize: '2.2rem', color: '#fff', letterSpacing: '-0.01em' }}>
            Android App Screens
          </h1>
          <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.04em', maxWidth: 460, lineHeight: 1.8 }}>
            Minimalist Android UI built on the StreamMate design system. All screens are interactive — use the login screen mockup to explore each access method.
          </p>
        </div>

        {/* Phone mockups */}
        <section>
          <SectionLabel>SCREEN DESIGNS</SectionLabel>
          <div className="flex flex-wrap justify-center gap-16">
            <PhoneFrame label="LOADING SCREEN  —  SPLASH">
              <LoadingScreen />
            </PhoneFrame>
            <PhoneFrame label="LOGIN SCREEN  —  INTERACTIVE">
              <LoginScreen />
            </PhoneFrame>
          </div>
        </section>

        {/* Spec table */}
        <section>
          <SectionLabel>DESIGN SPECIFICATIONS</SectionLabel>
          <div
            className="grid grid-cols-2 sm:grid-cols-4 gap-8 p-8 rounded-sm"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <SpecBadge label="BACKGROUND" value="#060b18" />
            <SpecBadge label="PRIMARY ACCENT" value="#00d4ff" />
            <SpecBadge label="BODY FONT" value="Space Mono" />
            <SpecBadge label="HEADING FONT" value="Barlow" />
            <SpecBadge label="MIN TOUCH TARGET" value="44 × 44 dp" />
            <SpecBadge label="STATUS BAR" value="Transparent dark" />
            <SpecBadge label="CORNER RADIUS" value="8dp (inputs) / 4dp (btns)" />
            <SpecBadge label="HOME INDICATOR" value="Light — rgba 18%" />
          </div>
        </section>

        {/* Screen descriptions */}
        <section>
          <SectionLabel>SCREEN REFERENCE</SectionLabel>

          {/* Navigation flow */}
          <div
            className="flex items-center justify-center gap-2 mb-8 px-6 py-4 rounded-sm"
            style={{ background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            {[
              { label: 'App Launch', sub: 'OS boots app' },
              null,
              { label: 'Loading Screen', sub: 'Auth check (~1–2 s)', highlight: true },
              null,
              { label: 'Welcome Screen', sub: 'No session found', highlight: false },
              null,
              { label: 'Login Screen', sub: 'User authenticates', highlight: false },
            ].map((item, i) =>
              item === null ? (
                <div key={i} style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.7rem' }}>→</div>
              ) : (
                <div key={i} className="flex flex-col items-center gap-1 text-center" style={{ minWidth: 80 }}>
                  <span style={{
                    fontFamily: 'Space Mono, monospace',
                    fontSize: '0.58rem',
                    letterSpacing: '0.06em',
                    color: item.highlight ? '#ffb400' : 'rgba(255,255,255,0.55)',
                    fontWeight: item.highlight ? 700 : 400,
                  }}>{item.label}</span>
                  <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.48rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.04em' }}>{item.sub}</span>
                </div>
              )
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              {
                badge: 'AUTOMATIC',
                badgeColor: 'rgba(255,180,0,0.15)',
                badgeBorder: 'rgba(255,180,0,0.3)',
                badgeText: '#ffb400',
                title: 'Loading Screen',
                subtitle: 'Splash / Boot screen',
                desc: 'Displayed immediately on app launch while the auth state is being resolved. Zero interaction — pure brand moment. The app auto-navigates away: active session goes to Home, no session goes to Welcome Screen.',
                points: [
                  'Duration: ~1–2 s (auth check governs timing)',
                  'Logo centered at md size, no other UI elements',
                  'Status bar transparent, icons light-coloured',
                  'Never navigates back — always forward',
                  'DO NOT add buttons, text, or progress indicators here',
                ],
              },
              {
                badge: 'USER-FACING',
                badgeColor: 'rgba(0,212,255,0.08)',
                badgeBorder: 'rgba(0,212,255,0.25)',
                badgeText: '#00d4ff',
                title: 'Welcome Screen',
                subtitle: 'Onboarding / Entry point',
                desc: 'Shown after the Loading Screen when no authenticated session exists. This is the first interactive screen — it presents the brand with a brief value statement and offers explicit navigation to Login.',
                points: [
                  'Logo at lg size + tagline or subtitle copy',
                  'Primary CTA: "Get Started" → Login Screen',
                  'Secondary CTA (optional): "Learn More" / promo link',
                  'NOT auto-dismissed — user must tap to continue',
                  'Distinct from Loading Screen: has content and interaction',
                ],
              },
              {
                badge: 'INTERACTIVE',
                badgeColor: 'rgba(80,200,120,0.08)',
                badgeBorder: 'rgba(80,200,120,0.3)',
                badgeText: '#50c878',
                title: 'Login Screen',
                subtitle: 'Authentication / Access',
                desc: 'Three-method authentication flow. Code and QR are the primary paths. Manual setup (XC Codes / M3U) is hidden behind Advanced Setup to keep the default view clean.',
                points: [
                  'Code: 8-char segmented input, XXXX–XXXX',
                  'QR: camera viewfinder with scan animation',
                  'Advanced: XC Codes (URL/user/pass) or M3U URL',
                  'Single tap reveals/hides Advanced Setup',
                ],
              },
            ].map((s) => (
              <div
                key={s.title}
                className="rounded-sm p-6 flex flex-col gap-4"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                {/* Badge + title row */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 400, fontSize: '1rem', color: '#fff', marginBottom: 3 }}>{s.title}</h3>
                    <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.52rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em' }}>{s.subtitle}</span>
                  </div>
                  <span
                    className="flex-shrink-0 px-2 py-1 rounded-sm"
                    style={{
                      fontFamily: 'Space Mono, monospace',
                      fontSize: '0.5rem',
                      letterSpacing: '0.1em',
                      background: s.badgeColor,
                      border: `1px solid ${s.badgeBorder}`,
                      color: s.badgeText,
                    }}
                  >
                    {s.badge}
                  </span>
                </div>

                <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.62rem', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.03em', lineHeight: 1.8 }}>
                  {s.desc}
                </p>
                <ul className="flex flex-col gap-2">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <span style={{ color: s.badgeText, fontSize: '0.55rem', marginTop: 3, flexShrink: 0 }}>+</span>
                      <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.58rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.03em', lineHeight: 1.7 }}>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <div style={{ height: 16 }} />
      </div>
    </div>
  );
}
