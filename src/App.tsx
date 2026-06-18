import { useState, useEffect } from 'react';
import StarField from './components/StarField';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import LoadingPage from './pages/LoadingPage';
import LogoShowcase from './pages/LogoShowcase';
import AndroidDesign from './pages/AndroidDesign';

type Page = 'loading' | 'landing' | 'login' | 'showcase' | 'android';

export default function App() {
  const [page, setPage] = useState<Page>('loading');
  const [prevPage, setPrevPage] = useState<Page>('landing');

  useEffect(() => {
    if (page !== 'loading') return;
    const t = setTimeout(() => setPage('landing'), 2200);
    return () => clearTimeout(t);
  }, [page]);

  const navigate = (to: Page) => {
    setPrevPage(page);
    setPage(to);
  };

  const handleFooterNav = (id: string) => {
    if (id === 'brand') navigate('showcase');
    if (id === 'android') navigate('android');
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: '#030c18' }}>
      {page === 'loading' && <LoadingPage />}
      {page !== 'loading' && <StarField />}
      {page === 'landing' && (
        <LandingPage
          onEnter={() => navigate('login')}
          onFooterNav={handleFooterNav}
        />
      )}
      {page === 'login' && (
        <LoginPage
          onBack={() => navigate('landing')}
          onFooterNav={handleFooterNav}
        />
      )}
      {page === 'showcase' && (
        <LogoShowcase onBack={() => navigate(prevPage)} />
      )}
      {page === 'android' && (
        <AndroidDesign onBack={() => navigate(prevPage)} />
      )}
    </div>
  );
}
