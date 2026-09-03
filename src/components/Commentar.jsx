import React, { useState, useEffect, useCallback } from 'react';
import { MessageSquare, Send, User, Heart, Sparkles, Trash2, CheckCircle2, ShieldAlert, Wifi, WifiOff, RefreshCw, Info } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../supabase';
import { getStoredGuestbook, saveStoredGuestbook } from '../utils/storage';
import { motion, AnimatePresence } from 'framer-motion';

const formatCommentDate = (dateVal) => {
  if (!dateVal) return new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
  try {
    const d = new Date(dateVal);
    if (isNaN(d.getTime())) return String(dateVal);
    return d.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (e) {
    return String(dateVal);
  }
};

const Commentar = () => {
  const isAuth = sessionStorage.getItem('statusLogin') === 'true';
  const [comments, setComments] = useState(getStoredGuestbook);
  const [userName, setUserName] = useState('');
  const [userMsg, setUserMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [loadingCloud, setLoadingCloud] = useState(isSupabaseConfigured);
  const [toastMsg, setToastMsg] = useState('');
  const [showConfigModal, setShowConfigModal] = useState(false);

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  // Fetch comments from Supabase
  const loadCloudComments = useCallback(async () => {
    if (!isSupabaseConfigured) return;
    try {
      setLoadingCloud(true);
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Supabase fetch error, fallback ke local:', error.message);
      } else if (data && data.length > 0) {
        const mapped = data.map((item) => ({
          id: item.id,
          name: item.user_name || 'Anonim',
          message: item.comment || '',
          likes: item.likes || 0,
          created_at: formatCommentDate(item.created_at)
        }));
        setComments(mapped);
        saveStoredGuestbook(mapped);
      }
    } catch (err) {
      console.warn('Gagal memuat komentar dari cloud:', err);
    } finally {
      setLoadingCloud(false);
    }
  }, []);

  // Inisialisasi data & Realtime WebSocket listener
  useEffect(() => {
    if (!isSupabaseConfigured) {
      // Offline / Local fallback
      setComments(getStoredGuestbook());
      return;
    }

    loadCloudComments();

    // Supabase Realtime Listener (Antar device)
    const channel = supabase
      .channel('realtime:public:comments')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'comments' },
        (payload) => {
          const newRow = payload.new;
          setComments((prev) => {
            if (prev.some((c) => String(c.id) === String(newRow.id))) return prev;
            const newEntry = {
              id: newRow.id,
              name: newRow.user_name || 'Anonim',
              message: newRow.comment || '',
              likes: newRow.likes || 0,
              created_at: formatCommentDate(newRow.created_at)
            };
            const updated = [newEntry, ...prev];
            saveStoredGuestbook(updated);
            return updated;
          });
        }
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'comments' },
        (payload) => {
          const updatedRow = payload.new;
          setComments((prev) => {
            const updated = prev.map((c) =>
              String(c.id) === String(updatedRow.id)
                ? {
                    ...c,
                    likes: updatedRow.likes ?? c.likes,
                    message: updatedRow.comment ?? c.message,
                  }
                : c
            );
            saveStoredGuestbook(updated);
            return updated;
          });
        }
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'comments' },
        (payload) => {
          const deletedRow = payload.old;
          setComments((prev) => {
            const updated = prev.filter((c) => String(c.id) !== String(deletedRow.id));
            saveStoredGuestbook(updated);
            return updated;
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [loadCloudComments]);

  // Handle pengiriman komentar baru
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userName.trim() || !userMsg.trim()) return;

    setSubmitting(true);
    const tempId = 'cmt-' + Date.now();
    const newComment = {
      id: tempId,
      name: userName.trim(),
      message: userMsg.trim(),
      created_at: formatCommentDate(new Date().toISOString()),
      likes: 0
    };

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('comments')
          .insert([
            {
              user_name: newComment.name,
              comment: newComment.message,
              likes: 0
            }
          ])
          .select();

        if (error) throw error;

        if (data && data[0]) {
          newComment.id = data[0].id;
          newComment.created_at = formatCommentDate(data[0].created_at);
        }
        triggerToast('✓ Komentar tersiar real-time ke semua device!');
      } catch (err) {
        console.warn('Gagal kirim ke Supabase, simpan lokal:', err);
        triggerToast('⚠️ Tersimpan di perangkat (Database cloud belum aktif).');
      }
    } else {
      triggerToast('✓ Pesan tersimpan di buku tamu lokal.');
    }

    // Optimistic UI update
    setComments((prev) => {
      const filtered = prev.filter((c) => c.id !== newComment.id);
      const updated = [newComment, ...filtered];
      saveStoredGuestbook(updated);
      return updated;
    });

    setUserMsg('');
    setSubmitting(false);
  };

  // Handle Like
  const handleLike = async (id) => {
    const target = comments.find((c) => c.id === id);
    if (!target) return;
    const newLikes = (target.likes || 0) + 1;

    // Optimistic UI
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, likes: newLikes } : c))
    );

    if (isSupabaseConfigured && typeof id === 'number') {
      try {
        await supabase
          .from('comments')
          .update({ likes: newLikes })
          .eq('id', id);
      } catch (e) {
        console.warn('Gagal update like di cloud:', e);
      }
    }
  };

  // Handle Delete Single
  const handleDeleteComment = async (id) => {
    if (window.confirm('Hapus pesan pengunjung ini?')) {
      setComments((prev) => prev.filter((c) => c.id !== id));

      if (isSupabaseConfigured && typeof id === 'number') {
        try {
          await supabase.from('comments').delete().eq('id', id);
        } catch (e) {
          console.warn('Gagal delete di cloud:', e);
        }
      }
      triggerToast('✓ Pesan berhasil dihapus.');
    }
  };

  // Handle Clear All (Admin only)
  const handleClearAllComments = async () => {
    if (window.confirm('PERINGATAN: Yakin ingin menghapus seluruh pesan di buku tamu?')) {
      setComments([]);
      saveStoredGuestbook([]);

      if (isSupabaseConfigured) {
        try {
          await supabase.from('comments').delete().neq('id', 0);
        } catch (e) {
          console.warn('Gagal membersihkan cloud comments:', e);
        }
      }
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
            className="fixed top-24 right-6 z-50 px-4 py-2.5 rounded-2xl bg-indigo-600 text-white text-xs font-bold shadow-2xl flex items-center gap-2 border border-indigo-400/30"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Connection Info Modal */}
      <AnimatePresence>
        {showConfigModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-6 rounded-3xl glass-panel border border-white/15 max-w-md w-full space-y-4 shadow-2xl text-left"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
                  <Wifi className="w-4 h-4" />
                  <h4>Status Sinkronisasi Antar-Device</h4>
                </div>
                <button
                  onClick={() => setShowConfigModal(false)}
                  className="text-gray-400 hover:text-white text-xs px-2 py-1 rounded-lg bg-white/5"
                >
                  ✕
                </button>
              </div>

              <div className="text-xs text-gray-300 space-y-3 leading-relaxed">
                <p>
                  {isSupabaseConfigured ? (
                    <span className="text-emerald-400 font-semibold">
                      ✓ Supabase Realtime telah terhubung! Setiap orang yang membuka web ini akan melihat komentar secara serentak antar-perangkat.
                    </span>
                  ) : (
                    <span>
                      Saat ini website berjalan dalam <strong className="text-amber-400">Mode Demo Lokal</strong>. Komentar baru disimpan di penyimpanan browser masing-masing.
                    </span>
                  )}
                </p>

                {!isSupabaseConfigured && (
                  <div className="p-3.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 space-y-2">
                    <span className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider block">
                      Langkah Menghubungkan Supabase (1 Menit):
                    </span>
                    <ol className="list-decimal list-inside space-y-1 text-[11px] text-gray-300">
                      <li>Buka project di <strong>supabase.com</strong></li>
                      <li>Jalankan skrip di file <code>supabase_setup.sql</code> pada SQL Editor Supabase</li>
                      <li>Masukkan <code>VITE_SUPABASE_URL</code> dan <code>VITE_SUPABASE_ANON_KEY</code> ke <strong>Vercel Settings → Environment Variables</strong> & file <code>.env</code></li>
                      <li>Redeploy di Vercel, selesai! Komentar langsung realtime antar HP & Laptop.</li>
                    </ol>
                  </div>
                )}
              </div>

              <button
                onClick={() => setShowConfigModal(false)}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-colors"
              >
                Mengerti
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Form Input */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-7 rounded-3xl glass-panel border border-white/10 space-y-4 shadow-xl">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-base">
            <MessageSquare className="w-5 h-5" />
            <h3>Buku Tamu & Pesan Pengunjung</h3>
          </div>

          <div className="flex items-center gap-2">
            {/* Realtime Status Indicator Badge */}
            <button
              type="button"
              onClick={() => setShowConfigModal(true)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold border transition-all ${
                isSupabaseConfigured
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20'
                  : 'bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-amber-500/20'
              }`}
              title="Klik untuk melihat info koneksi realtime antar-device"
            >
              {isSupabaseConfigured ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Realtime Online</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-3 h-3" />
                  <span>Mode Lokal</span>
                  <Info className="w-3 h-3 ml-0.5 opacity-75" />
                </>
              )}
            </button>

            {isAuth && comments.length > 0 && (
              <button
                type="button"
                onClick={handleClearAllComments}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 text-xs font-bold transition-all"
                title="Hapus semua komentar di buku tamu"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Bersihkan Semua</span>
              </button>
            )}
          </div>
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

        <div className="flex items-center justify-between flex-wrap gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold shadow-lg shadow-indigo-500/20 hover:scale-105 active:scale-95 transition-transform disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{submitting ? 'Mengirim...' : 'Kirim Pesan'}</span>
          </button>

          {loadingCloud && (
            <span className="text-[11px] text-gray-400 flex items-center gap-1.5 animate-pulse">
              <RefreshCw className="w-3 h-3 animate-spin text-indigo-400" />
              Menyinkronkan komentar cloud...
            </span>
          )}
        </div>
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
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed whitespace-pre-line">{cmt.message}</p>

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

