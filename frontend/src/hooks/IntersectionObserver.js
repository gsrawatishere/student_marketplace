import { useEffect, useRef, useCallback } from 'react';

const useIntersectionObserver = (callback, options) => {
  const observerTarget = useRef(null);

  const handleIntersect = useCallback(([entry]) => {
    if (entry.isIntersecting) {
      callback();
    }
  }, [callback]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersect, options);
    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }
    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [handleIntersect, options]);

  return observerTarget;
};

export default useIntersectionObserver;
