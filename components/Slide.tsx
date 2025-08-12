'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FieldText } from './fields/FieldText';
import { FieldTextarea } from './fields/FieldTextarea';
import { FieldEmail } from './fields/FieldEmail';
import { FieldSelect } from './fields/FieldSelect';
import { FieldMulti } from './fields/FieldMulti';
import { FieldYesNo } from './fields/FieldYesNo';
import { FieldScale } from './fields/FieldScale';
import { FieldDate } from './fields/FieldDate';
import { FieldUpload } from './fields/FieldUpload';
import { FieldConsent } from './fields/FieldConsent';
import { cn } from '@/lib/utils';

interface SlideProps {
  slide: any;
  slideIndex: number;
  totalSlides: number;
  value: any;
  onChange: (value: any) => void;
  onBlur?: () => void;
  error?: string;
  className?: string;
}

export function Slide({
  slide,
  slideIndex,
  totalSlides,
  value,
  onChange,
  onBlur,
  error,
  className,
}: SlideProps): React.JSX.Element {
  const renderField = () => {
    const commonProps = {
      id: slide.id,
      value,
      onChange,
      onBlur,
      error,
      required: slide.required,
    };

    switch (slide.type) {
      case 'short_text':
        return <FieldText {...commonProps} maxLength={slide.maxLength} placeholder={slide.placeholder} />;
      case 'long_text':
        return <FieldTextarea {...commonProps} placeholder={slide.placeholder} />;
      case 'email':
        return <FieldEmail {...commonProps} />;
      case 'select':
        return <FieldSelect {...commonProps} options={slide.options} />;
      case 'multiselect':
        return <FieldMulti {...commonProps} options={slide.options} />;
      case 'yes_no':
        return <FieldYesNo {...commonProps} />;
      case 'scale':
        return <FieldScale {...commonProps} min={slide.min} max={slide.max} />;
      case 'date':
        return <FieldDate {...commonProps} />;
      case 'file_upload':
        return <FieldUpload {...commonProps} multiple={slide.multiple} accept={slide.accept} maxSize={slide.maxSize} />;
      case 'consent':
        return <FieldConsent {...commonProps} label={slide.label} />;
      default:
        return <div>Type de champ non supporté: {slide.type}</div>;
    }
  };

  // Détermine si le champ a une zone de texte (où Enter est pertinent)
  const hasTextInput = ['short_text', 'long_text', 'email'].includes(slide.type);

  return (
    <motion.div
      className={cn('min-h-screen w-full relative overflow-hidden', className)}
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -40, opacity: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      {/* Image de fond avec effets */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${slide.bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(8px)',
        }}
        animate={{ scale: 1.2 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Overlay noir */}
      <div className="absolute inset-0 bg-black" style={{ opacity: 0.2 }} />
      
      {/* Overlay radial */}
      <div className="absolute inset-0 bg-gradient-radial from-black/10 via-black/5 to-transparent" />

      {/* Contenu */}
      <div className="relative z-10 flex flex-col justify-center items-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl mx-auto text-center space-y-8">
          {/* Question */}
          <motion.h1
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight"
            style={{ letterSpacing: '-0.06em' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            {slide.label}
          </motion.h1>

          {/* Champ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="w-full"
          >
            {renderField()}
          </motion.div>

          {/* Indication de navigation - Conditionnelle sur mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="text-white/50 text-sm"
            style={{ letterSpacing: '-0.06em' }}
          >
            {/* Affiche le message uniquement sur desktop ou pour les champs de texte */}
            <div className="hidden sm:block">
              Appuyez sur Enter pour continuer
            </div>
            {/* Sur mobile, affiche le message uniquement pour les champs de texte */}
            <div className="sm:hidden">
              {hasTextInput ? 'Appuyez sur Enter pour continuer' : 'Utilisez le bouton Suivant'}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
