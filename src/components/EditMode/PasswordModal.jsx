import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, KeyRound } from 'lucide-react';
import { useContent } from '../../context/ContentContext';

export const PasswordModal = () => {
  const { isPasswordModalOpen, setIsPasswordModalOpen, authenticatePassword } = useContent();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isPasswordModalOpen) {
      setPassword('');
      setError('');
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isPasswordModalOpen]);

  if (!isPasswordModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = authenticatePassword(password);
    if (!result.success) {
      setError(result.error);
    }
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-[2px]"
        onClick={() => setIsPasswordModalOpen(false)}
        role="dialog"
        aria-modal="true"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 12 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-md bg-elevation2 border border-white/[0.08] rounded-2xl shadow-elevation-menu-scrolled p-6 sm:p-8 space-y-6 relative text-textPrimary"
        >
          {/* Close button */}
          <button
            onClick={() => setIsPasswordModalOpen(false)}
            className="absolute top-5 right-5 p-1.5 rounded-lg bg-elevation1 border border-white/[0.06] text-textMuted hover:text-textPrimary transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header */}
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-elevation1 border border-white/[0.06] flex items-center justify-center text-accent">
              <KeyRound className="w-5 h-5" />
            </div>
            <h3 className="font-display text-2xl font-medium tracking-tight">
              Enter Edit Mode
            </h3>
            <p className="font-mono text-xs text-textMuted leading-relaxed">
              Enter passcode to unlock direct client-side editing for this session. (Passcode: <code className="text-accent font-semibold">aalthara</code>)
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block font-mono text-[11px] text-textMuted uppercase tracking-wider">
                Session Passcode
              </label>
              <input
                ref={inputRef}
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="Enter password..."
                className="w-full px-4 py-2.5 rounded-lg bg-elevation1 border border-white/[0.08] focus:border-accent text-textPrimary font-mono text-sm outline-none transition-colors"
              />
              {error && (
                <p className="text-xs font-mono text-rose-400 pt-1">
                  {error}
                </p>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsPasswordModalOpen(false)}
                className="px-4 py-2 text-xs font-mono text-textMuted hover:text-textPrimary transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-lg bg-elevation1 border border-accent/40 text-textPrimary hover:border-accent text-xs font-mono font-medium flex items-center gap-2 transition-all hover:-translate-y-0.5 hover:shadow-elevation-hover shadow-sm"
              >
                <span>Unlock Edit Mode</span>
                <ArrowRight className="w-3.5 h-3.5 text-accent" />
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
