import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react';

const MusicContext = createContext();

export const PRESET_DATA = {
  rain: {
    id: 'rain',
    icon: '🌧️',
    title: 'Suara Hujan Santai',
    desc: 'Mode Ambience Hujan untuk Fokus Ngoding',
    freq: 950,
    type: 'lowpass',
    droneFreqs: [130.81, 164.81, 196.00]
  },
  cafe: {
    id: 'cafe',
    icon: '☕',
    title: 'Suasana Kafe Santai',
    desc: 'Hangatnya Spanish Latte & Suara Kafe',
    freq: 1800,
    type: 'bandpass',
    droneFreqs: [146.83, 174.61, 220.00]
  },
  synth: {
    id: 'synth',
    icon: '🌌',
    title: 'Cosmic Synthwave',
    desc: 'Gelombang Harmoni Deep Focus Programming',
    freq: 700,
    type: 'lowpass',
    droneFreqs: [110.00, 164.81, 220.00, 261.63]
  },
  waves: {
    id: 'waves',
    icon: '🌊',
    title: 'Ombak Laut Relaksasi',
    desc: 'Irama Deburan Ombak Lembut Menenangkan',
    freq: 550,
    type: 'lowpass',
    droneFreqs: [98.00, 146.83, 196.00]
  }
};

export const MusicProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPreset, setCurrentPreset] = useState('rain');
  const [volume, setVolume] = useState(0.6);
  const [showPlayer, setShowPlayer] = useState(false);
  const [activeTab, setActiveTab] = useState('spotify'); // 'spotify' | 'ambient'
  const [spotifyEmbedUrl, setSpotifyEmbedUrl] = useState('https://open.spotify.com/embed/playlist/4pmkS1ygMpbR7fJ8lahxRf?utm_source=generator&theme=0');

  const audioCtxRef = useRef(null);
  const noiseNodeRef = useRef(null);
  const filterNodeRef = useRef(null);
  const gainNodeRef = useRef(null);
  const oscNodesRef = useRef([]);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      if (AudioCtxClass) {
        audioCtxRef.current = new AudioCtxClass();
      }
    }
  };

  const createNoiseBuffer = (ctx) => {
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
      b6 = white * 0.115926;
    }
    return buffer;
  };

  const stopAudioEngine = useCallback(() => {
    if (noiseNodeRef.current) {
      try {
        noiseNodeRef.current.stop();
        noiseNodeRef.current.disconnect();
      } catch (e) {}
      noiseNodeRef.current = null;
    }
    oscNodesRef.current.forEach(osc => {
      try {
        osc.stop();
        osc.disconnect();
      } catch (e) {}
    });
    oscNodesRef.current = [];
  }, []);

  const startAudioEngine = useCallback((presetKey = currentPreset, vol = volume) => {
    initAudio();
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    stopAudioEngine();

    const preset = PRESET_DATA[presetKey] || PRESET_DATA.rain;

    // Master Gain
    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(vol * 0.8, ctx.currentTime);
    gainNode.connect(ctx.destination);
    gainNodeRef.current = gainNode;

    // Filter
    const filterNode = ctx.createBiquadFilter();
    filterNode.type = preset.type;
    filterNode.frequency.setValueAtTime(preset.freq, ctx.currentTime);
    filterNode.connect(gainNode);
    filterNodeRef.current = filterNode;

    // Noise source
    const noiseNode = ctx.createBufferSource();
    noiseNode.buffer = createNoiseBuffer(ctx);
    noiseNode.loop = true;
    noiseNode.connect(filterNode);
    noiseNode.start();
    noiseNodeRef.current = noiseNode;

    // Ambient chords
    oscNodesRef.current = preset.droneFreqs.map(f => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, ctx.currentTime);
      oscGain.gain.setValueAtTime(0.04, ctx.currentTime);
      osc.connect(oscGain);
      oscGain.connect(gainNode);
      osc.start();
      return osc;
    });
  }, [currentPreset, volume, stopAudioEngine]);

  const togglePlay = () => {
    if (isPlaying) {
      stopAudioEngine();
      setIsPlaying(false);
    } else {
      startAudioEngine(currentPreset, volume);
      setIsPlaying(true);
    }
  };

  const selectPreset = (presetKey) => {
    setCurrentPreset(presetKey);
    if (isPlaying) {
      startAudioEngine(presetKey, volume);
    }
  };

  const handleVolumeChange = (newVol) => {
    setVolume(newVol);
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(newVol * 0.8, audioCtxRef.current.currentTime);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAudioEngine();
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        try {
          audioCtxRef.current.close();
        } catch (e) {}
      }
    };
  }, [stopAudioEngine]);

  return (
    <MusicContext.Provider
      value={{
        isPlaying,
        currentPreset,
        presetData: PRESET_DATA[currentPreset],
        volume,
        showPlayer,
        setShowPlayer,
        activeTab,
        setActiveTab,
        spotifyEmbedUrl,
        setSpotifyEmbedUrl,
        togglePlay,
        selectPreset,
        handleVolumeChange,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => useContext(MusicContext);
