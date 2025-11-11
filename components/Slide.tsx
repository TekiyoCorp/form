'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FieldText } from './fields/FieldText';
import { FieldTextarea } from './fields/FieldTextarea';
import { FieldEmail } from './fields/FieldEmail';
import { FieldSelect } from './fields/FieldSelect';
import { FieldMulti } from './fields/FieldMulti';
import { FieldScale } from './fields/FieldScale';
import { FieldYesNo } from './fields/FieldYesNo';
import { FieldConsent } from './fields/FieldConsent';
import { FieldContact } from './fields/FieldContact';
import { Slide as FormSlide } from '@/lib/types';
import { cn } from '@/lib/utils';

interface SlideProps {
  slide: FormSlide;
  value: any;
  onChange: (value: any) => void;
  onBlur?: () => void;
  error?: string;
  className?: string;
}

export function Slide({ slide, value, onChange, onBlur, error, className }: SlideProps): React.JSX.Element {
  // Vérifier si le champ est valide pour afficher le bouton
  const isFieldValid = () => {
    if (!slide.required) return true;
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === 'boolean') return true;
    if (typeof value === 'object' && value !== null) {
      // Pour FieldContact
      if ('fullName' in value && 'email' in value) {
        return value.fullName?.trim() && value.email?.trim() && value.company?.trim() && value.phone?.trim();
      }
      return true;
    }
    return Boolean(value && value !== '');
  };

  const renderField = () => {
    switch (slide.type) {
      case 'short_text':
        return (
          <FieldText
            id={slide.id}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            error={error}
            required={slide.required}
            maxLength={slide.maxLength}
            placeholder={slide.placeholder}
          />
        );
      
      case 'long_text':
        return (
          <FieldTextarea
            id={slide.id}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            error={error}
            required={slide.required}
            placeholder={slide.placeholder}
          />
        );
      
      case 'email':
        return (
          <FieldEmail
            id={slide.id}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            error={error}
            required={slide.required}
            placeholder={slide.placeholder}
          />
        );
      
      case 'select':
        return (
          <FieldSelect
            id={slide.id}
            options={slide.options || []}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            error={error}
            required={slide.required}
          />
        );
      
      case 'multiselect':
        return (
          <FieldMulti
            id={slide.id}
            options={slide.options || []}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            error={error}
            required={slide.required}
            max={slide.max}
          />
        );
      
      case 'scale':
        return (
          <FieldScale
            id={slide.id}
            label={slide.label}
            min={slide.min || 1}
            max={slide.max || 7}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            error={error}
            required={slide.required}
          />
        );
      
      case 'yes_no':
        return (
          <FieldYesNo
            id={slide.id}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            error={error}
            required={slide.required}
          />
        );
      
      case 'consent':
        return (
          <FieldConsent
            id={slide.id}
            label={slide.label}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            error={error}
            required={slide.required}
          />
        );

      case 'contact':
        return (
          <FieldContact
            id={slide.id}
            label={slide.label}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            error={error}
            required={slide.required}
          />
        );
      
      default:
        return (
          <div className="text-center text-white/70">
            Type de champ non supporté: {slide.type}
          </div>
        );
    }
  };

  return (
    <motion.div
      className={cn('h-screen w-full relative overflow-visible', className)}
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -40, opacity: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      style={{ position: 'relative' }}
    >
      {/* Image de fond avec effets */}
      <div 
        className="absolute inset-0 w-full h-screen overflow-hidden"
        style={{
          backgroundImage: `url(${slide.bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(8px)',
          transform: 'scale(1.2)'
        }}
      />
      
      {/* Overlay noir */}
      <div className="absolute inset-0 bg-black" style={{ opacity: 0.2 }} />
      
      {/* Gradient radial subtil */}
      <div className="absolute inset-0 bg-gradient-radial from-black/10 via-black/5 to-transparent" />
      
      {/* Contenu principal */}
      <div className="relative z-10 flex flex-col h-screen px-4 sm:px-6 lg:px-8">
        {/* Zone centrale pour la question et le champ */}
        <div className="flex-1 flex flex-col justify-center items-center py-8 sm:py-12 min-h-0 overflow-y-auto overflow-x-visible pb-32">
          <div className="w-full max-w-4xl mx-auto text-center space-y-4 sm:space-y-6 overflow-visible">
            {/* Question principale */}
            <motion.h1 
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight text-center max-w-4xl mx-auto drop-shadow-lg" 
              style={{ letterSpacing: '-0.06em' }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {slide.label}
            </motion.h1>
            
            {/* Champ de saisie */}
            <motion.div 
              className="w-full relative z-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              {renderField()}
            </motion.div>
          </div>
        </div>
        
        {/* Zone fixe en bas pour les indications et boutons */}
        <div className="fixed bottom-0 left-0 right-0 pb-8 sm:pb-12 pt-4 z-30 pointer-events-none">
          <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            {/* Bouton Suivant - Toujours en bas */}
            {isFieldValid() && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                  type: "spring",
                  stiffness: 200,
                  damping: 20
                }}
                className="flex justify-center pointer-events-auto"
              >
                <motion.button
                  id="next-button"
                  type="button"
                  onClick={() => window.dispatchEvent(new CustomEvent('form:nextSlide', { detail: { fieldId: slide.id } }))}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    'px-6 py-3 bg-white text-black rounded-full',
                    'hover:bg-gray-100 active:bg-gray-200',
                    'transition-all duration-200 font-semibold text-base',
                    'shadow-xl hover:shadow-2xl',
                    'focus:outline-none focus:ring-4 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-black/20',
                    'min-w-[120px]'
                  )}
                  style={{ letterSpacing: '-0.06em' }}
                >
                  Suivant
                </motion.button>
              </motion.div>
            )}
            
            {/* Indication de navigation */}
            <div className="text-white/60 text-sm drop-shadow-md pointer-events-none" style={{ letterSpacing: '-0.06em' }}>
              {slide.type === 'short_text' || slide.type === 'long_text' || slide.type === 'email' && (
                <div>Appuyez sur Enter pour continuer</div>
              )}
            </div>
          </div>
        </div>
        

      </div>
    </motion.div>
  );
}
