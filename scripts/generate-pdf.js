#!/usr/bin/env node

/**
 * Script utilitaire pour tester la génération de PDF
 * Usage: pnpm gen:pdf
 */

const fs = require('fs');
const path = require('path');

// Données de test
const mockFormData = {
  company_intro: "Nous sommes une startup innovante dans le domaine de l'IA",
  goal_primary: "Refonte complète de notre site web pour améliorer la conversion",
  kpis: ["Leads", "Inscriptions", "CA"],
  target_audience: "Professionnels de 25-45 ans, secteur tech, niveau intermédiaire",
  scope: ["Site vitrine", "Blog", "Espace membre"],
  integrations: ["CRM", "Analytics", "Email marketing"],
  content_type: ["Articles", "Produits", "Témoignages"],
  seo_priority: 6,
  tech_constraints: "React et Node.js obligatoires",
  timeline: "3-4 mois",
  budget_range: "25k€ - 50k€",
  maintenance: true,
  legal_requirements: ["RGPD", "Accessibilité"],
  contact_consent: true
};

const mockFormConfig = {
  title: "Brief Tekiyo - Test",
  theme: {
    mode: "dark",
    primary: "#FFFFFF",
    overlayOpacity: 0.35
  },
  slides: [
    {
      id: "company_intro",
      type: "long_text",
      label: "Présentez brièvement votre entreprise et son activité principale.",
      required: true
    },
    {
      id: "goal_primary",
      type: "short_text",
      label: "Objectif principal de la refonte en une phrase.",
      required: true
    },
    {
      id: "kpis",
      type: "multiselect",
      label: "KPI prioritaires sur 90 jours",
      required: true
    }
  ]
};

// Fonction pour générer un PDF de test
async function generateTestPDF() {
  try {
    console.log('🚀 Génération du PDF de test...');
    
    // Simuler la génération d'un PDF
    const pdfContent = {
      formConfig: mockFormConfig,
      formData: mockFormData,
      metadata: {
        generatedAt: new Date().toISOString(),
        version: '1.0.0',
        test: true
      }
    };
    
    // Créer le dossier scripts s'il n'existe pas
    const scriptsDir = path.join(__dirname);
    if (!fs.existsSync(scriptsDir)) {
      fs.mkdirSync(scriptsDir, { recursive: true });
    }
    
    // Sauvegarder les données de test
    const testDataPath = path.join(scriptsDir, 'test-data.json');
    fs.writeFileSync(testDataPath, JSON.stringify(pdfContent, null, 2));
    
    console.log('✅ Données de test générées et sauvegardées dans:', testDataPath);
    console.log('📊 Résumé des données:');
    console.log(`   - Nombre de champs: ${Object.keys(mockFormData).length}`);
    console.log(`   - Nombre de slides: ${mockFormConfig.slides.length}`);
    console.log(`   - Thème: ${mockFormConfig.theme.mode}`);
    
    // Afficher quelques exemples de données
    console.log('\n📝 Exemples de réponses:');
    Object.entries(mockFormData).slice(0, 3).forEach(([key, value]) => {
      console.log(`   - ${key}: ${typeof value === 'string' ? value.substring(0, 50) + '...' : value}`);
    });
    
    console.log('\n🎯 Pour tester la génération PDF réelle:');
    console.log('   1. Lancez l\'application: pnpm dev');
    console.log('   2. Remplissez le formulaire');
    console.log('   3. Utilisez le bouton d\'export PDF dans le HUD');
    
  } catch (error) {
    console.error('❌ Erreur lors de la génération du PDF de test:', error);
    process.exit(1);
  }
}

// Fonction pour valider les données
function validateTestData() {
  console.log('🔍 Validation des données de test...');
  
  const requiredFields = mockFormConfig.slides
    .filter(slide => slide.required)
    .map(slide => slide.id);
  
  const missingFields = requiredFields.filter(field => !mockFormData[field]);
  
  if (missingFields.length > 0) {
    console.warn('⚠️  Champs requis manquants:', missingFields);
  } else {
    console.log('✅ Tous les champs requis sont remplis');
  }
  
  // Vérifier les types de données
  const validationResults = Object.entries(mockFormData).map(([key, value]) => {
    const slide = mockFormConfig.slides.find(s => s.id === key);
    if (!slide) return { field: key, valid: false, error: 'Slide non trouvée' };
    
    let valid = true;
    let error = null;
    
    switch (slide.type) {
      case 'multiselect':
        valid = Array.isArray(value);
        error = valid ? null : 'Doit être un tableau';
        break;
      case 'yes_no':
        valid = typeof value === 'boolean';
        error = valid ? null : 'Doit être un booléen';
        break;
      case 'scale':
        valid = typeof value === 'number' && value >= 1 && value <= 7;
        error = valid ? null : 'Doit être un nombre entre 1 et 7';
        break;
      case 'consent':
        valid = typeof value === 'boolean' && value === true;
        error = valid ? null : 'Doit être true pour le consentement';
        break;
      default:
        valid = typeof value === 'string' && value.length > 0;
        error = valid ? null : 'Doit être une chaîne non vide';
    }
    
    return { field: key, valid, error };
  });
  
  const invalidFields = validationResults.filter(r => !r.valid);
  
  if (invalidFields.length > 0) {
    console.warn('⚠️  Champs avec des données invalides:');
    invalidFields.forEach(field => {
      console.warn(`   - ${field.field}: ${field.error}`);
    });
  } else {
    console.log('✅ Toutes les données sont valides');
  }
  
  return validationResults;
}

// Fonction principale
async function main() {
  console.log('📋 Script de test pour la génération PDF - Formulaire Tekiyo\n');
  
  // Valider les données
  validateTestData();
  
  console.log('\n' + '='.repeat(50) + '\n');
  
  // Générer le PDF de test
  await generateTestPDF();
  
  console.log('\n🎉 Script terminé avec succès !');
}

// Exécuter le script
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Erreur fatale:', error);
    process.exit(1);
  });
}

module.exports = {
  generateTestPDF,
  validateTestData,
  mockFormData,
  mockFormConfig
};
