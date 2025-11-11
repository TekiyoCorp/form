# 🔍 Analyse des Problèmes - Formulaire Tekiyo

## 📊 RÉSUMÉ EXÉCUTIF

Ce document identifie les problèmes UX, fonctionnels et de performance du formulaire Tekiyo.

---

## 🐌 PROBLÈMES DE PERFORMANCE (Chargement Lent)

### 1. **Images extrêmement lourdes** ⚠️ CRITIQUE
- **Problème** : Les images PNG font entre **1MB et 8.3MB** chacune
- **Impact** : 
  - Temps de chargement initial : 20-30 secondes sur connexion moyenne
  - Consommation de données mobile excessive
  - Expérience utilisateur dégradée
- **Fichiers concernés** :
  - `public/images/chasego_*.png` : 5.4MB
  - `public/images/dannysaltaren_*.png` : 8.3MB
  - `public/images/gamin.png` : 5.4MB
  - Etc.

### 2. **Pas de préchargement des images** ⚠️ CRITIQUE
- **Problème** : Le système `preloadImage.ts` existe mais n'est **jamais utilisé** dans `page.tsx`
- **Impact** : 
  - Chaque slide attend le chargement de son image avant d'afficher le contenu
  - Délai visible à chaque changement de slide
- **Code concerné** : `app/page.tsx` - pas d'appel à `useImagePreloader()`

### 3. **Images non optimisées** ⚠️ CRITIQUE
- **Problème** : 
  - Utilisation de `background-image` CSS au lieu de Next.js `Image`
  - Pas de formats modernes (WebP/AVIF)
  - Pas de lazy loading intelligent
  - Pas de compression
- **Impact** : 
  - Toutes les images sont chargées en même temps potentiellement
  - Pas de responsive images
  - Pas de placeholder pendant le chargement
- **Code concerné** : `components/Slide.tsx` ligne 171

### 4. **Chargement synchrone bloquant**
- **Problème** : Les images se chargent au moment où la slide apparaît
- **Impact** : Délai visible avant l'affichage du contenu

---

## 🎨 PROBLÈMES UX

### 1. **Pas de feedback visuel pendant le chargement** ⚠️ MAJEUR
- **Problème** : Quand une image charge, l'utilisateur voit juste un écran flou ou vide
- **Impact** : L'utilisateur ne sait pas si l'application fonctionne
- **Solution suggérée** : Ajouter un skeleton loader ou un spinner

### 2. **BottomHUD non utilisé** ⚠️ MAJEUR
- **Problème** : Le composant `BottomHUD.tsx` existe mais n'est pas intégré dans `page.tsx`
- **Impact** : 
  - Pas d'accès aux fonctionnalités (export, reset, aide)
  - Pas de navigation alternative
- **Code concerné** : `app/page.tsx` - pas d'import ni d'utilisation

### 3. **Pas de gestion d'erreur visuelle pour les images**
- **Problème** : Si une image ne charge pas, pas de fallback visible
- **Impact** : Écran noir ou image cassée
- **Code concerné** : `components/Slide.tsx` - pas de gestion d'erreur

### 4. **Navigation au clavier pas évidente**
- **Problème** : Pas d'indication claire des raccourcis disponibles
- **Impact** : Les utilisateurs ne savent pas qu'ils peuvent naviguer au clavier
- **Solution suggérée** : Tooltip au premier chargement ou aide visible

### 5. **Pas de sauvegarde automatique visible**
- **Problème** : Le store Zustand existe mais n'est pas utilisé dans `page.tsx`
- **Impact** : 
  - Pas de reprise de session si l'utilisateur ferme le navigateur
  - Perte de données en cas d'erreur
- **Code concerné** : `app/page.tsx` utilise `useState` au lieu de `useFormStore`

---

## ⚙️ PROBLÈMES FONCTIONNELS

### 1. **Duplication de logique d'état** ⚠️ CRITIQUE
- **Problème** : 
  - `lib/useFormState.ts` (Zustand) existe avec toute la logique
  - `app/page.tsx` réimplémente la même logique avec `useState`
- **Impact** : 
  - Code dupliqué et difficile à maintenir
  - Pas de persistance automatique
  - Incohérence potentielle
- **Code concerné** : 
  - `lib/useFormState.ts` (non utilisé)
  - `app/page.tsx` (logique dupliquée)

