import React from 'react';
import { ArrowUp, Terminal } from 'lucide-react';
import { useContent } from '../../context/ContentContext';

export const Footer = () => {
  const { content } = useContent();
  const { hero = {} } = content;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/[0.06] bg-elevation1/40 py-12 px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-xs text-textMuted">
        <div className="flex items-center gap-3">
          <Terminal className="w-4 h-4 text-accent/90" />
          <span>
            {hero.name || 'Akhilesh'} — <span className="text-textPrimary/80">{hero.role || 'Python & Django Developer'}</span>
          </span>
        </div>

        <div className="flex items-center gap-6">
          <span className="text-[11px] text-textMuted/60 hidden md:inline">
            Suspended Layers Architecture
          </span>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-elevation1 border border-white/[0.05] hover:border-accent/40 text-textPrimary hover:text-accent transition-colors"
            aria-label="Scroll back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
