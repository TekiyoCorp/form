import React from 'react';
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { getBaseUrl } from '@/lib/utils';

// Obtenir l'URL de base pour les métadonnées
const baseUrl = getBaseUrl();
const ogImageUrl = `${baseUrl}/images/formimage.png`;

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: 'Brief Tekiyo - Formulaire de projet',
  description: 'Racontez-nous votre projet. Nous créons des expériences digitales sur-mesure qui vous ressemblent.',
  keywords: 'brief, projet, refonte, site web, application, tekio, design, développement',
  authors: [{ name: 'Tekiyo' }],
  robots: 'noindex, nofollow', // Pour les formulaires de brief
  openGraph: {
    title: 'Brief Tekiyo - Formulaire de projet',
    description: 'Racontez-nous votre projet. Nous créons des expériences digitales sur-mesure qui vous ressemblent.',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Tekiyo',
    url: baseUrl,
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: 'Brief Tekiyo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brief Tekiyo - Formulaire de projet',
    description: 'Racontez-nous votre projet. Nous créons des expériences digitales sur-mesure qui vous ressemblent.',
    images: [ogImageUrl],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <html lang="fr" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className="antialiased bg-black text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
