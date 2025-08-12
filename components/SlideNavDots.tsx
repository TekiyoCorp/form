'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SlideNavDotsProps {
  currentSlide: number;
  totalSlides: number;
  onSlideSelect: (slideIndex: number) => void;
  completedSlides: Set<number>;
  className?: string;
}

export function SlideNavDots({
  currentSlide,
  totalSlides,
  onSlideSelect,
  completedSlides,
  className,
}: SlideNavDotsProps): React.JSX.Element {
  const dots = Array.from({ length: totalSlides }, (_, index) => index);

  return (
    <div className={cn('fixed right-6 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block', className)}>
      <div className="flex flex-col items-center space-y-3">
        {dots.map((slideIndex) => {
          const isCurrent = slideIndex === currentSlide;
          const isCompleted = completedSlides.has(slideIndex);
          const isAccessible = slideIndex <= currentSlide || isCompleted;

          return (
            <motion.button
              key={slideIndex}
              onClick={() => isAccessible && onSlideSelect(slideIndex)}
              className={cn(
                'relative w-4 h-4 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50',
                'hover:scale-125',
                isCurrent && 'bg-white scale-125',
                isCompleted && !isCurrent && 'bg-green-400',
                !isCurrent && !isCompleted && 'bg-white/30',
                !isAccessible && 'opacity-30 cursor-not-allowed'
              )}
              disabled={!isAccessible}
              aria-label={`Aller à la slide ${slideIndex + 1}`}
              whileHover={isAccessible ? { scale: 1.25 } : {}}
              whileTap={isAccessible ? { scale: 0.95 } : {}}
            >
              {/* Indicateur de progression */}
              {isCompleted && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-green-400"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}

              {/* Numéro de la slide */}
              <span className={cn(
                'absolute inset-0 flex items-center justify-center text-xs font-medium',
                isCurrent ? 'text-black' : 'text-white'
              )}>
                {slideIndex + 1}
              </span>

              {/* Tooltip */}
              <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div className="bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  Slide {slideIndex + 1}
                  {isCompleted && ' ✓'}
                </div>
                <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-black/80 border-t-2 border-t-transparent border-b-2 border-b-transparent" />
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Indicateur de progression vertical */}
      <div className="mt-6 w-0.5 h-16 bg-white/20 relative">
        <motion.div
          className="absolute bottom-0 left-0 w-full bg-white/60 rounded-full"
          initial={{ height: 0 }}
          animate={{ height: `${(currentSlide / (totalSlides - 1)) * 100}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

// Version mobile avec navigation horizontale
export function SlideNavDotsMobile({
  currentSlide,
  totalSlides,
  onSlideSelect,
  completedSlides,
  className,
}: SlideNavDotsProps): React.JSX.Element {
  const dots = Array.from({ length: totalSlides }, (_, index) => index);

  return (
    <div className={cn('lg:hidden fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40', className)}>
      <div className="flex items-center space-x-2 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full">
        {dots.map((slideIndex) => {
          const isCurrent = slideIndex === currentSlide;
          const isCompleted = completedSlides.has(slideIndex);
          const isAccessible = slideIndex <= currentSlide || isCompleted;

          return (
            <motion.button
              key={slideIndex}
              onClick={() => isAccessible && onSlideSelect(slideIndex)}
              className={cn(
                'relative w-3 h-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50',
                'hover:scale-125',
                isCurrent && 'bg-white scale-125',
                isCompleted && !isCurrent && 'bg-green-400',
                !isCurrent && !isCompleted && 'bg-white/30',
                !isAccessible && 'opacity-30 cursor-not-allowed'
              )}
              disabled={!isAccessible}
              aria-label={`Aller à la slide ${slideIndex + 1}`}
              whileHover={isAccessible ? { scale: 1.25 } : {}}
              whileTap={isAccessible ? { scale: 0.95 } : {}}
            >
              {isCompleted && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-green-400"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
