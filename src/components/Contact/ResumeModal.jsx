import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Printer,
  GraduationCap,
  Briefcase,
  Award,
  Check,
  Download,
  Plus,
  Trash2,
  Edit3,
} from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { InlineText } from '../EditMode/InlineText';

export const ResumeModal = ({ isOpen, onClose }) => {
  const {
    content,
    isEditMode,
    updateHero,
    updateAbout,
    updateContact,
    updateResume,
    addCertification,
    removeCertification,
    updateCertification,
  } = useContent();

  const { hero = {}, about = {}, projects = [], contact = {}, resume = {} } = content;

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

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-[2px]"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-modal-title"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-elevation2 border border-white/[0.08] rounded-2xl shadow-elevation-menu-scrolled p-6 sm:p-10 space-y-8 relative text-textPrimary"
        >
          {/* Header Action Bar */}
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 gap-2 flex-wrap">
            <div className="flex items-center gap-2 font-mono text-xs text-accent">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span id="resume-modal-title">
                {contact.cv?.label ? `${contact.cv.label} Preview` : 'Curriculum Vitae Preview'}
              </span>
              {isEditMode && (
                <span className="text-[10px] text-accent bg-accent/10 border border-accent/30 px-2 py-0.5 rounded ml-2 flex items-center gap-1 font-mono">
                  <Edit3 className="w-3 h-3" />
                  <span>Interactive Edit Mode Active</span>
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              {contact.cv?.fileUrl && (
                <a
                  href={contact.cv.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download={contact.cv.fileName || 'Curriculum_Vitae.pdf'}
                  className="px-3 py-1.5 rounded-lg bg-elevation1 border border-white/[0.08] hover:border-accent/40 text-xs font-mono text-accent flex items-center gap-1.5 transition-colors focus-visible:ring-1 focus-visible:ring-accent"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download File</span>
                </a>
              )}

              <button
                onClick={handlePrint}
                className="px-3 py-1.5 rounded-lg bg-elevation1 border border-white/[0.08] hover:border-accent/40 text-xs font-mono text-textPrimary flex items-center gap-1.5 transition-colors focus-visible:ring-1 focus-visible:ring-accent"
              >
                <Printer className="w-3.5 h-3.5 text-accent" />
                <span>Print / PDF</span>
              </button>

              <button
                onClick={onClose}
                aria-label="Close resume preview"
                className="p-1.5 rounded-lg bg-elevation1 border border-white/[0.06] text-textMuted hover:text-textPrimary transition-colors focus-visible:ring-1 focus-visible:ring-accent"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Resume Body */}
          <div className="space-y-8 max-w-3xl mx-auto">
            {/* Header / Info */}
            <div className="space-y-2">
              <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-tight">
                <InlineText
                  value={hero.name}
                  onChange={(val) => updateHero({ name: val })}
                  placeholder="Full Name"
                />
              </h2>
              <p className="font-mono text-sm text-accent">
                <InlineText
                  value={hero.role}
                  onChange={(val) => updateHero({ role: val })}
                  placeholder="Role / Title"
                />
              </p>
              <div className="flex flex-wrap gap-4 pt-1 font-mono text-xs text-textMuted">
                <span>
                  📍{' '}
                  <InlineText
                    value={contact.location}
                    onChange={(val) => updateContact({ location: val })}
                    placeholder="Location"
                  />
                </span>
                <span>
                  ✉️{' '}
                  <InlineText
                    value={contact.email}
                    onChange={(val) => updateContact({ email: val })}
                    placeholder="Email"
                  />
                </span>
                <span>
                  🔗{' '}
                  <InlineText
                    value={contact.github}
                    onChange={(val) => updateContact({ github: val })}
                    placeholder="GitHub URL"
                  />
                </span>
                <span>
                  💼{' '}
                  <InlineText
                    value={contact.linkedin}
                    onChange={(val) => updateContact({ linkedin: val })}
                    placeholder="LinkedIn URL"
                  />
                </span>
              </div>
            </div>

            {/* Summary */}
            <div className="p-4 rounded-xl bg-elevation1 border border-white/[0.05] space-y-1.5">
              <h3 className="font-mono text-xs text-accent uppercase tracking-wider">
                Professional Summary
              </h3>
              <div className="text-xs sm:text-sm font-body text-textPrimary/90 leading-relaxed">
                <InlineText
                  value={resume.summary || hero.tagline}
                  onChange={(val) => updateResume({ summary: val })}
                  multiline
                  placeholder="Enter professional summary for resume..."
                />
              </div>
            </div>

            {/* Education */}
            <div className="space-y-3">
              <h3 className="font-mono text-xs text-accent uppercase tracking-wider flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                <span>Education</span>
              </h3>
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-elevation1/70 border border-white/[0.04] space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <h4 className="text-sm font-body font-semibold text-textPrimary">
                      <InlineText
                        value={about.degree}
                        onChange={(val) => updateAbout({ degree: val })}
                        placeholder="Degree / Major"
                      />
                    </h4>
                    <span className="font-mono text-xs text-accent">
                      CGPA:{' '}
                      <InlineText
                        value={about.cgpa}
                        onChange={(val) => updateAbout({ cgpa: val })}
                        placeholder="8.0"
                      />
                    </span>
                  </div>
                  <div className="flex items-center justify-between font-mono text-xs text-textMuted">
                    <span>
                      <InlineText
                        value={about.institution}
                        onChange={(val) => updateAbout({ institution: val })}
                        placeholder="Institution / University"
                      />
                    </span>
                    <span>
                      <InlineText
                        value={about.statusLabel}
                        onChange={(val) => updateAbout({ statusLabel: val })}
                        placeholder="Status / Year"
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Featured Projects */}
            <div className="space-y-3">
              <h3 className="font-mono text-xs text-accent uppercase tracking-wider flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                <span>Selected Software Projects</span>
              </h3>
              <div className="space-y-4">
                {projects.slice(0, 3).map((proj) => (
                  <div
                    key={proj.id}
                    className="p-4 rounded-xl bg-elevation1/70 border border-white/[0.04] space-y-2"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-body font-semibold text-textPrimary">
                          {proj.title}
                        </h4>
                        {proj.subtitle && (
                          <span className="font-mono text-[11px] text-accent">
                            — {proj.subtitle}
                          </span>
                        )}
                      </div>
                      <span className="font-mono text-xs text-textMuted">{proj.year}</span>
                    </div>

                    <p className="text-xs font-body text-textMuted leading-relaxed">
                      {proj.shortDesc}
                    </p>

                    {Array.isArray(proj.techStack) && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {proj.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded text-[10px] font-mono bg-elevation2 text-textMuted border border-white/[0.04]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications & Focus Areas */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-mono text-xs text-accent uppercase tracking-wider flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  <span>Certifications & Focus Areas</span>
                </h3>

                {isEditMode && (
                  <button
                    onClick={() => addCertification('New Certification')}
                    className="text-xs font-mono text-accent hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Certification</span>
                  </button>
                )}
              </div>

              <div className="space-y-2 font-mono text-xs text-textMuted">
                {Array.isArray(resume.certifications) &&
                  resume.certifications.map((cert, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 rounded-lg bg-elevation1/50 border border-white/[0.03] group/cert"
                    >
                      <div className="flex items-center gap-2 flex-1">
                        <Check className="w-3.5 h-3.5 text-accent shrink-0" />
                        <InlineText
                          value={cert}
                          onChange={(val) => updateCertification(idx, val)}
                          placeholder="Certification name..."
                          className="text-textPrimary/90"
                        />
                      </div>

                      {isEditMode && (
                        <button
                          onClick={() => removeCertification(idx)}
                          title="Delete Certification"
                          className="text-rose-400 hover:text-rose-300 p-1 opacity-80 hover:opacity-100 transition-opacity ml-2"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
