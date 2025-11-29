'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Slide } from '@/components/Slide';
import { SimpleConfirmationPage } from '@/components/SimpleConfirmationPage';
import { HelpButton } from '@/components/HelpButton';
import { Logo } from '@/components/Logo';
import { useImagePreloader, imagePreloader } from '@/lib/preloadImage';
import type { FormConfig } from '@/lib/types';

// Configuration du formulaire (en production, ceci viendrait d'une API)
const formConfig: FormConfig = {
  title: 'Brief Tekiyo',
  theme: {
    mode: 'dark',
    primary: '#FFFFFF',
    overlayOpacity: 0.35,
  },
  slides: [
    {
      id: 'what_are_you_building',
      type: 'long_text',
      label: 'Qu\'êtes-vous en train de bâtir ?',
      placeholder: 'Décrivez votre projet, votre vision, ce que vous créez...',
      required: true,
      bg: '/images/xitang2024_submerged_figure_in_transparent_water_with_sunlight__48527044-3166-428c-a18a-cc8c245b4e75.png'
    },

    {
      id: 'brand_in_10_years',
      type: 'long_text',
      label: 'Si votre marque existe encore dans 10 ans, qu\'aura-t-elle changé ?',
      placeholder: 'Quelle transformation souhaitez-vous voir ?',
      required: true,
      bg: '/images/chasego_An_underwater_scene_with_a_barely-visible_male_swimming_60f6ee1e-317c-4c0c-af2d-aa421cf045ee.png'
    },

    {
      id: 'digital_inspirations',
      type: 'links',
      label: 'Montrez-nous 3 univers digitaux qui vous inspirent.',
      placeholder: 'URL',
      required: true,
      bg: '/images/easyted_009_Dark_environmentThe_psychedelic_vortex_gradient_col_c6da4e29-02db-4d33-8648-6bbd3235cacd (1).png'
    },

    {
      id: 'what_we_build',
      type: 'multiselect',
      label: 'Ce que nous construisons :',
      options: ['Présence premium', 'E-commerce', 'Plateforme', 'Écosystème complet'],
      required: true,
      bg: '/images/dannysaltaren_Sepia-toned_analog_photo_of_a_human_figure_escapi_827e1975-6808-4fcb-97cc-f7d6f0a0bf51.png'
    },

    {
      id: 'success_in_90_days',
      type: 'long_text',
      label: 'Si c\'est une réussite, que se passe-t-il dans 90 jours ?',
      placeholder: 'Décrivez le résultat concret que vous souhaitez atteindre...',
      required: true,
      bg: '/images/mikereger_ethereal_soul_in_front_of_a_landscape_with_stars_high_4eb101eb-e1c3-44c3-a39a-83d2f78bbeb0.png'
    },

    {
      id: 'investment',
      type: 'select',
      label: 'Investissement :',
      options: ['5-25k€', '25-50k€', '50-100k€', '100k€+'],
      required: true,
      bg: '/images/gt267_an_orchidgrowing_from_pond_brilliant_pale_pink_with_prurl_18778f9d-c030-4cfc-ad77-a241cf00ecc3.png'
    },

    {
      id: 'deadline',
      type: 'select',
      label: 'Deadline :',
      options: ['1-2 mois', '3-4 mois', 'Flexible'],
      required: true,
      bg: '/images/cheval.png'
    },

    {
      id: 'contact_info',
      type: 'contact',
      label: 'Contact',
      required: true,
      bg: '/images/gamin.png'
    },
  ],
};

const STORAGE_KEY_FORM_DATA = 'tekiyo-form-data';
const STORAGE_KEY_CURRENT_SLIDE = 'tekiyo-form-current-slide';

