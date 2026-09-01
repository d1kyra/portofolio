import React, { useState, useEffect } from 'react';
import { MessageSquare, Send, User, Heart, Sparkles, Trash2, CheckCircle2, ShieldAlert } from 'lucide-react';
import { supabase } from '../supabase';
import { getStoredGuestbook, saveStoredGuestbook } from '../utils/storage';
import { motion, AnimatePresence } from 'framer-motion';

const Commentar = () => {
  const isAuth = sessionStorage.getItem('statusLogin') === 'true';
  const [comments, setComments] = useState(getStoredGuestbook);
  const [userName, setUserName] = useState('');
  const [userMsg, setUserMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2500);
  };

  useEffect(() => {
    saveStoredGuestbook(comments);
  }, [comments]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userName.trim() || !userMsg.trim()) return;

    setSubmitting(true);
    const newComment = {
      id: 'cmt-' + Date.now(),
      name: userName.trim(),
      message: userMsg.trim(),
      created_at: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
      likes: 0
    };

    // Try Supabase if configured
    try {
      await supabase.from('comments').insert([{
        user_name: newComment.name,
        comment: newComment.message
      }]);
    } catch (err) {
      // Fallback seamlessly to local storage
    }

    const updated = [newComment, ...comments];
    setComments(updated);
    setUserMsg('');
    setSubmitting(false);
    triggerToast('✓ Pesan Anda berhasil dikirim ke buku tamu!');
  };

  const handleLike = (id) => {
    const updated = comments.map((c) => (c.id === id ? { ...c, likes: (c.likes || 0) + 1 } : c));
    setComments(updated);
  };

  const handleDeleteComment = (id) => {
    if (window.confirm('Hapus pesan pengunjung ini?')) {
      const updated = comments.filter((c) => c.id !== id);
      setComments(updated);
      triggerToast('✓ Pesan berhasil dihapus.');
    }
  };

  const handleClearAllComments = () => {
    if (window.confirm('PERINGATAN: Yakin ingin menghapus seluruh pesan di buku tamu?')) {
      setComments([]);
      triggerToast('✓ Seluruh pesan buku tamu berhasil dibersihkan.');
    }
  };

  return (
    <div className="space-y-8 relative">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="fixed top-24 right-6 z-50 px-4 py-2.5 rounded-2xl bg-indigo-600 text-white text-xs font-bold shadow-2xl flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form Input */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-7 rounded-3xl glass-panel border border-white/10 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-base">
            <MessageSquare className="w-5 h-5" />
            <h3>Buku Tamu & Pesan Pengunjung</h3>
          </div>
          {isAuth && comments.length > 0 && (
            <button
              type="button"
              onClick={handleClearAllComments}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 text-xs font-bold transition-all"
              title="Hapus semua komentar di buku tamu"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Bersihkan Semua Pesan</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Nama Anda..."
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-xs sm:text-sm focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        <textarea
          placeholder="Tulis pesan, feedback, atau semangat untuk Kyra..."
          rows="3"
          value={userMsg}
          onChange={(e) => setUserMsg(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-xs sm:text-sm focus:outline-none focus:border-indigo-500 transition-colors"
        />

        <button
          type="submit"
          disabled={submitting}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold shadow-lg shadow-indigo-500/20 hover:scale-105 active:scale-95 transition-transform"
        >
          <Send className="w-3.5 h-3.5" />
          <span>{submitting ? 'Mengirim...' : 'Kirim Pesan'}</span>
        </button>
      </form>

      {/* List Comments */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="text-center py-12 rounded-2xl glass-panel border border-white/10 space-y-2">
            <MessageSquare className="w-10 h-10 text-gray-500 mx-auto" />
            <h4 className="font-bold text-sm text-white">Belum ada pesan tersimpan</h4>
            <p className="text-xs text-gray-400">Jadilah orang pertama yang meninggalkan pesan di buku tamu!</p>
          </div>
        ) : (
          comments.map((cmt) => (
            <div
              key={cmt.id}
              className="p-5 rounded-2xl glass-panel border border-white/5 hover:border-white/15 transition-all flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-md">
                {cmt.name?.charAt(0).toUpperCase() || 'U'}
              </div>

              <div className="flex-1 space-y-1.5">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-white">{cmt.name}</h4>
                  <span className="text-[11px] text-gray-500">{cmt.created_at}</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">{cmt.message}</p>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[10px] text-gray-500">d1kyra Visitor</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleLike(cmt.id)}
                      className="flex items-center gap-1 text-xs text-pink-400 hover:text-pink-300 transition-colors"
                      title="Suka pesan ini"
                    >
                      <Heart className="w-3.5 h-3.5 fill-pink-500/20" />
                      <span>{cmt.likes || 0}</span>
                    </button>
                    {isAuth && (
                      <button
                        onClick={() => handleDeleteComment(cmt.id)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-semibold border border-rose-500/20 transition-colors"
                        title="Hapus Pesan Pengunjung"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Hapus</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Commentar;
