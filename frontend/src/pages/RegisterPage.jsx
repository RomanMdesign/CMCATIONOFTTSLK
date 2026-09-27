import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

export default function RegisterPage() {
  const [form, setForm] = useState({
    email: '',
    username: '',
    displayName: '',
    password: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const { register, error, user } = useAuthStore();
  const navigate = useNavigate();

  if (user) {
    navigate('/');
    return null;
  }

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const ok = await register(form);
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
          <p className="text-slate-400 text-sm">Join the network</p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-surface-1 border border-surface-4 rounded-2xl p-8 shadow-2xl space-y-4"
        >
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-3">
              {error}
            </div>
          )}
          {['email', 'username', 'displayName', 'password'].map((field) => (
            <div key={field}>
              <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">
                {field === 'displayName' ? 'Display name' : field}
              </label>
              <input
                type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'}
                name={field}
                value={form[field]}
                onChange={handleChange}
                required
                minLength={field === 'password' ? 8 : field === 'username' ? 3 : 1}
                className="w-full bg-surface-2 border border-surface-4 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-aether-500 transition"
                autoComplete={field === 'password' ? 'new-password' : field}
              />
            </div>
          ))}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-aether-600 hover:bg-aether-500 disabled:opacity-50 text-white font-medium rounded-lg py-2.5 transition mt-2"
          >
            {submitting ? 'Creating…' : 'Create account'}
          </button>
          <p className="text-center text-sm text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="text-aether-400 hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
