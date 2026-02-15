import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface-primary flex items-center justify-center p-4">
      <div className="text-center">
        <div className="text-6xl mb-4">🏀</div>
        <h1 className="text-2xl font-bold text-text-primary mb-2">Page Not Found</h1>
        <p className="text-sm text-text-secondary mb-6">This page doesn't exist. Maybe it was an airball?</p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-hoop-orange to-hoop-red text-white font-semibold text-sm"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}
