import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { communitiesApi } from '../services/api';
import { useAuthStore } from '../stores/authStore';

export default function InvitePage() {
  const { code } = useParams();
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const [status, setStatus] = useState('joining');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate(`/login?redirect=/invite/${code}`);
      return;
    }
    communitiesApi
      .joinInvite(code)
      .then((data) => {
        setStatus('success');
        setTimeout(() => navigate(`/channels/${data.communityId}`), 1000);
      })
      .catch((err) => {
        setStatus('error');
        setError(err.message);
      });
  }, [code, user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-0">
      <div className="text-center">
        {status === 'joining' && (
          <p className="text-slate-400 animate-pulse">Joining community…</p>
        )}
        {status === 'success' && (
          <p className="text-green-400">Joined! Redirecting…</p>
        )}
        {status === 'error' && (
          <div>
            <p className="text-red-400 mb-4">{error}</p>
            <button
              onClick={() => navigate('/')}
              className="text-aether-400 hover:underline"
            >
              Go home
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
