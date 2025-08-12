# 🖼️ Configuration des Images - Formulaire Tekiyo

## 📋 **Images configurées et utilisées**

Vos images ont été configurées avec les paramètres suivants :

### **🎨 Paramètres appliqués :**
- **Flou** : 8px pour un effet artistique
- **Taille** : 120% pour éviter les bordures visibles
- **Calque noir** : 20% d'opacité pour la lisibilité du texte
- **Overlay radial** : Dégradé subtil pour la profondeur

### **🔄 Répartition des images :**

#### **Image 1 : Figure sous-marine avec lumière du soleil**
- **Fichier** : `xitang2024_submerged_figure_in_transparent_water_with_sunlight__48527044-3166-428c-a18a-cc8c245b4e75.png`
- **Utilisée pour** : 
  - Question 1 : Présentation de l'entreprise
  - Question 8 : Priorité SEO

#### **Image 2 : Scène sous-marine avec nageur**
- **Fichier** : `chasego_An_underwater_scene_with_a_barely-visible_male_swimming_60f6ee1e-317c-4c0c-af2d-aa421cf045ee.png`
- **Utilisée pour** :
  - Question 2 : Objectif principal
  - Question 9 : Contraintes techniques

#### **Image 3 : Cheval galopant dans un pré**
- **Fichier** : `Cheval galopant dans un pré.png`
- **Utilisée pour** :
  - Question 3 : KPI prioritaires
  - Question 10 : Délai de livraison

#### **Image 4 : Vortex psychédélique sombre**
- **Fichier** : `easyted_009_Dark_environmentThe_psychedelic_vortex_gradient_col_c6da4e29-02db-4d33-8648-6bbd3235cacd (1).png`
- **Utilisée pour** :
  - Question 4 : Audience cible
  - Question 11 : Fourchette budgétaire

#### **Image 5 : Âme éthérée devant un paysage étoilé**
- **Fichier** : `mikereger_ethereal_soul_in_front_of_a_landscape_with_stars_high_4eb101eb-e1c3-44c3-a39a-83d2f78bbeb0.png`
- **Utilisée pour** :
  - Question 5 : Périmètre de refonte
  - Question 12 : Contrat de maintenance

#### **Image 6 : Figure humaine en sépia**
- **Fichier** : `dannysaltaren_Sepia-toned_analog_photo_of_a_human_figure_escapi_827e1975-6808-4fcb-97cc-f7d6f0a0bf51.png`
- **Utilisée pour** :
  - Question 6 : Intégrations techniques
  - Question 13 : Exigences légales

#### **Image 7 : Orchidée poussant d'un étang**
- **Fichier** : `gt267_an_orchidgrowing_from_pond_brilliant_pale_pink_with_prurl_18778f9d-b030-4cfc-ad77-a241cf00ecc3.png`
- **Utilisée pour** :
  - Question 7 : Types de contenus
  - Question 14 : Consentement de contact

## 🎯 **Effet visuel final**

Chaque image de fond aura :
1. **Un flou de 8px** pour un effet artistique
2. **Une taille de 120%** pour éviter les bordures blanches
3. **Un calque noir de 20%** pour assurer la lisibilité du texte blanc
4. **Un overlay radial subtil** pour ajouter de la profondeur

## 🔧 **Personnalisation**

### **Pour changer une image :**
1. Remplacez le fichier dans `public/images/`
2. Gardez le même nom de fichier
3. Ou modifiez le chemin dans `app/page.tsx`

### **Pour ajuster les paramètres :**
- **Flou** : Modifiez `filter: 'blur(8px)'` dans `components/Slide.tsx`
- **Taille** : Modifiez `transform: 'scale(1.2)'` dans `components/Slide.tsx`
- **Opacité** : Modifiez `opacity: 0.2` dans `components/Slide.tsx`

## 📱 **Responsive**

Les images s'adaptent automatiquement à toutes les tailles d'écran grâce à :
- `bg-cover` : Couvre tout l'espace disponible
- `bg-center` : Centre l'image
- `scale(1.2)` : Évite les bordures sur tous les écrans

## 🎨 **Conseils de design**

- **Contraste** : Le calque noir de 20% assure que le texte blanc reste lisible
- **Profondeur** : Le flou et l'overlay créent une hiérarchie visuelle
- **Cohérence** : Toutes les images ont le même traitement visuel
- **Performance** : Les images sont optimisées par Next.js

Vos images créent maintenant une ambiance professionnelle et artistique parfaite pour le formulaire ! 🚀
