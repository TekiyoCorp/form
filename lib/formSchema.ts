import { z } from 'zod';
import type { Slide, FieldType } from './types';

// Schémas de base pour chaque type de champ
const shortTextSchema = z.string().min(1, 'Ce champ est requis').max(180, 'Maximum 180 caractères');
const longTextSchema = z.string().min(1, 'Ce champ est requis').max(2000, 'Maximum 2000 caractères');
const emailSchema = z.string().email('Format d\'email invalide');
const selectSchema = z.string().min(1, 'Veuillez sélectionner une option');
const multiselectSchema = z.array(z.string()).min(1, 'Veuillez sélectionner au moins une option');
const dateSchema = z.string().min(1, 'Veuillez sélectionner une date');
const yesNoSchema = z.boolean();
const scaleSchema = z.number().min(1).max(7);
const consentSchema = z.boolean().refine(val => val === true, 'Vous devez accepter pour continuer');

// Fonction pour créer le schéma dynamique basé sur la configuration
export function createFormSchema(slides: Slide[]) {
  const schemaObject: Record<string, z.ZodTypeAny> = {};
  
  slides.forEach((slide) => {
    const { id, type, required, max, maxLength } = slide;
    
    let fieldSchema: z.ZodTypeAny;
    
    switch (type) {
      case 'short_text':
        fieldSchema = shortTextSchema;
        if (maxLength) {
          fieldSchema = fieldSchema.max(maxLength, `Maximum ${maxLength} caractères`);
        }
        break;
        
      case 'long_text':
        fieldSchema = longTextSchema;
        if (maxLength) {
          fieldSchema = fieldSchema.max(maxLength, `Maximum ${maxLength} caractères`);
        }
        break;
        
      case 'email':
        fieldSchema = emailSchema;
        break;
        
      case 'select':
        fieldSchema = selectSchema;
        break;
        
      case 'multiselect':
        fieldSchema = multiselectSchema;
        if (max) {
          fieldSchema = fieldSchema.max(max, `Maximum ${max} sélections`);
        }
        break;
        
      case 'date':
        fieldSchema = dateSchema;
        break;
        
      case 'yes_no':
        fieldSchema = yesNoSchema;
        break;
        
      case 'scale':
        fieldSchema = scaleSchema;
        break;
        
      case 'upload':
        fieldSchema = z.instanceof(File).nullable();
        break;
        
      case 'consent':
        fieldSchema = consentSchema;
        break;
        
      default:
        fieldSchema = z.string();
    }
    
    // Appliquer la logique required/optional
    if (required) {
      schemaObject[id] = fieldSchema;
    } else {
      schemaObject[id] = fieldSchema.optional();
    }
  });
  
  return z.object(schemaObject);
}

// Schéma pour la validation d'un champ individuel
export function createFieldSchema(slide: Slide) {
  const { type, required, max, maxLength } = slide;
  
  let fieldSchema: z.ZodTypeAny;
  
  switch (type) {
    case 'short_text':
      fieldSchema = z.string();
      if (required) fieldSchema = fieldSchema.min(1, 'Ce champ est requis');
      if (maxLength) fieldSchema = fieldSchema.max(maxLength, `Maximum ${maxLength} caractères`);
      break;
      
    case 'long_text':
      fieldSchema = z.string();
      if (required) fieldSchema = fieldSchema.min(1, 'Ce champ est requis');
      if (maxLength) fieldSchema = fieldSchema.max(maxLength, `Maximum ${maxLength} caractères`);
      break;
      
    case 'email':
      fieldSchema = z.string().email('Format d\'email invalide');
      if (required) fieldSchema = fieldSchema.min(1, 'Ce champ est requis');
      break;
      
    case 'select':
      fieldSchema = z.string();
      if (required) fieldSchema = fieldSchema.min(1, 'Veuillez sélectionner une option');
      break;
      
    case 'multiselect':
      fieldSchema = z.array(z.string());
      if (required) fieldSchema = fieldSchema.min(1, 'Veuillez sélectionner au moins une option');
      if (max) fieldSchema = fieldSchema.max(max, `Maximum ${max} sélections`);
      break;
      
    case 'date':
      fieldSchema = z.string();
      if (required) fieldSchema = fieldSchema.min(1, 'Veuillez sélectionner une date');
      break;
      
    case 'yes_no':
      fieldSchema = z.boolean();
      break;
      
    case 'scale':
      fieldSchema = z.number().min(1).max(7);
      break;
      
    case 'upload':
      fieldSchema = z.instanceof(File).nullable();
      break;
      
    case 'consent':
      fieldSchema = z.boolean().refine(val => val === true, 'Vous devez accepter pour continuer');
      break;
      
    default:
      fieldSchema = z.string();
  }
  
  return fieldSchema;
}

// Validation d'un champ individuel
export function validateField(slide: Slide, value: any): { isValid: boolean; error?: string } {
  try {
    const schema = createFieldSchema(slide);
    schema.parse(value);
    return { isValid: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { isValid: false, error: error.errors[0].message };
    }
    return { isValid: false, error: 'Erreur de validation' };
  }
}

// Validation complète du formulaire
export function validateForm(slides: Slide[], formData: Record<string, any>): { isValid: boolean; errors: Record<string, string> } {
  try {
    const schema = createFormSchema(slides);
    schema.parse(formData);
    return { isValid: true, errors: {} };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      error.errors.forEach((err) => {
        if (err.path[0]) {
          errors[err.path[0] as string] = err.message;
        }
      });
      return { isValid: false, errors };
    }
    return { isValid: false, errors: { general: 'Erreur de validation' } };
  }
}
