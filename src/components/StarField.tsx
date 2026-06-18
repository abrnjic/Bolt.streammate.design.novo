export default function StarField() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Dot grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(90, 160, 220, 0.38) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      {/* Central blue/cyan radial glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 48%, rgba(0, 90, 200, 0.30) 0%, rgba(0, 50, 140, 0.18) 40%, transparent 70%)',
        }}
      />
    </div>
  );
}
