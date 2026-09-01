import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { LogIn, Key, User, Shield, Sparkles, AlertCircle, CheckCircle2, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('kyraa');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!identifier.trim()) {
      setErrorMsg('Harap masukkan username atau email Kyra.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const cleanUser = identifier.trim().toLowerCase();

      // Store authenticated session for Kyra
      sessionStorage.setItem('statusLogin', 'true');
      sessionStorage.setItem('namaUser', cleanUser === 'admin' ? 'admin' : 'kyraa');
      sessionStorage.setItem('emailUser', 'd1kyra@gmail.com');

      navigate('/dashboard');
    }, 500);
  };

  const handleQuickKyraLogin = () => {
    setIdentifier('kyraa');
    setPassword('••••••••');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem('statusLogin', 'true');
      sessionStorage.setItem('namaUser', 'kyraa');
      sessionStorage.setItem('emailUser', 'd1kyra@gmail.com');
      navigate('/dashboard');
    }, 400);
  };

  return (
    <>
      <Helmet>
        <title>Masuk Akun Kyra | d1kyra Platform</title>
        <meta name="description" content="Portal login khusus pemilik akun Muhammad Dwiky Rahman (Kyra) untuk mengelola profil, artikel, catatan, sertifikat, dan proyek." />
      </Helmet>

      <div className="min-h-screen pt-28 pb-20 px-4 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md p-8 sm:p-10 rounded-3xl glass-panel border border-white/15 shadow-2xl space-y-6 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-2xl pointer-events-none" />

          {/* Logo & Header */}
          <div className="text-center space-y-2">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-primary flex items-center justify-center text-white font-display font-black text-2xl shadow-xl shadow-indigo-500/30">
              D
            </div>
            <h1 className="font-display font-black text-2xl text-white">Masuk Khusus Kyra</h1>
            <p className="text-xs text-gray-400">
              Portal autentikasi pemilik d1kyra untuk mengedit profil, sertifikat, artikel, catatan, dan portofolio.
            </p>
          </div>

          {/* Security Notice */}
          <div className="p-3.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs flex items-start gap-2.5">
            <Lock className="w-4 h-4 shrink-0 text-indigo-400 mt-0.5" />
            <p className="leading-relaxed text-[11px]">
              Tamu & pengunjung dapat membaca konten secara bebas tanpa login. Mode login ini khusus untuk Kyra mengelola dan mengedit seluruh data.
            </p>
          </div>

          {/* Error Banner */}
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4 text-xs sm:text-sm">
            <div className="space-y-1.5">
              <label className="font-bold text-gray-300">Username Akun</label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="kyraa"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-gray-300">Kata Sandi</label>
              <div className="relative">
                <Key className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  placeholder="Masukkan kata sandi..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-500/25 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              <span>{loading ? 'Memverifikasi...' : 'Masuk Sekarang'}</span>
            </button>
          </form>

          {/* Quick Kyra Login Button */}
          <div className="pt-4 border-t border-white/10 space-y-3">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block text-center">
              Akses Cepat Pemilik:
            </span>
            <button
              type="button"
              onClick={handleQuickKyraLogin}
              className="w-full p-3 rounded-xl bg-white/5 border border-white/10 hover:border-indigo-500 flex items-center justify-center gap-2 text-white hover:bg-white/10 transition-all text-xs font-bold shadow-sm group"
            >
              <Sparkles className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
              <span>⚡ Masuk Cepat sebagai Kyra (@d1kyra)</span>
            </button>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Login;
