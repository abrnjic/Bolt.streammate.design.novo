const STARS = Array.from({ length: 180 }, (_, i) => {
  const x = ((i * 7919 + 31337) % 10000) / 100;
  const y = ((i * 6271 + 13337) % 10000) / 100;
  const opacity = 0.12 + ((i * 3571) % 100) / 200;
  const size = i % 11 === 0 ? 2 : i % 5 === 0 ? 1.5 : 1;
  const duration = 2.5 + ((i * 1327) % 100) / 25;
  const delay = ((i * 2347) % 100) / 20;
  return { x, y, opacity, size, duration, delay };
});

export default function StarField() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {STARS.map((s, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: s.opacity,
            animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
            ['--star-opacity' as string]: s.opacity,
          }}
        />
      ))}
    </div>
  );
}
