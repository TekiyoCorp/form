'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { InputField } from './FieldBase';
import { cn } from '@/lib/utils';

interface FieldContactProps {
  id: string;
  label: string;
  value?: {
    fullName: string;
    email: string;
    company: string;
    phone: string;
  };
  onChange: (value: { fullName: string; email: string; company: string; phone: string }) => void;
  onBlur?: () => void;
  error?: string;
  required?: boolean;
  className?: string;
}

export function FieldContact({
  id,
  label,
  value = { fullName: '', email: '', company: '', phone: '' },
  onChange,
  onBlur,
  error,
  required = false,
  className
}: FieldContactProps): React.JSX.Element {
  const [localValue, setLocalValue] = useState(value);

  const handleFieldChange = (field: keyof typeof localValue, fieldValue: string) => {
    const newValue = { ...localValue, [field]: fieldValue };
    setLocalValue(newValue);
    onChange(newValue);
  };

  const isFormValid = localValue.fullName.trim() && 
                     localValue.email.trim() && 
                     localValue.company.trim() && 
                     localValue.phone.trim();

  return (
    <div className={cn('w-full', className)}>
      {/* Container principal avec espacement optimisé */}
      <div className="space-y-8">
        
        {/* Formulaire de contact */}
        <div className="space-y-6 max-w-2xl mx-auto">
          {/* Nom complet */}
          <div className="space-y-3">
            <label 
              htmlFor={`${id}-fullName`}
              className="block text-white/90 text-lg font-medium text-left"
              style={{ letterSpacing: '-0.06em' }}
            >
              Nom complet
            </label>
            <InputField
              id={`${id}-fullName`}
              type="text"
              value={localValue.fullName}
              onChange={(e) => handleFieldChange('fullName', e.target.value)}
              onBlur={onBlur}
              placeholder="Votre nom et prénom"
              className="w-full"
              error={false}
            />
          </div>

          {/* Email */}
          <div className="space-y-3">
            <label 
              htmlFor={`${id}-email`}
              className="block text-white/90 text-lg font-medium text-left"
              style={{ letterSpacing: '-0.06em' }}
            >
              Adresse email
            </label>
            <InputField
              id={`${id}-email`}
              type="email"
              value={localValue.email}
              onChange={(e) => handleFieldChange('email', e.target.value)}
              onBlur={onBlur}
              placeholder="votre.email@exemple.com"
              className="w-full"
              error={false}
            />
          </div>

          {/* Entreprise */}
          <div className="space-y-3">
            <label 
              htmlFor={`${id}-company`}
              className="block text-white/90 text-lg font-medium text-left"
              style={{ letterSpacing: '-0.06em' }}
            >
              Entreprise
            </label>
            <InputField
              id={`${id}-company`}
              type="text"
              value={localValue.company}
              onChange={(e) => handleFieldChange('company', e.target.value)}
              onBlur={onBlur}
              placeholder="Nom de votre entreprise"
              className="w-full"
              error={false}
            />
          </div>

          {/* Téléphone */}
          <div className="space-y-3">
            <label 
              htmlFor={`${id}-phone`}
              className="block text-white/90 text-lg font-medium text-left"
              style={{ letterSpacing: '-0.06em' }}
            >
              Numéro de téléphone
            </label>
            <InputField
              id={`${id}-phone`}
              type="tel"
              value={localValue.phone}
              onChange={(e) => handleFieldChange('phone', e.target.value)}
              onBlur={onBlur}
              placeholder="+33 6 12 34 56 78"
              className="w-full"
              error={false}
            />
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
      {isFormValid && (
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
      </div>
    </div>
  );
}
