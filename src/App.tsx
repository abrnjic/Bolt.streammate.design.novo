import { useState } from 'react';
import StarField from './components/StarField';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import LogoShowcase from './pages/LogoShowcase';

type Page = 'landing' | 'login' | 'showcase';

export default function App() {
  const [page, setPage] = useState<Page>('landing');
  const [prevPage, setPrevPage] = useState<Page>('landing');

  const navigate = (to: Page) => {
    setPrevPage(page);
    setPage(to);
  };

  const handleFooterNav = (id: string) => {
    if (id === 'brand') navigate('showcase');
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: '#060b18' }}>
      <StarField />
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
    </div>
  );
}
