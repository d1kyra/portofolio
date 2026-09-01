import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { BookOpen, StickyNote, Plus, Search, Calendar, RotateCcw, Copy, Trash2, Tag, User, Check, Eye, X, Sparkles, Pin, Lock } from 'lucide-react';
import { getStoredArticles, saveStoredArticles, getStoredNotes, saveStoredNotes } from '../utils/storage';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const CATEGORIES = ['Semua', 'Laporan PKL', 'Refleksi Diri', 'Tech & Tips', 'Tutorial'];
const NOTE_COLORS = [
  { id: 'lilac', label: 'Lilac', class: 'note-card-lilac', dot: 'bg-indigo-500' },
  { id: 'mint', label: 'Mint', class: 'note-card-mint', dot: 'bg-emerald-500' },
  { id: 'peach', label: 'Peach', class: 'note-card-peach', dot: 'bg-amber-500' },
  { id: 'sky', label: 'Sky', class: 'note-card-sky', dot: 'bg-cyan-500' },
  { id: 'rose', label: 'Rose', class: 'note-card-rose', dot: 'bg-pink-500' },
];

const Articles = () => {
  const isAuth = sessionStorage.getItem('statusLogin') === 'true';
  const [activeTab, setActiveTab] = useState('articles'); // 'articles' | 'notes'
  const [articles, setArticles] = useState(getStoredArticles);
  const [notes, setNotes] = useState(getStoredNotes);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [selectedDate, setSelectedDate] = useState('');

  // Modals
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [readingArticle, setReadingArticle] = useState(null);

  // Form states
  const [newArticle, setNewArticle] = useState({
    title: '',
    tag: 'Laporan PKL',
    date: new Date().toISOString().split('T')[0],
    content: '',
    author: sessionStorage.getItem('namaUser') || 'Kyra'
  });

  const [newNote, setNewNote] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    color: 'lilac',
    content: ''
  });

  const [toastMsg, setToastMsg] = useState('');

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2500);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    triggerToast('✓ Konten berhasil disalin ke clipboard!');
  };

  // Article Actions
  const handleSaveArticle = (e) => {
    e.preventDefault();
    if (!newArticle.title.trim() || !newArticle.content.trim()) return;

    const created = {
      id: 'art-' + Date.now(),
      ...newArticle,
      views: 1,
      readTime: `${Math.max(1, Math.ceil(newArticle.content.split(' ').length / 100))} min read`
    };

    const updated = [created, ...articles];
    setArticles(updated);
    saveStoredArticles(updated);
    setIsArticleModalOpen(false);
    setNewArticle({
      title: '',
      tag: 'Laporan PKL',
      date: new Date().toISOString().split('T')[0],
      content: '',
      author: sessionStorage.getItem('namaUser') || 'Kyra'
    });

    confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
    triggerToast('✓ Artikel baru berhasil diterbitkan!');
  };

  const handleDeleteArticle = (id) => {
    if (window.confirm('Yakin ingin menghapus artikel ini?')) {
      const updated = articles.filter(a => a.id !== id);
      setArticles(updated);
      saveStoredArticles(updated);
      triggerToast('✓ Artikel berhasil dihapus.');
      if (readingArticle?.id === id) setReadingArticle(null);
    }
  };

  // Note Actions
  const handleSaveNote = (e) => {
    e.preventDefault();
    if (!newNote.title.trim() || !newNote.content.trim()) return;

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const created = {
      id: 'note-' + Date.now(),
      ...newNote,
      createdAt: timeStr,
      pinned: false
    };

    const updated = [created, ...notes];
    setNotes(updated);
    saveStoredNotes(updated);
    setIsNoteModalOpen(false);
    setNewNote({
      title: '',
      date: new Date().toISOString().split('T')[0],
      color: 'lilac',
      content: ''
    });

    confetti({ particleCount: 50, spread: 50, origin: { y: 0.7 } });
    triggerToast('✓ Catatan baru berhasil disimpan!');
  };

  const handleDeleteNote = (id) => {
    if (window.confirm('Yakin ingin menghapus catatan ini?')) {
      const updated = notes.filter(n => n.id !== id);
      setNotes(updated);
      saveStoredNotes(updated);
      triggerToast('✓ Catatan berhasil dihapus.');
    }
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('Semua');
    setSelectedDate('');
  };

  // Filtering
  const filteredArticles = articles.filter(art => {
    const matchSearch = !searchQuery ||
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (art.tag && art.tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchDate = !selectedDate || art.date === selectedDate;
    const matchCat = selectedCategory === 'Semua' || art.tag === selectedCategory;

    return matchSearch && matchDate && matchCat;
  });

  const filteredNotes = notes.filter(note => {
    const matchSearch = !searchQuery ||
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase());

    const matchDate = !selectedDate || note.date === selectedDate;
    return matchSearch && matchDate;
  });

  return (
    <>
      <Helmet>
        <title>Artikel & Catatan PKL | d1kyra</title>
        <meta name="description" content="Koleksi laporan kegiatan PKL, catatan belajar, dan dokumentasi harian d1kyra." />
      </Helmet>

      <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
        {/* Toast Notification */}
        <AnimatePresence>
          {toastMsg && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-20 right-6 z-50 px-5 py-3 rounded-2xl bg-indigo-600 text-white text-xs font-bold shadow-2xl flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{toastMsg}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header Title & Tab Switcher */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest block mb-1">
              Dokumentasi & Knowledge Base
            </span>
            <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              Artikel & Catatan PKL
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Manajemen logbook kegiatan, refleksi belajar, dan catatan ide cepat.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Tab Pill */}
            <div className="flex p-1 bg-white/5 rounded-2xl border border-white/10 glass-panel">
              <button
                onClick={() => setActiveTab('articles')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'articles'
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Artikel ({articles.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('notes')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'notes'
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <StickyNote className="w-3.5 h-3.5" />
                <span>Catatan ({notes.length})</span>
              </button>
            </div>

            {/* Add Button */}
            {isAuth ? (
              <button
                onClick={() => {
                  if (activeTab === 'articles') setIsArticleModalOpen(true);
                  else setIsNoteModalOpen(true);
                }}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-bold shadow-lg shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-transform"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {activeTab === 'articles' ? 'Tulis Artikel' : 'Tulis Catatan'}
                </span>
              </button>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl glass-panel border border-white/10 hover:border-indigo-500 text-gray-300 hover:text-white text-xs font-bold transition-all"
              >
                <Lock className="w-3.5 h-3.5 text-indigo-400" />
                <span className="hidden sm:inline">Login untuk Menulis</span>
              </Link>
            )}
          </div>
        </div>

        {/* Filter Controls (Search, Category Chips, Date Filter) */}
        <div className="space-y-4 p-5 rounded-2xl glass-panel border border-white/10">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            {/* Search Input */}
            <div className="sm:col-span-7 relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={activeTab === 'articles' ? 'Cari judul, tag, atau isi artikel...' : 'Cari isi catatan...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            {/* Date Filter */}
            <div className="sm:col-span-3 relative">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            {/* Reset Button */}
            <div className="sm:col-span-2">
              <button
                onClick={resetFilters}
                className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-xs font-semibold border border-white/10 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Category Chips for Articles */}
          {activeTab === 'articles' && (
            <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                    selectedCategory === cat
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* TAB CONTENT: ARTICLES */}
        {activeTab === 'articles' && (
          <div className="space-y-6">
            {filteredArticles.length === 0 ? (
              <div className="text-center py-16 rounded-3xl glass-panel border border-white/10 space-y-4">
                <BookOpen className="w-12 h-12 text-gray-500 mx-auto" />
                <h3 className="text-base font-bold text-white">Tidak ada artikel ditemukan</h3>
                <p className="text-xs text-gray-400">Coba sesuaikan kata kunci pencarian atau tanggal filter.</p>
                <button
                  onClick={() => setIsArticleModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold"
                >
                  ＋ Tulis Artikel Pertama
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredArticles.map((art, idx) => (
                  <motion.article
                    key={art.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="p-6 rounded-2xl glass-panel border border-white/10 hover:border-indigo-500/40 hover:shadow-xl transition-all flex flex-col justify-between space-y-4 group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-[11px] font-bold text-indigo-300">
                          {art.tag || 'Artikel'}
                        </span>
                        <span className="text-[11px] text-gray-400 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {art.date}
                        </span>
                      </div>

                      <h2
                        onClick={() => setReadingArticle(art)}
                        className="font-display font-bold text-lg text-white group-hover:text-indigo-300 transition-colors cursor-pointer line-clamp-2"
                      >
                        {art.title}
                      </h2>

                      <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">
                        {art.content}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                      <span className="text-gray-400 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-indigo-400" />
                        <strong>{art.author || 'Kyra'}</strong>
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setReadingArticle(art)}
                          className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-indigo-600/20 text-indigo-300 hover:text-white font-semibold flex items-center gap-1 transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Baca</span>
                        </button>

                        <button
                          onClick={() => handleCopy(`${art.title}\n\n${art.content}`)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                          title="Salin Isi Artikel"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>

                        {isAuth && (
                          <button
                            onClick={() => handleDeleteArticle(art.id)}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 text-gray-400 hover:text-rose-400 transition-colors"
                            title="Hapus Artikel"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB CONTENT: NOTES */}
        {activeTab === 'notes' && (
          <div className="space-y-6">
            {filteredNotes.length === 0 ? (
              <div className="text-center py-16 rounded-3xl glass-panel border border-white/10 space-y-4">
                <StickyNote className="w-12 h-12 text-gray-500 mx-auto" />
                <h3 className="text-base font-bold text-white">Belum ada catatan tersimpan</h3>
                <p className="text-xs text-gray-400">Tulis ide cepat, catatan ngoding, atau agenda harian Anda.</p>
                {isAuth && (
                  <button
                    onClick={() => setIsNoteModalOpen(true)}
                    className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold"
                  >
                    ＋ Tulis Catatan Baru
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNotes.map((note, idx) => {
                  const colorObj = NOTE_COLORS.find(c => c.id === note.color) || NOTE_COLORS[0];
                  return (
                    <motion.div
                      key={note.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      className={`p-6 rounded-2xl glass-panel border ${colorObj.class} hover:shadow-xl transition-all flex flex-col justify-between space-y-4`}
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between text-[11px] text-gray-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {note.date}
                          </span>
                          <span>🕒 {note.createdAt || '09:00'}</span>
                        </div>

                        <h3 className="font-display font-bold text-base text-white line-clamp-2">
                          {note.title}
                        </h3>

                        <p className="text-xs text-gray-300 leading-relaxed whitespace-pre-wrap">
                          {note.content}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                        <span className="text-[10px] text-gray-400 font-mono">d1kyra note</span>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleCopy(`${note.title}\n\n${note.content}`)}
                            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors"
                            title="Salin Catatan"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                          {isAuth && (
                            <button
                              onClick={() => handleDeleteNote(note.id)}
                              className="p-1.5 rounded-lg bg-white/10 hover:bg-rose-500/20 text-gray-300 hover:text-rose-300 transition-colors"
                              title="Hapus Catatan"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* MODAL: CREATE ARTICLE */}
        <AnimatePresence>
          {isArticleModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="relative max-w-xl w-full rounded-3xl glass-panel border border-white/15 p-6 sm:p-8 bg-[#0c1022] shadow-2xl space-y-5"
              >
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-indigo-400" />
                    <h3 className="font-display font-bold text-lg text-white">Tulis Artikel Baru</h3>
                  </div>
                  <button
                    onClick={() => setIsArticleModalOpen(false)}
                    className="p-1.5 rounded-full bg-white/5 text-gray-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveArticle} className="space-y-4 text-xs sm:text-sm">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="font-bold text-gray-300">Tanggal Kegiatan</label>
                      <input
                        type="date"
                        value={newArticle.date}
                        onChange={(e) => setNewArticle({ ...newArticle, date: e.target.value })}
                        required
                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-bold text-gray-300">Kategori Tag</label>
                      <select
                        value={newArticle.tag}
                        onChange={(e) => setNewArticle({ ...newArticle, tag: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#0c1022] border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                      >
                        <option value="Laporan PKL">Laporan PKL</option>
                        <option value="Refleksi Diri">Refleksi Diri</option>
                        <option value="Tech & Tips">Tech & Tips</option>
                        <option value="Tutorial">Tutorial</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-gray-300">Judul Artikel</label>
                    <input
                      type="text"
                      placeholder="Contoh: Laporan PKL Hari Pertama..."
                      value={newArticle.title}
                      onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-gray-300">Isi Lengkap Artikel</label>
                    <textarea
                      rows="6"
                      placeholder="Tuliskan detail kegiatan atau pemikiran Anda di sini..."
                      value={newArticle.content}
                      onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => setIsArticleModalOpen(false)}
                      className="px-4 py-2 rounded-xl bg-white/5 text-gray-300 hover:text-white"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold shadow-lg shadow-indigo-500/25"
                    >
                      Terbitkan Artikel
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* MODAL: CREATE NOTE */}
        <AnimatePresence>
          {isNoteModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="relative max-w-lg w-full rounded-3xl glass-panel border border-white/15 p-6 sm:p-8 bg-[#0c1022] shadow-2xl space-y-5"
              >
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <StickyNote className="w-5 h-5 text-indigo-400" />
                    <h3 className="font-display font-bold text-lg text-white">Tulis Catatan Cepat</h3>
                  </div>
                  <button
                    onClick={() => setIsNoteModalOpen(false)}
                    className="p-1.5 rounded-full bg-white/5 text-gray-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveNote} className="space-y-4 text-xs sm:text-sm">
                  <div className="space-y-1.5">
                    <label className="font-bold text-gray-300">Pilih Warna Kartu</label>
                    <div className="flex items-center gap-2 pt-1">
                      {NOTE_COLORS.map((c) => (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => setNewNote({ ...newNote, color: c.id })}
                          className={`w-7 h-7 rounded-full ${c.dot} transition-transform flex items-center justify-center ${
                            newNote.color === c.id ? 'scale-125 ring-2 ring-white' : 'opacity-70 hover:opacity-100'
                          }`}
                        >
                          {newNote.color === c.id && <Check className="w-3.5 h-3.5 text-white" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-gray-300">Judul Catatan</label>
                    <input
                      type="text"
                      placeholder="Contoh: Target Kuliah ITB..."
                      value={newNote.title}
                      onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-gray-300">Isi Catatan</label>
                    <textarea
                      rows="4"
                      placeholder="Tulis ide atau pengingat ringkas..."
                      value={newNote.content}
                      onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => setIsNoteModalOpen(false)}
                      className="px-4 py-2 rounded-xl bg-white/5 text-gray-300 hover:text-white"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold shadow-lg"
                    >
                      Simpan Catatan
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* MODAL: READING ARTICLE */}
        <AnimatePresence>
          {readingArticle && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
              onClick={() => setReadingArticle(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-2xl w-full rounded-3xl glass-panel border border-white/15 p-6 sm:p-9 bg-[#0c1022] shadow-2xl space-y-6 max-h-[85vh] overflow-y-auto"
              >
                <button
                  onClick={() => setReadingArticle(null)}
                  className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-gray-300 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
                      {readingArticle.tag || 'Artikel'}
                    </span>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {readingArticle.date}
                    </span>
                  </div>

                  <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                    {readingArticle.title}
                  </h2>

                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span>Penulis: <strong className="text-white">{readingArticle.author || 'Kyra'}</strong></span>
                    <span>•</span>
                    <span>{readingArticle.readTime || '3 min read'}</span>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-white/5 border border-white/5 text-sm sm:text-base text-gray-200 leading-relaxed whitespace-pre-wrap">
                  {readingArticle.content}
                </div>

                <div className="flex justify-between items-center pt-2">
                  <button
                    onClick={() => handleCopy(`${readingArticle.title}\n\n${readingArticle.content}`)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-300 hover:text-white transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Salin Seluruh Teks</span>
                  </button>

                  <button
                    onClick={() => setReadingArticle(null)}
                    className="px-5 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-500"
                  >
                    Tutup
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Articles;
