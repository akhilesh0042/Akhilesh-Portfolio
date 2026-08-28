import React from 'react';
import { InlineText } from '../EditMode/InlineText';

export const SectionHeader = ({
  number,
  eyebrow,
  title,
  description,
  onEyebrowChange,
  onTitleChange,
  onDescriptionChange,
}) => {
  return (
    <div className="space-y-2 mb-12">
      <div className="flex items-center gap-2 font-mono text-xs text-accent tracking-widest uppercase">
        <span className="text-accent font-semibold">{number}</span>
        <span className="text-white/20">//</span>
        {onEyebrowChange ? (
          <InlineText
            value={eyebrow}
            onChange={onEyebrowChange}
            placeholder="EYEBROW"
            className="text-accent/90 font-mono tracking-widest"
          />
        ) : (
          <span className="text-accent/90">{eyebrow}</span>
        )}
      </div>

      {title || onTitleChange ? (
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-textPrimary">
          {onTitleChange ? (
            <InlineText
              value={typeof title === 'string' ? title : ''}
              onChange={onTitleChange}
              placeholder="Section Title..."
              className="text-textPrimary font-display"
            />
          ) : (
            title
          )}
        </h2>
      ) : null}

      {description || onDescriptionChange ? (
        <p className="text-sm sm:text-base text-textMuted max-w-2xl font-body pt-1">
          {onDescriptionChange ? (
            <InlineText
              value={typeof description === 'string' ? description : ''}
              onChange={onDescriptionChange}
              placeholder="Section description..."
              multiline
              className="text-textMuted font-body"
            />
          ) : (
            description
          )}
        </p>
      ) : null}
    </div>
  );
};
