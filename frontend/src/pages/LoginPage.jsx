import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { login, error, user } = useAuthStore();
  const navigate = useNavigate();

  if (user) {
    navigate('/');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const ok = await login(email, password);
    setSubmitting(false);
    if (ok) navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-0 px-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-aether-950/40 via-surface-0 to-surface-0 pointer-events-none" />
      <div className="relative w-full max-w-md animate-slide-up">
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl tracking-[0.2em] text-aether-400 mb-2">
            AETHER
          </h1>
          <p className="text-slate-400 text-sm">Welcome back to the network</p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-surface-1 border border-surface-4 rounded-2xl p-8 shadow-2xl space-y-5"
        >
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-3">
              {error}
            </div>
          )}
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-surface-2 border border-surface-4 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-aether-500 transition"
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-surface-2 border border-surface-4 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-aether-500 transition"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-aether-600 hover:bg-aether-500 disabled:opacity-50 text-white font-medium rounded-lg py-2.5 transition"
          >
            {submitting ? 'Signing in…' : 'Sign in'}
          </button>
          <p className="text-center text-sm text-slate-400">
            No account?{' '}
            <Link to="/register" className="text-aether-400 hover:underline">
              Create one
            </Link>
          </p>
          <p className="text-center text-xs text-slate-500 pt-2">
            Demo: admin@aether.app / password123
          </p>
        </form>
      </div>
    </div>
  );
}
