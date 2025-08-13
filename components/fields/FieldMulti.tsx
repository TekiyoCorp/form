'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FieldMultiProps {
  id: string;
  value?: string[];
  onChange: (value: string[]) => void;
  onBlur?: () => void;
  error?: string;
  required?: boolean;
  options: string[];
  max?: number;
  className?: string;
}

export function FieldMulti({
  id,
  value = [],
  onChange,
  onBlur,
  error,
  required,
  options,
  className,
}: FieldMultiProps): React.JSX.Element {
  const [isFocused, setIsFocused] = useState(false);

  // S'assurer que value est toujours un tableau
  const safeValue = Array.isArray(value) ? value : [];

  const handleToggle = (option: string) => {
    const newValue = safeValue.includes(option)
      ? safeValue.filter(item => item !== option)
      : [...safeValue, option];
    onChange(newValue);
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
      if (safeValue.length > 0) {
        window.dispatchEvent(new CustomEvent('form:nextSlide', { detail: { fieldId: id } }));
      }
    }
  };

  return (
    <div className={cn('w-full', className)}>
      {/* Container principal avec espacement optimisé */}
      <div className="space-y-8">
        
        {/* Section des options */}
        <div
          className="space-y-4"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="group"
          aria-labelledby={`${id}-label`}
          aria-describedby={`${id}-help ${id}-error`}
          aria-invalid={!!error}
          aria-required={required}
        >
          {/* Grille des options - Parfaitement alignée */}
          <div className="option-grid option-grid-4 max-w-4xl mx-auto">
            {options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => handleToggle(option)}
                className={cn(
                  'w-full px-4 py-3 sm:px-5 sm:py-4',
                  'bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl',
                  'text-white transition-all duration-200',
                  'flex items-center justify-center min-h-[60px]',
                  'hover:bg-white/20 hover:border-white/30',
                  'focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black/20',
                  safeValue.includes(option) && 'bg-blue-500/20 border-blue-400 text-blue-100 shadow-lg',
                  error && 'border-red-400 focus:ring-red-400'
                )}
                aria-checked={safeValue.includes(option)}
                role="checkbox"
              >
                <span 
                  className="option-text text-sm sm:text-base font-medium leading-tight" 
                  style={{ letterSpacing: '-0.06em' }}
                >
                  {option}
                </span>
              </button>
            ))}
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

          {/* Bouton Suivant - Centré avec espacement optimal */}
          {safeValue.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center"
            >
              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent('form:nextSlide', { detail: { fieldId: id } }))}
                className={cn(
                  'px-8 py-4 bg-white text-black rounded-3xl',
                  'hover:bg-gray-100 active:bg-gray-200',
                  'transition-all duration-200 font-medium text-lg',
                  'shadow-lg hover:shadow-xl transform hover:-translate-y-0.5',
                  'focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black/20'
                )}
                style={{ letterSpacing: '-0.06em' }}
              >
                Suivant
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
