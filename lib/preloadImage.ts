interface PreloadImageOptions {
  src: string;
  priority?: boolean;
  onLoad?: (img: HTMLImageElement) => void;
  onError?: () => void;
}

class ImagePreloader {
  private cache = new Map<string, HTMLImageElement>();
  private loading = new Set<string>();
  private observers = new Map<string, IntersectionObserver>();

  /**
   * Précharge une image et la met en cache
   */
  preloadImage({ src, priority = false, onLoad, onError }: PreloadImageOptions): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      // Vérifier si l'image est déjà en cache
      if (this.cache.has(src)) {
        resolve(this.cache.get(src)!);
        return;
      }

      // Vérifier si l'image est déjà en cours de chargement
      if (this.loading.has(src)) {
        // Attendre que le chargement se termine
        const checkLoaded = () => {
          if (this.cache.has(src)) {
            resolve(this.cache.get(src)!);
          } else if (!this.loading.has(src)) {
            // En cas d'erreur, utiliser une image de fallback
            const fallbackImg = new Image();
            fallbackImg.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyMCIgaGVpZ2h0PSIxMDgwIiB2aWV3Qm94PSIwIDAgMTkyMCAxMDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTkyMCIgaGVpZ2h0PSIxMDgwIiBmaWxsPSIjMTExMTExIi8+Cjx0ZXh0IHg9Ijk2MCIgeT0iNTQwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNDgiIGZpbGw9IiM2NjY2NjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkltYWdlIG5vbiBkaXNwb25pYmxlPC90ZXh0Pgo8L3N2Zz4K';
            this.cache.set(src, fallbackImg);
            resolve(fallbackImg);
          } else {
            setTimeout(checkLoaded, 100);
          }
        };
        checkLoaded();
        return;
      }

      this.loading.add(src);

      const img = new Image();
      
      // Ajouter un timeout pour éviter les blocages
      const timeout = setTimeout(() => {
        this.loading.delete(src);
        // En cas de timeout, utiliser une image de fallback
        const fallbackImg = new Image();
        fallbackImg.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyMCIgaGVpZ2h0PSIxMDgwIiB2aWV3Qm94PSIwIDAgMTkyMCAxMDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTkyMCIgaGVpZ2h0PSIxMDgwIiBmaWxsPSIjMTExMTExIi8+Cjx0ZXh0IHg9Ijk2MCIgeT0iNTQwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNDgiIGZpbGw9IiM2NjY2NjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkltYWdlIG5vbiBkaXNwb25pYmxlPC90ZXh0Pgo8L3N2Zz4K';
        this.cache.set(src, fallbackImg);
        resolve(fallbackImg);
      }, 10000); // 10 secondes de timeout
      
      if (priority) {
        img.fetchPriority = 'high';
      }

      img.onload = () => {
        clearTimeout(timeout);
        this.cache.set(src, img);
        this.loading.delete(src);
        onLoad?.(img);
        resolve(img);
      };

      img.onerror = () => {
        clearTimeout(timeout);
        this.loading.delete(src);
        onError?.();
        
        // En cas d'erreur, utiliser une image de fallback au lieu de rejeter
        const fallbackImg = new Image();
        fallbackImg.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyMCIgaGVpZ2h0PSIxMDgwIiB2aWV3Qm94PSIwIDAgMTkyMCAxMDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTkyMCIgaGVpZ2h0PSIxMDgwIiBmaWxsPSIjMTExMTExIi8+Cjx0ZXh0IHg9Ijk2MCIgeT0iNTQwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNDgiIGZpbGw9IiM2NjY2NjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkltYWdlIG5vbiBkaXNwb25pYmxlPC90ZXh0Pgo8L3N2Zz4K';
        this.cache.set(src, fallbackImg);
        resolve(fallbackImg);
      };

      img.src = src;
    });
  }

  /**
   * Précharge les images des prochaines slides
   */
  preloadNextSlides(slides: string[], currentIndex: number): void {
    const nextSlides = slides.slice(currentIndex + 1, currentIndex + 3);
    nextSlides.forEach(src => {
      this.preloadImage({ src, priority: false });
    });
  }

  /**
   * Observe une slide pour déclencher le préchargement
   */
  observeSlide(slideId: string, src: string, callback: () => void): void {
    if (this.observers.has(slideId)) {
      this.observers.get(slideId)?.disconnect();
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.preloadImage({ src, priority: true, onLoad: callback });
            observer.disconnect();
            this.observers.delete(slideId);
          }
        });
      },
      { threshold: 0.1 }
    );

    this.observers.set(slideId, observer);
  }

  /**
   * Nettoie les ressources
   */
  cleanup(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
    this.loading.clear();
  }

  /**
   * Vérifie si une image est en cache
   */
  isCached(src: string): boolean {
    return this.cache.has(src);
  }

  /**
   * Récupère une image du cache
   */
  getCached(src: string): HTMLImageElement | undefined {
    return this.cache.get(src);
  }
}

// Instance singleton
export const imagePreloader = new ImagePreloader();

// Hook React pour utiliser le préchargeur
export function useImagePreloader() {
  return {
    preloadImage: imagePreloader.preloadImage.bind(imagePreloader),
    preloadNextSlides: imagePreloader.preloadNextSlides.bind(imagePreloader),
    observeSlide: imagePreloader.observeSlide.bind(imagePreloader),
    isCached: imagePreloader.isCached.bind(imagePreloader),
    getCached: imagePreloader.getCached.bind(imagePreloader),
  };
}

// Fonctions utilitaires
export function preloadImage(src: string): Promise<HTMLImageElement> {
  return imagePreloader.preloadImage({ src });
}

export function preloadImages(sources: string[]): Promise<HTMLImageElement[]> {
  return Promise.all(sources.map(src => preloadImage(src)));
}
