import Logo from '../components/Logo';
import StarField from '../components/StarField';

export default function LoadingPage() {
  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: '#030c18' }}>
      <StarField />
      <div className="min-h-screen flex items-center justify-center relative z-10">
        <div style={{ animation: 'loadingPulse 2.4s ease-in-out infinite' }}>
          <Logo size="md" />
        </div>
      </div>
      <style>{`
        @keyframes loadingPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.97); }
        }
      `}</style>
    </div>
  );
}
