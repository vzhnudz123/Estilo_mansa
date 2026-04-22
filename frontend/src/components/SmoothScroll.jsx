import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SmoothScroll = ({ children }) => {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;

    if (prefersReducedMotion || isTouch) {
      ScrollTrigger.refresh();
      return undefined;
    }

    let lenis;
    try {
      lenis = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1,
        lerp: 0.075,
      });

      lenis.on('scroll', ScrollTrigger.update);

      const ticker = (time) => {
        lenis.raf(time * 1000);
      };
      
      gsap.ticker.add(ticker);
      gsap.ticker.lagSmoothing(0);
      ScrollTrigger.refresh();

      return () => {
        gsap.ticker.remove(ticker);
        lenis.destroy();
      };
    } catch (e) {
      console.error("Lenis init failed", e);
      return undefined;
    }
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;