export default function HomePage(): React.JSX.Element {
  // Préchargeur d'images
  const { preloadImage, preloadNextSlides } = useImagePreloader();

  // État local simple et fonctionnel
  const [currentSlide, setCurrentSlide] = useState(() => {
    // Restaurer la slide actuelle depuis le localStorage
    if (typeof window !== 'undefined') {
      const savedSlide = localStorage.getItem(STORAGE_KEY_CURRENT_SLIDE);
      if (savedSlide) {
        const parsed = parseInt(savedSlide, 10);
        // Vérification de sécurité : s'assurer que l'index est valide
        if (!isNaN(parsed) && parsed >= 0 && parsed < formConfig.slides.length) {
          return parsed;
        }
      }
    }
    return 0;
  });
  const [formData, setFormData] = useState<Record<string, any>>(() => {
    // Restaurer les données du formulaire depuis le localStorage
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem(STORAGE_KEY_FORM_DATA);
      if (savedData) {
        try {
          return JSON.parse(savedData);
        } catch (e) {
          console.error('Erreur lors de la restauration des données:', e);
        }
      }
    }
    return {};
  });
  const [completedSlides, setCompletedSlides] = useState<Set<number>>(() => {
    // Restaurer les slides complétées depuis les données sauvegardées
    const savedData = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY_FORM_DATA) : null;
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        const completed = new Set<number>();
        formConfig.slides.forEach((slide, index) => {
          const value = data[slide.id];
          if (value && (Array.isArray(value) ? value.length > 0 : value !== '')) {
            completed.add(index);
          }
        });
        return completed;
      } catch (e) {
        return new Set();
      }
    }
    return new Set();
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isExporting, setIsExporting] = useState(false);
  const [imageLoading, setImageLoading] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);

  const totalSlides = formConfig.slides.length;

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Image preloading is now handled by Slide.tsx component
  // Removed duplicate preloading logic to prevent infinite loops

  // Background preloading of next slides - disabled to prevent conflicts
  // Slide.tsx handles image loading for the current slide

  // Sauvegarder les données dans le localStorage à chaque changement
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY_FORM_DATA, JSON.stringify(formData));
    }
  }, [formData]);

  // Sauvegarder la slide actuelle dans le localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY_CURRENT_SLIDE, currentSlide.toString());
    }
  }, [currentSlide]);

  // Changements de champs
  const handleFieldChange = useCallback((fieldId: string, value: any) => {
    setFormData(prev => {
      const newData = { ...prev, [fieldId]: value };
      // Sauvegarder immédiatement dans le localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY_FORM_DATA, JSON.stringify(newData));
      }
      return newData;
    });
    if (value && (Array.isArray(value) ? value.length > 0 : value !== '')) {
      setCompletedSlides(prev => {
        const newSet = new Set(prev);
        newSet.add(currentSlide);
        return newSet;
      });
    }
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[fieldId];
      return newErrors;
    });
  }, [currentSlide]);

  const handleFieldBlur = useCallback((fieldId: string) => { }, []);

  // Navigation
  const nextSlide = useCallback(() => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(prev => {
        const newSlide = prev + 1;
        // Sauvegarder immédiatement dans le localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem(STORAGE_KEY_CURRENT_SLIDE, newSlide.toString());
        }
        return newSlide;
      });
    }
  }, [currentSlide, totalSlides]);

  const previousSlide = useCallback(() => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => {
        const newSlide = prev - 1;
        // Sauvegarder immédiatement dans le localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem(STORAGE_KEY_CURRENT_SLIDE, newSlide.toString());
        }
        return newSlide;
      });
    }
  }, [currentSlide]);

  const goToSlide = useCallback((slideIndex: number) => {
    setCurrentSlide(slideIndex);
    // Sauvegarder immédiatement dans le localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY_CURRENT_SLIDE, slideIndex.toString());
    }
  }, []);

  const canGoNext = useCallback(() => {
    const slide = formConfig.slides[currentSlide];
    const value = formData[slide.id];
    if (!slide.required) return true;
    if (Array.isArray(value)) return value.length > 0;
    // Pour les champs booléens (yes/no), accepter true ET false
    if (typeof value === 'boolean') return true;
    return Boolean(value && value !== '');
  }, [currentSlide, formData]);

  const canGoPrevious = useCallback(() => currentSlide > 0, [currentSlide]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') return;
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
      e.preventDefault();
      if (canGoNext()) nextSlide();
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault();
      if (canGoPrevious()) previousSlide();
    }
  }, [canGoNext, canGoPrevious, nextSlide, previousSlide]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    // Écouteur pour l'événement personnalisé form:nextSlide
    const handleNextSlide = () => {
      if (canGoNext()) {
        nextSlide();
      }
    };

    window.addEventListener('form:nextSlide', handleNextSlide);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('form:nextSlide', handleNextSlide);
    };
  }, [handleKeyDown, canGoNext, nextSlide]);

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    if (Math.abs(e.deltaY) > 40) {
      if (e.deltaY > 0 && canGoNext()) {
        nextSlide();
      } else if (e.deltaY < 0 && canGoPrevious()) {
        previousSlide();
      }
    }
  }, [canGoNext, canGoPrevious, nextSlide, previousSlide]);

  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel as EventListener);
  }, [handleWheel]);

  // Vérifier si le formulaire est complet
  const isFormComplete = useCallback(() => {
    return formConfig.slides.every(slide => {
      if (!slide.required) return true;
      const value = formData[slide.id];

      // Pour les tableaux (multiselect)
      if (Array.isArray(value)) return value.length > 0;

      // Pour les champs booléens (yes/no, consent), accepter true ET false
      if (typeof value === 'boolean') return true;

      // Pour les objets (FieldContact)
      if (typeof value === 'object' && value !== null) {
        if ('fullName' in value && 'email' in value) {
          // Validation du champ contact_info
          const contact = value as { fullName?: string; email?: string; company?: string; phone?: string };
          return Boolean(
            contact.fullName?.trim() &&
            contact.email?.trim() &&
            contact.company?.trim() &&
            contact.phone?.trim()
          );
        }
        return true;
      }

      // Pour les chaînes de caractères
      return Boolean(value && value !== '');
    });
  }, [formData]);

  // Afficher la page de confirmation si le formulaire est complet
  if (isFormComplete()) {
    return <SimpleConfirmationPage formData={formData} />;
  }

  // Prevent hydration mismatch - don't render until mounted
  if (!mounted) {
    return <div className="min-h-screen bg-black" />;
  }

  return (
    <div className="min-h-screen bg-black overflow-x-hidden overflow-y-auto">
      <Logo />
      <div className="relative overflow-visible">
        <AnimatePresence mode="wait">
          <Slide
            key={formConfig.slides[currentSlide].id}
            slide={formConfig.slides[currentSlide] as any}
            value={formData[formConfig.slides[currentSlide].id]}
            onChange={(value: any) => handleFieldChange(formConfig.slides[currentSlide].id, value)}
            onBlur={() => handleFieldBlur(formConfig.slides[currentSlide].id)}
            error={errors[formConfig.slides[currentSlide].id]}
          />
        </AnimatePresence>
      </div>

      {/* Bouton d'aide */}
      <HelpButton
        slideId={formConfig.slides[currentSlide].id}
        onHelpClick={() => {
          // Ici vous pouvez ajouter une action d'aide (modal, etc.)
          console.log('Aide demandée pour:', formConfig.slides[currentSlide].id);
        }}
      />

      {isExporting && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-black/80 backdrop-blur-sm border border-white/20 rounded-lg px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
            <span className="text-white">Génération du PDF...</span>
          </div>
        </div>
      )}
    </div>
  );
}
