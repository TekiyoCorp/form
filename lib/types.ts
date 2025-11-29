export interface FormConfig {
  title: string;
  theme: ThemeConfig;
  slides: Slide[];
}

export interface ThemeConfig {
  mode: 'light' | 'dark';
  primary: string;
  overlayOpacity: number;
}

export interface Slide {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  required: boolean;
  bg?: string;
  options?: string[];
  maxLength?: number;
  max?: number;
  min?: number;
}

export type FieldType =
  | 'short_text'
  | 'long_text'
  | 'email'
  | 'select'
  | 'multiselect'
  | 'date'
  | 'yes_no'
  | 'scale'
  | 'upload'
  | 'consent'
  | 'contact'
  | 'links';

export interface FormData {
  [key: string]: string | string[] | boolean | number | File | null | {
    fullName: string;
    email: string;
    company: string;
    phone: string;
  };
}

export interface FormState {
  currentSlide: number;
  totalSlides: number;
  formData: FormData;
  completedSlides: Set<number>;
  isSubmitting: boolean;
  errors: Record<string, string>;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export interface ExportOptions {
  format: 'json' | 'pdf';
  includeMetadata?: boolean;
}

export interface PreloadImageOptions {
  src: string;
  priority?: boolean;
}

export interface KeyboardNavigation {
  onNext: () => void;
  onPrevious: () => void;
  onEnter: () => void;
  onEscape: () => void;
  onArrowUp: () => void;
  onArrowDown: () => void;
}

export interface SlideNavigation {
  goToSlide: (index: number) => void;
  nextSlide: () => void;
  previousSlide: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
}
