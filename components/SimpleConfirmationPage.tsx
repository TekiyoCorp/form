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
  const [errorMessage, setErrorMessage] = useState<string>('');

  const sendFormEmail = async () => {
    try {
      console.log('📤 Envoi du formulaire...', formData);
      console.log('📋 Contact info:', formData.contact_info);
      
      // Vérifier que les données sont valides avant l'envoi
      if (!formData.contact_info || typeof formData.contact_info !== 'object') {
        const errorMsg = 'Informations de contact manquantes ou invalides';
        console.error('❌', errorMsg);
        setErrorMessage(errorMsg);
        setSubmitStatus('error');
        setIsSubmitting(false);
        return;
      }
      
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formData }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Erreur inconnue du serveur' }));
        const errorMsg = errorData.error || errorData.details || `Erreur HTTP ${response.status}`;
        console.error('❌ Erreur HTTP:', response.status, errorData);
        setErrorMessage(errorMsg);
        setSubmitStatus('error');
        setIsSubmitting(false);
        return;
      }

      const result = await response.json();
      console.log('📥 Réponse du serveur:', result);

      if (result.success) {
        // Nettoyer le localStorage après une soumission réussie
        if (typeof window !== 'undefined') {
          localStorage.removeItem('tekiyo-form-data');
          localStorage.removeItem('tekiyo-form-current-slide');
        }
        setSubmitStatus('success');
      } else {
        const errorMsg = result.error || result.details || 'Erreur lors de l\'envoi';
        console.error('❌ Erreur dans la réponse:', result);
        setErrorMessage(errorMsg);
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('❌ Erreur lors de l\'envoi:', error);
      let errorMsg = 'Erreur de connexion au serveur';
      if (error instanceof Error) {
        console.error('❌ Message:', error.message);
        console.error('❌ Stack:', error.stack);
        errorMsg = error.message || errorMsg;
      }
      setErrorMessage(errorMsg);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    // Envoyer automatiquement l'email dès que le composant se monte
    sendFormEmail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (submitStatus === 'submitting') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center space-y-8 px-6 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-bold text-white mb-4" style={{ fontSize: '24px', letterSpacing: '-0.06em', opacity: 0.5 }}>
              Envoi en cours...
            </h1>
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
            <p className="text-xl text-white/70 mb-4" style={{ letterSpacing: '-0.06em' }}>
              Une erreur s'est produite lors de l'envoi
            </p>
            {errorMessage && (
              <p className="text-lg text-red-400 mb-8 px-4 py-2 bg-red-900/20 rounded-lg border border-red-500/30" style={{ letterSpacing: '-0.06em' }}>
                {errorMessage}
              </p>
            )}
            <button
              onClick={() => {
                setIsSubmitting(true);
                setSubmitStatus('submitting');
                setErrorMessage('');
                sendFormEmail();
              }}
              className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-white/90 transition-colors"
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
          <h1 className="font-bold text-white mb-4" style={{ fontSize: '24px', letterSpacing: '-0.06em' }}>
            Merci !
          </h1>
        </motion.div>
      </div>
    </div>
  );
}
