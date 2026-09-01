import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { LayoutDashboard, BookOpen, StickyNote, FolderGit2, LogOut, User, Plus, Trash2, Edit3, Shield, ArrowUpRight, Sparkles, Award, X, Image as ImageIcon, CheckCircle2 } from 'lucide-react';
import { getStoredArticles, saveStoredArticles, getStoredNotes, saveStoredNotes, getStoredProjects, saveStoredProjects, getStoredCertificates, saveStoredCertificates, getStoredProfile } from '../utils/storage';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = () => {
  const navigate = useNavigate();
  const userName = sessionStorage.getItem('namaUser') || 'kyraa';
  const userEmail = sessionStorage.getItem('emailUser') || 'd1kyra@gmail.com';
  const profile = getStoredProfile(userName);

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'articles' | 'notes' | 'projects' | 'certificates'
  const [articles, setArticles] = useState(getStoredArticles);
  const [notes, setNotes] = useState(getStoredNotes);
  const [projects, setProjects] = useState(getStoredProjects);
  const [certificates, setCertificates] = useState(getStoredCertificates);

  // Modals for Adding content
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [isAddCertOpen, setIsAddCertOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  // Project Form
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    category: 'React & Web App',
    techStack: 'React, Tailwind CSS, Vite',
    link: 'https://github.com/d1kyra',
    github: 'https://github.com/d1kyra',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'
  });

  // Certificate Form
  const [newCert, setNewCert] = useState({
    title: '',
    issuer: '',
    date: new Date().getFullYear().toString(),
    description: '',
    image: 'https://images.unsplash.com/photo-1579389083078-4e7018379f7e?auto=format&fit=crop&w=800&q=80'
  });

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2500);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('statusLogin');
    sessionStorage.removeItem('namaUser');
    sessionStorage.removeItem('emailUser');
    navigate('/login');
  };

  // Article Deletion
  const handleDeleteArticle = (id) => {
    if (window.confirm('Hapus artikel ini?')) {
      const updated = articles.filter((a) => a.id !== id);
      setArticles(updated);
      saveStoredArticles(updated);
      triggerToast('✓ Artikel berhasil dihapus.');
    }
  };

  // Note Deletion
  const handleDeleteNote = (id) => {
    if (window.confirm('Hapus catatan ini?')) {
      const updated = notes.filter((n) => n.id !== id);
      setNotes(updated);
      saveStoredNotes(updated);
      triggerToast('✓ Catatan berhasil dihapus.');
    }
  };

  // Project Deletion & Addition
  const handleDeleteProject = (id) => {
    if (window.confirm('Hapus proyek ini dari portofolio?')) {
      const updated = projects.filter((p) => p.id !== id);
      setProjects(updated);
      saveStoredProjects(updated);
      triggerToast('✓ Proyek berhasil dihapus.');
    }
  };

  const handleSaveProject = (e) => {
    e.preventDefault();
    if (!newProject.title.trim() || !newProject.description.trim()) return;

    const created = {
      id: 'proj-' + Date.now(),
      slug: newProject.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: newProject.title,
      description: newProject.description,
      category: newProject.category,
      techStack: newProject.techStack.split(',').map((s) => s.trim()).filter(Boolean),
      link: newProject.link,
      github: newProject.github,
      image: newProject.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      featured: true
    };

    const updated = [created, ...projects];
    setProjects(updated);
    saveStoredProjects(updated);
    setIsAddProjectOpen(false);
    setNewProject({
      title: '',
      description: '',
      category: 'React & Web App',
      techStack: 'React, Tailwind CSS, Vite',
      link: 'https://github.com/d1kyra',
      github: 'https://github.com/d1kyra',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'
    });
    triggerToast('✓ Proyek portofolio baru berhasil ditambahkan!');
  };

  // Certificate Deletion & Addition
  const handleDeleteCert = (id) => {
    if (window.confirm('Hapus sertifikat ini?')) {
      const updated = certificates.filter((c) => c.id !== id);
      setCertificates(updated);
      saveStoredCertificates(updated);
      triggerToast('✓ Sertifikat berhasil dihapus.');
    }
  };

  const handleSaveCert = (e) => {
    e.preventDefault();
    if (!newCert.title.trim() || !newCert.issuer.trim()) return;

    const created = {
      id: 'cert-' + Date.now(),
      title: newCert.title,
      issuer: newCert.issuer,
      date: newCert.date,
      description: newCert.description,
      image: newCert.image || 'https://images.unsplash.com/photo-1579389083078-4e7018379f7e?auto=format&fit=crop&w=800&q=80'
    };

    const updated = [created, ...certificates];
    setCertificates(updated);
    saveStoredCertificates(updated);
    setIsAddCertOpen(false);
    setNewCert({
      title: '',
      issuer: '',
      date: new Date().getFullYear().toString(),
      description: '',
      image: 'https://images.unsplash.com/photo-1579389083078-4e7018379f7e?auto=format&fit=crop&w=800&q=80'
    });
    triggerToast('✓ Sertifikat baru berhasil ditambahkan!');
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard Kyra | d1kyra Platform</title>
        <meta name="description" content="Panel kendali manajemen konten khusus akun Kyra untuk portofolio, artikel, catatan, sertifikat, dan profil." />
      </Helmet>

      {/* Toast */}
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

      <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        {/* Top Header */}
        <div className="p-7 rounded-3xl glass-panel border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-primary p-0.5 shadow-lg overflow-hidden shrink-0">
              {profile.avatar ? (
                <img src={profile.avatar} alt="Kyra" className="w-full h-full object-cover rounded-[14px]" />
              ) : (
                <div className="w-full h-full rounded-[14px] bg-[#0c1022] flex items-center justify-center text-white font-display font-black text-2xl">
                  {userName.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display font-black text-2xl text-white">Dashboard Khusus Kyra</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-bold text-emerald-400">
                  Pemilik Aktif
                </span>
              </div>
              <p className="text-xs text-gray-400">
                Akses penuh: <strong>@{userName}</strong> ({profile.fullName || 'Muhammad Dwiky Rahman'})
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <Link
              to="/bio"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 text-xs font-bold text-white shadow-md transition-all"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit Biodata & Foto</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 text-xs font-bold transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Keluar</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap p-1 bg-white/5 rounded-2xl border border-white/10 glass-panel max-w-2xl">
          {[
            { id: 'overview', label: 'Ringkasan', icon: LayoutDashboard },
            { id: 'articles', label: `Artikel (${articles.length})`, icon: BookOpen },
            { id: 'notes', label: `Catatan (${notes.length})`, icon: StickyNote },
            { id: 'projects', label: `Proyek (${projects.length})`, icon: FolderGit2 },
            { id: 'certificates', label: `Sertifikat (${certificates.length})`, icon: Award },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-[100px] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-2">
                <div className="flex justify-between items-center text-indigo-400">
                  <BookOpen className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase">Artikel</span>
                </div>
                <h3 className="text-3xl font-display font-black text-white">{articles.length}</h3>
                <p className="text-[11px] text-gray-400">Laporan PKL & Tips</p>
              </div>

              <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-2">
                <div className="flex justify-between items-center text-purple-400">
                  <StickyNote className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase">Catatan</span>
                </div>
                <h3 className="text-3xl font-display font-black text-white">{notes.length}</h3>
                <p className="text-[11px] text-gray-400">Ide & agenda harian</p>
              </div>

              <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-2">
                <div className="flex justify-between items-center text-emerald-400">
                  <FolderGit2 className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase">Portofolio</span>
                </div>
                <h3 className="text-3xl font-display font-black text-white">{projects.length}</h3>
                <p className="text-[11px] text-gray-400">Showcase proyek web</p>
              </div>

              <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-2">
                <div className="flex justify-between items-center text-amber-400">
                  <Award className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase">Sertifikat</span>
                </div>
                <h3 className="text-3xl font-display font-black text-white">{certificates.length}</h3>
                <p className="text-[11px] text-gray-400">Prestasi & lisensi</p>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="p-7 rounded-3xl glass-panel border border-white/15 space-y-4">
              <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                Aksi Cepat Kelola Konten
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <Link
                  to="/bio"
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-500 transition-all flex items-center gap-3 group"
                >
                  <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-400 group-hover:scale-110 transition-transform">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-white">Edit Biodata & Foto</h4>
                    <p className="text-[10px] text-gray-400">Ubah bio, foto, keahlian</p>
                  </div>
                </Link>

                <Link
                  to="/articles"
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500 transition-all flex items-center gap-3 group"
                >
                  <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-white">Tulis Artikel Baru</h4>
                    <p className="text-[10px] text-gray-400">Publikasi laporan PKL</p>
                  </div>
                </Link>

                <button
                  onClick={() => {
                    setActiveTab('projects');
                    setIsAddProjectOpen(true);
                  }}
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500 transition-all flex items-center gap-3 text-left group"
                >
                  <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400 group-hover:scale-110 transition-transform">
                    <FolderGit2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-white">Tambah Proyek</h4>
                    <p className="text-[10px] text-gray-400">Showcase karya baru</p>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('certificates');
                    setIsAddCertOpen(true);
                  }}
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-500 transition-all flex items-center gap-3 text-left group"
                >
                  <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 group-hover:scale-110 transition-transform">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-white">Tambah Sertifikat</h4>
                    <p className="text-[10px] text-gray-400">Unggah sertifikat baru</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ARTICLES TAB */}
        {activeTab === 'articles' && (
          <div className="p-7 rounded-3xl glass-panel border border-white/15 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-display font-bold text-lg text-white">Manajemen Artikel & Laporan PKL</h3>
                <p className="text-xs text-gray-400">Kelola dan hapus artikel yang terbit di platform.</p>
              </div>
              <Link
                to="/articles"
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md transition-all self-start"
              >
                <Plus className="w-4 h-4" />
                <span>Tulis di Halaman Artikel</span>
              </Link>
            </div>

            <div className="space-y-3">
              {articles.map((art) => (
                <div key={art.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between gap-4 hover:border-indigo-500/30 transition-all">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-indigo-400">{art.tag} • {art.date}</span>
                    <h4 className="font-bold text-sm text-white">{art.title}</h4>
                    <p className="text-xs text-gray-400 line-clamp-1">{art.content}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteArticle(art.id)}
                    className="p-2 rounded-xl bg-white/5 hover:bg-rose-500/20 text-gray-400 hover:text-rose-400 transition-colors"
                    title="Hapus Artikel"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* NOTES TAB */}
        {activeTab === 'notes' && (
          <div className="p-7 rounded-3xl glass-panel border border-white/15 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-display font-bold text-lg text-white">Manajemen Catatan Harian</h3>
                <p className="text-xs text-gray-400">Kelola catatan ide cepat dan pengingat harian.</p>
              </div>
              <Link
                to="/articles"
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md transition-all self-start"
              >
                <Plus className="w-4 h-4" />
                <span>Tulis Catatan Baru</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {notes.map((note) => (
                <div key={note.id} className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-gray-400">{note.date} • {note.createdAt || '09:00'}</span>
                    <h4 className="font-bold text-sm text-white mt-1">{note.title}</h4>
                    <p className="text-xs text-gray-300 line-clamp-3 mt-1.5">{note.content}</p>
                  </div>
                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 text-gray-400 hover:text-rose-400 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PROJECTS TAB */}
        {activeTab === 'projects' && (
          <div className="p-7 rounded-3xl glass-panel border border-white/15 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-display font-bold text-lg text-white">Manajemen Portofolio Proyek</h3>
                <p className="text-xs text-gray-400">Tambah, pantau, dan kelola proyek karya web Anda.</p>
              </div>
              <button
                onClick={() => setIsAddProjectOpen(true)}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold shadow-md transition-all self-start"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Proyek Baru</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {projects.map((proj) => (
                <div key={proj.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <img src={proj.image} alt={proj.title} className="w-14 h-14 rounded-xl object-cover shrink-0" />
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold text-indigo-400 block">{proj.category}</span>
                      <h4 className="font-bold text-sm text-white truncate">{proj.title}</h4>
                      <p className="text-xs text-gray-400 truncate">{proj.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <Link
                      to={`/project/${proj.slug || proj.id}`}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white"
                      title="Lihat Detail Proyek"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDeleteProject(proj.id)}
                      className="p-2 rounded-lg bg-white/5 hover:bg-rose-500/20 text-gray-400 hover:text-rose-400 transition-colors"
                      title="Hapus Proyek"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CERTIFICATES TAB */}
        {activeTab === 'certificates' && (
          <div className="p-7 rounded-3xl glass-panel border border-white/15 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-display font-bold text-lg text-white">Manajemen Sertifikat & Penghargaan</h3>
                <p className="text-xs text-gray-400">Kelola koleksi sertifikat kompetensi dan lisensi PKL.</p>
              </div>
              <button
                onClick={() => setIsAddCertOpen(true)}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs font-bold shadow-md transition-all self-start"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Sertifikat Baru</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {certificates.map((cert) => (
                <div key={cert.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="h-32 rounded-xl overflow-hidden bg-black/40">
                      <img src={cert.image} alt={cert.title} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-amber-400 block">{cert.issuer} • {cert.date}</span>
                      <h4 className="font-bold text-sm text-white line-clamp-1">{cert.title}</h4>
                      <p className="text-xs text-gray-400 line-clamp-2 mt-0.5">{cert.description}</p>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-white/5 flex justify-end">
                    <button
                      onClick={() => handleDeleteCert(cert.id)}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 text-gray-400 hover:text-rose-400 transition-colors"
                      title="Hapus Sertifikat"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* MODAL: ADD PROJECT */}
      <AnimatePresence>
        {isAddProjectOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-lg w-full rounded-3xl glass-panel border border-white/15 p-6 sm:p-8 bg-[#0c1022] shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <FolderGit2 className="w-5 h-5 text-indigo-400" />
                  <h3 className="font-display font-bold text-lg text-white">Tambah Proyek Baru</h3>
                </div>
                <button
                  onClick={() => setIsAddProjectOpen(false)}
                  className="p-1.5 rounded-full bg-white/5 text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProject} className="space-y-4 text-xs sm:text-sm">
                <div className="space-y-1.5">
                  <label className="font-bold text-gray-300">Nama Proyek</label>
                  <input
                    type="text"
                    placeholder="Contoh: Platform d1kyra All-In-One"
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-gray-300">Kategori</label>
                  <select
                    value={newProject.category}
                    onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0c1022] border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="React & Web App">React & Web App</option>
                    <option value="Fullstack">Fullstack</option>
                    <option value="Frontend & UI/UX">Frontend & UI/UX</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-gray-300">Deskripsi Ringkas</label>
                  <textarea
                    rows="3"
                    placeholder="Jelaskan fitur dan tujuan proyek..."
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-gray-300">Teknologi Digunakan (Pisahkan koma)</label>
                  <input
                    type="text"
                    placeholder="React, Tailwind CSS, Vite, Supabase"
                    value={newProject.techStack}
                    onChange={(e) => setNewProject({ ...newProject, techStack: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-gray-300">URL Gambar Thumbnail</label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={newProject.image}
                    onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="font-bold text-gray-300">Tautan Live Demo</label>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={newProject.link}
                      onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-bold text-gray-300">Tautan GitHub</label>
                    <input
                      type="url"
                      placeholder="https://github.com/d1kyra/..."
                      value={newProject.github}
                      onChange={(e) => setNewProject({ ...newProject, github: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setIsAddProjectOpen(false)}
                    className="px-4 py-2 rounded-xl bg-white/5 text-gray-300 hover:text-white"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold shadow-lg"
                  >
                    Simpan Proyek
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: ADD CERTIFICATE */}
      <AnimatePresence>
        {isAddCertOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-lg w-full rounded-3xl glass-panel border border-white/15 p-6 sm:p-8 bg-[#0c1022] shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-400" />
                  <h3 className="font-display font-bold text-lg text-white">Tambah Sertifikat Baru</h3>
                </div>
                <button
                  onClick={() => setIsAddCertOpen(false)}
                  className="p-1.5 rounded-full bg-white/5 text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveCert} className="space-y-4 text-xs sm:text-sm">
                <div className="space-y-1.5">
                  <label className="font-bold text-gray-300">Nama Sertifikat</label>
                  <input
                    type="text"
                    placeholder="Contoh: Frontend React Web Development"
                    value={newCert.title}
                    onChange={(e) => setNewCert({ ...newCert, title: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="font-bold text-gray-300">Penerbit / Penyelenggara</label>
                    <input
                      type="text"
                      placeholder="Contoh: Dicoding / ITB"
                      value={newCert.issuer}
                      onChange={(e) => setNewCert({ ...newCert, issuer: e.target.value })}
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-bold text-gray-300">Tahun / Tanggal</label>
                    <input
                      type="text"
                      placeholder="2026"
                      value={newCert.date}
                      onChange={(e) => setNewCert({ ...newCert, date: e.target.value })}
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-gray-300">Deskripsi Sertifikat</label>
                  <textarea
                    rows="3"
                    placeholder="Keterangan kompetensi yang diraih..."
                    value={newCert.description}
                    onChange={(e) => setNewCert({ ...newCert, description: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-gray-300">URL Gambar Sertifikat</label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={newCert.image}
                    onChange={(e) => setNewCert({ ...newCert, image: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setIsAddCertOpen(false)}
                    className="px-4 py-2 rounded-xl bg-white/5 text-gray-300 hover:text-white"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold shadow-lg"
                  >
                    Simpan Sertifikat
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

export default Dashboard;
