'use client';

import React, { useState, useEffect, useRef } from 'react';
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
import { FieldLinks } from './fields/FieldLinks';
import { Slide as FormSlide } from '@/lib/types';
import { cn } from '@/lib/utils';
import { imagePreloader } from '@/lib/preloadImage';

interface SlideProps {
  slide: FormSlide;
  value: any;
  onChange: (value: any) => void;
  onBlur?: () => void;
  error?: string;
  className?: string;
  isFirstSlide?: boolean;
}

export function Slide({ slide, value, onChange, onBlur, error, className, isFirstSlide = false }: SlideProps): React.JSX.Element {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isCached, setIsCached] = useState(false);
  const imageLoadedRef = useRef<string | null>(null);
  const hasEmittedFirstLoadRef = useRef(false);

  // Charger l'image en utilisant le système de cache
  useEffect(() => {
    if (!slide.bg) {
      setImageLoaded(false);
      setImageError(true);
      return;
    }

    // Vérifier si l'image est déjà en cache
    const cached = imagePreloader.isCached(slide.bg);
    setIsCached(cached);
    
    if (cached) {
      setImageLoaded(true);
      setImageError(false);
      imageLoadedRef.current = slide.bg;
      
      // Si c'est la première slide et qu'on n'a pas encore émis l'événement
      if (isFirstSlide && !hasEmittedFirstLoadRef.current) {
        hasEmittedFirstLoadRef.current = true;
        window.dispatchEvent(new CustomEvent('form:firstImageLoaded'));
      }
      return;
    }

    // Si l'image est en cours de chargement, attendre qu'elle soit chargée
    // Le système de cache appellera onLoad quand c'est prêt

    // Réinitialiser l'état si on change d'image
    if (imageLoadedRef.current !== slide.bg) {
      setImageLoaded(false);
      setImageError(false);
      imageLoadedRef.current = slide.bg;
    }

    // Utiliser le système de préchargement avec cache
    // Toujours charger l'image (même si elle est en cours de préchargement, le cache gère les doublons)
    imagePreloader.preloadImage({
      src: slide.bg,
      priority: isFirstSlide, // Priorité seulement pour la première slide
      onLoad: () => {
        // Vérifier que c'est toujours la même image (évite les race conditions)
        if (imageLoadedRef.current === slide.bg) {
          setImageLoaded(true);
          setImageError(false);
          
          // Si c'est la première slide et qu'on n'a pas encore émis l'événement
          if (isFirstSlide && !hasEmittedFirstLoadRef.current) {
            hasEmittedFirstLoadRef.current = true;
            window.dispatchEvent(new CustomEvent('form:firstImageLoaded'));
          }
        }
      },
      onError: () => {
        // Vérifier que c'est toujours la même image
        if (imageLoadedRef.current === slide.bg) {
          setImageError(true);
          setImageLoaded(false);
        }
      }
    });
  }, [slide.bg, isFirstSlide]);

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

      case 'links':
        return (
          <FieldLinks
            id={slide.id}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            error={error}
            required={slide.required}
            maxLinks={3}
            placeholder="URL"
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
      {slide.bg && (
        <div
          className={cn(
            "absolute inset-0 w-full h-screen overflow-hidden transition-opacity duration-500",
            imageLoaded || isCached ? 'opacity-100' : 'opacity-0'
          )}
          style={{
            backgroundImage: imageError ? 'none' : `url(${slide.bg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: 'blur(8px)',
            transform: 'scale(1.2)'
          }}
        />
      )}


      {/* Overlay noir */}
      <div className="absolute inset-0 bg-black" style={{ opacity: 0.2 }} />

      {/* Gradient radial subtil */}
      <div 
        className="absolute inset-0" 
        style={{
          background: 'radial-gradient(circle at center, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.05) 50%, transparent 100%)'
        }}
      />

      {/* Contenu principal */}
      <div className="relative z-10 flex flex-col h-screen px-4 sm:px-6 lg:px-8">
        {/* Zone centrale pour la question et le champ */}
        <div className={cn(
          "flex-1 flex flex-col items-center py-8 sm:py-12 min-h-0 overflow-x-visible overflow-y-hidden",
          slide.type === 'contact' 
            ? 'justify-start pb-4 sm:pb-32' 
            : 'justify-center pb-32'
        )}
        style={slide.type === 'contact' ? { paddingTop: '150px' } : undefined}
        >
          <div className="w-full max-w-2xl mx-auto text-center space-y-4 sm:space-y-6 overflow-visible">
            {/* Question principale */}
            <motion.h1
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight text-center max-w-2xl mx-auto drop-shadow-lg"
              style={{ letterSpacing: '-0.09em' }}
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
          <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            {/* Bouton Suivant - Toujours en bas (caché pour le formulaire de contact qui a son propre bouton) */}
            {isFieldValid() && slide.type !== 'contact' && (
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
                    'px-4 py-2 bg-white text-black rounded-full',
                    'hover:bg-gray-100 active:bg-gray-200',
                    'transition-all duration-200 font-semibold text-sm',
                    'shadow-lg hover:shadow-xl',
                    'focus:outline-none focus:ring-3 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-black/20',
                    'min-w-[90px]'
                  )}
                  style={{ letterSpacing: '-0.09em' }}
                >
                  Suivant
                </motion.button>
              </motion.div>
            )}

            {/* Indication de navigation */}
            <div className="text-white/60 text-sm drop-shadow-md pointer-events-none" style={{ letterSpacing: '-0.09em' }}>
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
