'use client';

import React from 'react';

export default function TestPage(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">✅ Test Réussi !</h1>
        <p className="text-xl mb-8">L'application Next.js fonctionne correctement</p>
        <div className="space-y-4">
          <div className="p-4 bg-green-900 rounded-lg">
            <p className="text-green-100">✓ Next.js 14 App Router</p>
          </div>
          <div className="p-4 bg-blue-900 rounded-lg">
            <p className="text-blue-100">✓ TypeScript</p>
          </div>
          <div className="p-4 bg-purple-900 rounded-lg">
            <p className="text-purple-100">✓ Tailwind CSS</p>
          </div>
          <div className="p-4 bg-orange-900 rounded-lg">
            <p className="text-orange-100">✓ React 18</p>
          </div>
        </div>
        <div className="mt-8">
          <a 
            href="/" 
            className="px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors"
          >
            Retour au formulaire
          </a>
        </div>
      </div>
    </div>
  );
}
