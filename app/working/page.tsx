'use client';

import React, { useState, useEffect } from 'react';

interface Slide {
  id: string;
  type: string;
  label: string;
  placeholder?: string;
  required: boolean;
  bg?: string;
  options?: string[];
  maxLength?: number;
  max?: number;
  min?: number;
}

const formConfig = {
  title: 'Brief Tekiyo',
  slides: [
    {
      id: 'company_intro',
      type: 'long_text',
      label: 'Présentez brièvement votre entreprise et son activité principale.',
      placeholder: 'Mon entreprise...',
      required: true,
      bg: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1920&h=1080&fit=crop',
    },
    {
      id: 'goal_primary',
      type: 'short_text',
      label: 'Objectif principal de la refonte en une phrase.',
      maxLength: 180,
      required: true,
      bg: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&h=1080&fit=crop',
    },
    {
      id: 'kpis',
      type: 'multiselect',
      label: 'KPI prioritaires sur 90 jours',
      options: ['Leads', 'Inscriptions', 'Temps sur page', 'CTR CTA', 'CA', 'Taux de conversion', 'Trafic organique'],
      max: 3,
      required: true,
      bg: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&h=1080&fit=crop',
    },
    {
      id: 'target_audience',
      type: 'long_text',
      label: 'Décrivez votre audience cible principale (âge, métier, comportements).',
      placeholder: 'Notre audience cible...',
      required: true,
      bg: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1920&h=1080&fit=crop',
    },
    {
      id: 'scope',
      type: 'multiselect',
      label: 'Périmètre de la refonte',
      options: ['Site vitrine', 'E-commerce', 'Blog', 'Espace membre', 'Application web', 'Landing pages', 'Intranet'],
      max: 4,
      required: true,
      bg: 'https://images.unsplash.com/photo-1467232004584-a241de8b0aef?w=1920&h=1080&fit=crop',
    },
    {
      id: 'integrations',
      type: 'multiselect',
      label: 'Intégrations techniques nécessaires',
      options: ['CRM', 'Analytics', 'Email marketing', 'Paiement', 'Réseaux sociaux', 'Chat', 'API tierces'],
      max: 5,
      required: false,
      bg: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=1080&fit=crop',
    },
    {
      id: 'content_type',
      type: 'multiselect',
      label: 'Types de contenus à gérer',
      options: ['Articles', 'Produits', 'Témoignages', 'Portfolio', 'FAQ', 'Formulaires', 'Médias'],
      max: 4,
      required: true,
      bg: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1920&h=1080&fit=crop',
    },
    {
      id: 'seo_priority',
      type: 'scale',
      label: 'Priorité SEO sur une échelle de 1 à 7',
      min: 1,
      max: 7,
      required: true,
      bg: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1920&h=1080&fit=crop',
    },
    {
      id: 'tech_constraints',
      type: 'long_text',
      label: 'Contraintes techniques ou technologies imposées ?',
      placeholder: 'Nous devons utiliser...',
      required: false,
      bg: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1920&h=1080&fit=crop',
    },
    {
      id: 'timeline',
      type: 'select',
      label: 'Délai souhaité pour la livraison',
      options: ['1-2 mois', '3-4 mois', '5-6 mois', '6+ mois'],
      required: true,
      bg: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=1920&h=1080&fit=crop',
    },
    {
      id: 'budget_range',
      type: 'select',
      label: 'Fourchette budgétaire',
      options: ['< 10k€', '10k€ - 25k€', '25k€ - 50k€', '50k€ - 100k€', '100k€+'],
      required: true,
      bg: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1920&h=1080&fit=crop',
    },
    {
      id: 'maintenance',
      type: 'yes_no',
      label: 'Souhaitez-vous un contrat de maintenance (TMA) ?',
      required: true,
      bg: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=1080&fit=crop',
    },
    {
      id: 'legal_requirements',
      type: 'multiselect',
      label: 'Exigences légales ou réglementaires',
      options: ['RGPD', 'Accessibilité', 'Normes sectorielles', 'Certifications', 'Aucune'],
      max: 3,
      required: false,
      bg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&h=1080&fit=crop',
    },
    {
      id: 'contact_consent',
      type: 'consent',
      label: 'J\'accepte d\'être contacté par l\'équipe Tekiyo pour la suite de ce projet.',
      required: true,
      bg: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1920&h=1080&fit=crop',
    },
  ] as Slide[],
};

