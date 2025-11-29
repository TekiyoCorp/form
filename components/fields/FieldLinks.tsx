'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InputField } from './FieldBase';
import { cn } from '@/lib/utils';
import { Link, Plus, X } from 'lucide-react';

interface FieldLinksProps {
    id: string;
    value?: string[];
    onChange: (value: string[]) => void;
    onBlur?: () => void;
    error?: string;
    required?: boolean;
    maxLinks?: number;
    placeholder?: string;
    className?: string;
}

export function FieldLinks({
    id,
    value = [],
    onChange,
    onBlur,
    error,
    required,
    maxLinks = 3,
    placeholder = 'URL',
    className,
}: FieldLinksProps): React.JSX.Element {
    // Ensure value is always an array
    const links = Array.isArray(value) ? value : [];

    // Local state for the input currently being typed
    const [currentInput, setCurrentInput] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    // Initialize with one empty string if empty (optional, but good for UX to start with one input)
    // Actually, let's keep it simple: we render inputs for existing links + 1 empty one if < maxLinks

    const handleAddLink = () => {
        if (links.length < maxLinks) {
            onChange([...links, '']);
        }
    };

    const handleLinkChange = (index: number, newValue: string) => {
        const newLinks = [...links];
        newLinks[index] = newValue;
        onChange(newLinks);
    };

    const handleRemoveLink = (index: number) => {
        const newLinks = links.filter((_, i) => i !== index);
        onChange(newLinks);
    };

    // If no links, start with one empty link
    useEffect(() => {
        if (links.length === 0) {
            onChange(['']);
        }
    }, []);

    // Handle Enter key to add new link or go to next slide
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();

            // If current input is not empty and we can add more links, add one
            if (links[index]?.trim() && links.length < maxLinks && index === links.length - 1) {
                handleAddLink();
            } else if (links.length > 0 && links.every(l => l.trim())) {
                // If all links are filled, try to go to next slide
                window.dispatchEvent(new CustomEvent('form:nextSlide', { detail: { fieldId: id } }));
            }
        }
    };

    return (
        <div className={cn('w-full max-w-[280px] md:max-w-[290px] mx-auto', className)}>
            <div className="space-y-4">
                <AnimatePresence initial={false}>
                    {links.map((link, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="relative group"
                        >
                            <div className="relative">
                                <InputField
                                    type="url"
                                    id={`${id}-${index}`}
                                    value={link}
                                    onChange={(e) => handleLinkChange(index, e.target.value)}
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => {
                                        setIsFocused(false);
                                        onBlur?.();
                                    }}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    placeholder={placeholder}
                                    className={cn(
                                        'w-full pl-5 pr-12 h-[45px] text-base', // Fixed height 45px
                                        'bg-white/10 backdrop-blur-sm rounded-full', // Rounded full as per image
                                        'text-white placeholder-white/50',
                                        'transition-all duration-200',
                                        'hover:bg-white/15',
                                        'focus:bg-white/20',
                                        'focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black/20',
                                        error && 'focus:ring-red-400'
                                    )}
                                />

                                {/* Link Icon inside input */}
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none">
                                    <Link size={20} />
                                </div>

                                {/* Remove button (only if more than 1 link) */}
                                {links.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveLink(index)}
                                        className="absolute -right-12 top-1/2 -translate-y-1/2 p-2 text-white/30 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                                        aria-label="Supprimer ce lien"
                                    >
                                        <X size={20} />
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Add Button */}
                {links.length < maxLinks && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-center pt-2"
                    >
                        <button
                            type="button"
                            onClick={handleAddLink}
                            className={cn(
                                "w-[45px] h-[45px] rounded-full border border-white/30 flex items-center justify-center",
                                "text-white/70 hover:bg-white/10 hover:border-white/50 hover:text-white",
                                "transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                            )}
                            aria-label="Ajouter un lien"
                        >
                            <Plus size={24} />
                        </button>
                    </motion.div>
                )}

                {/* Error Message */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-center space-x-3 text-red-400 text-sm mt-4"
                        role="alert"
                    >
                        <span className="font-medium">{error}</span>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
