'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FieldSelectProps {
  id: string;
  value?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  required?: boolean;
  options: string[];
  className?: string;
}

export function FieldSelect({
  id,
  value,
  onChange,
  onBlur,
  error,
  required,
  options,
  className,
}: FieldSelectProps): React.JSX.Element {
  const [isFocused, setIsFocused] = useState(false);

  const handleSelect = (option: string) => {
    onChange(option);
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
      if (value) {
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
          role="radiogroup"
          aria-labelledby={`${id}-label`}
          aria-describedby={`${id}-help ${id}-error`}
          aria-invalid={!!error}
          aria-required={required}
        >
          {/* Flex container pour centrer les boutons */}
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto overflow-visible">
            {options.map((option, index) => {
              const isDisabled = option === "< 10k€";
              return (
                <motion.button
                  key={option}
                  type="button"
                  onClick={() => !isDisabled && handleSelect(option)}
                  disabled={isDisabled}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.05,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  whileHover={!isDisabled ? { scale: 1.05 } : {}}
                  whileTap={!isDisabled ? { scale: 0.95 } : {}}
                  className={cn(
                    'px-8 py-4',
                    'bg-white/20 backdrop-blur-md rounded-full',
                    'text-white font-medium transition-all duration-200',
                    'flex items-center justify-center',
                    'hover:bg-white/30',
                    'focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-black/20',
                    'shadow-md hover:shadow-lg',
                    'whitespace-nowrap',
                    value === option && 'bg-white text-black shadow-xl scale-105',
                    error && 'focus:ring-red-400',
                    isDisabled && 'opacity-50 cursor-not-allowed bg-gray-500/20 text-gray-400 hover:bg-gray-500/20'
                  )}
                  aria-checked={value === option}
                  role="radio"
                  aria-disabled={isDisabled}
                >
                  <span
                    className="option-text text-sm sm:text-base font-medium leading-tight"
                    style={{ letterSpacing: '-0.09em' }}
                  >
                    {option}
                  </span>
                </motion.button>
              );
            })}
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
