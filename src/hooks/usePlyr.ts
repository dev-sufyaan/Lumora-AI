import { useState, useEffect } from 'react';

/**
 * Custom hook to safely load Plyr on the client side
 * @returns An object containing the Plyr constructor and loading state
 */
export function usePlyr() {
  const [plyr, setPlyr] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined') return;

    let isMounted = true;

    const loadPlyr = async () => {
      try {
        setLoading(true);
        const plyrModule = await import('plyr');
        
        if (isMounted) {
          setPlyr(plyrModule.default);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Failed to load Plyr'));
          setLoading(false);
          console.error('Error loading Plyr:', err);
        }
      }
    };

    loadPlyr();

    return () => {
      isMounted = false;
    };
  }, []);

  return { plyr, loading, error };
}

/**
 * Safely initializes a Plyr instance on the client side
 * @param element The HTML element to initialize Plyr on
 * @param options Plyr options
 * @returns A promise that resolves to the Plyr instance or null if initialization failed
 */
export function initPlyr(element: HTMLElement | null, options: any): Promise<any> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !element) {
      resolve(null);
      return;
    }
    
    try {
      // Dynamic import to ensure client-side only execution
      import('plyr')
        .then((PlyrModule) => {
          try {
            const Plyr = PlyrModule.default;
            const player = new Plyr(element, options);
            
            // Wait for player to be ready
            player.on('ready', () => {
              resolve(player);
            });
            
            // Resolve after a timeout in case 'ready' event doesn't fire
            setTimeout(() => {
              resolve(player);
            }, 1000);
          } catch (error) {
            console.error('Failed to initialize Plyr:', error);
            resolve(null);
          }
        })
        .catch((error) => {
          console.error('Failed to import Plyr:', error);
          resolve(null);
        });
    } catch (error) {
      console.error('Error in initPlyr:', error);
      resolve(null);
    }
  });
} 