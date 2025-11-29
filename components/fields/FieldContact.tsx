'use client';

import React, { useState, useEffect } from 'react';
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

  // Synchroniser localValue avec value si value change de l'extérieur
  useEffect(() => {
    if (value) {
      setLocalValue(value);
    }
  }, [value]);

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
        <div className="space-y-6 max-w-xl mx-auto">
          {/* Nom complet */}
          <motion.div 
            className="space-y-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <label 
              htmlFor={`${id}-fullName`}
              className="block text-white/90 text-lg font-medium text-left"
              style={{ letterSpacing: '-0.09em' }}
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
          </motion.div>

          {/* Email */}
          <motion.div 
            className="space-y-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <label 
              htmlFor={`${id}-email`}
              className="block text-white/90 text-lg font-medium text-left"
              style={{ letterSpacing: '-0.09em' }}
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
          </motion.div>

          {/* Entreprise */}
          <motion.div 
            className="space-y-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <label 
              htmlFor={`${id}-company`}
              className="block text-white/90 text-lg font-medium text-left"
              style={{ letterSpacing: '-0.09em' }}
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
          </motion.div>

          {/* Téléphone */}
          <motion.div 
            className="space-y-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <label 
              htmlFor={`${id}-phone`}
              className="block text-white/90 text-lg font-medium text-left"
              style={{ letterSpacing: '-0.09em' }}
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
          </motion.div>
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
              style={{ letterSpacing: '-0.09em' }}
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

        </div>
      </div>
    </div>
  );
}
