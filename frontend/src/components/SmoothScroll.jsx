import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SmoothScroll = ({ children }) => {
  const lenisRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (prefersReducedMotion) {
      ScrollTrigger.refresh();
      return undefined;
    }

    try {
      const lenis = new Lenis({
        duration: isMobile ? 1.0 : 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: isMobile ? 1.2 : 1,
        lerp: 0.1,
        infinite: false,
        // Using passive listeners for better performance
        wrapper: window,
        content: document.documentElement,
        eventsTarget: window,
        smoothTouch: false, // Disable smooth touch to avoid lag on mobile
        syncTouch: false,
      });

      lenisRef.current = lenis;

      // Sync ScrollTrigger with Lenis
      lenis.on('scroll', ScrollTrigger.update);

      const ticker = (time) => {
        lenis.raf(time * 1000);
      };
      
      gsap.ticker.add(ticker);
      gsap.ticker.lagSmoothing(0);

      // Refresh ScrollTrigger after initial load
      const refreshTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);

      return () => {
        gsap.ticker.remove(ticker);
        lenis.destroy();
        lenisRef.current = null;
        clearTimeout(refreshTimeout);
        // Kill all scroll triggers associated with this section if needed
        // but usually they are killed by the components themselves
      };
    } catch (e) {
      console.error("Lenis initialization failed:", e);
      return undefined;
    }
  }, []);

  return <div className="smooth-scroll-wrapper">{children}</div>;
};

export default React.memo(SmoothScroll);
