'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Upload, X, File } from 'lucide-react';

interface FieldUploadProps {
  id: string;
  value?: File[];
  onChange: (value: File[]) => void;
  onBlur?: () => void;
  error?: string;
  required?: boolean;
  multiple?: boolean;
  accept?: string;
  maxSize?: number; // en MB
  className?: string;
}

export function FieldUpload({
  id,
  value = [],
  onChange,
  onBlur,
  error,
  required,
  multiple = false,
  accept,
  maxSize = 10,
  className,
}: FieldUploadProps): React.JSX.Element {
  const [isFocused, setIsFocused] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const newFiles = Array.from(files);
    const validFiles = newFiles.filter(file => {
      if (maxSize && file.size > maxSize * 1024 * 1024) {
        alert(`Le fichier ${file.name} est trop volumineux. Taille max: ${maxSize}MB`);
        return false;
      }
      return true;
    });

    if (multiple) {
      onChange([...value, ...validFiles]);
    } else {
      onChange(validFiles);
    }
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = value.filter((_, i) => i !== index);
    onChange(newFiles);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.length > 0) {
        window.dispatchEvent(new CustomEvent('form:nextSlide', { detail: { fieldId: id } }));
      }
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={cn('w-full space-y-3', className)}>
      <div
        className="space-y-3"
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="group"
        aria-labelledby={`${id}-label`}
        aria-describedby={`${id}-help ${id}-error`}
        aria-invalid={!!error}
        aria-required={required}
      >
        {/* Zone de dépôt - Responsive */}
        <div
          className={cn(
            'relative border-2 border-dashed rounded-3xl transition-all duration-200',
            'hover:border-white/40 hover:bg-white/5',
            'p-4 sm:p-6 lg:p-8 text-center',
            isDragOver && 'border-white/60 bg-white/10',
            error ? 'border-red-400' : 'border-white/20',
            isFocused && 'ring-2 ring-white/50'
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple={multiple}
            accept={accept}
            onChange={(e) => handleFileSelect(e.target.files)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            aria-describedby={`${id}-help`}
          />
          
          <div className="space-y-3 sm:space-y-4">
            <div className="flex justify-center">
              <Upload className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white/50" />
            </div>
            
            <div className="space-y-2">
              <p className="text-white font-medium text-base sm:text-lg" style={{ letterSpacing: '-0.06em' }}>
                Glissez vos fichiers ici ou cliquez pour sélectionner
              </p>
              <p className="text-white/60 text-sm" style={{ letterSpacing: '-0.06em' }}>
                {multiple ? 'Plusieurs fichiers acceptés' : 'Un seul fichier accepté'} • Taille max: {maxSize}MB
              </p>
            </div>
          </div>
        </div>

        {/* Fichiers sélectionnés - Responsive */}
        {value.length > 0 && (
          <div className="space-y-2">
            {value.map((file, index) => (
              <motion.div
                key={`${file.name}-${index}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between p-2 sm:p-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl"
              >
                <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                  <File className="w-4 h-4 sm:w-5 sm:h-5 text-white/50 flex-shrink-0" />
                  <div className="text-left min-w-0 flex-1">
                    <p className="text-white font-medium text-sm truncate" style={{ letterSpacing: '-0.06em' }}>
                      {file.name}
                    </p>
                    <p className="text-white/60 text-xs" style={{ letterSpacing: '-0.06em' }}>
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                
                <button
                  type="button"
                  onClick={() => handleRemoveFile(index)}
                  className="p-1 hover:bg-white/20 rounded-full transition-colors flex-shrink-0 ml-2"
                  aria-label="Supprimer le fichier"
                >
                  <X className="w-4 h-4 text-white/60" />
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Message d'erreur */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-2 text-red-400 text-sm"
          role="alert"
          aria-live="polite"
          style={{ letterSpacing: '-0.06em' }}
        >
          <svg
            className="w-4 h-4 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <span>{error}</span>
        </motion.div>
      )}

      {/* Bouton Suivant */}
      {value.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent('form:nextSlide', { detail: { fieldId: id } }))}
            className="px-6 py-3 bg-white text-black rounded-3xl hover:bg-gray-100 transition-colors font-medium"
            style={{ letterSpacing: '-0.06em' }}
          >
            Suivant
          </button>
        </motion.div>
      )}
    </div>
  );
}
