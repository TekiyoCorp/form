import { createTransport } from 'nodemailer';
import type { FormData } from './types';

// Configuration simple et directe pour Gmail
export async function sendFormEmail(formData: FormData): Promise<boolean> {
  try {
    console.log('🔧 Début de sendFormEmail');
    console.log('📧 EMAIL_USER:', process.env.EMAIL_USER);
    console.log('🔑 EMAIL_PASS:', process.env.EMAIL_PASS ? '***' : 'NON DÉFINI');
    
    // Créer le transporteur directement
    const transporter = createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    console.log('✅ Transporteur créé');

    // Formater le contenu HTML
    const htmlContent = formatFormDataToHTML(formData);
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'contact@tekiyo.fr',
      subject: '🎯 Nouveau Brief Projet - Formulaire Tekiyo',
      html: htmlContent,
      text: `Nouveau brief reçu de ${formData.contact_info ? (formData.contact_info as any).fullName : 'Client'} - ${formData.company_intro || 'Aucune description'}`,
    };

    console.log('📤 Envoi de l\'email...');
    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Email envoyé avec succès:', result.messageId);
    
    return true;
  } catch (error) {
    console.error('❌ Erreur détaillée lors de l\'envoi de l\'email:', error);
    console.error('❌ Type d\'erreur:', typeof error);
    if (error instanceof Error) {
      console.error('❌ Message d\'erreur:', error.message);
      console.error('❌ Stack trace:', error.stack);
    }
    return false;
  }
}

// Fonction pour formater les données du formulaire en HTML
function formatFormDataToHTML(formData: FormData): string {
  const slideConfig = {
    company_intro: 'Présentation de l\'entreprise',
    design_level: 'Niveau de finition attendu',
    pages_needed: 'Sections indispensables',
    multilingual: 'Présence multilingue requise',
    existing_brand: 'Charte graphique exploitable',
    logo_needs: 'Identité visuelle',
    domain_name: 'Nom de domaine détenu et actif',
    goal_primary: 'Intention stratégique',
    kpis: 'KPI de succès à 90 jours',
    target_audience: 'Cœur de cible',
    scope: 'Périmètre fonctionnel',
    integrations: 'Écosystème à connecter',
    content_type: 'Contenus pilotés',
    seo_priority: 'Priorité SEO',
    tech_constraints: 'Contraintes et impératifs techniques',
    timeline: 'Fenêtre de livraison',
    budget_range: 'Enveloppe budgétaire',
    maintenance: 'Maintenance discrète et continue',
    legal_requirements: 'Exigences réglementaires',
    contact_info: 'Informations de contact',
    contact_consent: 'Consentement de contact',
  };

  let html = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .header { background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 30px; }
          .section { margin-bottom: 25px; padding: 15px; border-left: 4px solid #007bff; background: #f8f9fa; }
          .label { font-weight: bold; color: #007bff; margin-bottom: 8px; }
          .value { margin-left: 15px; }
          .contact-info { background: #e7f3ff; padding: 20px; border-radius: 8px; margin-top: 30px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🚀 Nouveau Brief Tekiyo Reçu</h1>
          <p><strong>Date:</strong> ${new Date().toLocaleString('fr-FR')}</p>
        </div>
  `;

  // Traiter chaque champ du formulaire
  Object.entries(formData).forEach(([key, value]) => {
    if (value === null || value === undefined || value === '') return;
    
    const label = slideConfig[key as keyof typeof slideConfig] || key;
    
    html += `<div class="section">`;
    html += `<div class="label">${label}</div>`;
    html += `<div class="value">`;
    
    if (typeof value === 'object' && value !== null && 'fullName' in value) {
      // Cas spécial pour les informations de contact
      const contact = value as { fullName: string; email: string; company: string; phone: string };
      html += `
        <strong>Nom:</strong> ${contact.fullName}<br>
        <strong>Email:</strong> ${contact.email}<br>
        <strong>Entreprise:</strong> ${contact.company}<br>
        <strong>Téléphone:</strong> ${contact.phone}
      `;
    } else if (Array.isArray(value)) {
      html += value.join(', ');
    } else if (typeof value === 'boolean') {
      html += value ? 'Oui' : 'Non';
    } else {
      html += String(value);
    }
    
    html += `</div></div>`;
  });

  html += `
        <div class="contact-info">
          <h3>📧 Informations de Contact</h3>
          <p>Ce brief a été soumis via le formulaire de contact de tekiyo.fr</p>
        </div>
      </body>
    </html>
  `;

  return html;
}
