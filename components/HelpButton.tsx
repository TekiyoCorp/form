'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface HelpButtonProps {
  slideId: string;
  onHelpClick?: () => void;
}

// Explications détaillées pour chaque slide
interface SlideHelp {
  title: string;
  description: string;
  examples?: string[];
  tips?: string[];
}

const slideExplanations: Record<string, SlideHelp> = {
  what_are_you_building: {
    title: 'L\'Essence de votre Projet',
    description: 'Prenez le temps de nous raconter votre histoire. Au-delà des simples fonctionnalités, nous cherchons à comprendre l\'âme de votre projet : quelle est votre mission, quel problème résolvez-vous spécifiquement, et pourquoi cela vous tient-il tant à cœur ? Plus vous serez précis sur votre "pourquoi", plus nous pourrons le traduire visuellement.',
    examples: [
      'Exemple : "Une plateforme SaaS qui révolutionne la gestion de trésorerie pour les PME, en rendant la finance accessible et ludique."',
      'Exemple : "Une marque de cosmétiques bio qui milite pour la transparence totale et le zéro déchet, avec une esthétique brute et naturelle."'
    ],
    tips: ['Parlez de votre mission (le "Why")', 'Décrivez votre client idéal', 'Quelle émotion voulez-vous susciter ?']
  },
  brand_in_10_years: {
    title: 'Vision à Long Terme',
    description: 'Projetez-vous loin dans le futur. Cette question est cruciale pour créer une identité intemporelle qui ne se démodera pas dans 6 mois. Imaginez l\'impact culturel, sociétal ou industriel que votre marque aura dans une décennie. Ne vous limitez pas à la croissance financière, voyez grand.',
    examples: [
      'Exemple : "Dans 10 ans, nous serons la référence mondiale de l\'éducation en ligne, avec des campus physiques dans 50 capitales."',
      'Exemple : "Nous aurons changé la façon dont les gens consomment la mode, en normalisant la seconde main comme premier choix."'
    ],
    tips: ['Soyez ambitieux, voire utopique', 'Pensez à l\'héritage que vous voulez laisser', 'Imaginez votre marque comme une icône culturelle']
  },
  digital_inspirations: {
    title: 'Vos Muses Digitales',
    description: 'Partagez les expériences web qui vous ont marqué. Nous ne cherchons pas forcément des concurrents directs, mais des univers dont l\'esthétique, la fluidité ou l\'audace vous parlent. Cela nous donne une direction artistique précieuse pour comprendre vos goûts.',
    examples: [
      'Site A pour son minimalisme radical',
      'Site B pour ses micro-interactions fluides',
      'Site C pour son usage audacieux de la typographie'
    ],
    tips: ['Cherchez hors de votre secteur', 'Notez ce qui vous plaît (couleurs, typo, ambiance)', 'Les sites "Awwwards" sont de bonnes sources']
  },
  what_we_build: {
    title: 'Le Périmètre du Projet',
    description: 'Définissons ensemble l\'envergure technique de votre future plateforme. S\'agit-il de présenter votre marque avec élégance (Présence premium), de vendre des produits (E-commerce), ou de construire un outil complexe (Plateforme) ? Ce choix structure toute notre approche technique.',
    tips: ['Pensez à vos besoins actuels vs futurs', 'Une "Présence premium" est idéale pour l\'image de marque', 'Un "Écosystème complet" inclut souvent mobile + web']
  },
  success_in_90_days: {
    title: 'Impact Immédiat',
    description: 'Quels sont les résultats concrets et mesurables que vous souhaitez célébrer 3 mois après le lancement ? Cela nous aide à concevoir le site non pas comme une œuvre d\'art statique, mais comme un outil de performance au service de vos objectifs business prioritaires.',
    examples: [
      'Exemple : "Avoir généré 500 leads qualifiés pour notre équipe commerciale."',
      'Exemple : "Avoir réalisé 50k€ de ventes directes via le nouveau shop."',
      'Exemple : "Avoir une liste d\'attente de 1000 personnes pour la beta."'
    ],
    tips: ['Soyez chiffré si possible', 'Focalisez-vous sur une métrique clé', 'Pensez conversion et acquisition']
  },
  investment: {
    title: 'Votre Enveloppe Budgétaire',
    description: 'Une fourchette budgétaire réaliste est essentielle pour calibrer nos ambitions. Elle nous permet de vous proposer les solutions techniques et créatives les plus impactantes sans perdre de temps. Nous adapterons toujours la voilure pour maximiser la valeur délivrée.',
    tips: ['Incluez le développement et le design', 'Gardez une marge pour les imprévus']
  },
  deadline: {
    title: 'Horizon Temporel',
    description: 'Le temps est une ressource clé. Une deadline claire nous permet d\'organiser les sprints de production et de définir les priorités. Avez-vous un impératif fort (salon, lancement produit) ou privilégiez-vous la perfection sans contrainte de temps ?',
    tips: ['Comptez 1 mois de marge de sécurité', 'La qualité demande du temps', 'Identifiez vos dates butoirs incompressibles']
  },
  contact_info: {
    title: 'Restons Connectés',
    description: 'C\'est la dernière étape ! Laissez-nous vos coordonnées directes pour que nous puissions analyser vos réponses et revenir vers vous avec une proposition sur-mesure. Nous nous engageons à vous répondre sous 48h.',
    tips: ['Vérifiez votre email', 'Laissez un numéro pour un échange plus fluide', 'Votre projet est entre de bonnes mains']
  }
};

