import { useState } from 'react';
import StarField from './components/StarField';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';

type Page = 'landing' | 'login';

export default function App() {
  const [page, setPage] = useState<Page>('landing');

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: '#060b18' }}>
      <StarField />
      {page === 'landing' ? (
        <LandingPage onEnter={() => setPage('login')} />
      ) : (
        <LoginPage onBack={() => setPage('landing')} />
      )}
    </div>
  );
}
