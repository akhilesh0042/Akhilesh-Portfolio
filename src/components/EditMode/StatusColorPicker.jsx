import React from 'react';
import { useContent } from '../../context/ContentContext';

const STATUS_PRESETS = [
  { id: 'amber', label: 'Amber', pingClass: 'bg-accent', dotClass: 'bg-accent' },
  { id: 'mint', label: 'Mint', pingClass: 'bg-emerald-400', dotClass: 'bg-emerald-400' },
  { id: 'muted', label: 'Muted', pingClass: 'bg-slate-400', dotClass: 'bg-slate-400' },
];

export const StatusColorPicker = ({ currentColor = 'amber', onChange }) => {
  const { isEditMode } = useContent();

  if (!isEditMode) return null;

  return (
    <div className="inline-flex items-center gap-1.5 p-1 rounded-md bg-elevation2 border border-white/[0.08] shadow-sm ml-2">
      {STATUS_PRESETS.map((preset) => (
        <button
          key={preset.id}
          type="button"
          onClick={() => onChange(preset.id)}
          title={`Set status color to ${preset.label}`}
          className={`w-4 h-4 rounded-full flex items-center justify-center transition-all ${
            currentColor === preset.id
              ? 'ring-2 ring-white/60 scale-110'
              : 'opacity-60 hover:opacity-100'
          }`}
        >
          <span className={`w-2.5 h-2.5 rounded-full ${preset.dotClass}`} />
        </button>
      ))}
    </div>
  );
};
