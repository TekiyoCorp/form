'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FieldScaleProps {
  id: string;
  label: string;
  min: number;
  max: number;
  value?: number;
  onChange: (value: number) => void;
  onBlur?: () => void;
  error?: string;
  required?: boolean;
  className?: string;
}

export function FieldScale({
  id,
  label,
  min,
  max,
  value,
  onChange,
  onBlur,
  error,
  required = false,
  className
}: FieldScaleProps): React.JSX.Element {
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const scaleOptions = Array.from({ length: max - min + 1 }, (_, i) => min + i);

  const handleSelect = (option: number) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    onChange(option);
    
    // Animation de feedback
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleKeyDown = (e: React.KeyboardEvent, option: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSelect(option);
    }
  };

  const getScaleColor = (scaleValue: number): string => {
    if (scaleValue <= 2) return 'from-red-500/20 to-orange-500/20 border-red-400/50';
    if (scaleValue <= 4) return 'from-orange-500/20 to-yellow-500/20 border-orange-400/50';
    if (scaleValue <= 6) return 'from-yellow-500/20 to-green-500/20 border-green-400/50';
    return 'from-green-500/20 to-blue-500/20 border-blue-400/50';
  };

  return (
    <div className={cn('w-full', className)}>
      {/* Container principal avec espacement optimisé */}
      <div className="space-y-8">
        
        {/* Section de l'échelle interactive */}
        <div className="space-y-6">
          {/* Grille des options d'échelle - Interactive et responsive */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-4xl mx-auto overflow-visible">
            {scaleOptions.map((option, index) => {
              const isSelected = value === option;
              const isHovered = hoveredValue === option;
              
              return (
                <motion.button
                  key={option}
                  type="button"
                  onClick={() => handleSelect(option)}
                  onMouseEnter={() => setHoveredValue(option)}
                  onMouseLeave={() => setHoveredValue(null)}
                  onKeyDown={(e) => handleKeyDown(e, option)}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: isSelected ? 1.15 : 1 }}
                  transition={{ 
                    duration: 0.4,
                    delay: index * 0.05,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className={cn(
                    'w-12 h-12 sm:w-14 sm:h-14',
                    'bg-white/20 backdrop-blur-md border-2 border-white/30 rounded-full',
                    'text-white font-medium transition-all duration-200',
                    'flex items-center justify-center',
                    'hover:bg-white/30 hover:border-white/50',
                    'focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-black/20',
                    'shadow-md hover:shadow-lg',
                    isSelected && 'bg-white border-white text-black shadow-xl scale-125',
                    isHovered && !isSelected && 'scale-105',
                    error && 'border-red-400 focus:ring-red-400'
                  )}
                  whileHover={{ scale: isSelected ? 1.25 : 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-checked={isSelected}
                  role="radio"
                >
                  {/* Nombre principal */}
                  <span 
                    className="text-base sm:text-lg font-medium leading-none"
                    style={{ letterSpacing: '-0.06em' }}
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
