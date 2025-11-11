'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Slide } from '@/components/Slide';
import { ProgressBar } from '@/components/ProgressBar';
import { SimpleConfirmationPage } from '@/components/SimpleConfirmationPage';
import { HelpButton } from '@/components/HelpButton';
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
    { id: 'company_intro', type: 'long_text', label: 'Racontez-nous votre histoire. Qui êtes-vous ?', placeholder: 'Votre ADN, votre mission, votre public.', required: true, bg: '/images/xitang2024_submerged_figure_in_transparent_water_with_sunlight__48527044-3166-428c-a18a-cc8c245b4e75.png' },
  
    { id: 'design_level', type: 'select', label: 'Quel niveau d\'excellence recherchez-vous ?', options: ['Essentiel maîtrisé', 'Personnalisé élégant', 'Signature sur-mesure', 'Pièce d\'exception'], required: true, bg: '/images/chasego_An_underwater_scene_with_a_barely-visible_male_swimming_60f6ee1e-317c-4c0c-af2d-aa421cf045ee.png' },
  
    { id: 'visual_style', type: 'select', label: 'Quel style visuel vous inspire le plus ?', options: ['Minimaliste', 'Créatif', 'Corporate', 'Artistique', 'Moderne', 'Classique', 'Playful', 'Sophistiqué'], required: true, bg: '/images/easyted_009_Dark_environmentThe_psychedelic_vortex_gradient_col_c6da4e29-02db-4d33-8648-6bbd3235cacd (1).png' },
  
    { id: 'design_references', type: 'long_text', label: 'Quels sites vous font rêver ?', placeholder: 'Partagez les URLs ou les univers qui vous inspirent...', required: false, bg: '/images/dannysaltaren_Sepia-toned_analog_photo_of_a_human_figure_escapi_827e1975-6808-4fcb-97cc-f7d6f0a0bf51.png' },
  
    { id: 'pages_needed', type: 'multiselect', label: 'Quelles pages sont essentielles à votre univers ?', options: ['Accueil', 'À propos', 'Offres', 'Contact', 'Journal', 'Réalisations', 'FAQ', 'Mentions légales', 'CGV', 'Espace privé'], max: 8, required: true, bg: '/images/cheval.png' },
  
    { id: 'multilingual', type: 'yes_no', label: 'Souhaitez-vous parler plusieurs langues ?', required: true, bg: '/images/easyted_009_Dark_environmentThe_psychedelic_vortex_gradient_col_c6da4e29-02db-4d33-8648-6bbd3235cacd (1).png' },
  
    { id: 'existing_brand', type: 'yes_no', label: 'Avez-vous déjà une identité visuelle définie ?', required: true, bg: '/images/mikereger_ethereal_soul_in_front_of_a_landscape_with_stars_high_4eb101eb-e1c3-44c3-a39a-83d2f78bbeb0.png' },
  
    { id: 'logo_needs', type: 'select', label: 'Où en êtes-vous avec votre identité visuelle ?', options: ['Déjà en place', 'Création logotype', 'Refonte logotype', 'Système complet identité'], required: true, bg: '/images/dannysaltaren_Sepia-toned_analog_photo_of_a_human_figure_escapi_827e1975-6808-4fcb-97cc-f7d6f0a0bf51.png' },
  
    { id: 'domain_name', type: 'yes_no', label: 'Votre nom de domaine est-il déjà le vôtre ?', required: true, bg: '/images/gt267_an_orchidgrowing_from_pond_brilliant_pale_pink_with_prurl_18778f9d-b030-4cfc-ad77-a241cf00ecc3.png' },
  
    { id: 'goal_primary', type: 'short_text', label: 'Intention stratégique en une phrase.', maxLength: 180, required: true, placeholder: '', bg: '/images/chasego_An_underwater_scene_with_a_barely-visible_male_swimming_60f6ee1e-317c-4c0c-af2d-aa421cf045ee.png' },
  
    { id: 'kpis', type: 'multiselect', label: 'Comment mesurerez-vous le succès dans 90 jours ?', options: ['Leads qualifiés', 'Inscriptions', 'Temps de lecture', 'Taux de clic CTA', 'Chiffre d\'affaires', 'Conversion', 'Trafic organique'], max: 3, required: true, bg: '/images/easyted_009_Dark_environmentThe_psychedelic_vortex_gradient_col_c6da4e29-02db-4d33-8648-6bbd3235cacd (1).png' },
  
    { id: 'target_audience', type: 'long_text', label: 'Qui sont les personnes que vous souhaitez toucher ?', placeholder: 'Leurs profils, leurs aspirations, ce qui les guide.', required: true, bg: '/images/mikereger_ethereal_soul_in_front_of_a_landscape_with_stars_high_4eb101eb-e1c3-44c3-a39a-83d2f78bbeb0.png' },
  
    { id: 'scope', type: 'multiselect', label: 'Périmètre fonctionnel.', options: ['Vitrine', 'E-commerce', 'Journal', 'Espace privé', 'Application web', 'Landing pages', 'Intranet'], max: 4, required: true, bg: '/images/dannysaltaren_Sepia-toned_analog_photo_of_a_human_figure_escapi_827e1975-6808-4fcb-97cc-f7d6f0a0bf51.png' },
  
    { id: 'integrations', type: 'multiselect', label: 'Écosystème à connecter.', options: ['CRM', 'Analytics', 'Emailing', 'Paiement', 'Réseaux sociaux', 'Chat', 'API tierces'], max: 5, required: false, bg: '/images/gt267_an_orchidgrowing_from_pond_brilliant_pale_pink_with_prurl_18778f9d-b030-4cfc-ad77-a241cf00ecc3.png' },
  
    { id: 'content_type', type: 'multiselect', label: 'Quels contenus animeront votre site ?', options: ['Articles', 'Produits', 'Témoignages', 'Réalisations', 'FAQ', 'Formulaires', 'Médias'], max: 4, required: true, bg: '/images/xitang2024_submerged_figure_in_transparent_water_with_sunlight__48527044-3166-428c-a18a-cc8c245b4e75.png' },
  
    { id: 'seo_priority', type: 'scale', label: 'À quel point la visibilité organique est-elle importante pour vous ?', min: 1, max: 7, required: true, bg: '/images/cheval.png' },
  
    { id: 'tech_constraints', type: 'long_text', label: 'Y a-t-il des contraintes techniques à respecter ?', placeholder: 'CMS imposé, hébergement spécifique, exigences de sécurité...', required: false, bg: '/images/chasego_An_underwater_scene_with_a_barely-visible_male_swimming_60f6ee1e-317c-4c0c-af2d-aa421cf045ee.png' },
  
    { id: 'timeline', type: 'select', label: 'Quand souhaitez-vous voir votre projet prendre vie ?', options: ['1-2 mois', '3-4 mois', '5-6 mois', 'Plus de 6 mois'], required: true, bg: '/images/easyted_009_Dark_environmentThe_psychedelic_vortex_gradient_col_c6da4e29-02db-4d33-8648-6bbd3235cacd (1).png' },
  
    { id: 'budget_range', type: 'select', label: 'Quel investissement envisagez-vous pour ce projet ?', options: ['< 10k€', '10k€ - 25k€', '25k€ - 50k€', '50k€ - 100k€', '100k€+'], required: true, bg: '/images/mikereger_ethereal_soul_in_front_of_a_landscape_with_stars_high_4eb101eb-e1c3-44c3-a39a-83d2f78bbeb0.png' },
  
    { id: 'maintenance', type: 'yes_no', label: 'Souhaitez-vous un accompagnement dans la durée ?', required: true, bg: '/images/dannysaltaren_Sepia-toned_analog_photo_of_a_human_figure_escapi_827e1975-6808-4fcb-97cc-f7d6f0a0bf51.png' },
  
    { id: 'legal_requirements', type: 'multiselect', label: 'Y a-t-il des obligations légales ou réglementaires à respecter ?', options: ['RGPD', 'Accessibilité', 'Normes sectorielles', 'Certifications', 'Aucune'], max: 3, required: false, bg: '/images/gt267_an_orchidgrowing_from_pond_brilliant_pale_pink_with_prurl_18778f6d-b030-4cfc-ad77-a241cf00ecc3.png' },
  
    { id: 'contact_info', type: 'contact', label: 'Comment pouvons-nous vous joindre ?', required: true, bg: '/images/gamin.png' },
  
    { id: 'contact_consent', type: 'consent', label: "J'accepte d'être recontacté par la Maison Tekiyo pour la suite du projet.", required: true, bg: '/images/xitang2024_submerged_figure_in_transparent_water_with_sunlight__48527044-3166-428c-a18a-cc8c245b4e75.png' },
  ],
};

const STORAGE_KEY_FORM_DATA = 'tekiyo-form-data';
const STORAGE_KEY_CURRENT_SLIDE = 'tekiyo-form-current-slide';

export default function HomePage(): React.JSX.Element {
  // État local simple et fonctionnel
  const [currentSlide, setCurrentSlide] = useState(() => {
    // Restaurer la slide actuelle depuis le localStorage
    if (typeof window !== 'undefined') {
      const savedSlide = localStorage.getItem(STORAGE_KEY_CURRENT_SLIDE);
      return savedSlide ? parseInt(savedSlide, 10) : 0;
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

  const totalSlides = formConfig.slides.length;

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

  const handleFieldBlur = useCallback((fieldId: string) => {}, []);

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

  return (
    <div className="min-h-screen bg-black overflow-x-hidden overflow-y-auto">
      <ProgressBar currentSlide={currentSlide} totalSlides={totalSlides} />

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
