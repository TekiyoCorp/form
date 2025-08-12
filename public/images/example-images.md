# 🖼️ Images d'exemple pour le formulaire

## 📋 **Images nécessaires**

Pour que le formulaire fonctionne, vous devez ajouter ces images dans le dossier `public/images/` :

### **Images requises :**
1. `company-bg.jpg` - Image de fond pour la présentation de l'entreprise
2. `goal-bg.jpg` - Image de fond pour l'objectif principal
3. `kpis-bg.jpg` - Image de fond pour les KPI prioritaires
4. `audience-bg.jpg` - Image de fond pour l'audience cible
5. `scope-bg.jpg` - Image de fond pour le périmètre de refonte
6. `integrations-bg.jpg` - Image de fond pour les intégrations techniques
7. `content-bg.jpg` - Image de fond pour les types de contenus
8. `seo-bg.jpg` - Image de fond pour la priorité SEO
9. `tech-bg.jpg` - Image de fond pour les contraintes techniques
10. `timeline-bg.jpg` - Image de fond pour le délai de livraison
11. `budget-bg.jpg` - Image de fond pour la fourchette budgétaire
12. `maintenance-bg.jpg` - Image de fond pour la maintenance
13. `legal-bg.jpg` - Image de fond pour les exigences légales
14. `consent-bg.jpg` - Image de fond pour le consentement

## 🎯 **Spécifications recommandées**

- **Format** : JPG, PNG, WebP
- **Taille** : 1920x1080px minimum (16:9)
- **Poids** : < 500KB par image
- **Contraste** : Assurez-vous que le texte blanc reste lisible
- **Style** : Professionnel, en rapport avec le thème de chaque question

## 🚀 **Comment procéder**

### **Option 1 : Utiliser vos propres images**
1. Préparez vos 14 images selon les spécifications
2. Nommez-les exactement comme indiqué ci-dessus
3. Placez-les dans `public/images/`
4. Redémarrez le serveur : `pnpm dev`

### **Option 2 : Utiliser des images temporaires**
Si vous n'avez pas d'images personnalisées, vous pouvez :
1. Utiliser des images de stock (Unsplash, Pexels, etc.)
2. Créer des images simples avec des outils comme Canva
3. Utiliser des images de placeholder génériques

### **Option 3 : Désactiver temporairement les images**
Si vous voulez tester sans images :
1. Modifiez `app/page.tsx`
2. Remplacez `bg: '/images/company-bg.jpg'` par `bg: ''`
3. Ou commentez la ligne `bg: ...`

## 🔧 **Test des images**

Après avoir ajouté vos images :
1. Lancez `pnpm dev`
2. Ouvrez http://localhost:3000
3. Vérifiez que chaque slide affiche bien votre image de fond
4. Assurez-vous que le texte reste lisible

## 💡 **Conseils de design**

- **Cohérence** : Utilisez un style visuel cohérent
- **Simplicité** : Évitez les images trop chargées
- **Professionnalisme** : Choisissez des images qui reflètent votre image de marque
- **Accessibilité** : Vérifiez le contraste texte/fond

Vos images seront automatiquement optimisées par Next.js ! 🎨
