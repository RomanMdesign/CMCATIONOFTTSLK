import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';
import { useAppStore } from './stores/appStore';
import { useSocket } from './hooks/useSocket';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AppLayout from './components/layout/AppLayout';
import HomeView from './pages/HomeView';
import CommunityView from './pages/CommunityView';
import InvitePage from './pages/InvitePage';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuthStore();
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-surface-0">
        <div className="animate-pulse text-aether-400 font-display text-xl tracking-widest">
          AETHER
        </div>
      </div>
    );
  }
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  const init = useAuthStore((s) => s.init);
  const theme = useAppStore((s) => s.theme);
  useSocket();

  useEffect(() => {
    init();
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [init, theme]);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/invite/:code" element={<InvitePage />} />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Routes>
                <Route path="/" element={<HomeView />} />
                <Route path="/channels/:communityId/:channelId?" element={<CommunityView />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </AppLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
