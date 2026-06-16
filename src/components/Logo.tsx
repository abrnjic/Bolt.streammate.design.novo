type LogoSize = 'sm' | 'md' | 'lg';
type LogoVariant = 'full' | 'icon' | 'wordmark';
type LogoTheme = 'color' | 'white' | 'mono';

interface LogoProps {
  size?: LogoSize;
  variant?: LogoVariant;
  theme?: LogoTheme;
}

const SIZES = {
  sm: { box: 34, letter: 'text-base', text: 'text-lg',   bracket: 6  },
  md: { box: 46, letter: 'text-xl',   text: 'text-2xl',  bracket: 8  },
  lg: { box: 56, letter: 'text-2xl',  text: 'text-3xl',  bracket: 10 },
} as const;

function accentColor(theme: LogoTheme) {
  if (theme === 'white') return '#ffffff';
  if (theme === 'mono')  return 'rgba(255,255,255,0.7)';
  return '#00d4ff';
}

export default function Logo({ size = 'md', variant = 'full', theme = 'color' }: LogoProps) {
  const s = SIZES[size];
  const accent = accentColor(theme);
  const BRACKET = 1.5;

  const icon = (
    <div
      className="relative flex items-center justify-center flex-shrink-0"
      style={{
        width: s.box,
        height: s.box,
        background: theme === 'color' ? 'rgba(0,10,30,0.8)' : 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <span
        className="absolute"
        style={{ top: 0, left: 0, width: s.bracket, height: s.bracket,
          borderTop: `${BRACKET}px solid ${accent}`, borderLeft: `${BRACKET}px solid ${accent}` }}
      />
      <span
        className="absolute"
        style={{ bottom: 0, right: 0, width: s.bracket, height: s.bracket,
          borderBottom: `${BRACKET}px solid ${accent}`, borderRight: `${BRACKET}px solid ${accent}` }}
      />
      <span className={`${s.letter} font-bold leading-none`} style={{ color: accent }}>S</span>
    </div>
  );

  const wordmark = (
    <div className={`${s.text} leading-none tracking-wide`} style={{ fontFamily: 'Barlow, sans-serif' }}>
      <span className="text-white font-semibold">Stream</span>
      <span className="font-light" style={{ color: 'rgba(255,255,255,0.6)' }}>Mate</span>
    </div>
  );

  return (
    <div className="flex items-center gap-3 select-none">
      {variant !== 'wordmark' && icon}
      {variant !== 'icon'     && wordmark}
    </div>
  );
}
