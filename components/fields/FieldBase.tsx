'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FieldBaseProps {
  id: string;
  label?: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
  helpText?: string;
}

export function FieldBase({
  id,
  label,
  error,
  required,
  className,
  children,
  helpText,
}: FieldBaseProps): React.JSX.Element {
  return (
    <div className={cn('w-full space-y-3', className)}>
      {label && (
        <label
          htmlFor={id}
          className="block text-lg font-medium text-white/90"
        >
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      
      {children}
      
      {helpText && (
        <p className="text-sm text-white/60">{helpText}</p>
      )}
      
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="flex items-center space-x-2 text-red-400 text-sm"
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
    </div>
  );
}

// Composant pour les champs avec focus et validation
interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  success?: boolean;
}

export function InputField({
  error,
  success,
  className,
  ...props
}: InputFieldProps): React.JSX.Element {
  return (
    <input
      className={cn(
        'w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl',
        'text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50',
        'transition-all duration-200',
        'hover:bg-white/15 focus:bg-white/15',
        error && 'border-red-400 focus:ring-red-400',
        success && 'border-green-400 focus:ring-green-400',
        className
      )}
      {...props}
    />
  );
}

// Composant pour les textareas
interface TextareaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  success?: boolean;
}

export function TextareaField({
  error,
  success,
  className,
  ...props
}: TextareaFieldProps): React.JSX.Element {
  return (
    <textarea
      className={cn(
        'w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl',
        'text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50',
        'transition-all duration-200 resize-none',
        'hover:bg-white/15 focus:bg-white/15',
        'min-h-[120px]',
        error && 'border-red-400 focus:ring-red-400',
        success && 'border-green-400 focus:ring-green-400',
        className
      )}
      {...props}
    />
  );
}

// Composant pour les boutons
interface ButtonFieldProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export function ButtonField({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonFieldProps): React.JSX.Element {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-3xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent';
  
  const variantClasses = {
    primary: 'bg-white text-black hover:bg-white/90 focus:ring-white/50',
    secondary: 'bg-white/10 text-white border border-white/20 hover:bg-white/20 focus:ring-white/50',
    ghost: 'text-white hover:bg-white/10 focus:ring-white/50',
  };
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
