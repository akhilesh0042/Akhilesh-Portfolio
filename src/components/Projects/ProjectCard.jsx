import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, ArrowUp, ArrowDown, Edit3, Trash2, ExternalLink } from 'lucide-react';
import { GithubIcon } from '../Common/Icons';
import { useContent } from '../../context/ContentContext';

export const ProjectCard = ({
  project,
  index,
  totalProjects = 4,
  onSelectProject,
  onEditProject,
}) => {
  const { isEditMode, deleteProject, reorderProject } = useContent();

  const githubUrl = project.githubUrl || project.link || '';
  const demoUrl = project.demoUrl || project.liveDemoUrl || '';

  const hasGithub = Boolean(githubUrl && githubUrl.trim());
  const hasDemo = Boolean(demoUrl && demoUrl.trim());
  const hasAnyLink = hasGithub || hasDemo;

  // Vary shadow profiles per card for distinct physical planes
  const shadowVariants = [
    'shadow-elevation-card-a',
    'shadow-elevation-card-b',
    'shadow-elevation-card-c',
    'shadow-elevation-card-a',
  ];

  const shadowClass = shadowVariants[index % shadowVariants.length];

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: (index % 4) * 0.08 }}
      className={`relative p-7 sm:p-8 rounded-2xl bg-elevation2 border border-white/[0.06] ${shadowClass} transition-all duration-200 hover:-translate-y-1.5 hover:shadow-elevation-hover group flex flex-col justify-between`}
    >
      <div className="space-y-5">
        {/* Card Header: Year, Category, Edit Controls & Signature Detail */}
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
          <div className="flex items-center gap-2 font-mono text-xs text-textMuted">
            <span className="text-accent font-semibold">{project.year}</span>
            <span className="text-white/20">/</span>
            <span>0{index + 1}</span>

            {/* Edit Mode Reordering & Management Controls */}
            {isEditMode && (
              <div className="flex items-center gap-1 ml-2 pl-2 border-l border-white/[0.08]">
                <button
                  onClick={() => reorderProject(index, -1)}
                  disabled={index === 0}
                  title="Move Project Up"
                  className="p-1 rounded bg-elevation1 border border-white/[0.08] hover:border-accent text-textMuted hover:text-accent disabled:opacity-30 disabled:pointer-events-none transition-colors"
                >
                  <ArrowUp className="w-3 h-3" />
                </button>
                <button
                  onClick={() => reorderProject(index, 1)}
                  disabled={index === totalProjects - 1}
                  title="Move Project Down"
                  className="p-1 rounded bg-elevation1 border border-white/[0.08] hover:border-accent text-textMuted hover:text-accent disabled:opacity-30 disabled:pointer-events-none transition-colors"
                >
                  <ArrowDown className="w-3 h-3" />
                </button>
                <button
                  onClick={() => onEditProject(project, index)}
                  title="Edit Project Details & Links"
                  className="p-1 rounded bg-elevation1 border border-white/[0.08] hover:border-accent text-accent transition-colors"
                >
                  <Edit3 className="w-3 h-3" />
                </button>
                <button
                  onClick={() => deleteProject(index)}
                  title="Delete Project"
                  className="p-1 rounded bg-elevation1 border border-white/[0.08] hover:border-rose-500 text-rose-400 transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>

          {/* Signature Detail: one warm amber accent touch per card */}
          {project.signatureDetail && (
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-accent bg-elevation1 px-2.5 py-1 rounded-md border border-white/[0.05]">
              <Cpu className="w-3 h-3 text-accent shrink-0" />
              <span className="truncate max-w-[170px]">{project.signatureDetail}</span>
            </div>
          )}
        </div>

        {/* Project Title & Subtitle (Clickable to open deep-dive modal) */}
        <div className="space-y-1.5">
          <button
            onClick={() => onSelectProject(project)}
            className="text-left w-full group/title focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded"
          >
            <h3 className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-textPrimary group-hover/title:text-accent transition-colors duration-200">
              {project.title}
            </h3>
          </button>
          {project.subtitle && (
            <p className="font-mono text-xs text-accent/90">
              {project.subtitle}
            </p>
          )}
        </div>

        {/* One-line grounded description */}
        <p className="text-sm font-body text-textMuted leading-relaxed">
          {project.shortDesc}
        </p>

        {/* Tech Stack Tags: Mono, outlined pills on Elevation Plane 1 */}
        {Array.isArray(project.techStack) && project.techStack.length > 0 && (
          <div className="pt-2 flex flex-wrap gap-2">
            {project.techStack.map((tech, tIdx) => (
              <span
                key={tIdx}
                className="px-2.5 py-1 rounded text-[11px] font-mono text-textMuted bg-elevation1 border border-white/[0.06] shadow-elevation-chip transition-colors group-hover:border-white/15"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Card Action Footer: GitHub and Live Demo Icon Buttons */}
      {(hasAnyLink || isEditMode) && (
        <div className="pt-6 mt-6 border-t border-white/[0.05]">
          <div className={`flex flex-wrap items-center gap-3 ${!hasGithub || !hasDemo ? 'justify-start' : 'justify-between'}`}>
            {/* GitHub Icon Button */}
            {hasGithub && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-elevation1 border border-white/[0.08] hover:border-accent/40 text-xs font-mono text-textPrimary hover:text-accent transition-all duration-200 hover:-translate-y-0.5 shadow-elevation-chip focus-visible:ring-1 focus-visible:ring-accent"
                aria-label={`Open GitHub repository for ${project.title}`}
              >
                <GithubIcon className="w-3.5 h-3.5 text-accent" />
                <span>GitHub</span>
              </a>
            )}

            {/* Live Demo Icon Button */}
            {hasDemo && (
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-elevation1 border border-white/[0.08] hover:border-accent/40 text-xs font-mono text-textPrimary hover:text-accent transition-all duration-200 hover:-translate-y-0.5 shadow-elevation-chip focus-visible:ring-1 focus-visible:ring-accent"
                aria-label={`Open Live Demo for ${project.title}`}
              >
                <ExternalLink className="w-3.5 h-3.5 text-accent" />
                <span>Live Demo</span>
              </a>
            )}

            {/* Fallback indicator in Edit Mode if no links configured yet */}
            {!hasAnyLink && isEditMode && (
              <button
                onClick={() => onEditProject(project, index)}
                className="text-xs font-mono text-textMuted hover:text-accent border border-dashed border-white/10 px-3 py-1.5 rounded-lg flex items-center gap-1.5"
              >
                <Edit3 className="w-3 h-3" />
                <span>+ Add GitHub or Demo Link</span>
              </button>
            )}

            {/* Architecture Details Trigger */}
            <button
              onClick={() => onSelectProject(project)}
              className="ml-auto text-[11px] font-mono text-textMuted/70 hover:text-textPrimary transition-colors"
            >
              Details →
            </button>
          </div>
        </div>
      )}
    </motion.article>
  );
};
