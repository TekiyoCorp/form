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
          <div className="relative">
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
                'bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl',
                'text-white placeholder-white/50',
                'transition-all duration-200',
                'hover:bg-white/15 hover:border-white/30',
                'focus:bg-white/20 focus:border-white/40',
                'focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black/20',
                'resize-none',
                error && 'border-red-400 focus:ring-red-400'
              )}
              aria-describedby={`${id}-help ${id}-error`}
              aria-invalid={!!error}
              aria-required={required}
            />
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

          {/* Le bouton Suivant sera rendu dans la zone fixe en bas */}
        </div>
      </div>
      
      {/* Bouton Suivant - Position absolue en bas de l'écran */}
      {value && value.trim() && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-0 left-0 right-0 pb-20 pt-4 z-30"
        >
          <div className="w-full max-w-4xl mx-auto text-center">
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
          </div>
        </motion.div>
      )}
        </div>
      </div>
    </div>
  );
}
