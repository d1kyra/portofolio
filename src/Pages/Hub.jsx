import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Sparkles, Play, Pause, Volume2, Coffee, CheckSquare, Plus, Trash2, Clock, Music, Disc3, Radio, StickyNote, Flame } from 'lucide-react';
import { useMusic, PRESET_DATA } from '../context/MusicContext';
import { getStoredNotes, saveStoredNotes } from '../utils/storage';
import { motion } from 'framer-motion';

const SPOTIFY_PLAYLISTS = [
  { id: '1', name: '🎵 Dwiky Playlist', url: 'https://open.spotify.com/embed/playlist/4pmkS1ygMpbR7fJ8lahxRf?utm_source=generator&theme=0' },
  { id: '2', name: 'Deep Focus & Study', url: 'https://open.spotify.com/embed/playlist/37i9dQZF1DX4sWSpwq3LiO?utm_source=generator&theme=0' },
  { id: '3', name: 'Coding & ITB Prep', url: 'https://open.spotify.com/embed/playlist/37i9dQZF1DX9RwfG7v28F5?utm_source=generator&theme=0' },
];

const DEFAULT_TASKS = [
  { id: '1', title: 'Belajar React & State Management (Vite)', done: true },
  { id: '2', title: 'Dokumentasi Logbook PKL Hari Ini', done: true },
  { id: '3', title: 'Latihan Logika Algoritma & Soal UTBK ITB', done: false },
  { id: '4', title: 'Minum Spanish Latte & Istirahat Mata', done: false },
];

