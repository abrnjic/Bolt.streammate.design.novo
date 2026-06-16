interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ size = 'md' }: LogoProps) {
  const boxSize = size === 'lg' ? 56 : size === 'md' ? 46 : 34;
  const letterSize = size === 'lg' ? 'text-2xl' : size === 'md' ? 'text-xl' : 'text-base';
  const textSize = size === 'lg' ? 'text-3xl' : size === 'md' ? 'text-2xl' : 'text-lg';
  const bracketSize = size === 'lg' ? 10 : size === 'md' ? 8 : 6;
  const bracketThickness = 1.5;

  return (
    <div className="flex items-center gap-3 select-none">
      <div
        className="relative flex items-center justify-center flex-shrink-0"
        style={{
          width: boxSize,
          height: boxSize,
          background: 'rgba(0,10,30,0.8)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        {/* top-left bracket */}
        <span
          className="absolute"
          style={{
            top: 0, left: 0,
            width: bracketSize, height: bracketSize,
            borderTop: `${bracketThickness}px solid #00d4ff`,
            borderLeft: `${bracketThickness}px solid #00d4ff`,
          }}
        />
        {/* bottom-right bracket */}
        <span
          className="absolute"
          style={{
            bottom: 0, right: 0,
            width: bracketSize, height: bracketSize,
            borderBottom: `${bracketThickness}px solid #00d4ff`,
            borderRight: `${bracketThickness}px solid #00d4ff`,
          }}
        />
        <span className={`${letterSize} font-bold text-[#00d4ff] leading-none`}>S</span>
      </div>

      <div className={`${textSize} leading-none tracking-wide`} style={{ fontFamily: 'Barlow, sans-serif' }}>
        <span className="text-white font-semibold">Stream</span>
        <span className="text-white/60 font-light">Mate</span>
      </div>
    </div>
  );
}
