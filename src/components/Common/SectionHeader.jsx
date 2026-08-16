import React from 'react';

export const SectionHeader = ({ number, eyebrow, title, description }) => {
  return (
    <div className="space-y-2 mb-12">
      <div className="flex items-center gap-2 font-mono text-xs text-accent tracking-widest uppercase">
        <span className="text-accent font-semibold">{number}</span>
        <span className="text-white/20">//</span>
        <span className="text-accent/90">{eyebrow}</span>
      </div>
      {title ? (
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-textPrimary">
          {title}
        </h2>
      ) : null}
      {description ? (
        <p className="text-sm sm:text-base text-textMuted max-w-2xl font-body pt-1">
          {description}
        </p>
      ) : null}
    </div>
  );
};
