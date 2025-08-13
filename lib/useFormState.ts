import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { FormState, FormData, Slide } from './types';

interface FormStore extends FormState {
  // Actions
  setCurrentSlide: (slideIndex: number) => void;
  updateField: (fieldId: string, value: any) => void;
  validateCurrentSlide: () => boolean;
  nextSlide: () => void;
  previousSlide: () => void;
  goToSlide: (slideIndex: number) => void;
  resetForm: () => void;
  setError: (fieldId: string, error: string) => void;
  clearError: (fieldId: string) => void;
  setSubmitting: (isSubmitting: boolean) => void;
  initializeForm: (slides: Slide[]) => void;
  canGoNext: () => boolean;
  canGoPrevious: () => boolean;
  getProgress: () => number;
  isSlideCompleted: (slideIndex: number) => boolean;
}

const STORAGE_KEY = 'formulaire-tekiyo-state';

export const useFormStore = create<FormStore>()(
  persist(
    (set, get) => ({
      // État initial
      currentSlide: 0,
      totalSlides: 0,
      formData: {},
      completedSlides: new Set(),
      isSubmitting: false,
      errors: {},

      // Actions
      setCurrentSlide: (slideIndex: number) => {
        set({ currentSlide: slideIndex });
      },

      updateField: (fieldId: string, value: any) => {
        const { formData, errors } = get();
        const newFormData = { ...formData, [fieldId]: value };
        const newErrors = { ...errors };
        
        // Valider le champ
        const currentSlides = get().totalSlides;
        if (currentSlides > 0) {
          // Simuler la validation - en réalité, on aurait besoin de la slide actuelle
          delete newErrors[fieldId];
        }
        
        set({ 
          formData: newFormData, 
          errors: newErrors 
        });
        
        // Autosave automatique - géré par Zustand persist
      },

      validateCurrentSlide: () => {
        const { currentSlide, totalSlides, formData } = get();
        if (totalSlides === 0) return false;
        
        // Cette fonction devrait recevoir la slide actuelle en paramètre
        // Pour l'instant, on retourne true
        return true;
      },

      nextSlide: () => {
        const { currentSlide, totalSlides, canGoNext } = get();
        if (canGoNext()) {
          set({ currentSlide: currentSlide + 1 });
        }
      },

      previousSlide: () => {
        const { currentSlide, canGoPrevious } = get();
        if (canGoPrevious()) {
          set({ currentSlide: currentSlide - 1 });
        }
      },

      goToSlide: (slideIndex: number) => {
        const { totalSlides } = get();
        if (slideIndex >= 0 && slideIndex < totalSlides) {
          set({ currentSlide: slideIndex });
        }
      },

      resetForm: () => {
        set({
          currentSlide: 0,
          formData: {},
          completedSlides: new Set(),
          errors: {},
          isSubmitting: false,
        });
        localStorage.removeItem(STORAGE_KEY);
      },

      setError: (fieldId: string, error: string) => {
        const { errors } = get();
        set({ errors: { ...errors, [fieldId]: error } });
      },

      clearError: (fieldId: string) => {
        const { errors } = get();
        const newErrors = { ...errors };
        delete newErrors[fieldId];
        set({ errors: newErrors });
      },

      setSubmitting: (isSubmitting: boolean) => {
        set({ isSubmitting });
      },

      initializeForm: (slides: Slide[]) => {
        set({ totalSlides: slides.length });
        
        // Vérifier s'il y a des données sauvegardées
        const savedState = localStorage.getItem(STORAGE_KEY);
        if (savedState) {
          try {
            const parsed = JSON.parse(savedState);
            if (parsed.formData && Object.keys(parsed.formData).length > 0) {
              // Proposer de reprendre la session
              set({ 
                formData: parsed.formData,
                completedSlides: new Set(parsed.completedSlides || [])
              });
            }
          } catch (error) {
            console.error('Erreur lors du chargement des données sauvegardées:', error);
          }
        }
      },

      canGoNext: () => {
        const { currentSlide, totalSlides } = get();
        return currentSlide < totalSlides - 1;
      },

      canGoPrevious: () => {
        const { currentSlide } = get();
        return currentSlide > 0;
      },

      getProgress: () => {
        const { completedSlides, totalSlides } = get();
        if (totalSlides === 0) return 0;
        return (completedSlides.size / totalSlides) * 100;
      },

      isSlideCompleted: (slideIndex: number) => {
        const { completedSlides } = get();
        return completedSlides.has(slideIndex);
      },

      // Méthode privée pour la sauvegarde
      saveToLocalStorage: () => {
        const { formData, completedSlides, currentSlide } = get();
        const stateToSave = {
          formData,
          completedSlides: Array.from(completedSlides),
          currentSlide,
          timestamp: Date.now(),
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
      },
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({
        formData: state.formData,
        completedSlides: Array.from(state.completedSlides),
        currentSlide: state.currentSlide,
      }),
    }
  )
);

// Hooks utilitaires
export const useFormProgress = () => {
  const { getProgress, totalSlides, completedSlides } = useFormStore();
  return {
    progress: getProgress(),
    totalSlides,
    completedCount: completedSlides.size,
  };
};

export const useCurrentSlide = () => {
  const { currentSlide, totalSlides, canGoNext, canGoPrevious } = useFormStore();
  return {
    currentSlide,
    totalSlides,
    canGoNext: canGoNext(),
    canGoPrevious: canGoPrevious(),
  };
};

export const useFormValidation = () => {
  const { errors, setError, clearError } = useFormStore();
  return {
    errors,
    setError,
    clearError,
    hasErrors: Object.keys(errors).length > 0,
  };
};
