import React, { useState, useEffect } from 'react';
import { Sparkles, Coffee, Code2, Clock, Zap } from 'lucide-react';

const PresenceWidget = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <div className="p-5 rounded-2xl glass-panel border border-white/10 flex flex-wrap items-center justify-between gap-4 shadow-xl">
      {/* Status Live */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <span className="w-3 h-3 rounded-full bg-emerald-400 block" />
          <span className="w-3 h-3 rounded-full bg-emerald-400 absolute inset-0 animate-ping opacity-75" />
        </div>
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-white">
            <span>Online & Coding Mode</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <p className="text-[11px] text-gray-400">Aktif mengembangkan web & persiapan ITB</p>
        </div>
      </div>

      {/* Clock & Activity badge */}
      <div className="flex items-center gap-4 text-xs text-gray-300">
        <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
          <Coffee className="w-3.5 h-3.5 text-amber-400" />
          <span>Spanish Latte ☕</span>
        </div>

        <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10 font-mono text-indigo-400 font-bold">
          <Clock className="w-3.5 h-3.5" />
          <span>{formatTime(time)} WIB</span>
        </div>
      </div>
    </div>
  );
};

export default PresenceWidget;
