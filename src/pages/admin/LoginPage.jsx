import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, LogIn, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) { setError('Email dan password wajib diisi'); return; }
    setLoading(true);
    setError('');
    await new Promise(r => setTimeout(r, 600));
    const result = login(form.email, form.password);
    if (result.success) {
      toast.success('Selamat datang, Admin!');
      navigate('/admin/dashboard');
    } else {
      setError(result.message || 'Email atau password salah');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm animate-fade-in-up">
        {/* Brand */}
        <div className="text-center mb-8">
          <Link to="/" className="font-display text-2xl text-gray-900">
            UPPER<span className="text-gray-400">INK</span>
          </Link>
          <p className="text-sm text-gray-400 mt-1">Admin Panel</p>
        </div>

        {/* Card */}
        <div className="bg-white border border-gray-100 p-8 shadow-sm">
          <h1 className="text-lg font-semibold text-gray-900 mb-1">Masuk ke Dashboard</h1>
          <p className="text-xs text-gray-400 mb-6">Hanya untuk administrator UPPERINK</p>

          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-100 px-3 py-2.5 mb-5">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span className="text-red-600 text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="form-label">Email</label>
              <input
                type="email"
                id="admin-email"
                placeholder="admin@example.com"
                value={form.email}
                onChange={e => { setForm(f => ({ ...f, email: e.target.value })); setError(''); }}
                className="form-input"
                autoComplete="email"
              />
            </div>
            <div>
              <label className="form-label">Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  id="admin-password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={e => { setForm(f => ({ ...f, password: e.target.value })); setError(''); }}
                  className="form-input pr-10"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 mt-2"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Memverifikasi...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <LogIn className="w-4 h-4" />
                  Masuk
                </span>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          Akses terbatas hanya untuk administrator
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
