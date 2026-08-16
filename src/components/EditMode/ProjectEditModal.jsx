import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, FolderPlus, Edit3, Link, ExternalLink } from 'lucide-react';
import { GithubIcon } from '../Common/Icons';

export const ProjectEditModal = ({ isOpen, onClose, project = null, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    year: '2025',
    shortDesc: '',
    fullDesc: '',
    signatureDetail: '',
    techStackText: '',
    githubUrl: '',
    demoUrl: '',
  });

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || '',
        subtitle: project.subtitle || '',
        year: project.year || '2025',
        shortDesc: project.shortDesc || '',
        fullDesc: project.fullDesc || project.shortDesc || '',
        signatureDetail: project.signatureDetail || '',
        techStackText: Array.isArray(project.techStack) ? project.techStack.join(', ') : '',
        githubUrl: project.githubUrl || project.link || '',
        demoUrl: project.demoUrl || project.liveDemoUrl || '',
      });
    } else {
      setFormData({
        title: '',
        subtitle: '',
        year: '2025',
        shortDesc: '',
        fullDesc: '',
        signatureDetail: '',
        techStackText: 'Python, Django, MySQL',
        githubUrl: '',
        demoUrl: '',
      });
    }
  }, [project, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const techStackArray = formData.techStackText
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const updated = {
      ...(project || {}),
      title: formData.title.trim() || 'Untitled Project',
      subtitle: formData.subtitle.trim(),
      year: formData.year.trim() || '2025',
      shortDesc: formData.shortDesc.trim(),
      fullDesc: formData.fullDesc.trim() || formData.shortDesc.trim(),
      signatureDetail: formData.signatureDetail.trim() || 'Core Architecture',
      techStack: techStackArray.length ? techStackArray : ['Python', 'Django'],
      githubUrl: formData.githubUrl.trim(),
      demoUrl: formData.demoUrl.trim(),
    };

    onSave(updated);
    onClose();
  };

  const parsedPills = formData.techStackText
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-[2px]"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 12 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-elevation2 border border-white/[0.08] rounded-2xl shadow-elevation-menu-scrolled p-6 sm:p-8 space-y-6 relative text-textPrimary"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-lg bg-elevation1 border border-white/[0.06] text-textMuted hover:text-textPrimary transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header */}
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-mono text-xs text-accent">
              {project ? <Edit3 className="w-4 h-4" /> : <FolderPlus className="w-4 h-4" />}
              <span>{project ? 'Edit Project' : 'Add New Project'}</span>
            </div>
            <h3 className="font-display text-2xl font-medium tracking-tight">
              {formData.title || (project ? 'Project Details' : 'New Project')}
            </h3>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2 space-y-1">
                <label className="block font-mono text-[11px] text-textMuted uppercase">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. LeavEase"
                  className="w-full px-3 py-2 rounded-lg bg-elevation1 border border-white/[0.08] focus:border-accent text-textPrimary font-body text-sm outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-[11px] text-textMuted uppercase">
                  Year
                </label>
                <input
                  type="text"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  placeholder="2025"
                  className="w-full px-3 py-2 rounded-lg bg-elevation1 border border-white/[0.08] focus:border-accent text-textPrimary font-mono text-sm outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block font-mono text-[11px] text-textMuted uppercase">
                  Subtitle / Role
                </label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="e.g. Enterprise Leave Workflow"
                  className="w-full px-3 py-2 rounded-lg bg-elevation1 border border-white/[0.08] focus:border-accent text-textPrimary font-body text-sm outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-[11px] text-textMuted uppercase">
                  Signature Detail (Amber Badge)
                </label>
                <input
                  type="text"
                  value={formData.signatureDetail}
                  onChange={(e) => setFormData({ ...formData, signatureDetail: e.target.value })}
                  placeholder="e.g. Multi-Tier RBAC Engine"
                  className="w-full px-3 py-2 rounded-lg bg-elevation1 border border-white/[0.08] focus:border-accent text-textPrimary font-mono text-xs outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block font-mono text-[11px] text-textMuted uppercase">
                One-Line Summary Description *
              </label>
              <textarea
                required
                rows={2}
                value={formData.shortDesc}
                onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
                placeholder="Concise summary shown directly on the suspended card..."
                className="w-full px-3 py-2 rounded-lg bg-elevation1 border border-white/[0.08] focus:border-accent text-textPrimary font-body text-sm outline-none resize-none"
              />
            </div>

            <div className="space-y-1">
              <label className="block font-mono text-[11px] text-textMuted uppercase">
                Full Architecture Details (Shown in modal)
              </label>
              <textarea
                rows={3}
                value={formData.fullDesc}
                onChange={(e) => setFormData({ ...formData, fullDesc: e.target.value })}
                placeholder="In-depth system architecture, database modeling, and key technical solves..."
                className="w-full px-3 py-2 rounded-lg bg-elevation1 border border-white/[0.08] focus:border-accent text-textPrimary font-body text-sm outline-none resize-none"
              />
            </div>

            {/* Tech Stack Live Pill Preview */}
            <div className="space-y-2">
              <label className="block font-mono text-[11px] text-textMuted uppercase">
                Tech Stack (Comma-separated)
              </label>
              <input
                type="text"
                value={formData.techStackText}
                onChange={(e) => setFormData({ ...formData, techStackText: e.target.value })}
                placeholder="Python, Django, MySQL, FullCalendar.js, Chart.js"
                className="w-full px-3 py-2 rounded-lg bg-elevation1 border border-white/[0.08] focus:border-accent text-textPrimary font-mono text-xs outline-none"
              />

              {parsedPills.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {parsedPills.map((pill, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[11px] font-mono text-textMuted bg-elevation1 border border-white/[0.06]"
                    >
                      {pill}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Two Explicit Project Link Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="space-y-1.5">
                <label className="block font-mono text-[11px] text-textMuted uppercase flex items-center gap-1.5">
                  <GithubIcon className="w-3.5 h-3.5 text-accent" />
                  <span>GitHub Repository URL (Optional)</span>
                </label>
                <input
                  type="url"
                  value={formData.githubUrl}
                  onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                  placeholder="https://github.com/akhilesh-dev/..."
                  className="w-full px-3 py-2 rounded-lg bg-elevation1 border border-white/[0.08] focus:border-accent text-textPrimary font-mono text-xs outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block font-mono text-[11px] text-textMuted uppercase flex items-center gap-1.5">
                  <ExternalLink className="w-3.5 h-3.5 text-accent" />
                  <span>Live Demo URL (Optional)</span>
                </label>
                <input
                  type="url"
                  value={formData.demoUrl}
                  onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
                  placeholder="https://my-app.example.com"
                  className="w-full px-3 py-2 rounded-lg bg-elevation1 border border-white/[0.08] focus:border-accent text-textPrimary font-mono text-xs outline-none"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/[0.06]">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-mono text-textMuted hover:text-textPrimary transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-lg bg-elevation1 border border-accent/40 text-textPrimary hover:border-accent text-xs font-mono font-medium flex items-center gap-2 transition-all hover:-translate-y-0.5"
              >
                <Check className="w-3.5 h-3.5 text-accent" />
                <span>{project ? 'Save Project' : 'Add to Portfolio'}</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
