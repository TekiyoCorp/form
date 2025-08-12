# 📁 Dossier Images

Placez vos images ici pour les utiliser dans le formulaire.

## 📋 **Formats supportés**
- `.jpg`, `.jpeg`
- `.png`
- `.webp`
- `.avif`

## 🎯 **Comment utiliser**

### **1. Ajoutez vos images**
```
public/images/
├── company-bg.jpg          ← Image de fond pour la 1ère question
├── goal-bg.jpg             ← Image de fond pour la 2ème question
├── kpis-bg.jpg             ← Image de fond pour la 3ème question
└── ...
```

### **2. Mettez à jour la configuration**
Dans `app/page.tsx`, remplacez les URLs Unsplash par vos images :

```typescript
// Avant (Unsplash)
bg: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1920&h=1080&fit=crop'

// Après (votre image)
bg: '/images/company-bg.jpg'
```

### **3. Recommandations**
- **Taille** : 1920x1080px minimum (format 16:9)
- **Poids** : < 500KB par image
- **Qualité** : Optimisée pour le web
- **Contraste** : Assurez-vous que le texte blanc reste lisible

## 🚀 **Exemple d'utilisation**

```typescript
{
  id: 'company_intro',
  type: 'long_text',
  label: 'Présentez votre entreprise...',
  bg: '/images/company-bg.jpg'  // ← Votre image locale
}
```

Vos images seront automatiquement optimisées par Next.js ! 🎨
