'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Sun, 
  Moon, 
  HelpCircle, 
  Menu,
  X,
  Download,
  FileText,
  RotateCcw,
  Settings
} from 'lucide-react';

interface BottomHUDProps {
  onThemeToggle: () => void;
  onMusicToggle: () => void;
  onSoundToggle: () => void;
  onExportJSON: () => void;
  onExportPDF: () => void;
  onReset: () => void;
  isMusicPlaying: boolean;
  isSoundEnabled: boolean;
  isDarkMode: boolean;
  className?: string;
}

export function BottomHUD({
  onThemeToggle,
  onMusicToggle,
  onSoundToggle,
  onExportJSON,
  onExportPDF,
  onReset,
  isMusicPlaying,
  isSoundEnabled,
  isDarkMode,
  className,
}: BottomHUDProps): React.JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Fermer le menu en cliquant à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleHelpToggle = () => {
    setShowHelp(!showHelp);
  };

  return (
    <>
      {/* HUD principal */}
      <div className={cn('fixed bottom-6 right-6 z-40', className)}>
        <div className="flex items-center space-x-3">
          {/* Bouton d'aide */}
          <motion.button
            onClick={handleHelpToggle}
            className="p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Aide"
          >
            <HelpCircle className="w-5 h-5" />
          </motion.button>

          {/* Bouton de thème */}
          <motion.button
            onClick={onThemeToggle}
            className="p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Changer de thème"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </motion.button>

          {/* Bouton de son */}
          <motion.button
            onClick={onSoundToggle}
            className="p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={isSoundEnabled ? 'Désactiver le son' : 'Activer le son'}
          >
            {isSoundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </motion.button>

          {/* Bouton de musique */}
          <motion.button
            onClick={onMusicToggle}
            className="p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={isMusicPlaying ? 'Pause musique' : 'Play musique'}
          >
            {isMusicPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </motion.button>

          {/* Bouton de menu */}
          <motion.button
            onClick={handleMenuToggle}
            className="p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Menu"
          >
            <Menu className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* Menu contextuel */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-64 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-xl"
          >
            <div className="p-4 space-y-3">
              {/* En-tête du menu */}
              <div className="flex items-center justify-between pb-2 border-b border-white/20">
                <h3 className="text-white font-medium">Menu</h3>
                <button
                  onClick={handleMenuToggle}
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* Options du menu */}
              <div className="space-y-2">
                <button
                  onClick={onExportJSON}
                  className="w-full flex items-center space-x-3 p-3 text-left text-white hover:bg-white/20 rounded-lg transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Exporter JSON</span>
                </button>

                <button
                  onClick={onExportPDF}
                  className="w-full flex items-center space-x-3 p-3 text-left text-white hover:bg-white/20 rounded-lg transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  <span>Exporter PDF</span>
                </button>

                <button
                  onClick={onReset}
                  className="w-full flex items-center space-x-3 p-3 text-left text-white hover:bg-white/20 rounded-lg transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Recommencer</span>
                </button>

                <button
                  onClick={onThemeToggle}
                  className="w-full flex items-center space-x-3 p-3 text-left text-white hover:bg-white/20 rounded-lg transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  <span>Paramètres</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Aide contextuelle */}
      <AnimatePresence>
        {showHelp && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 left-6 z-50 w-80 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-xl"
          >
            <div className="p-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/20">
                <h3 className="text-white font-medium">Aide</h3>
                <button
                  onClick={handleHelpToggle}
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
              
              <div className="mt-3 space-y-2 text-white/80 text-sm">
                <p><strong>Navigation :</strong></p>
                <ul className="ml-4 space-y-1">
                  <li>• Flèches haut/bas pour naviguer</li>
                  <li>• Enter pour valider et continuer</li>
                  <li>• Shift+Enter pour nouvelle ligne</li>
                  <li>• ESC pour ouvrir le menu</li>
                </ul>
                
                <p className="pt-2"><strong>Raccourcis :</strong></p>
                <ul className="ml-4 space-y-1">
                  <li>• Espace pour cocher/décocher</li>
                  <li>• Flèches gauche/droite pour oui/non</li>
                  <li>• Molette pour faire défiler</li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
