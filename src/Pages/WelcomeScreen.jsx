import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Code2 } from 'lucide-react';

const WelcomeScreen = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            if (onLoadingComplete) onLoadingComplete();
          }, 300);
          return 100;
        }
        return prev + 5;
      });
    }, 45);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070913] text-white p-4"
    >
      {/* Glowing Orb */}
      <div className="absolute w-80 h-80 bg-gradient-to-r from-indigo-500/20 to-purple-600/20 rounded-full blur-3xl animate-pulse" />

      <div className="relative z-10 flex flex-col items-center space-y-6 max-w-sm text-center">
        {/* Animated Brand Mark */}
        <motion.div
          animate={{ scale: [1, 1.08, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-20 h-20 rounded-3xl bg-gradient-primary flex items-center justify-center text-white font-display font-black text-3xl shadow-2xl shadow-indigo-500/40"
        >
          D
        </motion.div>

        {/* Title */}
        <div className="space-y-1">
          <h2 className="font-display font-black text-2xl tracking-tight">
            d1kyra<span className="text-indigo-400">.aio</span>
          </h2>
          <p className="text-xs text-gray-400">Memuat ekosistem platform terpadu...</p>
        </div>

        {/* Progress Bar */}
        <div className="w-56 space-y-2">
          <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-gradient-primary transition-all duration-100 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-[10px] font-mono text-indigo-400 font-bold block">{progress}%</span>
        </div>
      </div>
    </motion.div>
  );
};

export default WelcomeScreen;
