'use client';

import React, { useState } from 'react';

export default function SimpleForm(): React.JSX.Element {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({});

  const slides = [
    {
      id: 'company_intro',
      type: 'text',
      label: 'Présentez brièvement votre entreprise et son activité principale.',
      placeholder: 'Mon entreprise...',
      required: true,
    },
    {
      id: 'goal_primary',
      type: 'text',
      label: 'Objectif principal de la refonte en une phrase.',
      placeholder: 'Notre objectif...',
      required: true,
    },
    {
      id: 'kpis',
      type: 'select',
      label: 'KPI prioritaires sur 90 jours',
      options: ['Leads', 'Inscriptions', 'Temps sur page', 'CTR CTA', 'CA', 'Taux de conversion', 'Trafic organique'],
      required: true,
    },
  ];

  const handleInputChange = (fieldId: string, value: any) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
  };

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  const currentSlideData = slides[currentSlide];

  const renderField = () => {
    switch (currentSlideData.type) {
      case 'text':
        return (
          <input
            type="text"
            value={formData[currentSlideData.id] || ''}
            onChange={(e) => handleInputChange(currentSlideData.id, e.target.value)}
            placeholder={currentSlideData.placeholder}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
        );
      case 'select':
        return (
          <select
            value={formData[currentSlideData.id] || ''}
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
      default:
        return <div>Type de champ non supporté</div>;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="max-w-2xl w-full mx-4">
        {/* Barre de progression */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-white/70">Question {currentSlide + 1} sur {slides.length}</span>
            <span className="text-sm text-white/70">{Math.round(((currentSlide + 1) / slides.length) * 100)}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div 
              className="bg-white h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
            />
          </div>
        </div>

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
            disabled={currentSlide === slides.length - 1}
            className="px-6 py-3 bg-white text-black rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
          >
            {currentSlide === slides.length - 1 ? 'Terminer' : 'Suivant'}
          </button>
        </div>

        {/* Données du formulaire (debug) */}
        <div className="mt-8 p-4 bg-white/5 rounded-lg">
          <h3 className="text-sm font-semibold mb-2">Données du formulaire (debug):</h3>
          <pre className="text-xs text-white/70 overflow-auto">
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>

        {/* Navigation rapide */}
        <div className="mt-4 flex justify-center space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
