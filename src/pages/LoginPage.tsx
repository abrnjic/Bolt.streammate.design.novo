import { useState } from 'react';
import { ArrowLeft, Globe, ChevronDown, Mail, Eye, EyeOff, Shield, Check } from 'lucide-react';
import Logo from '../components/Logo';
import Footer from '../components/Footer';

interface LoginPageProps {
  onBack: () => void;
}

export default function LoginPage({ onBack }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const LABEL_STYLE: React.CSSProperties = {
    fontFamily: 'Space Mono, monospace',
    fontSize: '0.62rem',
    letterSpacing: '0.12em',
    color: 'rgba(255,255,255,0.35)',
  };

  return (
    <div className="min-h-screen flex flex-col relative z-10">
      {/* Top bar */}
      <div className="flex items-center justify-between p-5">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white/50 hover:text-white/80 transition-colors"
          style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.72rem', letterSpacing: '0.05em' }}
        >
          <ArrowLeft size={13} />
          Back
        </button>
        <button className="lang-btn">
          <Globe size={12} className="text-white/50" />
          <span>Hrvatski</span>
          <ChevronDown size={10} className="text-white/40" />
        </button>
      </div>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 pb-20">
        <div className="w-full max-w-[340px] flex flex-col items-center">
          {/* Logo */}
          <div className="animate-fade-up mb-7">
            <Logo size="md" />
          </div>

          {/* Title */}
          <div className="animate-fade-up-d1 text-center mb-7">
            <h1
              className="text-white mb-2"
              style={{
                fontFamily: 'Barlow, sans-serif',
                fontWeight: 300,
                fontSize: '1.65rem',
                letterSpacing: '0.02em',
              }}
            >
              StreamMate Enterprise
            </h1>
            <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.68rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.04em' }}>
              Built for Media Providers. Designed for Growth.
            </p>
          </div>

          {/* Card */}
          <div className="animate-fade-up-d2 card-glass w-full rounded-sm px-7 pt-6 pb-7">
            {/* Secure badge */}
            <div className="flex justify-center mb-6">
              <div
                className="flex items-center gap-3 px-4 py-2 rounded-sm"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <Shield size={11} className="text-white/30" />
                <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)' }}>
                  SECURE GATEWAY
                </span>
                <span className="inline-block w-px h-3 bg-white/10" />
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00d4ff]" />
                <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)' }}>
                  MFA READY
                </span>
              </div>
            </div>

            <form onSubmit={handleLogin} className="flex flex-col gap-5">
              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label style={LABEL_STYLE}>E-MAIL ADRESA</label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@streammate.app"
                    className="input-field w-full px-4 py-3 pr-10 text-sm rounded-sm"
                    style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.78rem' }}
                  />
                  <Mail size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20" />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <label style={LABEL_STYLE}>LOZINKA</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••••"
                    className="input-field w-full px-4 py-3 pr-10 text-sm rounded-sm"
                    style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.78rem' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/50 transition-colors"
                  >
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              {/* Remember + Forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <button
                    type="button"
                    onClick={() => setRemember(!remember)}
                    className="w-4 h-4 rounded-sm flex items-center justify-center flex-shrink-0 transition-colors"
                    style={{
                      background: remember ? '#00d4ff' : 'rgba(255,255,255,0.05)',
                      border: remember ? 'none' : '1px solid rgba(255,255,255,0.15)',
                    }}
                  >
                    {remember && <Check size={10} color="#000" strokeWidth={3} />}
                  </button>
                  <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.03em' }}>
                    Remember session
                  </span>
                </label>
                <button
                  type="button"
                  className="transition-colors"
                  style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.65rem', color: '#00d4ff', letterSpacing: '0.03em' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#22e8ff')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#00d4ff')}
                >
                  Forgot Password
                </button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="btn-cyan w-full py-3.5 text-xs rounded-sm mt-1"
                style={{ fontFamily: 'Space Mono, monospace' }}
              >
                LOGIN VIA GATEWAY
              </button>
            </form>

            {/* Card footer links */}
            <div className="mt-6 flex flex-col items-center gap-1.5">
              <div className="flex items-center gap-3">
                {['Privacy Policy', 'Terms of Service', 'GDPR'].map((item, i) => (
                  <button
                    key={i}
                    className="transition-colors"
                    style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.58rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.05em' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.25)')}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <button
                className="transition-colors"
                style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.6rem', color: '#00d4ff', letterSpacing: '0.05em' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#22e8ff')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#00d4ff')}
              >
                Support Access
              </button>
              <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.56rem', color: 'rgba(255,255,255,0.15)', letterSpacing: '0.05em', marginTop: '0.25rem' }}>
                © 2026 StreamMate Enterprise
              </p>
            </div>
          </div>

          {/* Feature tags */}
          <div className="animate-fade-up-d3 flex flex-wrap justify-center gap-2 mt-5">
            {[
              '* Enterprise White Label',
              '* Multi-Tenant',
              '* GDPR Ready',
              '* Dynamic Branding',
              '* Marketplace Themes',
            ].map((tag) => (
              <span key={tag} className="tag-pill">{tag}</span>
            ))}
          </div>
        </div>
      </main>

      <Footer activeLink="support" />
    </div>
  );
}
