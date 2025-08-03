import { useState, useEffect, useRef } from 'react';

// This custom hook detects when a component scrolls into the viewport
export const useOnScreen = (options) => {
    const ref = useRef();
    const [isOnScreen, setIsOnScreen] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsOnScreen(true);
                // We can unobserve after it's visible to save resources
                observer.unobserve(entry.target);
            }
        }, options);

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [ref, options]);

    return [ref, isOnScreen];
};