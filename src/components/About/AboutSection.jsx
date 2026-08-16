import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../Common/SectionHeader';
import { StatCard } from './StatCard';
import { GraduationCap, Code2, Plus } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { InlineText } from '../EditMode/InlineText';

export const AboutSection = () => {
  const { content, updateAbout, addStat, removeStat, isEditMode } = useContent();
  const { about = {} } = content;
  const stats = about.stats || [];
  const directives = about.directives || [];

  const handleDirectiveChange = (index, field, value) => {
    const updated = [...directives];
    updated[index] = { ...updated[index], [field]: value };
    updateAbout({ directives: updated });
  };

  return (
    <section
      id="about"
      className="py-24 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto relative"
      aria-label="About Akhilesh"
    >
      <SectionHeader
        number="01"
        eyebrow="BACKGROUND"
        title="Engineering logic & grounded architecture."
        description="A look into my academic journey, core engineering philosophy, and current technical trajectory."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-16 items-start mb-16">
        {/* Left Column: Narrative & Educational Background */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.4 }}
          className="lg:col-span-7 space-y-6 text-textMuted font-body text-base sm:text-lg leading-relaxed"
        >
          <p>
            <InlineText
              value={about.paragraph1}
              onChange={(val) => updateAbout({ paragraph1: val })}
              multiline
              placeholder="First bio paragraph..."
            />
          </p>

          <p>
            <InlineText
              value={about.paragraph2}
              onChange={(val) => updateAbout({ paragraph2: val })}
              multiline
              placeholder="Second bio paragraph..."
            />
          </p>

          <p>
            <InlineText
              value={about.paragraph3}
              onChange={(val) => updateAbout({ paragraph3: val })}
              multiline
              placeholder="Third bio paragraph..."
            />
          </p>

          <p>
            <InlineText
              value={about.paragraph4}
              onChange={(val) => updateAbout({ paragraph4: val })}
              multiline
              placeholder="Fourth bio paragraph..."
            />
          </p>

          {/* Quick Academic Keypoint Box on Plane 1 */}
          <div className="p-4 sm:p-5 rounded-xl bg-elevation1 border border-white/[0.06] shadow-elevation-chip flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-elevation2 flex items-center justify-center text-accent shrink-0">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-mono text-textPrimary font-medium">
                  <InlineText
                    value={about.degree}
                    onChange={(val) => updateAbout({ degree: val })}
                    placeholder="Degree Name"
                  />
                </p>
                <p className="text-[11px] sm:text-xs font-mono text-textMuted">
                  <InlineText
                    value={about.institution}
                    onChange={(val) => updateAbout({ institution: val })}
                    placeholder="University / College"
                  />
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="px-2.5 py-1 rounded bg-elevation2 text-accent font-semibold flex items-center gap-1">
                <span>CGPA</span>
                <InlineText
                  value={about.cgpa}
                  onChange={(val) => updateAbout({ cgpa: val })}
                  placeholder="8.0"
                />
              </span>
              <span className="text-textMuted text-[11px]">
                <InlineText
                  value={about.statusLabel}
                  onChange={(val) => updateAbout({ statusLabel: val })}
                  placeholder="Final Year"
                />
              </span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Key Pillars on Elevation Plane 2 */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="lg:col-span-5 space-y-4"
        >
          <div className="p-6 sm:p-7 rounded-2xl bg-elevation2 border border-white/[0.06] shadow-elevation-card-b space-y-4">
            <h3 className="font-mono text-xs text-accent uppercase tracking-wider flex items-center gap-2">
              <Code2 className="w-4 h-4" />
              <span>Core Directives</span>
            </h3>

            <ul className="space-y-3 font-mono text-xs sm:text-sm text-textMuted">
              {directives.map((dir, dIdx) => (
                <li key={dIdx} className="flex items-start gap-2.5">
                  <span className="text-accent mt-0.5">▸</span>
                  <div className="w-full">
                    <strong className="text-textPrimary font-medium">
                      <InlineText
                        value={dir.title}
                        onChange={(val) => handleDirectiveChange(dIdx, 'title', val)}
                        placeholder="Directive Title"
                      />
                      :
                    </strong>{' '}
                    <span>
                      <InlineText
                        value={dir.desc}
                        onChange={(val) => handleDirectiveChange(dIdx, 'desc', val)}
                        placeholder="Directive description..."
                      />
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>

      {/* Row of Stat Cards on Plane 2 */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, idx) => (
            <StatCard
              key={stat.id || idx}
              stat={stat}
              index={idx}
              onRemove={() => removeStat(idx)}
            />
          ))}
        </div>

        {/* Add Stat button in Edit Mode */}
        {isEditMode && (
          <div className="flex justify-center pt-2">
            <button
              onClick={() => addStat()}
              className="px-4 py-2 rounded-lg bg-elevation1 hover:bg-elevation2 border border-dashed border-accent/60 text-xs font-mono text-accent flex items-center gap-2 transition-all hover:-translate-y-0.5 shadow-elevation-chip"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Stat Card</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
