import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Sparkles, BookOpen, Compass, FolderGit2, Coffee, Github, Instagram, Linkedin, Code2, Award, Terminal, CheckCircle2 } from 'lucide-react';
import CardProject from '../components/CardProject';
import Certificate from '../components/Certificate';
import Commentar from '../components/Commentar';
import PresenceWidget from '../components/PresenceWidget';
import { getStoredProjects, getStoredArticles, getStoredNotes, getStoredCertificates, getStoredProfile } from '../utils/storage';
import { motion } from 'framer-motion';

const WORDS = [
  "Frontend Web Developer",
  "Siswa PKL & Tech Creator",
  "Calon Mahasiswa Informatika ITB",
  "Coffee & Coding Enthusiast"
];

const Home = () => {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const profile = getStoredProfile('kyraa');
  const projects = getStoredProjects();
  const articles = getStoredArticles();
  const notes = getStoredNotes();
  const certificates = getStoredCertificates();

  // Typewriter effect
  useEffect(() => {
    const currentWord = WORDS[wordIndex];
    const speed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting && charIndex < currentWord.length) {
        setText(currentWord.substring(0, charIndex + 1));
        setCharIndex(prev => prev + 1);
      } else if (isDeleting && charIndex > 0) {
        setText(currentWord.substring(0, charIndex - 1));
        setCharIndex(prev => prev - 1);
      } else if (!isDeleting && charIndex === currentWord.length) {
        setTimeout(() => setIsDeleting(true), 1800);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % WORDS.length);
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, wordIndex]);

  return (
    <>
      <Helmet>
        <title>d1kyra — All-In-One Platform | Portofolio & PKL Hub</title>
        <meta name="description" content="Website terpadu Muhammad Dwiky Rahman (Kyra) — Portofolio Web Developer, Laporan PKL, Catatan Harian, dan Hub Produktivitas." />
      </Helmet>

      <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-24">
        {/* HERO SECTION */}
        <section className="relative pt-6 sm:pt-12 text-center sm:text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              {/* Badge Status */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-indigo-500/30 text-xs font-bold text-indigo-400 shadow-lg shadow-indigo-500/10">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span>d1kyra All-In-One Platform v2.0</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.1]">
                Hai, Saya <span className="text-gradient">Kyra</span>
                <br />
                <span className="text-2xl sm:text-4xl lg:text-5xl text-gray-300 font-semibold block mt-2 h-12">
                  {text}
                  <span className="animate-pulse text-indigo-400">|</span>
                </span>
              </h1>

              {/* Bio Subtitle */}
              <p className="text-sm sm:text-base text-gray-400 max-w-2xl leading-relaxed">
                Membangun antarmuka web modern dengan sentuhan glassmorphism, menyusun dokumentasi logbook kegiatan PKL, dan berfokus belajar pemrograman untuk persiapan masuk <strong className="text-white">Teknik Informatika ITB</strong>.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3.5 pt-2 justify-center sm:justify-start">
                <Link
                  to="/projects"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs sm:text-sm font-bold shadow-lg shadow-indigo-500/25 hover:scale-105 active:scale-95 transition-all"
                >
                  <FolderGit2 className="w-4 h-4" />
                  <span>Lihat Portofolio</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>

                <Link
                  to="/articles"
                  className="flex items-center gap-2 px-5 py-3.5 rounded-xl glass-panel border border-white/10 text-gray-200 hover:text-white text-xs sm:text-sm font-bold hover:border-indigo-500 hover:scale-105 active:scale-95 transition-all"
                >
                  <BookOpen className="w-4 h-4 text-indigo-400" />
                  <span>Artikel & Catatan PKL</span>
                </Link>

                <Link
                  to="/hub"
                  className="flex items-center gap-2 px-5 py-3.5 rounded-xl glass-panel border border-white/10 text-gray-200 hover:text-white text-xs sm:text-sm font-bold hover:border-emerald-500 hover:scale-105 active:scale-95 transition-all"
                >
                  <Coffee className="w-4 h-4 text-emerald-400" />
                  <span>Hub Fokus & Spotify</span>
                </Link>
              </div>

              {/* Presence Widget */}
              <div className="pt-4">
                <PresenceWidget />
              </div>
            </div>

            {/* Right Card / Interactive Profile Identity Card */}
            <div className="lg:col-span-5 flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md rounded-3xl glass-panel border border-white/15 p-7 shadow-2xl relative overflow-hidden space-y-6"
              >
                <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-2xl pointer-events-none" />

                {/* Profile Header */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-primary p-0.5 shadow-lg shadow-indigo-500/30 overflow-hidden shrink-0">
                    {profile.avatar ? (
                      <img
                        src={profile.avatar}
                        alt={profile.fullName}
                        className="w-full h-full object-cover rounded-[14px]"
                      />
                    ) : (
                      <div className="w-full h-full rounded-[14px] bg-[#0c1022] flex items-center justify-center text-white font-display font-extrabold text-2xl">
                        {profile.fullName ? profile.fullName.charAt(0).toUpperCase() : 'M'}
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-white">{profile.fullName || 'Muhammad Dwiky Rahman'}</h3>
                    <p className="text-xs text-indigo-400 font-semibold">@d1kyra • Siswa PKL</p>
                    <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-bold text-emerald-400">
                      🎯 Target Informatika ITB
                    </span>
                  </div>
                </div>

                {/* Tech Chips */}
                <div className="space-y-2">
                  <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">
                    Keahlian Utama:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {['React 18', 'Vite', 'Tailwind CSS', 'JavaScript ES6+', 'Web Audio', 'Supabase', 'UI/UX Glass'].map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Mini Quote */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-xs text-gray-300 italic leading-relaxed">
                  "Kombinasi konsistensi belajar, secangkir Spanish Latte, dan antarmuka web yang bersih akan menghasilkan karya digital terbaik."
                </div>

                {/* View Full Bio Link */}
                <Link
                  to="/bio"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white/5 hover:bg-indigo-600/20 border border-white/10 hover:border-indigo-500 text-xs font-bold text-indigo-300 hover:text-white transition-all"
                >
                  <span>Buka Biodata & Riwayat Lengkap</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* QUICK STATS BANNER */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-6 rounded-2xl glass-panel border border-white/10 text-center space-y-1 shadow-lg">
            <h4 className="font-display font-black text-3xl sm:text-4xl text-gradient">{projects.length}+</h4>
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Project Web</p>
          </div>
          <div className="p-6 rounded-2xl glass-panel border border-white/10 text-center space-y-1 shadow-lg">
            <h4 className="font-display font-black text-3xl sm:text-4xl text-gradient">{articles.length}</h4>
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Laporan & Artikel</p>
          </div>
          <div className="p-6 rounded-2xl glass-panel border border-white/10 text-center space-y-1 shadow-lg">
            <h4 className="font-display font-black text-3xl sm:text-4xl text-gradient">{notes.length}</h4>
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Catatan Harian</p>
          </div>
          <div className="p-6 rounded-2xl glass-panel border border-white/10 text-center space-y-1 shadow-lg">
            <h4 className="font-display font-black text-3xl sm:text-4xl text-gradient">{certificates.length}</h4>
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Sertifikat Resmi</p>
          </div>
        </section>

        {/* FEATURED PROJECTS SHOWCASE */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest block mb-1">
                Showcase Unggulan
              </span>
              <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
                Project & Karya Terpilih
              </h2>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              <span>Lihat Semua Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.slice(0, 3).map((proj, idx) => (
              <CardProject key={proj.id} project={proj} index={idx} />
            ))}
          </div>
        </section>

        {/* CERTIFICATES SHOWCASE */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">
                Pencapaian & Lisensi
              </span>
              <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
                Sertifikasi Kompetensi
              </h2>
            </div>
          </div>

          <Certificate certificates={certificates} />
        </section>

        {/* GUESTBOOK / COMMENTAR SECTION */}
        <section id="comments" className="space-y-8">
          <div>
            <span className="text-xs font-bold text-pink-400 uppercase tracking-widest block mb-1">
              Interaksi Komunitas
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
              Buku Tamu & Pesan
            </h2>
          </div>

          <Commentar />
        </section>
      </div>
    </>
  );
};

export default Home;
