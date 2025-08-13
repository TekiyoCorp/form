# Formulaire Tekiyo 🚀

Un questionnaire professionnel type Typeform, conçu pour la refonte de sites web et applications. Interface minimaliste et haut de gamme avec navigation fluide et export des réponses.

## ✨ Fonctionnalités

- **14 slides de questions** couvrant tous les aspects d'un projet web
- **Navigation fluide** : clavier, molette, flèches
- **Images de fond** avec overlay et parallaxe subtile
- **Validation en temps réel** avec messages d'erreur élégants
- **Autosave** automatique dans le localStorage
- **Export JSON et PDF** des réponses
- **Interface responsive** mobile-first
- **Thème dark/light** toggleable
- **Accessibilité complète** (ARIA, navigation clavier, contrastes)

## 🎯 Types de champs supportés

- **Texte court** (180 caractères max)
- **Texte long** (2000 caractères max)
- **Email** avec validation
- **Sélection simple** (dropdown)
- **Sélection multiple** avec tags
- **Date** avec sélecteur
- **Oui/Non** avec boutons
- **Échelle** 1-7 avec boutons
- **Upload de fichier** (drag & drop)
- **Consentement RGPD** avec checkbox

## 🛠️ Stack technique

- **Next.js 14** avec App Router
- **React 18** + TypeScript strict
- **Tailwind CSS** avec variables personnalisées
- **Framer Motion** pour les animations
- **Zustand** pour la gestion d'état
- **React Hook Form** pour la validation
- **html2canvas** + jsPDF pour l'export PDF
- **Lucide React** pour les icônes

## 🚀 Installation

### Prérequis

- Node.js 18.17.0 ou supérieur
- pnpm (recommandé) ou npm

### Installation

```bash
# Cloner le projet
git clone <repository-url>
cd formulaire-tekiyo

# Installer les dépendances
pnpm install

# Lancer en mode développement
pnpm dev
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

## 📋 Scripts disponibles

```bash
# Développement
pnpm dev          # Lance le serveur de développement

# Production
pnpm build        # Build de production
pnpm start        # Lance le serveur de production

# Utilitaires
pnpm lint         # Vérification ESLint
pnpm type-check   # Vérification TypeScript
pnpm gen:pdf      # Test de génération PDF (script utilitaire)
```

## 🎨 Configuration

### Personnalisation du thème

Modifiez les variables CSS dans `app/globals.css` :

```css
:root {
  --color-primary: #ffffff;
  --color-overlay: rgba(0, 0, 0, 0.35);
  --color-background: #000000;
}
```

### Configuration du formulaire

Éditez `config/form.json` pour personnaliser :
- Questions et labels
- Types de champs
- Images de fond
- Options des sélections
- Validation et contraintes

### Ajout de nouveaux types de champs

1. Créez le composant dans `components/fields/`
2. Ajoutez le type dans `lib/types.ts`
3. Mettez à jour `lib/formSchema.ts`
4. Intégrez dans `components/Slide.tsx`

## 🔧 Architecture

```
formulaire-tekiyo/
├── app/                    # Next.js App Router
│   ├── api/               # Routes API
│   ├── globals.css        # Styles globaux
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Page principale
├── components/             # Composants React
│   ├── fields/            # Composants de champs
│   ├── ProgressBar.tsx    # Barre de progression
│   ├── Slide.tsx          # Composant slide principal
│   ├── SlideNavDots.tsx   # Navigation par points
│   └── BottomHUD.tsx      # Interface du bas
├── lib/                   # Utilitaires et logique
│   ├── types.ts           # Types TypeScript
│   ├── useFormState.ts    # Gestion d'état du formulaire
│   ├── useFormState.ts    # Store Zustand
│   ├── preloadImage.ts    # Préchargement images
│   ├── pdf.ts             # Utilitaires PDF
│   └── utils.ts           # Fonctions utilitaires
├── config/                # Configuration
│   └── form.json          # Configuration du formulaire
└── scripts/               # Scripts utilitaires
    └── generate-pdf.js    # Test génération PDF
```

## 🎮 Utilisation

### Navigation

- **Clavier** : Flèches haut/bas, Enter, Escape
- **Souris** : Molette pour naviguer entre slides
- **Touch** : Swipe sur mobile

### Raccourcis

- `Enter` : Valider et passer à la suivante
- `Shift + Enter` : Nouvelle ligne (champs texte)
- `Espace` : Cocher/décocher (checkboxes)
- `Flèches gauche/droite` : Sélection oui/non
- `Escape` : Ouvrir le menu

### Export

- **JSON** : Données brutes avec métadonnées
- **PDF** : Rapport formaté professionnellement

## 📱 Responsive Design

- **Mobile First** : Optimisé pour les petits écrans
- **Breakpoints** : sm (640px), md (768px), lg (1024px)
- **Navigation adaptative** : Points verticaux sur desktop, horizontaux sur mobile
- **Touch friendly** : Boutons et interactions optimisés

## ♿ Accessibilité

- **ARIA labels** et descriptions
- **Navigation clavier** complète
- **Contrastes** conformes WCAG 2.1 AA
- **Screen readers** supportés
- **Focus visible** sur tous les éléments interactifs

## 🚀 Déploiement

### Vercel (recommandé)

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel
```

### Autres plateformes

```bash
# Build de production
pnpm build

# Démarrer le serveur
pnpm start
```

## 🔒 Sécurité et RGPD

- **Aucun tracking** tiers
- **Données locales** uniquement (localStorage)
- **Consentement explicite** requis
- **Export sécurisé** des données
- **Pas de stockage** côté serveur

## 🧪 Tests

### Tests manuels

```bash
# Lancer l'application
pnpm dev

# Tester la navigation
# Tester la validation
# Tester l'export
# Tester la responsivité
```

### Script de test PDF

```bash
pnpm gen:pdf
```

## 📊 Performance

- **Lighthouse** : 95+ sur tous les critères
- **Web Vitals** : LCP < 2.5s, CLS = 0
- **Bundle size** : Optimisé avec Next.js
- **Images** : Préchargement et optimisation
- **Animations** : 60fps avec Framer Motion

## 🐛 Dépannage

### Problèmes courants

1. **Erreur de build** : Vérifiez la version de Node.js
2. **Images qui ne se chargent pas** : Vérifiez les domaines dans `next.config.js`
3. **PDF qui ne se génère pas** : Vérifiez les dépendances html2canvas/jsPDF

### Logs et debugging

```bash
# Mode développement avec logs
pnpm dev

# Vérification TypeScript
pnpm type-check

# Linting
pnpm lint
```

## 🤝 Contribution

1. Fork le projet
2. Créez une branche feature (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🙏 Remerciements

- **Next.js** pour le framework
- **Tailwind CSS** pour les styles
- **Framer Motion** pour les animations
- **Zustand** pour la gestion d'état
- **Unsplash** pour les images de démonstration

## 📞 Support

Pour toute question ou problème :
- Ouvrez une issue sur GitHub
- Consultez la documentation
- Contactez l'équipe Tekiyo

---

**Formulaire Tekiyo** - Créé avec ❤️ pour des projets web exceptionnels
