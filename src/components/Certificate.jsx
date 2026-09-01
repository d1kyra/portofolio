import React, { useState } from 'react';
import { Award, ExternalLink, X, Calendar, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Certificate = ({ certificates }) => {
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {certificates.map((cert, index) => (
          <motion.div
            key={cert.id || index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            onClick={() => setSelectedCert(cert)}
            className="group cursor-pointer rounded-2xl glass-panel border border-white/10 overflow-hidden hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Image Preview */}
              <div className="relative h-44 w-full overflow-hidden bg-black/40">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070913] via-transparent to-transparent opacity-70" />
                <div className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 backdrop-blur-md text-amber-400 border border-white/10">
                  <Award className="w-4 h-4" />
                </div>
              </div>

              {/* Text info */}
              <div className="p-5 space-y-2">
                <div className="flex items-center gap-1.5 text-xs text-indigo-400 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{cert.issuer}</span>
                </div>
                <h4 className="font-display font-bold text-sm text-white group-hover:text-indigo-300 transition-colors line-clamp-2">
                  {cert.title}
                </h4>
                <p className="text-xs text-gray-400 line-clamp-2">
                  {cert.description}
                </p>
              </div>
            </div>

            <div className="p-5 pt-0 flex items-center justify-between text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {cert.date}
              </span>
              <span className="text-indigo-400 font-semibold group-hover:underline">
                Lihat Detail
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal Zoom Certificate */}
      <AnimatePresence>
        {selectedCert && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full rounded-3xl glass-panel border border-white/15 p-6 bg-[#0c1022] shadow-2xl space-y-4"
            >
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-gray-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="rounded-2xl overflow-hidden aspect-video border border-white/10">
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
                    {selectedCert.issuer}
                  </span>
                  <span className="text-xs text-gray-400">Tahun {selectedCert.date}</span>
                </div>
                <h3 className="text-xl font-bold font-display text-white">{selectedCert.title}</h3>
                <p className="text-xs text-gray-300 leading-relaxed">{selectedCert.description}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Certificate;
