import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { User, Edit3, MapPin, Mail, Sparkles, GraduationCap, Briefcase, Award, CheckCircle2, Code2, Coffee, Target, X, Github, Instagram, Camera, Upload, Trash2, Image as ImageIcon, Lock, ArrowUpRight } from 'lucide-react';
import { TikTokIcon } from '../components/Icons';
import { getStoredProfile, saveStoredProfile, getStoredCertificates } from '../utils/storage';
import Certificate from '../components/Certificate';
import { motion, AnimatePresence } from 'framer-motion';

const Bio = () => {
  const isAuth = sessionStorage.getItem('statusLogin') === 'true';
  const sessionUser = sessionStorage.getItem('namaUser') || 'kyraa';
  const [profile, setProfile] = useState(() => getStoredProfile(sessionUser));
  const [isEditOpen, setIsEditOpen] = useState(false);
  const certificates = getStoredCertificates();
  const fileInputRef = useRef(null);

  // Form State for Edit Modal
  const [formData, setFormData] = useState({
    fullName: profile.fullName || '',
    role: profile.role || '',
    location: profile.location || '',
    bio: profile.bio || '',
    about: profile.about || '',
    avatar: profile.avatar || '',
    skillTags: profile.skillTags ? profile.skillTags.join(', ') : '',
  });

  useEffect(() => {
    if (isEditOpen) {
      setFormData({
        fullName: profile.fullName || '',
        role: profile.role || '',
        location: profile.location || '',
        bio: profile.bio || '',
        about: profile.about || '',
        avatar: profile.avatar || '',
        skillTags: profile.skillTags ? profile.skillTags.join(', ') : '',
      });
    }
  }, [isEditOpen, profile]);

  const handleImageUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Mohon pilih berkas gambar (JPG, PNG, WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_SIZE = 400;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_SIZE) {
            height = Math.round((height * MAX_SIZE) / width);
            width = MAX_SIZE;
          }
        } else {
          if (height > MAX_SIZE) {
            width = Math.round((width * MAX_SIZE) / height);
            height = MAX_SIZE;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.88);
        setFormData((prev) => ({ ...prev, avatar: dataUrl }));
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setFormData((prev) => ({ ...prev, avatar: '' }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    const updated = {
      ...profile,
      fullName: formData.fullName,
      role: formData.role,
      location: formData.location,
      bio: formData.bio,
      about: formData.about,
      avatar: formData.avatar,
      skillTags: formData.skillTags.split(',').map((s) => s.trim()).filter(Boolean),
    };
    setProfile(updated);
    saveStoredProfile(sessionUser, updated);
    setIsEditOpen(false);
  };

  return (
    <>
      <Helmet>
        <title>Biodata Profil Lengkap | d1kyra</title>
        <meta name="description" content="Profil lengkap, keahlian, riwayat pendidikan, dan aktivitas PKL Muhammad Dwiky Rahman (Kyra)." />
      </Helmet>

      <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest block mb-1">
              Personal Identity & Profile
            </span>
            <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              Biodata & Keahlian
            </h1>
          </div>

          {isAuth ? (
            <button
              onClick={() => setIsEditOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-xs font-bold text-white shadow-lg hover:scale-105 transition-all active:scale-95"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit Data Profil</span>
            </button>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl glass-panel border border-white/10 hover:border-indigo-500 text-xs font-semibold text-gray-300 hover:text-white transition-all"
            >
              <Lock className="w-3.5 h-3.5 text-indigo-400" />
              <span>Login untuk Edit</span>
            </Link>
          )}
        </div>

        {/* 2-Column Layout (Left: Identity Card, Right: Details, Skills, Journey) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT IDENTITY CARD */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-7 rounded-3xl glass-panel border border-white/15 text-center space-y-6 shadow-2xl relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />

              {/* Big Avatar with Camera edit icon */}
              <div className="relative w-28 h-28 mx-auto group">
                <div className="w-full h-full rounded-3xl bg-gradient-primary p-1 shadow-xl shadow-indigo-500/30 overflow-hidden">
                  {profile.avatar ? (
                    <img
                      src={profile.avatar}
                      alt={profile.fullName}
                      className="w-full h-full object-cover rounded-[22px]"
                    />
                  ) : (
                    <div className="w-full h-full rounded-[22px] bg-[#0c1022] flex items-center justify-center text-white font-display font-black text-4xl">
                      {profile.fullName ? profile.fullName.charAt(0).toUpperCase() : 'K'}
                    </div>
                  )}
                </div>
                {isAuth && (
                  <button
                    onClick={() => setIsEditOpen(true)}
                    title="Ganti Foto Profil"
                    className="absolute bottom-0 right-0 p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg border-2 border-[#070913] hover:scale-110 active:scale-95 transition-all"
                    aria-label="Edit Foto Profil"
                  >
                    <Camera className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Name & Role */}
              <div className="space-y-2">
                <h2 className="font-display font-black text-xl text-white">
                  {profile.fullName || 'Muhammad Dwiky Rahman'}
                </h2>
                <div className="inline-block px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-xs font-bold text-indigo-300">
                  {profile.role || 'Siswa PKL & Frontend Developer'}
                </div>
              </div>

              {/* Bio Quote */}
              <p className="text-xs text-gray-400 italic leading-relaxed px-2">
                {profile.bio || '"Fokus belajar pemrograman web modern, matematika, dan bersiap masuk Teknik Informatika ITB!"'}
              </p>

              {/* Info Rows */}
              <div className="pt-4 border-t border-white/10 space-y-3 text-xs text-left">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    Username
                  </span>
                  <span className="font-bold text-white">@{sessionUser}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-400 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    Lokasi
                  </span>
                  <span className="font-bold text-white">{profile.location || 'Indonesia'}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-400 flex items-center gap-1.5">
                    <Coffee className="w-3.5 h-3.5 text-amber-400" />
                    Favorit
                  </span>
                  <span className="font-bold text-amber-300">Spanish Latte ☕</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-400 flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5 text-pink-400" />
                    Target
                  </span>
                  <span className="font-bold text-pink-400">Teknik Informatika ITB</span>
                </div>
              </div>

              {/* Social Channels on Bio Card */}
              <div className="pt-4 border-t border-white/10">
                <span className="text-[11px] font-bold text-gray-400 block mb-2.5">Sosial Media:</span>
                <div className="flex items-center justify-center gap-2.5">
                  <a
                    href="https://github.com/d1kyra"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-indigo-500 text-gray-300 hover:text-white transition-all shadow-sm"
                    aria-label="GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href="https://www.instagram.com/m_dwikyr?igsi=dDYzcHB5bXhpNnNo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-pink-500 text-gray-300 hover:text-white transition-all shadow-sm"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    href="https://www.tiktok.com/@d1kyra?_r=1&_t=ZS-99M7jHlZuBJ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400 text-gray-300 hover:text-white transition-all shadow-sm"
                    aria-label="TikTok"
                  >
                    <TikTokIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Education Card */}
            <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-4">
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
                <GraduationCap className="w-4 h-4" />
                <h3>Jalur Pendidikan & Target</h3>
              </div>
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                  <span className="text-[10px] text-gray-400">Sekarang (2026)</span>
                  <h4 className="font-bold text-white">SMK / Siswa Praktik Kerja Lapangan (PKL)</h4>
                  <p className="text-gray-400">Fokus sistem informasi & pengembangan web frontend.</p>
                </div>
                <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/30 space-y-1">
                  <span className="text-[10px] text-indigo-400 font-bold">Target Kuliah Masa Depan</span>
                  <h4 className="font-bold text-white">Institut Teknologi Bandung (ITB)</h4>
                  <p className="text-indigo-200">Program Studi S1 Teknik Informatika.</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT DETAILS & SKILLS */}
          <div className="lg:col-span-8 space-y-8">
            {/* About Narrative */}
            <div className="p-7 rounded-3xl glass-panel border border-white/15 space-y-4 shadow-xl">
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-base">
                <Sparkles className="w-5 h-5" />
                <h2>Tentang Saya & Visi</h2>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">
                {profile.about || 'Halo! Saya Kyra, siswa PKL yang saat ini aktif mengembangkan proyek sistem informasi dan antarmuka web modern d1kyra. Saya menyukai perpaduan desain glassmorphism yang bersih dengan logika JavaScript & React yang interaktif.'}
              </p>

              {/* Skill Tags Cloud */}
              <div className="pt-3">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
                  Highlight Tags:
                </span>
                <div className="flex flex-wrap gap-2">
                  {(profile.skillTags || ['🌐 Frontend React', '✨ JavaScript ES6+', '🎨 UI/UX Glassmorphism', '☕ Spanish Latte Enthusiast', '🎯 Target Informatika ITB', '📊 Sistem Informasi PKL']).map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-indigo-500 text-xs font-semibold text-gray-200 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Core Competencies Bars */}
            <div className="p-7 rounded-3xl glass-panel border border-white/15 space-y-6 shadow-xl">
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-base">
                <Code2 className="w-5 h-5" />
                <h2>Keahlian Teknis & Pemrograman</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(profile.skills || [
                  { name: 'React 18 & Vite Ecosystem', level: 90 },
                  { name: 'Tailwind CSS & Glassmorphism UI', level: 95 },
                  { name: 'JavaScript ES6+ & TypeScript', level: 88 },
                  { name: 'Supabase & Database Backend', level: 78 },
                  { name: 'Web Audio API & Soundscape', level: 85 },
                  { name: 'Sistem Informasi PKL & Logbook', level: 92 },
                ]).map((skill, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-white">{skill.name}</span>
                      <span className="text-indigo-400 font-mono">{skill.level}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: idx * 0.1 }}
                        className="h-full bg-gradient-primary rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity Timeline / PKL History */}
            <div className="p-7 rounded-3xl glass-panel border border-white/15 space-y-6 shadow-xl">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-base">
                <Briefcase className="w-5 h-5" />
                <h2>Riwayat Aktivitas & Pengalaman PKL</h2>
              </div>

              <div className="space-y-5 border-l-2 border-indigo-500/40 pl-6 ml-2">
                {(profile.activities || [
                  { title: 'Pengembangan Platform d1kyra All-In-One', desc: 'Menggabungkan Portofolio_V5 dan modul artikel/catatan/Spotify hub ke dalam satu arsitektur React modern.' },
                  { title: 'Praktik Kerja Lapangan (PKL)', desc: 'Mengerjakan sistem informasi manajemen data dan penyusunan dokumentasi laporan harian.' },
                  { title: 'Persiapan Masuk Informatika ITB', desc: 'Pendalaman materi logika pemrograman, matematika saintek, dan eksplorasi teknologi web terkini.' }
                ]).map((act, idx) => (
                  <div key={idx} className="relative group">
                    <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-indigo-500 border-2 border-[#070913] group-hover:scale-125 transition-transform" />
                    <h3 className="font-bold text-sm text-white">{act.title}</h3>
                    <p className="text-xs text-gray-400 leading-relaxed mt-1">{act.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="pt-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
              <Award className="w-5 h-5" />
              <h2>Sertifikat & Penghargaan</h2>
            </div>
            {isAuth && (
              <Link
                to="/dashboard"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-amber-500/50 text-xs font-bold text-amber-300 hover:text-white transition-all shadow-sm"
              >
                <span>Kelola Sertifikat</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
          <Certificate certificates={certificates} />
        </div>
      </div>

      {/* MODAL EDIT PROFILE */}
      <AnimatePresence>
        {isEditOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-lg w-full rounded-3xl glass-panel border border-white/15 p-6 sm:p-8 bg-[#0c1022] shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-indigo-400" />
                  <h3 className="font-display font-bold text-lg text-white">Edit Data Profil</h3>
                </div>
                <button
                  onClick={() => setIsEditOpen(false)}
                  className="p-1.5 rounded-full bg-white/5 text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-5 text-xs sm:text-sm">
                {/* Profile Photo Uploader Section */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <label className="font-bold text-gray-200 block text-xs flex items-center gap-1.5">
                    <Camera className="w-4 h-4 text-indigo-400" />
                    Foto Profil Anda
                  </label>

                  <div className="flex items-center gap-4">
                    {/* Preview Avatar */}
                    <div className="w-16 h-16 rounded-2xl bg-gradient-primary p-0.5 shadow-md shrink-0 overflow-hidden">
                      {formData.avatar ? (
                        <img
                          src={formData.avatar}
                          alt="Preview Foto"
                          className="w-full h-full object-cover rounded-[14px]"
                        />
                      ) : (
                        <div className="w-full h-full rounded-[14px] bg-[#0c1022] flex items-center justify-center text-white font-bold text-xl">
                          {formData.fullName ? formData.fullName.charAt(0).toUpperCase() : 'K'}
                        </div>
                      )}
                    </div>

                    <div className="flex-1 space-y-2">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="hidden"
                      />
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current && fileInputRef.current.click()}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md transition-all active:scale-95"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>Pilih Foto dari Galeri</span>
                        </button>

                        {formData.avatar && (
                          <button
                            type="button"
                            onClick={handleRemovePhoto}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-400 text-xs font-bold border border-red-500/30 transition-all"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Hapus Foto</span>
                          </button>
                        )}
                      </div>
                      <p className="text-[10px] text-gray-400">
                        Mendukung format JPG, PNG, atau WEBP. Otomatis dikompresi untuk performa optimal.
                      </p>
                    </div>
                  </div>

                  {/* Optional Image URL Input */}
                  <div className="pt-2 border-t border-white/5 space-y-1">
                    <label className="text-[11px] font-semibold text-gray-400 flex items-center gap-1">
                      <ImageIcon className="w-3 h-3" />
                      Atau tempel tautan URL Foto:
                    </label>
                    <input
                      type="url"
                      placeholder="https://images.unsplash.com/..."
                      value={formData.avatar && !formData.avatar.startsWith('data:') ? formData.avatar : ''}
                      onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-gray-300">Nama Lengkap</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-gray-300">Role / Posisi</label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-gray-300">Lokasi</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-gray-300">Kutipan Singkat (Bio Quote)</label>
                  <input
                    type="text"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-gray-300">Deskripsi Lengkap (About)</label>
                  <textarea
                    rows="3"
                    value={formData.about}
                    onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-gray-300">Keahlian Tags (Pisahkan dengan koma)</label>
                  <input
                    type="text"
                    value={formData.skillTags}
                    onChange={(e) => setFormData({ ...formData, skillTags: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setIsEditOpen(false)}
                    className="px-4 py-2 rounded-xl bg-white/5 text-gray-300 hover:text-white"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold shadow-lg"
                  >
                    Simpan Perubahan
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Bio;
