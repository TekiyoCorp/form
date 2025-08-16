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
      className={cn('h-screen w-full relative overflow-hidden', className)}
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -40, opacity: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      style={{ position: 'relative' }}
    >
      {/* Image de fond avec effets */}
      <div 
        className="absolute inset-0 w-full h-screen"
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
        <div className="flex-1 flex flex-col justify-center items-center">
          <div className="w-full max-w-4xl mx-auto text-center space-y-8">
            {/* Question principale */}
            <h1 
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight text-center max-w-4xl mx-auto" 
              style={{ letterSpacing: '-0.06em' }}
            >
              {slide.label}
            </h1>
            
            {/* Champ de saisie */}
            <div className="w-full">
              {renderField()}
            </div>
          </div>
        </div>
        
        {/* Zone fixe en bas pour les indications et boutons */}
        <div className="pb-24 pt-4">
          <div className="w-full max-w-4xl mx-auto text-center">
            {/* Indication de navigation */}
            <div className="text-white/50 text-sm" style={{ letterSpacing: '-0.06em' }}>
              {slide.type === 'short_text' || slide.type === 'long_text' || slide.type === 'email' ? (
                <div className="hidden sm:block">Appuyez sur Enter pour continuer</div>
              ) : (
                <div className="hidden sm:block">Utilisez le bouton Suivant</div>
              )}
              <div className="sm:hidden">
                {slide.type === 'short_text' || slide.type === 'long_text' || slide.type === 'email' 
                  ? 'Appuyez sur Enter pour continuer' 
                  : 'Utilisez le bouton Suivant'
                }
              </div>
            </div>
          </div>
        </div>
        

      </div>
    </motion.div>
  );
}
