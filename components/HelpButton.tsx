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
  company_intro: {
    title: 'Racontez-nous votre histoire',
    description: 'Cette question nous permet de comprendre votre identité, votre mission et votre public cible. Plus vous êtes précis, mieux nous pourrons créer un site qui vous ressemble vraiment.',
    examples: [
      'Exemple : "Nous sommes une agence créative spécialisée dans l\'art contemporain. Notre mission est de rendre l\'art accessible à tous. Notre public cible : des collectionneurs passionnés et des amateurs d\'art curieux."',
      'Exemple : "Startup tech dans le domaine de la santé mentale. Nous développons des solutions numériques pour accompagner les personnes souffrant d\'anxiété. Notre public : jeunes adultes de 25-35 ans, urbains, sensibles au bien-être."'
    ],
    tips: [
      'Mentionnez votre secteur d\'activité et votre positionnement',
      'Décrivez votre mission ou votre raison d\'être',
      'Précisez qui sont vos clients ou utilisateurs cibles'
    ]
  },
  design_level: {
    title: 'Niveau d\'excellence recherché',
    description: 'Chaque niveau correspond à un degré de personnalisation et de sophistication différent. Cette information guide nos choix créatifs et techniques.',
    examples: [
      'Essentiel maîtrisé : Design épuré, fonctionnel, optimisé pour la performance. Idéal pour un MVP ou un site vitrine simple.',
      'Personnalisé élégant : Design sur-mesure avec animations subtiles, identité visuelle unique. Parfait pour une marque établie.',
      'Signature sur-mesure : Expérience utilisateur exceptionnelle, design innovant, développement avancé. Pour les projets ambitieux.',
      'Pièce d\'exception : Création artistique unique, interactions complexes, développement de pointe. Pour les projets iconiques.'
    ],
    tips: [
      'Considérez votre budget et vos objectifs à long terme',
      'Pensez à l\'évolution future de votre projet',
      'Le niveau choisi impacte le temps de développement'
    ]
  },
  visual_style: {
    title: 'Style visuel qui vous inspire',
    description: 'Le style visuel définit l\'ambiance et l\'émotion que vous souhaitez transmettre. Il guide tous nos choix créatifs.',
    examples: [
      'Minimaliste : Espaces blancs, typographie épurée, couleurs sobres. Exemples : Apple, Muji',
      'Créatif : Couleurs vives, formes organiques, animations dynamiques. Exemples : Stripe, Dropbox',
      'Corporate : Professionnel, structuré, couleurs institutionnelles. Exemples : IBM, Microsoft',
      'Artistique : Expérimental, unique, expression créative libre. Exemples : portfolios d\'artistes'
    ],
    tips: [
      'Vous pouvez combiner plusieurs styles',
      'Pensez à votre secteur d\'activité',
      'Considérez l\'émotion que vous voulez transmettre'
    ]
  },
  design_references: {
    title: 'Références visuelles',
    description: 'Partagez les sites, les univers ou les références qui vous inspirent. Cela nous aide à comprendre vos goûts et vos attentes esthétiques.',
    examples: [
      'URLs de sites web : https://example.com, https://another-site.com',
      'Univers visuels : "L\'univers de Blade Runner", "L\'esthétique japonaise minimaliste"',
      'Références : "Le style de la marque X", "Les couleurs de Y"'
    ],
    tips: [
      'Plus vous partagez de références, mieux c\'est',
      'Expliquez ce qui vous plaît dans chaque référence',
      'Vous pouvez mentionner des références hors web (art, architecture, etc.)'
    ]
  },
  pages_needed: {
    title: 'Pages essentielles',
    description: 'Sélectionnez les pages qui sont essentielles à votre site. Cette information nous permet de structurer votre site et de planifier le développement.',
    examples: [
      'Accueil : La page d\'entrée de votre site, première impression',
      'À propos : Votre histoire, votre équipe, vos valeurs',
      'Offres : Vos services ou produits avec détails et tarifs',
      'Contact : Formulaire de contact, coordonnées, carte'
    ],
    tips: [
      'Commencez par les pages essentielles',
      'Vous pourrez toujours en ajouter plus tard',
      'Chaque page ajoutée impacte le temps de développement'
    ]
  },
  multilingual: {
    title: 'Multilingue',
    description: 'Indiquez si vous souhaitez que votre site soit disponible dans plusieurs langues. Cela impacte la structure, le développement et la maintenance.',
    examples: [
      'Oui : Le site sera disponible en français, anglais, espagnol, etc.',
      'Non : Le site sera uniquement en français'
    ],
    tips: [
      'Le multilingue nécessite une structure de contenu adaptée',
      'Pensez à vos publics cibles internationaux',
      'Cela peut être ajouté progressivement'
    ]
  },
  existing_brand: {
    title: 'Identité visuelle existante',
    description: 'Indiquez si vous avez déjà une identité visuelle définie (logo, couleurs, typographie). Si oui, nous l\'intégrerons dans le design. Si non, nous pourrons vous accompagner dans sa création.',
    examples: [
      'Oui : Vous avez déjà un logo, une charte graphique, des couleurs définies',
      'Non : Vous partez de zéro et souhaitez créer une identité visuelle complète'
    ],
    tips: [
      'Si vous avez une identité, préparez vos fichiers (logo, couleurs, polices)',
      'Si vous n\'en avez pas, nous pouvons créer une identité sur-mesure',
      'Une identité cohérente renforce votre image de marque'
    ]
  },
  logo_needs: {
    title: 'État de votre identité visuelle',
    description: 'Précisez où vous en êtes avec votre identité visuelle. Cela nous permet d\'adapter notre approche et de vous proposer les services adaptés.',
    examples: [
      'Déjà en place : Vous avez tout ce qu\'il faut, nous l\'intégrons simplement',
      'Création logotype : Vous avez besoin d\'un logo uniquement',
      'Refonte logotype : Vous avez un logo mais souhaitez le moderniser',
      'Système complet identité : Vous partez de zéro et voulez une identité complète'
    ],
    tips: [
      'Un système complet inclut logo, couleurs, typographie, iconographie',
      'La refonte peut être une bonne option si votre identité est datée',
      'Nous pouvons créer une identité qui évolue avec votre projet'
    ]
  },
  domain_name: {
    title: 'Nom de domaine',
    description: 'Indiquez si vous possédez déjà votre nom de domaine. Si non, nous pourrons vous aider à en choisir un et à le configurer.',
    examples: [
      'Oui : Vous avez déjà acheté votre nom de domaine (ex: monsite.com)',
      'Non : Vous avez besoin d\'aide pour choisir et acheter un nom de domaine'
    ],
    tips: [
      'Un bon nom de domaine est court, mémorable et reflète votre marque',
      'Évitez les tirets et les chiffres si possible',
      'Nous pouvons vous conseiller sur le choix et la configuration'
    ]
  },
  goal_primary: {
    title: 'Intention stratégique',
    description: 'Résumez en une phrase votre intention stratégique principale pour ce projet. Cette vision guide toutes nos décisions créatives et techniques.',
    examples: [
      'Exemple : "Augmenter les ventes en ligne de 30% en 6 mois"',
      'Exemple : "Améliorer l\'engagement des utilisateurs et réduire le taux de rebond"',
      'Exemple : "Créer une plateforme de référence dans notre secteur"'
    ],
    tips: [
      'Soyez précis et mesurable si possible',
      'Une intention claire guide tous les choix du projet',
      'Pensez à long terme, pas seulement aux objectifs immédiats'
    ]
  },
  kpis: {
    title: 'Indicateurs de succès',
    description: 'Sélectionnez jusqu\'à 3 indicateurs clés de performance que vous souhaitez suivre. Ces KPIs nous aident à mesurer le succès de votre projet et à optimiser continuellement.',
    examples: [
      'Leads qualifiés : Nombre de contacts qualifiés générés par le site',
      'Inscriptions : Nombre d\'inscriptions à votre newsletter ou service',
      'Taux de clic CTA : Pourcentage de clics sur vos boutons d\'action',
      'Chiffre d\'affaires : Revenus générés directement depuis le site'
    ],
    tips: [
      'Choisissez des KPIs alignés avec vos objectifs business',
      '3 KPIs maximum pour rester focalisé',
      'Nous mettrons en place le tracking nécessaire'
    ]
  },
  target_audience: {
    title: 'Audience cible',
    description: 'Décrivez votre audience cible : leurs profils, leurs aspirations, ce qui les guide. Cette information est essentielle pour créer un site qui leur parle vraiment.',
    examples: [
      'Exemple : "Jeunes entrepreneurs de 28-35 ans, ambitieux, sensibles à l\'innovation. Ils cherchent des solutions efficaces et modernes. Leurs aspirations : réussir, avoir un impact positif."',
      'Exemple : "Femmes actives de 35-50 ans, soucieuses de leur bien-être. Elles recherchent du temps pour elles et des solutions pratiques. Leurs valeurs : authenticité, qualité, simplicité."'
    ],
    tips: [
      'Soyez le plus précis possible sur les profils',
      'Mentionnez leurs besoins, leurs frustrations',
      'Décrivez leurs comportements en ligne'
    ]
  },
  scope: {
    title: 'Périmètre fonctionnel',
    description: 'Sélectionnez jusqu\'à 4 éléments qui définissent le périmètre fonctionnel de votre projet. Cela nous permet de planifier le développement et d\'estimer le temps nécessaire.',
    examples: [
      'Vitrine : Site présentant votre activité, vos services, votre équipe',
      'E-commerce : Boutique en ligne avec catalogue produits et paiement',
      'Journal : Blog avec articles, catégories, recherche',
      'Espace privé : Zone réservée aux membres avec authentification'
    ],
    tips: [
      'Commencez par l\'essentiel, vous pourrez étendre plus tard',
      'Chaque fonctionnalité ajoute de la complexité',
      'Pensez à l\'expérience utilisateur finale'
    ]
  },
  integrations: {
    title: 'Écosystème à connecter',
    description: 'Sélectionnez les outils et services que vous souhaitez connecter à votre site. Cela impacte le développement technique et nécessite des API spécifiques.',
    examples: [
      'CRM : HubSpot, Salesforce, Pipedrive pour gérer vos contacts',
      'Analytics : Google Analytics, Mixpanel pour suivre les performances',
      'Paiement : Stripe, PayPal pour les transactions en ligne',
      'Emailing : Mailchimp, Sendinblue pour vos campagnes email'
    ],
    tips: [
      'Les intégrations nécessitent des clés API',
      'Certaines intégrations peuvent être ajoutées après le lancement',
      'Nous vous aiderons à configurer chaque intégration'
    ]
  },
  content_type: {
    title: 'Types de contenus',
    description: 'Sélectionnez jusqu\'à 4 types de contenus qui animeront votre site. Cela nous aide à structurer le site et à planifier la création de contenu.',
    examples: [
      'Articles : Blog, actualités, guides pratiques',
      'Produits : Catalogue produits avec fiches détaillées',
      'Témoignages : Avis clients, cas clients, références',
      'Réalisations : Portfolio, projets réalisés, galerie'
    ],
    tips: [
      'Pensez à la fréquence de mise à jour de chaque type de contenu',
      'Certains contenus nécessitent un CMS adapté',
      'Nous structurerons le site pour faciliter la gestion du contenu'
    ]
  },
  seo_priority: {
    title: 'Visibilité organique',
    description: 'Indiquez l\'importance de la visibilité organique (référencement naturel) pour votre projet. Cela guide notre stratégie SEO et nos choix techniques.',
    examples: [
      '1-2 : Le SEO n\'est pas une priorité, vous avez d\'autres canaux d\'acquisition',
      '3-4 : Le SEO est secondaire mais vous souhaitez une base solide',
      '5-6 : Le SEO est important, vous voulez apparaître dans les résultats de recherche',
      '7 : Le SEO est critique, c\'est votre canal principal d\'acquisition'
    ],
    tips: [
      'Un bon SEO nécessite du contenu de qualité et régulier',
      'La structure technique du site impacte le référencement',
      'Nous optimiserons le site selon votre niveau de priorité'
    ]
  },
  tech_constraints: {
    title: 'Contraintes techniques',
    description: 'Mentionnez toute contrainte technique à respecter (CMS imposé, hébergement spécifique, exigences de sécurité, etc.). Cela impacte nos choix techniques.',
    examples: [
      'CMS imposé : "Nous devons utiliser WordPress pour des raisons internes"',
      'Hébergement : "Le site doit être hébergé sur nos serveurs"',
      'Sécurité : "Conformité RGPD stricte, données sensibles"',
      'Performance : "Temps de chargement critique pour notre activité"'
    ],
    tips: [
      'Mentionnez toutes les contraintes dès le début',
      'Certaines contraintes peuvent impacter les coûts',
      'Nous trouverons toujours une solution adaptée'
    ]
  },
  timeline: {
    title: 'Timeline du projet',
    description: 'Indiquez votre timeline idéale pour le projet. Cela nous permet de planifier le développement et de vous proposer un calendrier réaliste.',
    examples: [
      '1-2 mois : Projet simple ou MVP, développement rapide',
      '3-4 mois : Projet standard avec design sur-mesure',
      '5-6 mois : Projet complexe avec fonctionnalités avancées',
      'Plus de 6 mois : Projet très ambitieux ou développement progressif'
    ],
    tips: [
      'Un projet bien fait prend du temps',
      'Nous pouvons livrer par phases si nécessaire',
      'La qualité prime sur la rapidité'
    ]
  },
  budget_range: {
    title: 'Budget du projet',
    description: 'Indiquez votre budget pour ce projet. Cette information nous permet de vous proposer des solutions adaptées à vos moyens et de prioriser les fonctionnalités.',
    examples: [
      '< 10k€ : Site vitrine simple, design template, fonctionnalités de base',
      '10k€ - 25k€ : Site sur-mesure avec design personnalisé, fonctionnalités avancées',
      '25k€ - 50k€ : Projet complet avec identité visuelle, développement complexe',
      '50k€+ : Projet d\'exception avec expérience utilisateur exceptionnelle'
    ],
    tips: [
      'Un budget clair nous permet de proposer la meilleure solution',
      'Nous pouvons adapter le projet à votre budget',
      'Investir dans la qualité paie sur le long terme'
    ]
  },
  maintenance: {
    title: 'Accompagnement dans la durée',
    description: 'Indiquez si vous souhaitez un accompagnement dans la durée pour la maintenance et les mises à jour de votre site. Cela assure la pérennité de votre projet.',
    examples: [
      'Oui : Vous souhaitez un suivi régulier, des mises à jour, du support',
      'Non : Vous préférez gérer le site vous-même après la livraison'
    ],
    tips: [
      'La maintenance assure la sécurité et les performances',
      'Nous proposons différents niveaux d\'accompagnement',
      'Un site évolue, la maintenance permet de l\'adapter'
    ]
  },
  legal_requirements: {
    title: 'Obligations légales',
    description: 'Sélectionnez les obligations légales ou réglementaires à respecter. Cela impacte le développement et nécessite des fonctionnalités spécifiques.',
    examples: [
      'RGPD : Gestion des données personnelles, consentements, droit à l\'oubli',
      'Accessibilité : Conformité WCAG pour l\'accessibilité web',
      'Normes sectorielles : Exigences spécifiques à votre secteur d\'activité',
      'Certifications : Labels qualité, certifications professionnelles'
    ],
    tips: [
      'Le RGPD est obligatoire pour tous les sites français',
      'L\'accessibilité améliore l\'expérience pour tous',
      'Nous vous aiderons à être conforme'
    ]
  },
  contact_info: {
    title: 'Coordonnées',
    description: 'Renseignez vos coordonnées pour que nous puissions vous contacter et vous envoyer votre devis personnalisé. Vos informations sont confidentielles.',
    examples: [
      'Nom complet : Votre prénom et nom',
      'Email : Une adresse email que vous consultez régulièrement',
      'Entreprise : Le nom de votre entreprise ou organisation',
      'Téléphone : Un numéro où nous pouvons vous joindre'
    ],
    tips: [
      'Vérifiez que vos coordonnées sont correctes',
      'Nous vous contacterons rapidement après votre demande',
      'Vos données sont protégées et ne seront pas partagées'
    ]
  },
  contact_consent: {
    title: 'Consentement de contact',
    description: 'Acceptez d\'être recontacté par la Maison Tekiyo pour la suite du projet. Vos données sont protégées et utilisées uniquement dans le cadre de ce projet.',
    examples: [
      'En acceptant, vous autorisez Tekiyo à vous contacter pour discuter de votre projet',
      'Vous pouvez retirer votre consentement à tout moment',
      'Vos données sont utilisées uniquement pour ce projet'
    ],
    tips: [
      'Ce consentement est nécessaire pour que nous puissions vous contacter',
      'Conforme au RGPD',
      'Vous gardez le contrôle sur vos données'
    ]
  },
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
                letterSpacing: '-0.06em',
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
                      <h1 className="font-bold text-black mb-3" style={{ fontSize: '36px', letterSpacing: '-0.06em' }}>
                        {slideExplanations[slideId].title}
                      </h1>
                      <p className="text-black/80 leading-relaxed mb-4" style={{ fontSize: '18px', letterSpacing: '-0.06em' }}>
                        {slideExplanations[slideId].description}
                      </p>
                    </div>

                    {slideExplanations[slideId].examples && slideExplanations[slideId].examples!.length > 0 && (
                      <div className="pt-4">
                        <h4 className="font-semibold text-black mb-3" style={{ fontSize: '24px', letterSpacing: '-0.06em' }}>Exemples</h4>
                        <ul className="space-y-3">
                          {slideExplanations[slideId].examples!.map((example, index) => (
                            <li key={index} className="text-black/70 leading-relaxed pl-4 border-l-2 border-black/10" style={{ fontSize: '18px', letterSpacing: '-0.06em' }}>
                              {example}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {slideExplanations[slideId].tips && slideExplanations[slideId].tips!.length > 0 && (
                      <div className="pt-4">
                        <h4 className="font-semibold text-black mb-3" style={{ fontSize: '24px', letterSpacing: '-0.06em' }}>Conseils</h4>
                        <ul className="space-y-2">
                          {slideExplanations[slideId].tips!.map((tip, index) => (
                            <li key={index} className="text-black/70 leading-relaxed flex items-start" style={{ fontSize: '18px', letterSpacing: '-0.06em' }}>
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
                    <h1 className="font-bold text-black mb-3" style={{ fontSize: '36px', letterSpacing: '-0.06em' }}>Aide</h1>
                    <p className="text-black/80 leading-relaxed" style={{ fontSize: '18px', letterSpacing: '-0.06em' }}>
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

