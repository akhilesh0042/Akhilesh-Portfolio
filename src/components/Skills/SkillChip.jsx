import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { InlineText } from '../EditMode/InlineText';

export const SkillChip = ({ skill, index, categoryName, skillIndex }) => {
  const { isEditMode, deleteSkill, updateSkill } = useContent();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: (index % 10) * 0.02 }}
      tabIndex={0}
      className="px-3.5 py-2.5 rounded-lg bg-elevation1 border border-white/[0.06] shadow-elevation-chip text-xs font-mono transition-all duration-150 hover:-translate-y-0.5 hover:shadow-elevation-chip-hover hover:border-accent focus-visible:border-accent focus-visible:ring-1 focus-visible:ring-accent flex items-center justify-between gap-3 group cursor-default select-none relative"
    >
      <span className="text-textPrimary font-medium group-hover:text-accent transition-colors">
        <InlineText
          value={skill.name}
          onChange={(val) => updateSkill(categoryName, skillIndex, { name: val })}
          placeholder="Skill"
        />
      </span>

      <div className="flex items-center gap-2">
        <span className="text-[10px] text-textMuted group-hover:text-textPrimary/80 transition-colors">
          <InlineText
            value={skill.level}
            onChange={(val) => updateSkill(categoryName, skillIndex, { level: val })}
            placeholder="Level"
          />
        </span>

        {/* Delete button in Edit Mode */}
        {isEditMode && (
          <button
            onClick={() => deleteSkill(categoryName, skillIndex)}
            title="Delete Skill"
            className="p-0.5 rounded text-textMuted hover:text-rose-400 hover:bg-rose-950/40 transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>
    </motion.div>
  );
};
