import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Mail, MessageSquare, Send, MapPin, Phone, Github, Instagram, Linkedin, Sparkles, CheckCircle2, Inbox } from 'lucide-react';
import { TikTokIcon } from '../components/Icons';
import { getStoredContactMessages, saveStoredContactMessages } from '../utils/storage';
import { motion, AnimatePresence } from 'framer-motion';

const Contact = () => {
  const isAuth = sessionStorage.getItem('statusLogin') === 'true';
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSent, setIsSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const newMsg = {
        id: 'msg-' + Date.now(),
        name: formData.name.trim(),
        email: formData.email.trim() || 'Tidak disertakan',
        message: formData.message.trim(),
        date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
      };
      const existing = getStoredContactMessages();
      saveStoredContactMessages([newMsg, ...existing]);

      setIsSent(true);
      setFormData({ name: '', email: '', message: '' });
    }, 600);
  };

  return (
    <>
      <Helmet>
        <title>Hubungi Saya | d1kyra</title>
        <meta name="description" content="Kirim pesan, feedback, atau peluang kolaborasi web development dengan Muhammad Dwiky Rahman (Kyra)." />
      </Helmet>

      <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div className="space-y-1 text-left">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest block">
              Get In Touch
            </span>
            <h1 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
              Hubungi & Terhubung
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 max-w-xl">
              Punya ide kolaborasi, pertanyaan seputar sistem informasi PKL, atau ingin berdiskusi seputar pemrograman web? Kirimkan pesan Anda langsung di sini.
            </p>
          </div>

          {isAuth && (
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold shadow-md hover:scale-105 transition-all self-start sm:self-auto shrink-0"
            >
              <Inbox className="w-4 h-4" />
              <span>Kotak Pesan Masuk</span>
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Info Box */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-7 rounded-3xl glass-panel border border-white/15 shadow-xl space-y-6">
              <h3 className="font-display font-bold text-lg text-white">Informasi Kontak</h3>

              <div className="space-y-4 text-xs sm:text-sm text-gray-300">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-gray-500 text-[11px] block">Email Resmi</span>
                    <strong className="text-white">kyra@d1kyra.com</strong>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-gray-500 text-[11px] block">Domisili</span>
                    <strong className="text-white">Indonesia</strong>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400 shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-gray-500 text-[11px] block">Status</span>
                    <strong className="text-emerald-400">Terbuka untuk Diskusi & Kolaborasi</strong>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <span className="text-xs font-bold text-gray-400 block">Jejaring Sosial:</span>
                <div className="flex gap-3">
                  <a
                    href="https://github.com/d1kyra"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-indigo-500 text-gray-300 hover:text-white transition-all"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href="https://www.instagram.com/m_dwikyr?igsi=dDYzcHB5bXhpNnNo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-pink-500 text-gray-300 hover:text-white transition-all"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    href="https://www.tiktok.com/@d1kyra?_r=1&_t=ZS-99M7jHlZuBJ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400 text-gray-300 hover:text-white transition-all"
                    aria-label="TikTok"
                  >
                    <TikTokIcon className="w-4 h-4" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500 text-gray-300 hover:text-white transition-all"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-7">
            <div className="p-7 sm:p-9 rounded-3xl glass-panel border border-white/15 shadow-xl space-y-6">
              <h3 className="font-display font-bold text-lg text-white">Kirim Pesan Langsung</h3>

              {isSent ? (
                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h4 className="font-bold text-base text-white">Pesan Anda Berhasil Terkirim!</h4>
                  <p className="text-xs text-gray-300">Terima kasih atas pesannya. Saya akan membalas melalui email secepatnya.</p>
                  <button
                    onClick={() => setIsSent(false)}
                    className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold"
                  >
                    Kirim Pesan Lain
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                  <div className="space-y-1.5">
                    <label className="font-bold text-gray-300">Nama Anda</label>
                    <input
                      type="text"
                      placeholder="Masukkan nama..."
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-gray-300">Email Anda</label>
                    <input
                      type="email"
                      placeholder="nama@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-gray-300">Pesan</label>
                    <textarea
                      rows="5"
                      placeholder="Tulis pesan atau feedback Anda..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold shadow-lg shadow-indigo-500/25 hover:scale-[1.02] active:scale-95 transition-transform"
                  >
                    <Send className="w-4 h-4" />
                    <span>{loading ? 'Mengirim Pesan...' : 'Kirim Sekarang'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
