import React, { useState, useEffect, useRef } from 'react';
import { useContent } from '../../context/ContentContext';

export const InlineText = ({
  value = '',
  onChange,
  multiline = false,
  placeholder = 'Click to edit...',
  className = '',
  as: Component = 'span',
  ...props
}) => {
  const { isEditMode } = useContent();
  const [isEditing, setIsEditing] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const inputRef = useRef(null);

  useEffect(() => {
    setLocalValue(value || '');
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      // Auto-resize textarea height
      if (multiline) {
        inputRef.current.style.height = 'auto';
        inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
      }
    }
  }, [isEditing, multiline]);

  if (!isEditMode) {
    if (!value) return null;
    return <Component className={className} {...props}>{value}</Component>;
  }

  const handleBlur = () => {
    setIsEditing(false);
    if (onChange && localValue !== value) {
      onChange(localValue);
    }
  };

  const handleKeyDown = (e) => {
    if (!multiline && e.key === 'Enter') {
      e.preventDefault();
      handleBlur();
    } else if (e.key === 'Escape') {
      setLocalValue(value);
      setIsEditing(false);
    }
  };

  const handleInput = (e) => {
    setLocalValue(e.target.value);
    if (multiline && inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  };

  if (isEditing) {
    if (multiline) {
      return (
        <textarea
          ref={inputRef}
          value={localValue}
          onChange={handleInput}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={`w-full bg-elevation1/90 border border-dashed border-accent text-textPrimary rounded px-2 py-1 outline-none resize-none overflow-hidden transition-all ${className}`}
          rows={2}
          {...props}
        />
      );
    }

    return (
      <input
        ref={inputRef}
        type="text"
        value={localValue}
        onChange={handleInput}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`bg-elevation1/90 border border-dashed border-accent text-textPrimary rounded px-2 py-0.5 outline-none transition-all ${className}`}
        {...props}
      />
    );
  }

  return (
    <Component
      onClick={() => setIsEditing(true)}
      title="Click to edit"
      className={`cursor-text border border-dashed border-accent/40 hover:border-accent hover:bg-accent/5 rounded px-1 -mx-1 transition-all select-none ${className} ${
        !localValue ? 'text-accent/60 italic' : ''
      }`}
      {...props}
    >
      {localValue || `[${placeholder}]`}
    </Component>
  );
};
