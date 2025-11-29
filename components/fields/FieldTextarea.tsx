'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TextareaField } from './FieldBase';
import { cn } from '@/lib/utils';

interface FieldTextareaProps {
  id: string;
  value?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  maxLength?: number;
  className?: string;
}

export function FieldTextarea({
  id,
  value,
  onChange,
  onBlur,
  error,
  required,
  placeholder,
  maxLength,
  className,
}: FieldTextareaProps): React.JSX.Element {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value && value.trim()) {
        window.dispatchEvent(new CustomEvent('form:nextSlide', { detail: { fieldId: id } }));
      }
    }
    // Shift+Enter allows new line
  };

  return (
    <div className={cn('w-full', className)}>
      {/* Container principal avec espacement optimisé */}
      <div className="space-y-8">
        
        {/* Section du champ de saisie */}
        <div className="space-y-4">
          <motion.div 
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <TextareaField
              id={id}
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              maxLength={maxLength}
              className={cn(
                'w-full px-5 py-4 text-lg',
                'min-h-[120px] sm:min-h-[140px] md:min-h-[160px]',
                'bg-white/10 backdrop-blur-sm rounded-3xl',
                'text-white placeholder-white/50',
                'transition-all duration-200',
                'hover:bg-white/15',
                'focus:bg-white/20',
                'focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black/20',
                'resize-none',
                error && 'focus:ring-red-400'
              )}
              aria-describedby={`${id}-help ${id}-error`}
              aria-invalid={!!error}
              aria-required={required}
            />
          </motion.div>
        </div>

        {/* Section des messages et actions */}
        <div className="space-y-6">
          
          {/* Message d'erreur */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center space-x-3 text-red-400 text-sm"
              role="alert"
              aria-live="polite"
              style={{ letterSpacing: '-0.09em' }}
            >
              <svg
                className="w-5 h-5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-medium">{error}</span>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
}
