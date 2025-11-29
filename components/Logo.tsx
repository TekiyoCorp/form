'use client';

import React from 'react';

export function Logo(): React.JSX.Element {
  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="flex justify-center py-8">
        <div className="flex items-center space-x-3">
          <svg width="28" height="30" viewBox="0 0 28 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
            <path d="M27.0813 15.8649C27.0813 23.3432 21.0189 29.4055 13.5406 29.4055C6.06235 29.4055 0 23.3432 0 15.8649C0 8.38657 6.06235 2.32422 13.5406 2.32422C21.0189 2.32422 27.0813 8.38657 27.0813 15.8649ZM1.7793 15.8649C1.7793 22.3605 7.04503 27.6262 13.5406 27.6262C20.0362 27.6262 25.302 22.3605 25.302 15.8649C25.302 9.36925 20.0362 4.10352 13.5406 4.10352C7.04503 4.10352 1.7793 9.36925 1.7793 15.8649Z" fill="white"/>
            <ellipse cx="13.5615" cy="15.8447" rx="5.70017" ry="5.70017" fill="white"/>
            <ellipse cx="13.5371" cy="3.42576" rx="2.83201" ry="2.83201" fill="white"/>
          </svg>
        </div>
      </div>
    </div>
  );
}



