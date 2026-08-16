import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, Download, RotateCcw, Check, X, Edit3 } from 'lucide-react';
import { useContent } from '../../context/ContentContext';

export const FloatingEditBar = () => {
  const {
    isEditMode,
    setIsEditMode,
    saveToLocalStorage,
    exportJson,
    resetToDefaults,
    isSavedNotification,
  } = useContent();

  if (!isEditMode) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.95 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-lg w-[92%] sm:w-auto bg-elevation2 border border-accent/40 rounded-2xl shadow-elevation-menu-scrolled px-4 py-2.5 flex flex-wrap items-center justify-between sm:justify-start gap-2 sm:gap-3 text-textPrimary"
      >
        {/* Status Badge */}
        <div className="flex items-center gap-2 pr-2 sm:border-r sm:border-white/[0.08] select-none">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
          </span>
          <span className="font-mono text-xs text-textPrimary font-semibold tracking-wide">
            Edit Mode
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Save button */}
          <button
            onClick={saveToLocalStorage}
            type="button"
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 transition-all duration-200 ${
              isSavedNotification
                ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/50'
                : 'bg-elevation1 hover:bg-accent/15 border border-white/[0.08] hover:border-accent text-textPrimary'
            }`}
          >
            {isSavedNotification ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Saved!</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5 text-accent" />
                <span>Save</span>
              </>
            )}
          </button>

          {/* Export JSON button */}
          <button
            onClick={exportJson}
            type="button"
            title="Download content.json to overwrite source code file directly"
            className="px-3 py-1.5 rounded-lg bg-elevation1 hover:bg-white/[0.06] border border-white/[0.08] text-xs font-mono text-textMuted hover:text-textPrimary flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-accent/80" />
            <span className="hidden xs:inline sm:inline">Export JSON</span>
            <span className="xs:hidden sm:hidden">Export</span>
          </button>

          {/* Reset button */}
          <button
            onClick={resetToDefaults}
            type="button"
            title="Reset all edits to initial defaults"
            className="p-1.5 rounded-lg bg-elevation1 hover:bg-rose-950/40 border border-white/[0.08] hover:border-rose-500/40 text-textMuted hover:text-rose-300 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Exit Edit Mode */}
          <button
            onClick={() => setIsEditMode(false)}
            type="button"
            title="Exit edit mode"
            className="p-1.5 rounded-lg bg-elevation1 hover:bg-white/[0.08] border border-white/[0.08] text-textMuted hover:text-textPrimary transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
