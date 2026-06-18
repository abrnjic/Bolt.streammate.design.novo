import { useState } from 'react';
import StarField from './components/StarField';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import LogoShowcase from './pages/LogoShowcase';
import AndroidDesign from './pages/AndroidDesign';

type Page = 'landing' | 'login' | 'showcase' | 'android';

export default function App() {
  const [page, setPage] = useState<Page>('landing');
  const [prevPage, setPrevPage] = useState<Page>('landing');

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
      {page === 'android' && (
        <AndroidDesign onBack={() => navigate(prevPage)} />
      )}
    </div>
  );
}
