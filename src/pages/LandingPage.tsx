import { ArrowRight, Globe, ChevronDown } from 'lucide-react';
import Logo from '../components/Logo';
import Footer from '../components/Footer';

interface LandingPageProps {
  onEnter: () => void;
}

export default function LandingPage({ onEnter }: LandingPageProps) {
  return (
    <div className="min-h-screen flex flex-col relative z-10">
      {/* Top bar */}
      <div className="flex justify-end p-5">
        <button className="lang-btn">
          <Globe size={12} className="text-white/50" />
          <span>Hrvatski</span>
          <ChevronDown size={10} className="text-white/40" />
        </button>
      </div>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-16 -mt-8">
        <div className="flex flex-col items-center text-center max-w-4xl">
          {/* Logo */}
          <div className="animate-fade-up mb-12">
            <Logo size="md" />
          </div>

          {/* Hero heading */}
          <h1
            className="animate-fade-up-d1 text-white leading-[1.12] mb-6"
            style={{
              fontFamily: 'Barlow, sans-serif',
              fontWeight: 100,
              fontSize: 'clamp(2.6rem, 7vw, 5.2rem)',
              letterSpacing: '-0.01em',
            }}
          >
            Managing Media Businesses<br />
            Through One Unified<br />
            Platform
          </h1>

          {/* Subtitle */}
          <p
            className="animate-fade-up-d2 mb-12"
            style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '0.8rem',
              letterSpacing: '0.05em',
              color: 'rgba(255,255,255,0.5)',
            }}
          >
            Built for,
            {' '}
            <span style={{ color: '#00d4ff' }}>Media Providers</span>.
            {' '}Designed for{' '}
            <span style={{ color: '#00d4ff' }}>Growth</span>.
          </p>

          {/* CTA button */}
          <button
            onClick={onEnter}
            className="animate-fade-up-d3 btn-cyan flex items-center gap-3 px-10 py-4 text-sm"
            style={{ fontFamily: 'Space Mono, monospace' }}
          >
            ENTER PLATFORM
            <ArrowRight size={14} />
          </button>
        </div>
      </main>

      <Footer activeLink="support" />
    </div>
  );
}
