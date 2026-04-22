import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SmoothScroll = ({ children }) => {
  useEffect(() => {
    let lenis;
    try {
      lenis = new Lenis({
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.1,
        lerp: 0.05,
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);

      lenis.on('scroll', ScrollTrigger.update);

      const ticker = (time) => {
        lenis.raf(time * 1000);
      };
      
      gsap.ticker.add(ticker);

      return () => {
        lenis.destroy();
        gsap.ticker.remove(ticker);
      };
    } catch (e) {
      console.error("Lenis init failed", e);
    }
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;
