interface FooterProps {
  activeLink?: string;
}

export default function Footer({ activeLink = 'support' }: FooterProps) {
  const links = [
    { id: 'privacy', label: 'Privacy Policy' },
    { id: 'terms', label: 'Terms of Service' },
    { id: 'gdpr', label: 'GDPR Information' },
    { id: 'support', label: 'Support' },
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-10 px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-5">
        {links.map((link) => (
          <button
            key={link.id}
            className={`footer-link ${activeLink === link.id ? 'active' : ''}`}
          >
            {link.label}
          </button>
        ))}
      </div>
      <div
        className="flex items-center gap-2"
        style={{
          fontFamily: 'Space Mono, monospace',
          fontSize: '0.58rem',
          letterSpacing: '0.07em',
          color: 'rgba(255,255,255,0.2)',
        }}
      >
        <span>v4.0.0-RC.1</span>
        <span className="opacity-50">·</span>
        <span>SM-2024-02</span>
        <span className="opacity-50">·</span>
        <span className="flex items-center gap-1">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
          PRODUCTION
        </span>
        <span className="opacity-50">·</span>
        <span>© 2026 STREAMMATE ENTERPRISE</span>
      </div>
    </footer>
  );
}
