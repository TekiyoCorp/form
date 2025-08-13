import { NextRequest, NextResponse } from 'next/server';
import { sendFormEmail } from '@/lib/email-simple';
import type { FormData } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 API route appelée');
    console.log('📧 EMAIL_USER:', process.env.EMAIL_USER);
    console.log('🔑 EMAIL_PASS:', process.env.EMAIL_PASS ? '***' : 'NON DÉFINI');
    
    // Vérifier que les variables d'environnement sont configurées
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('❌ Variables d\'environnement manquantes');
      return NextResponse.json(
        { 
          error: 'Configuration email manquante',
          details: 'EMAIL_USER et EMAIL_PASS doivent être configurés'
        },
        { status: 500 }
      );
    }
    
    const body = await request.json();
    const formData: FormData = body.formData;

    // Validation basique des données
    if (!formData || typeof formData !== 'object') {
      return NextResponse.json(
        { error: 'Données du formulaire invalides' },
        { status: 400 }
      );
    }

    // Vérifier que les informations de contact sont présentes
    if (!formData.contact_info || typeof formData.contact_info !== 'object') {
      return NextResponse.json(
        { error: 'Informations de contact manquantes' },
        { status: 400 }
      );
    }

    console.log('✅ Validation OK, envoi de l\'email...');
    
    // Envoyer l'email
    const emailSent = await sendFormEmail(formData);

    if (!emailSent) {
      console.log('❌ Échec de l\'envoi de l\'email');
      return NextResponse.json(
        { error: 'Erreur lors de l\'envoi de l\'email' },
        { status: 500 }
      );
    }

    console.log('✅ Email envoyé avec succès');
    
    // Retourner une réponse de succès
    return NextResponse.json({
      success: true,
      message: 'Formulaire soumis avec succès',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Erreur lors du traitement du formulaire:', error);
    
    return NextResponse.json(
      { 
        error: 'Erreur interne du serveur',
        details: process.env.NODE_ENV === 'development' ? String(error) : undefined
      },
      { status: 500 }
    );
  }
}
