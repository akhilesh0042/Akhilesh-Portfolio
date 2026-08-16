import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight, FileText, Send, Terminal } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { InlineText } from '../EditMode/InlineText';
import { StatusColorPicker } from '../EditMode/StatusColorPicker';

export const HeroSection = ({ onOpenResume }) => {
  const { content, updateHero, isEditMode } = useContent();
  const { hero = {} } = content;

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 40;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const statusColorConfig = {
    amber: { ping: 'bg-accent', dot: 'bg-accent' },
    mint: { ping: 'bg-emerald-400', dot: 'bg-emerald-400' },
    muted: { ping: 'bg-slate-400', dot: 'bg-slate-400' },
  }[hero.statusColor || 'amber'] || { ping: 'bg-accent', dot: 'bg-accent' };

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center px-6 sm:px-10 lg:px-16 pt-28 pb-20 max-w-7xl mx-auto relative"
      aria-label="Hero Introduction"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-16 items-center">
        {/* Left Column: Editorial Headline & Narrative */}
        <div className="lg:col-span-7 space-y-8">
          {/* Status Tag on its own faint elevation plane */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-elevation1 border border-white/[0.06] shadow-status-pill text-xs font-mono text-textMuted select-none w-fit"
          >
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${statusColorConfig.ping} opacity-50`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${statusColorConfig.dot}`}></span>
            </span>

            <InlineText
              value={hero.status}
              onChange={(val) => updateHero({ status: val })}
              placeholder="Status text"
              className="tracking-wide text-textPrimary/90 font-medium"
            />

            <span className="text-white/20">|</span>

            <InlineText
              value={hero.location}
              onChange={(val) => updateHero({ location: val })}
              placeholder="Location"
              className="text-textMuted text-[11px]"
            />

            {/* Status color preset selector in Edit Mode */}
            <StatusColorPicker
              currentColor={hero.statusColor || 'amber'}
              onChange={(color) => updateHero({ statusColor: color })}
            />
          </motion.div>

          {/* Editorial Headline Block */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08, ease: 'easeOut' }}
            className="space-y-3"
          >
            <h1 className="font-display text-5xl sm:text-7xl lg:text-7xl xl:text-8xl tracking-tight text-textPrimary font-medium">
              <InlineText
                value={hero.name}
                onChange={(val) => updateHero({ name: val })}
                placeholder="Your Name"
              />
            </h1>

            {/* Role line in IBM Plex Mono with solid warm amber accent */}
            <div className="flex items-center gap-2.5 font-mono text-sm sm:text-base text-accent font-medium">
              <Terminal className="w-4 h-4 text-accent shrink-0" />
              <InlineText
                value={hero.role}
                onChange={(val) => updateHero({ role: val })}
                placeholder="Your Role Title"
                className="text-accent"
              />
            </div>
          </motion.div>

          {/* Grounded Positioning Line */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.16, ease: 'easeOut' }}
            className="max-w-2xl space-y-4"
          >
            <div className="text-lg sm:text-xl text-textPrimary/90 leading-relaxed font-body">
              <InlineText
                value={hero.tagline}
                onChange={(val) => updateHero({ tagline: val })}
                multiline
                placeholder="Add your positioning tagline..."
              />
            </div>

            <div className="text-sm font-mono text-textMuted leading-relaxed">
              <InlineText
                value={hero.subTagline}
                onChange={(val) => updateHero({ subTagline: val })}
                multiline
                placeholder="Add your sub-tagline or project mention..."
              />
            </div>
          </motion.div>

          {/* Suspended CTA Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.24, ease: 'easeOut' }}
            className="pt-4 flex flex-wrap items-center gap-4"
          >
            {/* View Projects CTA */}
            <button
              onClick={() => scrollTo('projects')}
              className="group px-5 py-3 rounded-lg bg-elevation2 border border-white/[0.08] shadow-elevation-card-a text-textPrimary text-xs font-mono font-medium tracking-wide flex items-center gap-2.5 transition-all duration-200 hover:-translate-y-1 hover:shadow-elevation-hover hover:border-accent/40 focus-visible:ring-2 focus-visible:ring-accent"
            >
              <span>Explore Projects</span>
              <ArrowDownRight className="w-4 h-4 text-accent transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </button>

            {/* Direct Resume CTA */}
            <button
              onClick={onOpenResume}
              className="px-5 py-3 rounded-lg bg-elevation1 border border-white/[0.06] shadow-elevation-chip text-textMuted hover:text-textPrimary text-xs font-mono tracking-wide flex items-center gap-2 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-elevation-chip-hover hover:border-white/20 focus-visible:ring-2 focus-visible:ring-accent"
            >
              <FileText className="w-4 h-4 text-accent/90" />
              <span>{content.contact?.cv?.label || 'Curriculum Vitae'}</span>
            </button>

            {/* Contact Direct Link */}
            <button
              onClick={() => scrollTo('contact')}
              className="px-4 py-3 rounded-lg bg-transparent text-textMuted hover:text-accent text-xs font-mono tracking-wide flex items-center gap-1.5 transition-colors focus-visible:ring-1 focus-visible:ring-accent"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Get in touch</span>
            </button>
          </motion.div>
        </div>

        {/* Right Column: Suspended Developer Workspace Card on Plane 2 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          className="lg:col-span-5"
        >
          <div className="p-6 sm:p-8 rounded-2xl bg-elevation2 border border-white/[0.07] shadow-elevation-card-b space-y-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-elevation-hover">
            {/* Terminal Window Top Bar */}
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3.5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
                <span className="ml-2 font-mono text-[11px] text-textMuted">workspace/core.py</span>
              </div>
              <span className="font-mono text-[10px] text-accent/80 bg-elevation1 px-2.5 py-0.5 rounded border border-white/[0.04]">
                KTU MCA '26
              </span>
            </div>

            {/* Structured Python Object Summary */}
            <div className="space-y-3 font-mono text-xs sm:text-sm text-textMuted leading-relaxed">
              <p className="text-textPrimary/90">
                <span className="text-accent font-medium">class</span> <span className="text-textPrimary font-semibold">{hero.name?.replace(/\s+/g, '') || 'Developer'}</span>:
              </p>

              <div className="pl-4 space-y-2 border-l border-white/[0.08]">
                <p>
                  <span className="text-textMuted">status</span> = <span className="text-amber-300/90">"{content.about?.cgpa ? `Final Year MCA (CGPA ${content.about.cgpa})` : 'Final Year MCA'}"</span>
                </p>
                <p>
                  <span className="text-textMuted">role</span> = <span className="text-amber-300/90">"{hero.role || 'Developer'}"</span>
                </p>
                <p>
                  <span className="text-textMuted">primary_backend</span> = [<span className="text-accent">"Python"</span>, <span className="text-accent">"Django"</span>, <span className="text-accent">"MySQL"</span>]
                </p>
                <p>
                  <span className="text-textMuted">frontend_stack</span> = [<span className="text-textPrimary/80">"React"</span>, <span className="text-textPrimary/80">"Tailwind"</span>]
                </p>
                <p>
                  <span className="text-textMuted">projects_count</span> = <span className="text-accent font-semibold">{content.projects?.length || 0}</span>
                </p>
              </div>
            </div>

            {/* Quick jump tag on plane 1 */}
            <div className="pt-3 border-t border-white/[0.05] flex items-center justify-between text-xs font-mono">
              <span className="text-textMuted">📍 {hero.location || 'Kerala, India'}</span>
              <button
                onClick={() => scrollTo('projects')}
                className="text-accent hover:underline flex items-center gap-1 font-medium"
              >
                <span>View Projects</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
