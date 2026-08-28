import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../Common/SectionHeader';
import { SkillChip } from './SkillChip';
import { useContent } from '../../context/ContentContext';
import { InlineText } from '../EditMode/InlineText';
import { Code, Server, Database, Wrench, Plus, Trash2, Layers } from 'lucide-react';

const CATEGORY_ICONS = {
  'Languages': Code,
  'Frameworks & Backend': Server,
  'Databases & Storage': Database,
  'Tools & Methodologies': Wrench,
};

export const SkillsSection = () => {
  const {
    content,
    addSkill,
    addSkillCategory,
    deleteSkillCategory,
    updateField,
    isEditMode,
  } = useContent();

  const skillsObj = content.skills || {};
  const categoryNames = Object.keys(skillsObj);

  const [newCatName, setNewCatName] = useState('');
  const [isAddingCategory, setIsAddingCategory] = useState(false);

  const handleCreateCategory = (e) => {
    e.preventDefault();
    if (newCatName.trim()) {
      addSkillCategory(newCatName.trim(), 'Category tools and technologies');
      setNewCatName('');
      setIsAddingCategory(false);
    }
  };

  return (
    <section
      id="skills"
      className="py-24 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto relative"
      aria-label="Technical Skills and Tooling"
    >
      <SectionHeader
        number="03"
        eyebrow="TECHNICAL STACK"
        title="Languages, frameworks, and developer toolchain."
        description="Categorized by discipline. Each chip resides on Elevation Plane 1; resting state stays calm, with subtle amber edge-lighting on focus."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {categoryNames.map((catName, catIdx) => {
          const category = skillsObj[catName];
          const Icon = CATEGORY_ICONS[catName] || Layers;
          const items = category.items || [];

          return (
            <motion.div
              key={catName}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: (catIdx % 4) * 0.08 }}
              className="p-6 sm:p-8 rounded-2xl bg-elevation2 border border-white/[0.06] shadow-elevation-card-a flex flex-col justify-between relative group"
            >
              <div className="space-y-4">
                {/* Category Header */}
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-elevation1 flex items-center justify-center text-accent">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-mono text-sm sm:text-base font-semibold text-white tracking-wide">
                      {catName}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-textMuted">
                      {items.length} tools
                    </span>

                    {/* Delete Category Button in Edit Mode */}
                    {isEditMode && (
                      <button
                        onClick={() => deleteSkillCategory(catName)}
                        title="Delete Entire Category"
                        className="p-1 rounded text-textMuted hover:text-rose-400 transition-colors ml-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                <p className="text-xs sm:text-sm font-mono text-textMuted">
                  <InlineText
                    value={category.description}
                    onChange={(val) => updateField(`skills.${catName}.description`, val)}
                    placeholder="Category description..."
                  />
                </p>

                {/* Skill Chips Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {items.map((skill, sIdx) => (
                    <SkillChip
                      key={skill.name || sIdx}
                      skill={skill}
                      index={sIdx}
                      categoryName={catName}
                      skillIndex={sIdx}
                    />
                  ))}
                </div>

                {/* Add Skill Button in Edit Mode */}
                {isEditMode && (
                  <div className="pt-3 border-t border-white/[0.04]">
                    <button
                      onClick={() => addSkill(catName, { name: 'New Tool', level: 'Working' })}
                      className="w-full py-2 rounded-lg bg-elevation1 hover:bg-elevation1/80 border border-dashed border-accent/40 text-[11px] font-mono text-accent flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add Skill to {catName}</span>
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Add New Category Control in Edit Mode */}
      {isEditMode && (
        <div className="mt-8 pt-4 border-t border-white/[0.06] flex justify-center">
          {isAddingCategory ? (
            <form onSubmit={handleCreateCategory} className="flex items-center gap-3 bg-elevation2 p-3 rounded-xl border border-accent/40 shadow-elevation-card-a">
              <input
                type="text"
                required
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                placeholder="Category Name (e.g. Cloud & DevOps)..."
                className="px-3 py-1.5 rounded-lg bg-elevation1 border border-white/[0.08] focus:border-accent text-textPrimary font-mono text-xs outline-none"
              />
              <button
                type="submit"
                className="px-3 py-1.5 rounded-lg bg-elevation1 border border-accent text-accent text-xs font-mono font-medium hover:bg-accent/10 transition-colors"
              >
                Create
              </button>
              <button
                type="button"
                onClick={() => setIsAddingCategory(false)}
                className="px-2 py-1.5 text-xs font-mono text-textMuted hover:text-textPrimary"
              >
                Cancel
              </button>
            </form>
          ) : (
            <button
              onClick={() => setIsAddingCategory(true)}
              className="px-4 py-2.5 rounded-lg bg-elevation1 hover:bg-elevation2 border border-dashed border-accent/60 text-xs font-mono text-accent flex items-center gap-2 transition-all hover:-translate-y-0.5 shadow-elevation-chip"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Skill Category</span>
            </button>
          )}
        </div>
      )}
    </section>
  );
};
