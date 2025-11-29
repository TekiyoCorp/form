# Plan d'implémentation - Mise à jour des Panels d'Aide

## 🎯 Objectif
Mettre à jour le contenu des panels d'aide (`components/HelpButton.tsx`) pour qu'ils correspondent aux questions actuelles du formulaire (`app/page.tsx`). Actuellement, les IDs ne correspondent pas, ce qui empêche l'affichage de l'aide.

## 📝 Changements Proposés

### `components/HelpButton.tsx`

Remplacer l'objet `slideExplanations` par le contenu suivant, aligné sur les IDs de `app/page.tsx` :

#### IDs à traiter :
1.  `what_are_you_building`
2.  `brand_in_10_years`
3.  `digital_inspirations`
4.  `what_we_build`
5.  `success_in_90_days`
6.  `investment`
7.  `deadline`
8.  `contact_info`

#### Contenu proposé (Version Enrichie) :

```typescript
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
    tips: ['Incluez le développement et le design', 'Gardez une marge pour les imprévus', 'Voyez cela comme un investissement, pas un coût']
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
```

## ✅ Plan de Vérification

### Vérification Manuelle
1.  Lancer le serveur de développement (`npm run dev`).
2.  Parcourir chaque slide du formulaire.
3.  Attendre l'apparition du bouton d'aide (4 secondes).
4.  Cliquer sur le bouton d'aide.
5.  Vérifier que le titre et la description correspondent bien à la question en cours.
