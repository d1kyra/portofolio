import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FolderGit2, Search, Filter, Sparkles, Layers, Plus, ArrowUpRight, Lock } from 'lucide-react';
import CardProject from '../components/CardProject';
import { getStoredProjects } from '../utils/storage';

const CATEGORIES = ['Semua', 'React & Web App', 'Fullstack', 'Frontend & UI/UX'];

const Portofolio = () => {
  const isAuth = sessionStorage.getItem('statusLogin') === 'true';
  const [projects] = useState(getStoredProjects);
  const [selectedCat, setSelectedCat] = useState('Semua');
  const [search, setSearch] = useState('');

  const filtered = projects.filter((p) => {
    const matchSearch = !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.techStack.some(t => t.toLowerCase().includes(search.toLowerCase()));

    const matchCat = selectedCat === 'Semua' || p.category === selectedCat;

    return matchSearch && matchCat;
  });

  return (
    <>
      <Helmet>
        <title>Portofolio & Showcase Proyek | d1kyra</title>
        <meta name="description" content="Koleksi proyek web development, sistem informasi PKL, dan antarmuka glassmorphism modern." />
      </Helmet>

      <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div className="space-y-2">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest block mb-1">
              Showcase & Project Works
            </span>
            <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              Koleksi Portofolio
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 max-w-2xl">
              Jelajahi berbagai proyek web yang telah saya bangun, mulai dari aplikasi React terintegrasi, sistem informasi PKL, hingga desain glassmorphism modern.
            </p>
          </div>

          {isAuth && (
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold shadow-lg shadow-indigo-500/25 hover:scale-105 transition-all self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Kelola & Tambah Proyek</span>
            </Link>
          )}
        </div>

        {/* Filter & Search Bar */}
        <div className="p-5 rounded-2xl glass-panel border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Category Chips */}
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCat === cat
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                    : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari teknologi atau nama project..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
        </div>

        {/* Project Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 rounded-3xl glass-panel border border-white/10 space-y-3">
            <FolderGit2 className="w-12 h-12 text-gray-500 mx-auto" />
            <h3 className="text-base font-bold text-white">Tidak ada project yang cocok</h3>
            <p className="text-xs text-gray-400">Coba ubah kata kunci pencarian atau kategori filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((proj, idx) => (
              <CardProject key={proj.id} project={proj} index={idx} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Portofolio;
