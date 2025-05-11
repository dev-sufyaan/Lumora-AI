import { useEffect, useRef } from 'react';

export const useClickOutside = (handler: () => void) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const handlerRef = useRef(handler);

    // Update the ref when handler changes
    useEffect(() => {
        handlerRef.current = handler;
    }, [handler]);

    useEffect(() => {
        // Use mouseup instead of mousedown to ensure it doesn't interfere with button clicks
        const handleClickOutside = (event: MouseEvent) => {
            // Skip if the click target is a button or inside a button
            const target = event.target as HTMLElement;
            if (target && (target.tagName === 'BUTTON' || target.closest('button'))) {
                return;
            }
            
            // Only trigger if clicking outside the ref element
            if (ref.current && !ref.current.contains(event.target as Node)) {
                handlerRef.current();
            }
        };

        // Use a small timeout to ensure this runs after other click handlers
        const handleClickOutsideWithDelay = (event: MouseEvent) => {
            setTimeout(() => handleClickOutside(event), 10);
        };

        document.addEventListener('mouseup', handleClickOutsideWithDelay);

        return () => {
            document.removeEventListener('mouseup', handleClickOutsideWithDelay);
        };
    }, []);

    return ref;
};
