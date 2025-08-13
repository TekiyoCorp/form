'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Mail, AlertCircle, Loader2 } from 'lucide-react';
import type { FormData } from '@/lib/types';

interface ConfirmationPageProps {
  formData: FormData;
}

export function ConfirmationPage({ formData }: ConfirmationPageProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

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
        setErrorMessage(result.error || 'Erreur lors de la soumission');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Erreur de connexion au serveur');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center space-y-8 px-6 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="flex justify-center">
              <CheckCircle className="w-20 h-20 text-green-500" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4" style={{ letterSpacing: '-0.06em' }}>
              Parfait !
            </h1>
            <p className="text-xl text-white/70 mb-8" style={{ letterSpacing: '-0.06em' }}>
              Votre brief a été envoyé avec succès à l'équipe Tekiyo
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <Mail className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <p className="text-white/80">
                Nous vous recontacterons très prochainement sur{' '}
                <span className="text-blue-400 font-semibold">
                  {formData.contact_info && typeof formData.contact_info === 'object' 
                    ? (formData.contact_info as any).email 
                    : 'votre email'}
                </span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center space-y-8 px-6 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4" style={{ letterSpacing: '-0.06em' }}>
            Récapitulatif
          </h1>
          <p className="text-xl text-white/70 mb-8" style={{ letterSpacing: '-0.06em' }}>
            Vérifiez vos réponses avant l'envoi
          </p>

          {/* Aperçu des réponses principales */}
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/20 text-left max-h-96 overflow-y-auto">
            <h3 className="text-lg font-semibold text-white mb-4">Aperçu de votre brief</h3>
            <div className="space-y-3 text-sm">
              {formData.company_intro && (
                <div>
                  <span className="text-white/60">Entreprise:</span>
                  <p className="text-white/90 ml-2">{String(formData.company_intro).substring(0, 100)}...</p>
                </div>
              )}
              {formData.design_level && (
                <div>
                  <span className="text-white/60">Niveau de finition:</span>
                  <p className="text-white/90 ml-2">{String(formData.design_level)}</p>
                </div>
              )}
              {formData.budget_range && (
                <div>
                  <span className="text-white/60">Budget:</span>
                  <p className="text-white/90 ml-2">{String(formData.budget_range)}</p>
                </div>
              )}
              {formData.timeline && (
                <div>
                  <span className="text-white/60">Délai:</span>
                  <p className="text-white/90 ml-2">{String(formData.timeline)}</p>
                </div>
              )}
            </div>
          </div>

          {/* Bouton de soumission */}
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-white text-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 mx-auto"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Envoi en cours...</span>
              </>
            ) : (
              <>
                <Mail className="w-5 h-5" />
                <span>Envoyer le brief à Tekiyo</span>
              </>
            )}
          </button>

          {/* Message d'erreur */}
          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-red-300"
            >
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5" />
                <span>{errorMessage}</span>
              </div>
            </motion.div>
          )}

          <p className="text-white/50 text-sm">
            En cliquant sur "Envoyer", vous acceptez que vos informations soient transmises à l'équipe Tekiyo
          </p>
        </motion.div>
      </div>
    </div>
  );
}
