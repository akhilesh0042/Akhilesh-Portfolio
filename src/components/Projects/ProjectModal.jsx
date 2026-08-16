import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, CheckCircle2, ShieldCheck } from 'lucide-react';
import { GithubIcon } from '../Common/Icons';

export const ProjectModal = ({ project, isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const githubUrl = project.githubUrl || project.link || '';
  const demoUrl = project.demoUrl || project.liveDemoUrl || '';

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-[2px]"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-project-title"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-elevation2 border border-white/[0.08] rounded-2xl shadow-elevation-menu-scrolled p-6 sm:p-8 space-y-6 relative text-textPrimary"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close project modal"
            className="absolute top-6 right-6 p-2 rounded-lg bg-elevation1 border border-white/[0.06] text-textMuted hover:text-textPrimary transition-colors focus-visible:ring-1 focus-visible:ring-accent"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="space-y-2 pr-10">
            <div className="flex items-center gap-3 font-mono text-xs text-accent">
              <span>{project.year}</span>
              <span className="text-white/20">/</span>
              <span>{project.signatureDetail}</span>
            </div>
            <h3 id="modal-project-title" className="font-display text-3xl sm:text-4xl font-medium tracking-tight">
              {project.title}
            </h3>
            {project.subtitle && (
              <p className="font-mono text-sm text-textMuted">
                {project.subtitle}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="p-4 rounded-xl bg-elevation1 border border-white/[0.06] space-y-2">
            <h4 className="font-mono text-xs text-accent uppercase tracking-wider">
              System Architecture & Purpose
            </h4>
            <p className="text-sm font-body text-textPrimary/90 leading-relaxed">
              {project.fullDesc || project.shortDesc}
            </p>
          </div>

          {/* Key Engineering Highlights */}
          {Array.isArray(project.keyHighlights) && project.keyHighlights.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-mono text-xs text-accent uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-accent" />
                <span>Key Features & Technical Solves</span>
              </h4>
              <div className="space-y-2.5">
                {project.keyHighlights.map((highlight, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 rounded-lg bg-elevation1/60 border border-white/[0.04] text-xs font-mono text-textMuted leading-relaxed"
                  >
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span className="text-textPrimary/90">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technology Stack Grid */}
          {Array.isArray(project.techStack) && project.techStack.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-mono text-xs text-textMuted uppercase tracking-wider">
                Technologies & Libraries
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-md text-xs font-mono text-textPrimary bg-elevation1 border border-white/[0.08]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Links */}
          <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-elevation1 border border-white/[0.08] hover:border-accent/40 text-xs font-mono text-textPrimary flex items-center gap-2 transition-all hover:-translate-y-0.5"
                >
                  <GithubIcon className="w-4 h-4 text-accent" />
                  <span>GitHub Repository</span>
                </a>
              )}

              {demoUrl && (
                <a
                  href={demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-elevation1 border border-white/[0.08] hover:border-accent/40 text-xs font-mono text-textPrimary flex items-center gap-2 transition-all hover:-translate-y-0.5"
                >
                  <ExternalLink className="w-4 h-4 text-accent" />
                  <span>Live Demo / Spec</span>
                </a>
              )}
            </div>

            <button
              onClick={onClose}
              className="text-xs font-mono text-textMuted hover:text-textPrimary transition-colors py-2 px-3"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
