import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 — Halaman Tidak Ditemukan | d1kyra</title>
      </Helmet>

      <div className="min-h-screen pt-28 pb-20 px-4 flex items-center justify-center text-center">
        <div className="max-w-md p-8 rounded-3xl glass-panel border border-white/15 shadow-2xl space-y-6">
          <div className="font-display font-black text-7xl sm:text-8xl text-gradient">
            404
          </div>
          <div className="space-y-2">
            <h2 className="font-display font-bold text-xl text-white">Halaman Tidak Ditemukan</h2>
            <p className="text-xs text-gray-400">
              Halaman yang Anda tuju tidak tersedia atau telah dipindahkan.
            </p>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 hover:scale-105 transition-transform"
          >
            <Home className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
