'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { FormData } from '@/lib/types';

interface SimpleConfirmationPageProps {
  formData: FormData;
}

export function SimpleConfirmationPage({ formData }: SimpleConfirmationPageProps) {
  const [isSubmitting, setIsSubmitting] = useState(true);
  const [submitStatus, setSubmitStatus] = useState<'submitting' | 'success' | 'error'>('submitting');

  useEffect(() => {
    // Envoyer automatiquement l'email dès que le composant se monte
    sendFormEmail();
  }, []);

  const sendFormEmail = async () => {
    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formData }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus('success');
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'submitting') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center space-y-8 px-6 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4" style={{ letterSpacing: '-0.06em' }}>
              Envoi en cours...
            </h1>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (submitStatus === 'error') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center space-y-8 px-6 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4" style={{ letterSpacing: '-0.06em' }}>
              Erreur
            </h1>
            <p className="text-xl text-white/70 mb-8" style={{ letterSpacing: '-0.06em' }}>
              Une erreur s'est produite lors de l'envoi
            </p>
            <button
              onClick={sendFormEmail}
              className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors"
            >
              Réessayer
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  // Page de succès simplifiée
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center space-y-8 px-6 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4" style={{ letterSpacing: '-0.06em' }}>
            Merci !
          </h1>
        </motion.div>
      </div>
    </div>
  );
}
