import { NextRequest, NextResponse } from 'next/server';
import type { FormData } from '@/lib/types';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { formData, metadata } = body;

    // Validation des données reçues
    if (!formData || typeof formData !== 'object') {
      return NextResponse.json(
        { error: 'Données du formulaire invalides' },
        { status: 400 }
      );
    }

    // Traitement des données (ici on pourrait ajouter de la logique métier)
    const processedData = {
      formData,
      metadata: {
        ...metadata,
        exportedAt: new Date().toISOString(),
        version: '1.0.0',
      },
      // Ajouter un hash de sécurité si nécessaire
      hash: generateDataHash(formData),
    };

    // Retourner les données traitées
    return NextResponse.json({
      success: true,
      data: processedData,
      message: 'Données exportées avec succès',
    });

  } catch (error) {
    console.error('Erreur lors de l\'export:', error);
    
    return NextResponse.json(
      { 
        error: 'Erreur interne du serveur',
        message: 'Impossible de traiter la demande d\'export'
      },
      { status: 500 }
    );
  }
}

// Fonction utilitaire pour générer un hash des données
function generateDataHash(data: FormData): string {
  const dataString = JSON.stringify(data);
  let hash = 0;
  
  for (let i = 0; i < dataString.length; i++) {
    const char = dataString.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  return Math.abs(hash).toString(36);
}

// Route GET pour récupérer un export existant (optionnel)
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const exportId = searchParams.get('id');

    if (!exportId) {
      return NextResponse.json(
        { error: 'ID d\'export requis' },
        { status: 400 }
      );
    }

    // Ici on pourrait récupérer un export depuis une base de données
    // Pour l'instant, on retourne une erreur 404
    return NextResponse.json(
      { error: 'Export non trouvé' },
      { status: 404 }
    );

  } catch (error) {
    console.error('Erreur lors de la récupération de l\'export:', error);
    
    return NextResponse.json(
      { 
        error: 'Erreur interne du serveur',
        message: 'Impossible de récupérer l\'export'
      },
      { status: 500 }
    );
  }
}
