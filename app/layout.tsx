import React from 'react';
import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Formulaire Tekiyo - Brief Projet',
  description: 'Questionnaire professionnel pour la refonte de votre site web ou application',
  keywords: 'brief, projet, refonte, site web, application, tekio',
  authors: [{ name: 'Tekiyo' }],
  robots: 'noindex, nofollow', // Pour les formulaires de brief
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
        <link rel="icon" href="/favicon.ico" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className="antialiased bg-black text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
