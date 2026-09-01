import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getStoredProjects } from '../utils/storage';
import { ArrowLeft, ExternalLink, Github, CheckCircle2, Sparkles, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

const ProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const projects = getStoredProjects();
    const found = projects.find((p) => p.slug === slug || p.id === slug);
    if (found) {
      setProject(found);
    } else {
      setProject(projects[0]);
    }
  }, [slug]);

  if (!project) return null;

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl glass-panel border border-white/10 text-xs font-semibold text-gray-300 hover:text-white mb-8 hover:border-indigo-500 transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Kembali ke Portofolio</span>
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-8"
      >
        {/* Header Title & Category */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-xs font-bold text-indigo-400">
              {project.category}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
            {project.title}
          </h1>
          <p className="text-base sm:text-lg text-gray-300 max-w-3xl leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Hero Image Showcase */}
        <div className="relative rounded-3xl overflow-hidden glass-panel border border-white/10 aspect-video shadow-2xl">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Action Buttons & Links */}
        <div className="flex flex-wrap gap-4 pt-2">
          {project.demoUrl && project.demoUrl !== '#' && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-bold shadow-lg shadow-indigo-500/25 hover:scale-105 transition-transform"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live Demo & Website</span>
            </a>
          )}
          {project.githubUrl && project.githubUrl !== '#' && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-xl glass-panel border border-white/10 text-white text-sm font-bold hover:border-indigo-500 hover:scale-105 transition-all"
            >
              <Github className="w-4 h-4" />
              <span>Repository Source Code</span>
            </a>
          )}
        </div>

        {/* Grid Details (Tech Stack & Key Features) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {/* Tech Stack Box */}
          <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-4">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-base">
              <Layers className="w-5 h-5" />
              <h3>Teknologi yang Digunakan</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.techStack?.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-gray-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Key Features Box */}
          <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-4">
            <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
              <Sparkles className="w-5 h-5" />
              <h3>Fitur & Kemampuan Utama</h3>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-300">
              {project.features?.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectDetail;
