'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FieldYesNoProps {
  id: string;
  value?: boolean;
  onChange: (value: boolean) => void;
  onBlur?: () => void;
  error?: string;
  required?: boolean;
  className?: string;
}

export function FieldYesNo({
  id,
  value,
  onChange,
  onBlur,
  error,
  required,
  className,
}: FieldYesNoProps): React.JSX.Element {
  const [isFocused, setIsFocused] = useState(false);

  const handleSelect = (selectedValue: boolean) => {
    onChange(selectedValue);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value !== undefined) {
        window.dispatchEvent(new CustomEvent('form:nextSlide', { detail: { fieldId: id } }));
      }
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handleSelect(false);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleSelect(true);
    }
  };

  return (
    <div className={cn('w-full', className)}>
      {/* Container principal avec espacement optimisé */}
      <div className="space-y-8">
        
        {/* Section des options Yes/No */}
        <div
          className="space-y-4"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="radiogroup"
          aria-labelledby={`${id}-label`}
          aria-describedby={`${id}-help ${id}-error`}
          aria-invalid={!!error}
          aria-required={required}
        >
          {/* Options Oui/Non - Parfaitement alignées */}
          <div className="option-grid option-grid-2 max-w-md mx-auto overflow-visible">
            <motion.button
              type="button"
              onClick={() => handleSelect(true)}
              initial={{ opacity: 0, x: -30, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ 
                duration: 0.4,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1]
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                'w-full max-w-[180px] px-6 py-3',
                'bg-white/20 backdrop-blur-md border-2 border-white/30 rounded-full',
                'text-white font-medium transition-all duration-200',
                'flex items-center justify-center',
                'hover:bg-white/30 hover:border-white/50',
                'focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-black/20',
                'shadow-md hover:shadow-lg',
                value === true && 'bg-white border-white text-black shadow-xl scale-105',
                error && 'border-red-400 focus:ring-red-400'
              )}
              aria-checked={value === true}
              role="radio"
            >
              <span 
                className="option-text text-lg font-medium leading-tight" 
                style={{ letterSpacing: '-0.06em' }}
              >
                Oui
              </span>
            </motion.button>

            <motion.button
              type="button"
              onClick={() => handleSelect(false)}
              initial={{ opacity: 0, x: 30, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ 
                duration: 0.4,
                delay: 0.15,
                ease: [0.16, 1, 0.3, 1]
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                'w-full max-w-[180px] px-6 py-3',
                'bg-white/20 backdrop-blur-md border-2 border-white/30 rounded-full',
                'text-white font-medium transition-all duration-200',
                'flex items-center justify-center',
                'hover:bg-white/30 hover:border-white/50',
                'focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-black/20',
                'shadow-md hover:shadow-lg',
                value === false && 'bg-white border-white text-black shadow-xl scale-105',
                error && 'border-red-400 focus:ring-red-400'
              )}
              aria-checked={value === false}
              role="radio"
            >
              <span 
                className="option-text text-lg font-medium leading-tight" 
                style={{ letterSpacing: '-0.06em' }}
              >
                Non
              </span>
            </motion.button>
          </div>
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
              style={{ letterSpacing: '-0.06em' }}
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