const Hub = () => {
  const {
    isPlaying,
    currentPreset,
    presetData,
    volume,
    activeTab,
    setActiveTab,
    spotifyEmbedUrl,
    setSpotifyEmbedUrl,
    togglePlay,
    selectPreset,
    handleVolumeChange,
  } = useMusic();

  const [time, setTime] = useState(new Date());

  // Tasks & Productivity state
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('d1kyra_tasks');
      return saved ? JSON.parse(saved) : DEFAULT_TASKS;
    } catch (e) {
      return DEFAULT_TASKS;
    }
  });
  const [newTaskInput, setNewTaskInput] = useState('');

  // Quick scratchpad state
  const [scratchpad, setScratchpad] = useState(() => localStorage.getItem('d1kyra_scratchpad') || '');
  const [scratchSaved, setScratchSaved] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('d1kyra_tasks', JSON.stringify(tasks));
    } catch (e) {}
  }, [tasks]);

  const handleToggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskInput.trim()) return;
    const item = {
      id: 'task-' + Date.now(),
      title: newTaskInput.trim(),
      done: false
    };
    setTasks([...tasks, item]);
    setNewTaskInput('');
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const handleSaveScratchpadToNotes = () => {
    if (!scratchpad.trim()) return;
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const newNote = {
      id: 'note-' + Date.now(),
      title: 'Catatan dari Focus Hub',
      date: now.toISOString().split('T')[0],
      color: 'peach',
      content: scratchpad.trim(),
      createdAt: timeStr
    };
    const currentNotes = getStoredNotes();
    saveStoredNotes([newNote, ...currentNotes]);
    setScratchSaved(true);
    setTimeout(() => setScratchSaved(false), 2500);
  };

  const completedCount = tasks.filter(t => t.done).length;
  const progressPercent = Math.round((completedCount / (tasks.length || 1)) * 100);

  return (
    <>
      <Helmet>
        <title>Command Hub & Audio Fokus | d1kyra</title>
        <meta name="description" content="Pusat kendali produktivitas harian, pemutar musik Spotify fokus, streak target, dan scratchpad d1kyra." />
      </Helmet>

      <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
        {/* Header with live clock & greeting */}
        <div className="p-8 rounded-3xl glass-panel border border-white/15 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-pink-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-bold text-emerald-400">
              <Flame className="w-3.5 h-3.5" />
              <span>Mode Produktivitas & Fokus Belajar</span>
            </div>
            <h1 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
              Pusat Kendali & Hub Musik Spotify
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 max-w-xl">
              Ciptakan suasana tenang untuk fokus ngoding, mengecek target harian, dan mencatat ide spontan.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center space-y-1">
            <div className="font-mono font-bold text-2xl sm:text-3xl text-indigo-400">
              {time.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })} WIB
            </div>
            <p className="text-xs text-gray-400 font-medium">
              {time.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>
        </div>

        {/* 2-Column Grid: Audio Focus Station & Tasks Streak */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT: AUDIO FOCUS STATION */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-7 rounded-3xl glass-panel border border-white/15 shadow-xl space-y-6">
              {/* Header Tab */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className={`w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center text-white text-lg shadow-md ${isPlaying ? 'animate-spin-slow' : ''}`}>
                    {presetData.icon}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-white">Pemutar Audio Ambience</h3>
                    <p className="text-xs text-gray-400">Web Audio API & Spotify Integration</p>
                  </div>
                </div>

                <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 text-xs">
                  <button
                    onClick={() => setActiveTab('spotify')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                      activeTab === 'spotify' ? 'bg-emerald-600 text-white' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Spotify Playlists
                  </button>
                  <button
                    onClick={() => setActiveTab('ambient')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                      activeTab === 'ambient' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Ambience Generator
                  </button>
                </div>
              </div>

              {/* Ambient Engine View */}
              {activeTab === 'ambient' && (
                <div className="space-y-6">
                  {/* Active Preset Display & Main Play/Pause */}
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider">Suasana Aktif</span>
                      <h4 className="font-display font-black text-xl sm:text-2xl text-white">
                        {presetData.title}
                      </h4>
                      <p className="text-xs text-gray-400">{presetData.desc}</p>
                    </div>

                    <button
                      onClick={togglePlay}
                      className="p-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-xl shadow-indigo-500/25 hover:scale-105 active:scale-95 transition-transform"
                    >
                      {isPlaying ? <Pause className="w-6 h-6 fill-white" /> : <Play className="w-6 h-6 fill-white ml-0.5" />}
                    </button>
                  </div>

                  {/* 4 Presets Selector */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-300 block">Pilih Preset Suara Ambience:</label>
                    <div className="grid grid-cols-2 gap-3">
                      {Object.values(PRESET_DATA).map((p) => (
                        <button
                          key={p.id}
                          onClick={() => selectPreset(p.id)}
                          className={`p-4 rounded-2xl text-left border transition-all flex items-start gap-3 ${
                            currentPreset === p.id
                              ? 'bg-indigo-600/25 border-indigo-500 text-white shadow-lg'
                              : 'bg-white/5 border-white/5 text-gray-300 hover:bg-white/10'
                          }`}
                        >
                          <span className="text-2xl">{p.icon}</span>
                          <div>
                            <h5 className="font-bold text-xs sm:text-sm text-white">{p.title}</h5>
                            <p className="text-[11px] text-gray-400 line-clamp-1">{p.desc}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Volume Slider */}
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                    <div className="flex justify-between items-center text-xs text-gray-300">
                      <span className="flex items-center gap-1.5">
                        <Volume2 className="w-4 h-4 text-indigo-400" />
                        Volume Ambience
                      </span>
                      <span className="font-bold font-mono text-indigo-400">{Math.round(volume * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={volume}
                      onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                      className="w-full accent-indigo-500 h-2 bg-white/10 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>
              )}

              {/* Spotify View */}
              {activeTab === 'spotify' && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {SPOTIFY_PLAYLISTS.map((pl) => (
                      <button
                        key={pl.id}
                        onClick={() => setSpotifyEmbedUrl(pl.url)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          spotifyEmbedUrl === pl.url
                            ? 'bg-emerald-600 text-white'
                            : 'bg-white/5 text-gray-400 hover:text-white'
                        }`}
                      >
                        {pl.name}
                      </button>
                    ))}
                  </div>

                  <iframe
                    style={{ borderRadius: '16px' }}
                    src={spotifyEmbedUrl}
                    width="100%"
                    height="280"
                    frameBorder="0"
                    allowFullScreen=""
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    title="Spotify Playlist"
                  />
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: DAILY TASK STREAK & SCRATCHPAD */}
          <div className="lg:col-span-5 space-y-6">
            {/* Task Streak Box */}
            <div className="p-7 rounded-3xl glass-panel border border-white/15 shadow-xl space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
                  <CheckSquare className="w-4 h-4" />
                  <h3>Target Harian ({completedCount}/{tasks.length})</h3>
                </div>
                <span className="text-xs font-bold text-emerald-400">{progressPercent}% Selesai</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Task Form */}
              <form onSubmit={handleAddTask} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Tambah target baru..."
                  value={newTaskInput}
                  onChange={(e) => setNewTaskInput(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="submit"
                  className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shrink-0"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </form>

              {/* Tasks List */}
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`p-3 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                      task.done
                        ? 'bg-emerald-500/10 border-emerald-500/20 text-gray-400'
                        : 'bg-white/5 border-white/5 text-white hover:border-white/10'
                    }`}
                  >
                    <label className="flex items-center gap-2.5 text-xs cursor-pointer flex-1 select-none">
                      <input
                        type="checkbox"
                        checked={task.done}
                        onChange={() => handleToggleTask(task.id)}
                        className="rounded accent-emerald-500 w-4 h-4 cursor-pointer"
                      />
                      <span className={task.done ? 'line-through text-gray-400' : 'font-medium'}>
                        {task.title}
                      </span>
                    </label>

                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="text-gray-500 hover:text-rose-400 p-1 transition-colors"
                      title="Hapus"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Scratchpad */}
            <div className="p-7 rounded-3xl glass-panel border border-white/15 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <StickyNote className="w-4 h-4" />
                  <h3>Scratchpad Cepat</h3>
                </div>
                {scratchSaved && (
                  <span className="text-[11px] font-bold text-emerald-400">✓ Tersimpan ke Catatan!</span>
                )}
              </div>

              <textarea
                rows="4"
                placeholder="Tulis pemikiran cepat, snippet ide, atau to-do sementara..."
                value={scratchpad}
                onChange={(e) => {
                  setScratchpad(e.target.value);
                  localStorage.setItem('d1kyra_scratchpad', e.target.value);
                }}
                className="w-full p-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-indigo-500"
              />

              <button
                onClick={handleSaveScratchpadToNotes}
                className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-indigo-600/20 border border-white/10 hover:border-indigo-500 text-xs font-bold text-indigo-300 hover:text-white transition-all flex items-center justify-center gap-2"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Simpan sebagai Catatan Resmi</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hub;
