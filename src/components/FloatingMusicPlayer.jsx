import React, { useState } from 'react';
import { useMusic, PRESET_DATA } from '../context/MusicContext';
import { Play, Pause, Volume2, VolumeX, Music, Disc3, Radio, ChevronUp, ChevronDown, Sparkles, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingMusicPlayer = () => {
  const {
    isPlaying,
    currentPreset,
    presetData,
    volume,
    showPlayer,
    setShowPlayer,
    activeTab,
    setActiveTab,
    spotifyEmbedUrl,
    togglePlay,
    selectPreset,
    handleVolumeChange,
  } = useMusic();

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Expanded Control Box */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-3 w-80 sm:w-96 rounded-2xl glass-panel p-4 shadow-2xl border border-white/10"
          >
            {/* Header / Tab Switcher */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="text-xl animate-spin-slow">🎵</span>
                <div>
                  <h4 className="text-xs font-bold text-gradient uppercase tracking-wider">Audio Focus Station</h4>
                  <p className="text-[11px] text-gray-400">d1kyra Spotify & Ambience</p>
                </div>
              </div>

              <div className="flex bg-white/5 rounded-lg p-0.5 border border-white/10 text-xs">
                <button
                  onClick={() => setActiveTab('spotify')}
                  className={`px-2.5 py-1 rounded-md transition-all font-medium ${
                    activeTab === 'spotify'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Spotify
                </button>
                <button
                  onClick={() => setActiveTab('ambient')}
                  className={`px-2.5 py-1 rounded-md transition-all font-medium ${
                    activeTab === 'ambient'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Ambience
                </button>
              </div>
            </div>

            {/* Ambient Tab Content */}
            {activeTab === 'ambient' && (
              <div className="mt-3 space-y-3">
                {/* Active Track Banner */}
                <div className="flex items-center justify-between bg-white/5 rounded-xl p-3 border border-white/5">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-xl bg-indigo-500/20 border border-indigo-500/30 ${
                        isPlaying ? 'animate-spin-slow' : ''
                      }`}
                    >
                      {presetData.icon}
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-white leading-tight">{presetData.title}</h5>
                      <p className="text-[11px] text-gray-400">{presetData.desc}</p>
                    </div>
                  </div>

                  {/* Play / Pause */}
                  <button
                    onClick={togglePlay}
                    className="p-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg hover:scale-105 active:scale-95 transition-transform"
                    title={isPlaying ? 'Jeda Suara' : 'Putar Ambience'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
                  </button>
                </div>

                {/* Soundscapes Selector */}
                <div>
                  <label className="text-[11px] font-semibold text-gray-400 block mb-1.5 uppercase tracking-wide">
                    Pilih Suasana:
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {Object.values(PRESET_DATA).map((preset) => (
                      <button
                        key={preset.id}
                        onClick={() => selectPreset(preset.id)}
                        className={`flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs font-medium transition-all text-left border ${
                          currentPreset === preset.id
                            ? 'bg-indigo-600/30 border-indigo-500 text-white shadow-sm'
                            : 'bg-white/5 border-white/5 text-gray-300 hover:bg-white/10 hover:border-white/10'
                        }`}
                      >
                        <span className="text-base">{preset.icon}</span>
                        <span className="truncate">{preset.title.split(' ')[1] || preset.title}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Volume Slider */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => handleVolumeChange(volume === 0 ? 0.6 : 0)}
                    className="text-gray-400 hover:text-white"
                  >
                    {volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={volume}
                    onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                    className="w-full accent-indigo-500 h-1.5 bg-white/10 rounded-lg cursor-pointer"
                  />
                  <span className="text-[11px] text-gray-400 w-7 text-right">
                    {Math.round(volume * 100)}%
                  </span>
                </div>
              </div>
            )}

            {/* Spotify Tab Content */}
            {activeTab === 'spotify' && (
              <div className="mt-3">
                <iframe
                  style={{ borderRadius: '12px' }}
                  src={spotifyEmbedUrl}
                  width="100%"
                  height="152"
                  frameBorder="0"
                  allowFullScreen=""
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  title="Spotify Player"
                />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Pill Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="group flex items-center gap-3 px-4 py-2.5 rounded-full glass-panel border border-indigo-500/30 bg-black/60 shadow-xl hover:border-indigo-500 hover:scale-105 transition-all duration-300 active:scale-95"
      >
        <div
          className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${
            isPlaying ? 'animate-spin-slow' : ''
          }`}
        >
          {isPlaying ? (
            <span className="text-indigo-400 text-base">{presetData.icon}</span>
          ) : (
            <Disc3 className="w-5 h-5 text-indigo-400 group-hover:rotate-45 transition-transform" />
          )}
        </div>

        <div className="text-left">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-white">
              {isPlaying ? presetData.title.split(' ')[1] || presetData.title : 'Fokus Audio'}
            </span>
            {isPlaying && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            )}
          </div>
        </div>

        <div className="text-gray-400 group-hover:text-white transition-colors ml-1">
          {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </div>
      </button>
    </div>
  );
};

export default FloatingMusicPlayer;
