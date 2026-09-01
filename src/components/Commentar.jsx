import React, { useState, useEffect } from 'react';
import { MessageSquare, Send, User, Heart, Sparkles, Trash2 } from 'lucide-react';
import { supabase } from '../supabase';

const Commentar = () => {
  const isAuth = sessionStorage.getItem('statusLogin') === 'true';
  const [comments, setComments] = useState(() => {
    try {
      const saved = localStorage.getItem('d1kyra_guestbook');
      return saved ? JSON.parse(saved) : [
        {
          id: '2',
          name: 'Nadia Salsabila',
          message: 'Laporan PKL nya rapi dan inspiratif. Semangat persiapan masuk Informatika ITB!',
          created_at: new Date().toLocaleDateString('id-ID'),
          likes: 7
        }
      ];
    } catch (e) {
      return [];
    }
  });

  const [userName, setUserName] = useState('');
  const [userMsg, setUserMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('d1kyra_guestbook', JSON.stringify(comments));
    } catch (e) { }
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
      // Fallback seamlessly to local state
    }

    setComments([newComment, ...comments]);
    setUserMsg('');
    setSubmitting(false);
  };

  const handleLike = (id) => {
    setComments(comments.map(c => c.id === id ? { ...c, likes: (c.likes || 0) + 1 } : c));
  };

  return (
    <div className="space-y-8">
      {/* Form Input */}
      <form onSubmit={handleSubmit} className="p-6 rounded-2xl glass-panel border border-white/10 space-y-4 shadow-xl">
        <div className="flex items-center gap-2 text-indigo-400 font-bold text-base">
          <MessageSquare className="w-5 h-5" />
          <h3>Buku Tamu & Pesan Pengunjung</h3>
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
        {comments.map((cmt) => (
          <div
            key={cmt.id}
            className="p-5 rounded-2xl glass-panel border border-white/5 hover:border-white/10 transition-all flex items-start gap-4"
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
                  >
                    <Heart className="w-3.5 h-3.5 fill-pink-500/20" />
                    <span>{cmt.likes || 0}</span>
                  </button>
                  {isAuth && (
                    <button
                      onClick={() => {
                        if (window.confirm('Hapus komentar ini?')) {
                          setComments(comments.filter(c => c.id !== cmt.id));
                        }
                      }}
                      className="p-1 rounded-md text-gray-500 hover:text-rose-400 transition-colors"
                      title="Hapus Komentar (Moderasi Kyra)"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Commentar;