export function HelpButton({ slideId, onHelpClick }: HelpButtonProps): React.JSX.Element {
  const [showButton, setShowButton] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showText, setShowText] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bottomPosition, setBottomPosition] = useState<number>(150); // Valeur par défaut
  const buttonRef = useRef<HTMLDivElement>(null);

  // Position fixe du bouton d'aide à 150px du bas
  useEffect(() => {
    setBottomPosition(150);
  }, [slideId]);


  useEffect(() => {
    // Reset quand on change de slide
    setShowButton(false);
    setIsExpanded(false);
    setShowText(false);

    // Timer de 4 secondes
    const timer = setTimeout(() => {
      // 1. Faire apparaître le bouton (petit cercle)
      setShowButton(true);

      // 2. Après l'animation d'arrivée (600ms), agrandir le bouton
      setTimeout(() => {
        setIsExpanded(true);

        // 3. Une fois agrandi (400ms), afficher le texte en fade in
        setTimeout(() => {
          setShowText(true);
        }, 400);
      }, 600);
    }, 4000);

    return () => {
      clearTimeout(timer);
    };
  }, [slideId]);

  const handleClick = () => {
    setIsModalOpen(true);
    if (onHelpClick) {
      onHelpClick();
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Empêcher le scroll de la page quand le panel est ouvert
  useEffect(() => {
    if (isModalOpen) {
      // Sauvegarder la position de scroll actuelle
      const scrollY = window.scrollY;
      // Empêcher le scroll
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      // Restaurer le scroll
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
  }, [isModalOpen]);

  return (
    <>
      <AnimatePresence>
        {showButton && slideId !== 'contact_info' && (
          <motion.div
            ref={buttonRef}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="fixed z-40"
            style={{
              bottom: `${bottomPosition}px`,
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {/* Bouton qui commence comme cercle puis s'agrandit */}
            <motion.button
              onClick={handleClick}
              className={`
                flex items-center justify-center
                bg-white/20 backdrop-blur-md border-2 border-white/30 rounded-full
                text-white font-medium transition-all duration-300
                hover:bg-white/30 hover:border-white/50
                focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-black/20
                shadow-lg hover:shadow-xl
                overflow-hidden
              `}
              initial={{ width: 40, height: 40, scaleX: 1 }}
              animate={{
                width: isExpanded ? 140 : 40,
                height: 40,
                borderRadius: 20,
                scaleX: isExpanded ? 1 : 1
              }}
              transition={{
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1]
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                letterSpacing: '-0.09em',
                transformOrigin: 'center center'
              }}
            >
              {isExpanded && showText && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="whitespace-nowrap px-3 text-sm"
                >
                  Besoin d'aide ?
                </motion.span>
              )}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Panel d'aide qui slide depuis le bas */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            {/* Overlay avec fond noir */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
              onClick={handleCloseModal}
            />

            {/* Panel qui slide depuis le bas */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-white overflow-hidden flex flex-col"
              style={{ width: '90%', margin: '0 auto', maxHeight: '90vh', borderTopLeftRadius: '36px', borderTopRightRadius: '36px' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Bouton fermer en haut à droite */}
              <button
                onClick={handleCloseModal}
                className="absolute top-6 right-6 p-2 hover:bg-black/10 rounded-full transition-colors z-10"
                aria-label="Fermer"
              >
                <X className="w-6 h-6 text-black" />
              </button>

              {/* Contenu */}
              <div
                className="overflow-y-auto flex-1 px-[50px] md:px-[100px] py-[50px] md:py-[100px] pb-[100px] md:pb-[200px]"
                style={{ minHeight: 0 }}
                onWheel={(e) => {
                  e.stopPropagation();
                }}
                onTouchMove={(e) => {
                  e.stopPropagation();
                }}
              >
                {slideExplanations[slideId] ? (
                  <div className="space-y-6">
                    <div>
                      <h1 className="font-bold text-black mb-3" style={{ fontSize: '36px', letterSpacing: '-0.09em' }}>
                        {slideExplanations[slideId].title}
                      </h1>
                      <p className="text-black/80 leading-relaxed mb-4" style={{ fontSize: '18px', letterSpacing: '-0.09em' }}>
                        {slideExplanations[slideId].description}
                      </p>
                    </div>

                    {slideExplanations[slideId].examples && slideExplanations[slideId].examples!.length > 0 && (
                      <div className="pt-4">
                        <h4 className="font-semibold text-black mb-3" style={{ fontSize: '24px', letterSpacing: '-0.09em' }}>Exemples</h4>
                        <ul className="space-y-3">
                          {slideExplanations[slideId].examples!.map((example, index) => (
                            <li key={index} className="text-black/70 leading-relaxed pl-4 border-l-2 border-black/10" style={{ fontSize: '18px', letterSpacing: '-0.09em' }}>
                              {example}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {slideExplanations[slideId].tips && slideExplanations[slideId].tips!.length > 0 && (
                      <div className="pt-4">
                        <h4 className="font-semibold text-black mb-3" style={{ fontSize: '24px', letterSpacing: '-0.09em' }}>Conseils</h4>
                        <ul className="space-y-2">
                          {slideExplanations[slideId].tips!.map((tip, index) => (
                            <li key={index} className="text-black/70 leading-relaxed flex items-start" style={{ fontSize: '18px', letterSpacing: '-0.09em' }}>
                              <span className="text-black/40 mr-2">•</span>
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <h1 className="font-bold text-black mb-3" style={{ fontSize: '36px', letterSpacing: '-0.09em' }}>Aide</h1>
                    <p className="text-black/80 leading-relaxed" style={{ fontSize: '18px', letterSpacing: '-0.09em' }}>
                      Aucune explication disponible pour cette question.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

