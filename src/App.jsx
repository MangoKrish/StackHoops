import { Outlet } from 'react-router-dom';
import { GamesProvider } from './context/GamesContext';
import Navigation from './components/layout/Navigation';
import PageContainer from './components/layout/PageContainer';

export default function App() {
  return (
    <GamesProvider>
      <div className="min-h-screen bg-surface-primary text-text-primary">
        <Navigation />
        <PageContainer>
          <Outlet />
        </PageContainer>
      </div>
    </GamesProvider>
  );
}