### 2. **Erreur dans SimpleConfirmationPage** ⚠️ BUG
- **Problème** : La fonction `sendFormEmail` est appelée dans `useEffect` avant d'être définie
- **Impact** : Erreur JavaScript potentielle
- **Code concerné** : `components/SimpleConfirmationPage.tsx` lignes 15-42
```typescript
useEffect(() => {
  sendFormEmail(); // ❌ Appelée avant définition
}, []);

const sendFormEmail = async () => { // ✅ Définie après
  // ...
};
```

### 3. **Pas de validation avant soumission**
- **Problème** : Le formulaire peut être soumis même si incomplet
- **Impact** : Données incomplètes envoyées
- **Code concerné** : `components/SimpleConfirmationPage.tsx` - pas de vérification

### 4. **Pas de gestion d'erreur réseau robuste**
- **Problème** : Si l'envoi échoue, pas de retry automatique ou de message clair
- **Impact** : Expérience frustrante en cas d'erreur réseau
- **Code concerné** : `components/SimpleConfirmationPage.tsx` - gestion basique

### 5. **Font Google chargée mais peut-être inutilisée**
- **Problème** : Font Inter chargée depuis Google Fonts dans `globals.css`
- **Impact** : Requête réseau supplémentaire
- **Vérification** : La font est utilisée dans `globals.css` ligne 25, donc OK

---

## 📈 MÉTRIQUES DE PERFORMANCE ESTIMÉES

### Temps de chargement actuel (estimé)
- **Première slide** : 5-10 secondes (chargement de l'image 8.3MB)
- **Slides suivantes** : 2-5 secondes chacune
- **Total pour 22 slides** : 50-120 secondes de chargement cumulé

### Taille totale des assets
- **Images** : ~30-40MB (toutes les images PNG)
- **Bundle JS** : ~200-300KB (estimé)
- **Total** : ~30-40MB à télécharger

### Impact utilisateur
- **Connexion lente (3G)** : Expérience très frustrante
- **Mobile** : Consommation excessive de données
- **Desktop** : Acceptable mais lent

---

## 🎯 PRIORITÉS DE CORRECTION

### 🔴 PRIORITÉ 1 (Critique - Impact immédiat)
1. **Optimiser les images** : Convertir en WebP/AVIF, réduire la taille
2. **Implémenter le préchargement** : Utiliser `preloadImage.ts` dans `page.tsx`
3. **Corriger l'erreur SimpleConfirmationPage** : Déplacer la fonction avant l'appel
4. **Utiliser le store Zustand** : Remplacer `useState` par `useFormStore`

### 🟡 PRIORITÉ 2 (Majeur - Amélioration UX)
1. **Ajouter des loaders visuels** : Skeleton ou spinner pendant le chargement
2. **Intégrer BottomHUD** : Ajouter les fonctionnalités manquantes
3. **Gestion d'erreur images** : Fallback visuel si image ne charge pas
4. **Validation avant soumission** : Vérifier que le formulaire est complet

### 🟢 PRIORITÉ 3 (Amélioration - Polish)
1. **Tooltip d'aide** : Indiquer les raccourcis clavier
2. **Retry automatique** : En cas d'erreur réseau
3. **Optimisation bundle** : Code splitting pour les composants de champs

---

## 📝 RECOMMANDATIONS TECHNIQUES

### Pour les images
1. Convertir toutes les images PNG en WebP (réduction ~70-80%)
2. Créer des versions responsive (mobile/desktop)
3. Utiliser Next.js `Image` component avec `priority` pour la première slide
4. Implémenter le lazy loading pour les slides suivantes

### Pour l'état
1. Migrer complètement vers Zustand (`useFormStore`)
2. Activer la persistance pour sauvegarder automatiquement
3. Ajouter une notification de "reprise de session" si données sauvegardées

### Pour la performance
1. Précharger les 2-3 prochaines slides en arrière-plan
2. Ajouter un service worker pour cache les images
3. Utiliser `loading="lazy"` pour les images non visibles

---

## 🔧 FICHIERS À MODIFIER EN PRIORITÉ

1. `app/page.tsx` - Intégrer préchargement et Zustand
2. `components/Slide.tsx` - Utiliser Next.js Image et gestion d'erreur
3. `components/SimpleConfirmationPage.tsx` - Corriger l'ordre des fonctions
4. `public/images/*` - Optimiser toutes les images
5. `next.config.js` - Configurer l'optimisation d'images

---

*Analyse effectuée le $(date)*



