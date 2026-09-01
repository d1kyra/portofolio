import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Github, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const CardProject = ({ project, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative rounded-2xl glass-panel border border-white/10 overflow-hidden hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 flex flex-col justify-between"
    >
      {/* Glow Hover background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

      <div>
        {/* Project Thumbnail Image */}
        <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-black/40">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070913] via-transparent to-transparent opacity-80" />
          
          {/* Category Badge */}
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-bold text-indigo-300">
            {project.category}
          </span>
        </div>

        {/* Project Content */}
        <div className="p-5 sm:p-6 space-y-3">
          <h3 className="font-display font-bold text-lg text-white group-hover:text-indigo-400 transition-colors line-clamp-1">
            {project.title}
          </h3>
          <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">
            {project.description}
          </p>

          {/* Tech Stack Badges */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.techStack?.slice(0, 4).map((tech, idx) => (
              <span
                key={idx}
                className="px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-medium text-gray-300"
              >
                {tech}
              </span>
            ))}
            {project.techStack?.length > 4 && (
              <span className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] text-gray-400">
                +{project.techStack.length - 4}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-5 sm:p-6 pt-0 border-t border-white/5 flex items-center justify-between mt-4">
        <Link
          to={`/project/${project.slug || project.id}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors group-hover:translate-x-0.5"
        >
          <span>Detail Project</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        <div className="flex items-center gap-2">
          {project.githubUrl && project.githubUrl !== '#' && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              title="GitHub Repo"
              aria-label="GitHub Repo"
            >
              <Github className="w-3.5 h-3.5" />
            </a>
          )}
          {project.demoUrl && project.demoUrl !== '#' && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              title="Live Demo"
              aria-label="Live Demo"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CardProject;
