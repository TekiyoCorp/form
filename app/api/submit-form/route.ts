import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { briefResponses, formConfig, timestamp } = await request.json();
    
    // Ici vous pouvez configurer l'envoi par email vers VOUS (Tekiyo)
    // Pour l'instant, on va juste logger les données et les retourner
    
    console.log('=== NOUVEAU BRIEF TEKIYO REÇU ===');
    console.log('📋 Formulaire:', formConfig);
    console.log('🕒 Date:', timestamp);
    console.log('📝 Réponses du brief:', briefResponses);
    console.log('==================================');
    
    // Option 1: Envoyer par email vers VOUS (nécessite un service comme SendGrid, Mailgun, etc.)
    // Option 2: Sauvegarder dans une base de données
    // Option 3: Envoyer vers un webhook (Slack, Discord, etc.)
    
    // Pour l'instant, on retourne les données pour que vous puissiez les voir
    return NextResponse.json({
      success: true,
      message: 'Brief reçu avec succès par Tekiyo',
      data: {
        formConfig,
        briefResponses,
        timestamp
      }
    });
    
  } catch (error) {
    console.error('Erreur lors du traitement du brief:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur lors du traitement' },
      { status: 500 }
    );
  }
}
