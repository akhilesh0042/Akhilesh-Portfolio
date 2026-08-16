import React from 'react';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { InlineText } from '../EditMode/InlineText';

export const StatCard = ({ stat, index, onRemove }) => {
  const { isEditMode, updateStat } = useContent();

  // Vary shadow angles and directions per card for physical realism
  const shadowVariants = [
    'shadow-elevation-card-a',
    'shadow-elevation-card-b',
    'shadow-elevation-card-c',
  ];

  const shadowClass = shadowVariants[index % shadowVariants.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className={`p-6 rounded-xl bg-elevation2 border border-white/[0.06] ${shadowClass} transition-all duration-200 hover:-translate-y-1 hover:shadow-elevation-hover flex flex-col justify-between group relative`}
    >
      {/* Remove button in Edit Mode */}
      {isEditMode && onRemove && (
        <button
          onClick={onRemove}
          title="Remove Stat Card"
          className="absolute top-3 right-3 p-1.5 rounded bg-elevation1 border border-white/[0.08] text-textMuted hover:text-rose-400 hover:border-rose-500/40 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      )}

      <div className="flex items-baseline justify-between mb-4">
        <span className="font-display text-4xl sm:text-5xl font-medium text-textPrimary group-hover:text-accent transition-colors duration-200">
          <InlineText
            value={stat.value}
            onChange={(val) => updateStat(index, { value: val })}
            placeholder="0.0"
          />
        </span>
        <span className="text-[11px] font-mono text-accent/80 tracking-widest uppercase">
          0{index + 1}
        </span>
      </div>

      <div className="space-y-1">
        <h4 className="text-sm font-medium font-body text-textPrimary">
          <InlineText
            value={stat.label}
            onChange={(val) => updateStat(index, { label: val })}
            placeholder="Metric Label"
          />
        </h4>
        <p className="text-xs font-mono text-textMuted leading-relaxed">
          <InlineText
            value={stat.sublabel}
            onChange={(val) => updateStat(index, { sublabel: val })}
            placeholder="Short description..."
          />
        </p>
      </div>
    </motion.div>
  );
};
