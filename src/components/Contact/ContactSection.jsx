import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../Common/SectionHeader';
import {
  Mail,
  FileText,
  Copy,
  Check,
  ArrowUpRight,
  MapPin,
  Clock,
  Upload,
  Link,
  FileCheck,
  Plus,
  Trash2,
  AlertTriangle,
  Eye,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, getContactIcon } from '../Common/Icons';
import { useContent } from '../../context/ContentContext';
import { InlineText } from '../EditMode/InlineText';

const ICON_OPTIONS = [
  { value: 'globe', label: 'Globe / Website' },
  { value: 'twitter', label: 'X / Twitter' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'github', label: 'GitHub' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'mail', label: 'Mail' },
];

export const ContactSection = ({ onOpenResume }) => {
  const {
    content,
    updateContact,
    updateCv,
    addPersonalLink,
    removePersonalLink,
    updatePersonalLink,
    isEditMode,
  } = useContent();

  const { contact = {} } = content;
  const cv = contact.cv || {
    label: 'Curriculum Vitae',
    fileUrl: '',
    fileName: 'Akhilesh_MCA_Resume.pdf',
    updatedAt: 'Feb 2025',
  };
  const personalLinks = contact.personalLinks || [];

  const [copied, setCopied] = useState(false);
  const [fileWarning, setFileWarning] = useState('');
  const fileInputRef = useRef(null);

  const getFormattedDate = () => {
    return new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const handleCopyEmail = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCopied(true);
    try {
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(contact.email).catch(() => {});
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = contact.email;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
    } catch {
      // Synchronous fallback
    }
    setTimeout(() => setCopied(false), 2500);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setFileWarning('File is > 2MB (may bloat browser storage). Consider using an external URL.');
      } else {
        setFileWarning('');
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result;
        updateCv({
          fileUrl: dataUrl,
          fileName: file.name,
          updatedAt: getFormattedDate(),
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleExternalUrlChange = (url) => {
    updateCv({
      fileUrl: url,
      updatedAt: getFormattedDate(),
    });
  };

  // Primary Direct Channels
  const primaryChannels = [
    {
      id: 'email',
      title: 'Electronic Mail',
      value: contact.email,
      fieldKey: 'email',
      description: 'Primary channel for employment & interview inquiries.',
      icon: Mail,
      actionType: 'copy',
      shadowClass: 'shadow-elevation-card-a',
    },
    {
      id: 'linkedin',
      title: 'LinkedIn Network',
      value: contact.linkedin,
      fieldKey: 'linkedin',
      description: 'Professional experience, updates, and connection requests.',
      icon: LinkedinIcon,
      actionType: 'link',
      actionLabel: 'Connect on LinkedIn',
      actionUrl: contact.linkedin,
      shadowClass: 'shadow-elevation-card-b',
    },
    {
      id: 'github',
      title: 'GitHub Repositories',
      value: contact.github,
      fieldKey: 'github',
      description: 'Public codebase, Django modules, and open source experiments.',
      icon: GithubIcon,
      actionType: 'link',
      actionLabel: 'Explore repositories',
      actionUrl: contact.github,
      shadowClass: 'shadow-elevation-card-c',
    },
  ];

  const hasCv = Boolean(cv.fileUrl || cv.label);

  return (
    <section
      id="contact"
      className="py-24 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto relative"
      aria-label="Contact and Social Channels"
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4">
        <SectionHeader
          number="04"
          eyebrow="CONNECT"
          title={
            <InlineText
              value={contact.intro}
              onChange={(val) => updateContact({ intro: val })}
              placeholder="Add intro text"
            />
          }
          description="I am actively open to Python/Django developer roles, full-stack internships, and technical pair programming."
        />

        {/* Add Personal Link Button in Edit Mode */}
        {isEditMode && (
          <button
            onClick={() =>
              addPersonalLink({
                id: `link-${Date.now()}`,
                label: 'Social Profile / Blog',
                url: 'https://',
                icon: 'globe',
              })
            }
            className="px-4 py-2.5 rounded-lg bg-elevation1 hover:bg-elevation2 border border-accent/40 hover:border-accent text-accent text-xs font-mono font-medium flex items-center gap-2 transition-all hover:-translate-y-0.5 shadow-elevation-chip shrink-0 mb-12"
          >
            <Plus className="w-4 h-4" />
            <span>Add Personal Link</span>
          </button>
        )}
      </div>

      {/* Grid of Elevated Contact, CV & Personal Link Tiles on Plane 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 pt-2">
        {/* Core Primary Channels (Email, LinkedIn, GitHub) */}
        {primaryChannels.map((tile, index) => {
          const Icon = tile.icon;
          return (
            <motion.div
              key={tile.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
              className={`p-7 sm:p-8 rounded-2xl bg-elevation2 border border-white/[0.06] ${tile.shadowClass} transition-all duration-200 hover:-translate-y-1 hover:shadow-elevation-hover flex flex-col justify-between group`}
            >
              <div className="space-y-4">
                {/* Tile Header */}
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-elevation1 flex items-center justify-center text-accent border border-white/[0.05]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono text-textMuted/70">
                    0{index + 1}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-body text-base sm:text-lg font-semibold text-textPrimary group-hover:text-accent transition-colors">
                    {tile.title}
                  </h3>
                  <div className="font-mono text-xs sm:text-sm text-accent truncate">
                    {tile.fieldKey ? (
                      <InlineText
                        value={contact[tile.fieldKey]}
                        onChange={(val) => updateContact({ [tile.fieldKey]: val })}
                        placeholder={`Enter ${tile.title}...`}
                        className="text-accent"
                      />
                    ) : (
                      <span>{tile.value}</span>
                    )}
                  </div>
                </div>

                <p className="text-xs sm:text-sm font-body text-textMuted leading-relaxed">
                  {tile.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 mt-4 border-t border-white/[0.05] flex items-center justify-between">
                {tile.actionType === 'copy' ? (
                  <div className="flex items-center gap-3 w-full justify-between">
                    <button
                      id="copy-email-btn"
                      onClick={handleCopyEmail}
                      type="button"
                      aria-label="Copy email address to clipboard"
                      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono transition-all duration-200 cursor-pointer select-none focus-visible:ring-2 focus-visible:ring-accent ${
                        copied
                          ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/50 shadow-sm'
                          : 'bg-elevation1 text-textPrimary hover:text-accent border border-white/[0.08] hover:border-accent/40'
                      }`}
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="font-semibold text-emerald-300">Copied to clipboard!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-accent" />
                          <span>Copy address</span>
                        </>
                      )}
                    </button>

                    <a
                      href={`mailto:${contact.email}`}
                      className="inline-flex items-center gap-1 text-xs font-mono text-textMuted hover:text-textPrimary transition-colors"
                    >
                      <span>Open mail client</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                ) : (
                  <a
                    href={tile.actionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-mono text-textPrimary hover:text-accent transition-colors focus-visible:ring-1 focus-visible:ring-accent"
                  >
                    <span>{tile.actionLabel}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                )}
              </div>
            </motion.div>
          );
        })}

        {/* Fully Editable Curriculum Vitae / Resume Tile */}
        {(hasCv || isEditMode) && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.35, delay: 0.24 }}
            className="p-7 sm:p-8 rounded-2xl bg-elevation2 border border-white/[0.06] shadow-elevation-card-a transition-all duration-200 hover:-translate-y-1 hover:shadow-elevation-hover flex flex-col justify-between group relative"
          >
            <div className="space-y-4">
              {/* Tile Header */}
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-elevation1 flex items-center justify-center text-accent border border-white/[0.05]">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-textMuted/70">
                    04
                  </span>
                </div>
              </div>

              {/* Title & Editable Label */}
              <div className="space-y-1">
                <h3 className="font-body text-base sm:text-lg font-semibold text-textPrimary group-hover:text-accent transition-colors">
                  <InlineText
                    value={cv.label || 'Curriculum Vitae'}
                    onChange={(val) => updateCv({ label: val })}
                    placeholder="Curriculum Vitae"
                  />
                </h3>
                <div className="font-mono text-xs sm:text-sm text-accent truncate flex items-center gap-2">
                  <span>{cv.fileName || (cv.fileUrl ? 'External Document Link' : 'Interactive Document')}</span>
                  {cv.updatedAt && (
                    <span className="text-[11px] font-mono text-textMuted/70 bg-elevation1 px-2 py-0.5 rounded border border-white/[0.04]">
                      Updated {cv.updatedAt}
                    </span>
                  )}
                </div>
              </div>

              <p className="text-xs sm:text-sm font-body text-textMuted leading-relaxed">
                Detailed breakdown of MCA coursework, engineering projects & technical metrics.
              </p>

              {/* Edit Mode Controls: Upload or Paste URL */}
              {isEditMode && (
                <div className="p-4 rounded-xl bg-elevation1/80 border border-accent/30 space-y-3 mt-2">
                  <div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
                    <span className="text-[11px] font-mono text-accent uppercase font-medium flex items-center gap-1.5">
                      <FileCheck className="w-3.5 h-3.5" />
                      <span>Replace / Configure CV</span>
                    </span>
                    {cv.fileUrl && (
                      <a
                        href={cv.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-mono text-accent hover:underline flex items-center gap-1"
                      >
                        <Eye className="w-3 h-3" />
                        <span>View current CV</span>
                      </a>
                    )}
                  </div>

                  {/* Option 1: Device PDF Upload */}
                  <div className="space-y-1">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,application/pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full py-2 px-3 rounded-lg bg-elevation2 hover:bg-elevation2/80 border border-white/[0.08] hover:border-accent text-xs font-mono text-textPrimary flex items-center justify-center gap-2 transition-colors"
                    >
                      <Upload className="w-3.5 h-3.5 text-accent" />
                      <span>Upload New PDF File...</span>
                    </button>
                  </div>

                  {/* Option 2: External Link Input */}
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono text-textMuted uppercase flex items-center gap-1">
                      <Link className="w-3 h-3 text-accent" />
                      <span>Or paste external URL (Google Drive / Dropbox)</span>
                    </label>
                    <input
                      type="url"
                      value={cv.fileUrl && !cv.fileUrl.startsWith('data:') ? cv.fileUrl : ''}
                      onChange={(e) => handleExternalUrlChange(e.target.value)}
                      placeholder="https://drive.google.com/..."
                      className="w-full px-3 py-1.5 rounded-lg bg-elevation2 border border-white/[0.08] focus:border-accent text-textPrimary font-mono text-xs outline-none"
                    />
                  </div>

                  {/* Size Warning Banner */}
                  {fileWarning && (
                    <div className="p-2 rounded bg-amber-950/40 border border-amber-500/40 flex items-start gap-2 text-[11px] font-mono text-amber-300">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-400" />
                      <span>{fileWarning}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Action Footer */}
            <div className="pt-6 mt-4 border-t border-white/[0.05] flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                {cv.fileUrl ? (
                  <a
                    href={cv.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download={cv.fileName || 'Curriculum_Vitae.pdf'}
                    className="inline-flex items-center gap-2 text-xs font-mono text-textPrimary hover:text-accent transition-colors focus-visible:ring-1 focus-visible:ring-accent"
                  >
                    <span>Download / Open {cv.label || 'CV'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                ) : (
                  <button
                    onClick={onOpenResume}
                    type="button"
                    className="inline-flex items-center gap-2 text-xs font-mono text-textPrimary hover:text-accent transition-colors focus-visible:ring-1 focus-visible:ring-accent"
                  >
                    <span>Open CV Viewer</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                )}

                {cv.fileUrl && (
                  <button
                    onClick={onOpenResume}
                    type="button"
                    className="text-[11px] font-mono text-textMuted hover:text-accent transition-colors border-l border-white/[0.08] pl-3"
                  >
                    Interactive Viewer
                  </button>
                )}
              </div>

              {cv.updatedAt && (
                <span className="text-[11px] font-mono text-textMuted/60">
                  {cv.updatedAt}
                </span>
              )}
            </div>
          </motion.div>
        )}

        {/* Dynamic Personal Links (Matching identical elevated tile aesthetic) */}
        {personalLinks.map((pLink, pIdx) => {
          const actualIndex = primaryChannels.length + 1 + pIdx;
          const IconComponent = getContactIcon(pLink.icon);
          const shadowVariants = [
            'shadow-elevation-card-a',
            'shadow-elevation-card-b',
            'shadow-elevation-card-c',
          ];
          const shadowClass = shadowVariants[pIdx % shadowVariants.length];

          // Hide empty links in normal view mode unless in Edit Mode
          if (!isEditMode && (!pLink.url || !pLink.url.trim())) {
            return null;
          }

          return (
            <motion.div
              key={pLink.id || pIdx}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35, delay: (pIdx % 4) * 0.08 }}
              className={`p-7 sm:p-8 rounded-2xl bg-elevation2 border border-white/[0.06] ${shadowClass} transition-all duration-200 hover:-translate-y-1 hover:shadow-elevation-hover flex flex-col justify-between group relative`}
            >
              <div className="space-y-4">
                {/* Header with Icon + Options and Delete Control */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-elevation1 flex items-center justify-center text-accent border border-white/[0.05]">
                      <IconComponent className="w-5 h-5" />
                    </div>

                    {/* Icon Picker Dropdown (Active in Edit Mode) */}
                    {isEditMode && (
                      <select
                        value={pLink.icon || 'globe'}
                        onChange={(e) => updatePersonalLink(pIdx, { icon: e.target.value })}
                        className="px-2 py-1 rounded bg-elevation1 border border-white/[0.08] text-[11px] font-mono text-accent outline-none focus:border-accent cursor-pointer"
                      >
                        {ICON_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value} className="bg-elevation1 text-textPrimary">
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-textMuted/70">
                      {actualIndex < 9 ? `0${actualIndex + 1}` : actualIndex + 1}
                    </span>

                    {/* Delete Link (×) button in Edit Mode */}
                    {isEditMode && (
                      <button
                        onClick={() => removePersonalLink(pIdx)}
                        title="Delete Personal Link"
                        className="p-1 rounded bg-elevation1 border border-white/[0.08] hover:border-rose-500 text-rose-400 transition-colors ml-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="font-body text-base sm:text-lg font-semibold text-textPrimary group-hover:text-accent transition-colors">
                    <InlineText
                      value={pLink.label}
                      onChange={(val) => updatePersonalLink(pIdx, { label: val })}
                      placeholder="Link Label (e.g. Photography / Blog)"
                    />
                  </h3>

                  <div className="font-mono text-xs sm:text-sm text-accent truncate">
                    <InlineText
                      value={pLink.url}
                      onChange={(val) => updatePersonalLink(pIdx, { url: val })}
                      placeholder="https://..."
                      className="text-accent"
                    />
                  </div>
                </div>

                <p className="text-xs sm:text-sm font-body text-textMuted leading-relaxed">
                  Personal external channel & portfolio profile.
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-6 mt-4 border-t border-white/[0.05] flex items-center justify-between">
                {pLink.url && pLink.url.startsWith('http') ? (
                  <a
                    href={pLink.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-mono text-textPrimary hover:text-accent transition-colors focus-visible:ring-1 focus-visible:ring-accent"
                  >
                    <span>Visit {pLink.label || 'Channel'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                ) : (
                  <span className="text-xs font-mono text-textMuted">
                    {isEditMode ? 'Enter valid URL above' : 'External Link'}
                  </span>
                )}

                <span className="text-[11px] font-mono text-textMuted/50">
                  Profile Link
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Location & Time Footer Tile */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35, delay: 0.3 }}
        className="mt-6 p-5 sm:p-6 rounded-xl bg-elevation1 border border-white/[0.05] shadow-elevation-chip flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs text-textMuted"
      >
        <div className="flex items-center gap-2.5">
          <MapPin className="w-4 h-4 text-accent" />
          <span>
            Base Location:{' '}
            <strong className="text-textPrimary font-normal">
              <InlineText
                value={contact.location}
                onChange={(val) => updateContact({ location: val })}
                placeholder="City, Country"
              />
            </strong>
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <Clock className="w-4 h-4 text-accent/80" />
          <span>
            Timezone:{' '}
            <strong className="text-textPrimary font-normal">
              <InlineText
                value={contact.timezone}
                onChange={(val) => updateContact({ timezone: val })}
                placeholder="Timezone (UTC offset)"
              />
            </strong>
          </span>
        </div>
      </motion.div>
    </section>
  );
};
