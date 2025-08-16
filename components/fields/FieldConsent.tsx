'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface FieldConsentProps {
  id: string;
  value?: boolean;
  onChange: (value: boolean) => void;
  onBlur?: () => void;
  error?: string;
  required?: boolean;
  label: string;
  className?: string;
}

export function FieldConsent({
  id,
  value = false,
  onChange,
  onBlur,
  error,
  required,
  label,
  className,
}: FieldConsentProps): React.JSX.Element {
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState(!required || value === true);

  useEffect(() => {
    setIsValid(!required || value === true);
  }, [value, required]);

  const handleToggle = () => {
    onChange(!value);
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
      if (isValid) {
        window.dispatchEvent(new CustomEvent('form:nextSlide', { detail: { fieldId: id } }));
      }
    } else if (e.key === ' ') {
      e.preventDefault();
      handleToggle();
    }
  };

  return (
    <div className={cn('w-full', className)}>
      {/* Container principal avec espacement optimisé */}
      <div className="space-y-8">
        
        {/* Section du consentement */}
        <div className="space-y-4">
          <div
            className="p-6 bg-white/5 backdrop-blur-sm border border-white/20 rounded-3xl hover:bg-white/10 transition-all duration-200 max-w-2xl mx-auto"
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="checkbox"
            aria-checked={value}
            aria-describedby={`${id}-help ${id}-error`}
            aria-invalid={!!error}
            aria-required={required}
          >
            {/* Case à cocher et texte "J'accepte..." dans la même div - Alignés à gauche */}
            <div className="flex items-start space-x-6">
              {/* Checkbox personnalisée */}
              <button
                type="button"
                onClick={handleToggle}
                className={cn(
                  'flex-shrink-0 w-8 h-8 rounded-lg border-2 flex items-center justify-center transition-all duration-200',
                  'hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black/20',
                  value 
                    ? 'bg-white border-white shadow-lg' 
                    : 'bg-transparent border-white/30',
                  error && 'border-red-400 focus:ring-red-400'
                )}
                aria-label={value ? 'Décocher' : 'Cocher'}
              >
                {value && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Check className="w-5 h-5 text-black" />
                  </motion.div>
                )}
              </button>

              {/* Texte "J'accepte..." */}
              <div className="w-fit">
                <label
                  htmlFor={id}
                  className="block text-white/90 text-lg font-medium cursor-pointer leading-relaxed text-left"
                  onClick={handleToggle}
                  style={{ letterSpacing: '-0.06em' }}
                >
                  {label}
                  {required && <span className="text-red-400 ml-1">*</span>}
                </label>
              </div>
            </div>
            
            {/* Description du consentement - Alignée à gauche */}
            <div className="mt-4 ml-14">
              <p className="text-white/60 text-sm leading-relaxed text-left" style={{ letterSpacing: '-0.06em' }}>
                En cochant cette case, vous acceptez que vos données soient traitées conformément à notre politique de confidentialité et aux exigences du RGPD.
              </p>
            </div>
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
      {value && (
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
  );
}
