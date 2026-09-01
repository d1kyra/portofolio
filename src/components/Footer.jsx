import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Instagram, Linkedin, Heart, Mail, Coffee } from 'lucide-react';
import { TikTokIcon } from './Icons';

const Footer = () => {
  return (
    <footer className="relative border-t border-white/10 mt-20 pt-14 pb-10 bg-black/40 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-primary flex items-center justify-center text-white font-display font-extrabold text-base shadow-md">
                D
              </div>
              <span className="font-display font-extrabold text-xl tracking-tight text-white">
                d1kyra<span className="text-indigo-400">.aio</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              Platform modern terintegrasi menggabungkan showcase portofolio web developer, logbook artikel kegiatan PKL, catatan interaktif, dan soundscape produktivitas.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/d1kyra"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-indigo-500 text-gray-400 hover:text-white transition-all"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/m_dwikyr?igsi=dDYzcHB5bXhpNnNo"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-pink-500 text-gray-400 hover:text-white transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.tiktok.com/@d1kyra?_r=1&_t=ZS-99M7jHlZuBJ"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400 text-gray-400 hover:text-white transition-all"
                aria-label="TikTok"
              >
                <TikTokIcon className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500 text-gray-400 hover:text-white transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:kyra@d1kyra.com"
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-emerald-500 text-gray-400 hover:text-white transition-all"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Nav */}
          <div>
            <h4 className="font-display font-bold text-sm text-white mb-4 uppercase tracking-wider">
              Navigasi Cepat
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link to="/" className="hover:text-indigo-400 transition-colors">
                  Home & Overview
                </Link>
              </li>
              <li>
                <Link to="/bio" className="hover:text-indigo-400 transition-colors">
                  Biodata & Keahlian
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-indigo-400 transition-colors">
                  Daftar Portofolio
                </Link>
              </li>
              <li>
                <Link to="/articles" className="hover:text-indigo-400 transition-colors">
                  Artikel & Catatan PKL
                </Link>
              </li>
              <li>
                <Link to="/hub" className="hover:text-indigo-400 transition-colors">
                  Hub Fokus & Spotify
                </Link>
              </li>
            </ul>
          </div>

          {/* Goal & Motto */}
          <div>
            <h4 className="font-display font-bold text-sm text-white mb-4 uppercase tracking-wider">
              Target & Komitmen
            </h4>
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-300 space-y-2">
              <div className="flex items-center gap-1.5 text-indigo-400 font-bold">
                <Coffee className="w-3.5 h-3.5" />
                <span>Spanish Latte & Coding</span>
              </div>
              <p className="leading-relaxed">
                Menempa kemampuan web modern, konsistensi dokumentasi harian, dan fokus menuju Teknik Informatika ITB.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© {new Date().getFullYear()} d1kyra All-In-One. Dibuat dengan dedikasi & kopi.</p>
          <div className="flex items-center gap-1">
            <span>Built with React 18, Vite & Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
