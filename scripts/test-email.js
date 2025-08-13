#!/usr/bin/env node

/**
 * Script de test pour vérifier la configuration email
 * Usage: node scripts/test-email.js
 */

require('dotenv').config({ path: '.env.local' });

const nodemailer = require('nodemailer');

function createTestTransporter() {
  const emailService = process.env.EMAIL_SERVICE || 'gmail';
  
  console.log(`🔧 Configuration du service: ${emailService}`);
  
  switch (emailService) {
    case 'gmail':
      return nodemailer.createTransporter({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
    
    case 'outlook':
      return nodemailer.createTransporter({
        service: 'outlook',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
    
    case 'yahoo':
      return nodemailer.createTransporter({
        service: 'yahoo',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
    
    case 'custom':
      return nodemailer.createTransporter({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });
    
    default:
      throw new Error(`Service email non supporté: ${emailService}`);
  }
}

async function testEmailConnection() {
  try {
    console.log('🚀 Test de connexion email...\n');
    
    // Vérifier les variables d'environnement
    const requiredVars = ['EMAIL_USER', 'EMAIL_PASS'];
    if (process.env.EMAIL_SERVICE === 'custom') {
      requiredVars.push('SMTP_HOST', 'SMTP_USER', 'SMTP_PASS');
    }
    
    console.log('📋 Variables d\'environnement:');
    requiredVars.forEach(varName => {
      const value = process.env[varName];
      const status = value ? '✅' : '❌';
      console.log(`  ${status} ${varName}: ${value ? 'Défini' : 'Manquant'}`);
    });
    
    if (!requiredVars.every(varName => process.env[varName])) {
      console.log('\n❌ Variables d\'environnement manquantes. Créez un fichier .env.local');
      return;
    }
    
    // Créer le transporteur
    const transporter = createTestTransporter();
    
    // Tester la connexion
    console.log('\n🔌 Test de connexion...');
    await transporter.verify();
    console.log('✅ Connexion réussie !');
    
    // Tester l'envoi d'un email de test
    console.log('\n📧 Test d\'envoi d\'email...');
    const testEmail = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: process.env.EMAIL_TO || 'contact@tekiyo.fr',
      subject: '🧪 Test de configuration - Formulaire Tekiyo',
      text: `Ceci est un email de test pour vérifier la configuration du formulaire Tekiyo.
      
Date: ${new Date().toLocaleString('fr-FR')}
Service: ${process.env.EMAIL_SERVICE || 'gmail'}

Si vous recevez cet email, la configuration est correcte !`,
    };
    
    const info = await transporter.sendMail(testEmail);
    console.log('✅ Email de test envoyé !');
    console.log(`   Message ID: ${info.messageId}`);
    console.log(`   À: ${testEmail.to}`);
    
  } catch (error) {
    console.error('\n❌ Erreur lors du test:', error.message);
    
    if (error.code === 'EAUTH') {
      console.log('\n💡 Solutions possibles:');
      console.log('   - Vérifiez vos identifiants email');
      console.log('   - Pour Gmail, utilisez un mot de passe d\'application');
      console.log('   - Activez l\'authentification à 2 facteurs si nécessaire');
    } else if (error.code === 'ECONNECTION') {
      console.log('\n💡 Solutions possibles:');
      console.log('   - Vérifiez votre connexion internet');
      console.log('   - Vérifiez les paramètres SMTP');
    }
  }
}

// Lancer le test
testEmailConnection();