export default function WorkingForm(): React.JSX.Element {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [completedSlides, setCompletedSlides] = useState<Set<number>>(new Set());

  const handleInputChange = (fieldId: string, value: any) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
    
    // Marquer la slide comme complétée si elle a une valeur
    if (value && (Array.isArray(value) ? value.length > 0 : value !== '')) {
      setCompletedSlides(prev => new Set([...prev, currentSlide]));
    }
  };

  const nextSlide = () => {
    if (currentSlide < formConfig.slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
  };

  const currentSlideData = formConfig.slides[currentSlide];
  const progress = ((currentSlide + 1) / formConfig.slides.length) * 100;

  const renderField = () => {
    const value = formData[currentSlideData.id];
    
    switch (currentSlideData.type) {
      case 'short_text':
        return (
          <input
            type="text"
            value={value || ''}
            onChange={(e) => handleInputChange(currentSlideData.id, e.target.value)}
            placeholder={currentSlideData.placeholder}
            maxLength={currentSlideData.maxLength}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
        );
      
      case 'long_text':
        return (
          <textarea
            value={value || ''}
            onChange={(e) => handleInputChange(currentSlideData.id, e.target.value)}
            placeholder={currentSlideData.placeholder}
            maxLength={currentSlideData.maxLength}
            rows={4}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 resize-none"
          />
        );
      
      case 'select':
        return (
          <select
            value={value || ''}
            onChange={(e) => handleInputChange(currentSlideData.id, e.target.value)}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            <option value="">Sélectionner une option</option>
            {currentSlideData.options?.map((option: string) => (
              <option key={option} value={option} className="bg-gray-800 text-white">
                {option}
              </option>
            ))}
          </select>
        );
      
      case 'multiselect':
        const selectedValues = Array.isArray(value) ? value : [];
        return (
          <div className="space-y-2">
            {currentSlideData.options?.map((option: string) => (
              <label key={option} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedValues.includes(option)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      const newValues = [...selectedValues, option];
                      if (!currentSlideData.max || newValues.length <= currentSlideData.max) {
                        handleInputChange(currentSlideData.id, newValues);
                      }
                    } else {
                      handleInputChange(currentSlideData.id, selectedValues.filter(v => v !== option));
                    }
                  }}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-white">{option}</span>
              </label>
            ))}
            {currentSlideData.max && (
              <p className="text-sm text-white/70">
                Maximum {currentSlideData.max} sélection(s)
              </p>
            )}
          </div>
        );
      
      case 'scale':
        const scaleValues = Array.from(
          { length: (currentSlideData.max || 7) - (currentSlideData.min || 1) + 1 }, 
          (_, i) => (currentSlideData.min || 1) + i
        );
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-2">
              {scaleValues.map((scaleValue) => (
                <button
                  key={scaleValue}
                  onClick={() => handleInputChange(currentSlideData.id, scaleValue)}
                  className={`w-12 h-12 rounded-lg border-2 transition-colors ${
                    value === scaleValue
                      ? 'bg-white text-black border-white'
                      : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                  }`}
                >
                  {scaleValue}
                </button>
              ))}
            </div>
            <div className="flex justify-between text-sm text-white/70">
              <span>Très faible</span>
              <span>Très élevé</span>
            </div>
          </div>
        );
      
      case 'yes_no':
        return (
          <div className="flex space-x-4">
            <button
              onClick={() => handleInputChange(currentSlideData.id, true)}
              className={`px-8 py-4 rounded-lg border-2 transition-colors ${
                value === true
                  ? 'bg-white text-black border-white'
                  : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
              }`}
            >
              Oui
            </button>
            <button
              onClick={() => handleInputChange(currentSlideData.id, false)}
              className={`px-8 py-4 rounded-lg border-2 transition-colors ${
                value === false
                  ? 'bg-white text-black border-white'
                  : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
              }`}
            >
              Non
            </button>
          </div>
        );
      
      case 'consent':
        return (
          <div className="space-y-4">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={value || false}
                onChange={(e) => handleInputChange(currentSlideData.id, e.target.checked)}
                className="w-5 h-5 mt-1 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <div className="flex-1">
                <span className="text-white font-medium">{currentSlideData.label}</span>
                <p className="text-sm text-white/70 mt-2">
                  Vos données seront traitées conformément à notre politique de confidentialité. 
                  Vous pouvez retirer votre consentement à tout moment.
                </p>
              </div>
            </label>
          </div>
        );
      
      default:
        return <div className="text-white/70">Type de champ non supporté</div>;
    }
  };

  const canGoNext = () => {
    const currentValue = formData[currentSlideData.id];
    if (!currentSlideData.required) return true;
    
    if (Array.isArray(currentValue)) {
      return currentValue.length > 0;
    }
    return currentValue && currentValue !== '';
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && canGoNext()) {
      nextSlide();
    } else if (e.key === 'ArrowRight' && canGoNext()) {
      nextSlide();
    } else if (e.key === 'ArrowLeft') {
      prevSlide();
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaY) > 50) {
      if (e.deltaY > 0 && canGoNext()) {
        nextSlide();
      } else if (e.deltaY < 0) {
        prevSlide();
      }
    }
  };

  return (
    <div 
      className="min-h-screen bg-black text-white relative overflow-hidden"
      onKeyDown={handleKeyDown}
      onWheel={handleWheel}
      tabIndex={0}
    >
      {/* Image de fond avec overlay */}
      {currentSlideData.bg && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${currentSlideData.bg})` }}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-8"></div>
        </div>
      )}

      {/* Contenu principal */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Barre de progression */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-3">
              <h1 className="text-lg font-semibold">{formConfig.title}</h1>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-white/70">
                  {currentSlide + 1} sur {formConfig.slides.length}
                </span>
                <div className="w-32 bg-white/20 rounded-full h-2">
                  <div 
                    className="bg-white h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation par points (desktop) */}
        <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
          <div className="space-y-2">
            {formConfig.slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide 
                    ? 'bg-white' 
                    : completedSlides.has(index) 
                      ? 'bg-green-400' 
                      : 'bg-white/30'
                }`}
                title={`Question ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Navigation par points (mobile) */}
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 lg:hidden">
          <div className="flex space-x-2">
            {formConfig.slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide 
                    ? 'bg-white' 
                    : completedSlides.has(index) 
                      ? 'bg-green-400' 
                      : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Contenu de la slide */}
        <div className="flex-1 flex items-center justify-center pt-20 px-4">
          <div className="max-w-2xl w-full">
            {/* Question */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">{currentSlideData.label}</h2>
              {currentSlideData.required && (
                <span className="text-red-400 text-sm">* Champs obligatoire</span>
              )}
            </div>

            {/* Champ de saisie */}
            <div className="mb-8">
              {renderField()}
            </div>

            {/* Indicateur de progression */}
            <div className="text-center mb-8">
              <p className="text-sm text-white/70">
                Appuyez sur <kbd className="px-2 py-1 bg-white/20 rounded text-xs">Enter</kbd> pour continuer
              </p>
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              <button
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className="px-6 py-3 bg-white/10 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
              >
                Précédent
              </button>
              
              <button
                onClick={nextSlide}
                disabled={!canGoNext() || currentSlide === formConfig.slides.length - 1}
                className="px-6 py-3 bg-white text-black rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
              >
                {currentSlide === formConfig.slides.length - 1 ? 'Terminer' : 'Suivant'}
              </button>
            </div>
          </div>
        </div>

        {/* HUD du bas */}
        <div className="fixed bottom-6 right-6 z-40">
          <div className="flex space-x-2">
            <button className="p-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors">
              🎵
            </button>
            <button className="p-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors">
              🌙
            </button>
            <button className="p-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors">
              ❓
            </button>
          </div>
        </div>

        {/* Données du formulaire (debug) */}
        <div className="fixed top-20 right-6 z-30 hidden xl:block">
          <div className="p-4 bg-black/80 backdrop-blur-sm rounded-lg max-w-xs">
            <h3 className="text-sm font-semibold mb-2">Debug:</h3>
            <div className="text-xs text-white/70 space-y-1">
              <div>Slide: {currentSlide + 1}/{formConfig.slides.length}</div>
              <div>Complétées: {completedSlides.size}</div>
              <div>Progression: {Math.round(progress)}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
