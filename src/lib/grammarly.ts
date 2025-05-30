/**
 * Grammarly integration utility functions
 * This provides a centralized way to manage Grammarly functionality across components
 */

// The client ID for Grammarly integration
const GRAMMARLY_CLIENT_ID = 'client_KXDT9UGF8J1po7KnTiZaVY';

// Global flag to track if Grammarly is already loaded
let grammarlyLoaded = false;
let grammarlyLoadAttempted = false;
let loadError: Error | null = null;

/**
 * Initializes Grammarly on a given HTML element
 * @param element The DOM element to attach Grammarly to
 * @returns A cleanup function to remove Grammarly
 */
export const initializeGrammarly = (element: HTMLElement | null): (() => void) => {
  if (!element) return () => {};
  
  // If we've already tried and failed to load Grammarly, don't try again
  if (grammarlyLoadAttempted && loadError) {
    console.warn('Grammarly previously failed to load:', loadError);
    return () => {};
  }

  // If Grammarly is already loaded, just add the data attribute
  if (grammarlyLoaded) {
    element.setAttribute('data-grammarly-enabled', 'true');
    return () => {
      element.removeAttribute('data-grammarly-enabled');
    };
  }

  try {
    // Create the Grammarly script
    const script = document.createElement('script');
    script.src = 'https://js.grammarly.com/grammarly-editor.js';
    script.async = true;
    script.setAttribute('data-grammarly-client-id', GRAMMARLY_CLIENT_ID);
    script.setAttribute('data-grammarly-dialect', 'american');
    
    // Add event listeners to track loading status
    script.addEventListener('load', () => {
      grammarlyLoaded = true;
      console.log('Grammarly loaded successfully');
    });
    
    script.addEventListener('error', (e) => {
      loadError = new Error('Failed to load Grammarly script');
      console.error('Error loading Grammarly:', e);
    });
    
    // Add the script to the element
    element.appendChild(script);
    element.setAttribute('data-grammarly-enabled', 'true');
    
    grammarlyLoadAttempted = true;
    
    // Return cleanup function
    return () => {
      if (element.contains(script)) {
        element.removeChild(script);
      }
      element.removeAttribute('data-grammarly-enabled');
    };
  } catch (error) {
    loadError = error instanceof Error ? error : new Error('Unknown error initializing Grammarly');
    console.error('Error initializing Grammarly:', error);
    return () => {};
  }
};

/**
 * Checks if Grammarly has been successfully loaded
 */
export const isGrammarlyLoaded = (): boolean => {
  return grammarlyLoaded;
};

/**
 * Checks if there was an error loading Grammarly
 */
export const getGrammarlyError = (): Error | null => {
  return loadError;
};
