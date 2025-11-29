'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { InputField } from './FieldBase';
import { cn } from '@/lib/utils';

interface FieldDateProps {
  id: string;
  value?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  required?: boolean;
  className?: string;
}

export function FieldDate({
  id,
  value,
  onChange,
  onBlur,
  error,
  required,
  className,
}: FieldDateProps): React.JSX.Element {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value && value.trim()) {
        window.dispatchEvent(new CustomEvent('form:nextSlide', { detail: { fieldId: id } }));
      }
    }
  };

  return (
    <div className={cn('w-full space-y-3', className)}>
      <div className="space-y-2">
        <div className="relative">
          <InputField
            type="date"
            id={id}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className={cn(
              'w-full',
              error && 'focus:ring-red-400'
            )}
            aria-describedby={`${id}-help ${id}-error`}
            aria-invalid={!!error}
            aria-required={required}
          />
        </div>
      </div>

      {/* Message d'erreur */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-2 text-red-400 text-sm"
          role="alert"
          aria-live="polite"
          style={{ letterSpacing: '-0.09em' }}
        >
          <svg
            className="w-4 h-4 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <span>{error}</span>
        </motion.div>
      )}

    </div>
  );
}
