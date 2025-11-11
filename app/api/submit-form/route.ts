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
      console.error('❌ EMAIL_USER:', process.env.EMAIL_USER ? 'DÉFINI' : 'MANQUANT');
      console.error('❌ EMAIL_PASS:', process.env.EMAIL_PASS ? 'DÉFINI' : 'MANQUANT');
      return NextResponse.json(
        { 
          error: 'Configuration email manquante',
          details: 'Les variables EMAIL_USER et EMAIL_PASS doivent être configurées dans le fichier .env.local'
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
        { 
          error: 'Erreur lors de l\'envoi de l\'email',
          details: 'Vérifiez les logs du serveur pour plus de détails. Assurez-vous que les identifiants email sont corrects.'
        },
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
    
    let errorMessage = 'Erreur interne du serveur';
    let errorDetails = undefined;
    
    if (error instanceof Error) {
      errorMessage = error.message || errorMessage;
      errorDetails = process.env.NODE_ENV === 'development' ? error.stack : undefined;
    } else if (typeof error === 'string') {
      errorMessage = error;
    }
    
    return NextResponse.json(
      { 
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? errorDetails : undefined
      },
      { status: 500 }
    );
  }
}
