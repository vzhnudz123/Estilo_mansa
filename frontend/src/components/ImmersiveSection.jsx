import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import api from '../api/axios';

import img13 from '../assets/IMG_8813.jpeg';
import img14 from '../assets/IMG_8814.jpeg';
import img15 from '../assets/IMG_8815.jpeg';
import img16 from '../assets/IMG_8816.jpeg';

gsap.registerPlugin(ScrollTrigger);

const fallbackImages = [img13, img14, img15, img16];

const details = [
  ['Altitude', 'Mist-led mornings'],
  ['Mood', 'Quiet forest luxury'],
  ['Arrival', 'Private trail access'],
];

const ImmersiveSection = () => {
  const sectionRef = useRef(null);
  const mediaRef = useRef(null);
  const cardsRef = useRef([]);
  const [images, setImages] = useState(fallbackImages);

  useEffect(() => {
    api.get('/gallery/featured')
      .then(res => {
        const fetched = Array.isArray(res.data) ? res.data.map(item => item.url).filter(Boolean) : [];
        setImages(fetched.length >= 4 ? fetched.slice(0, 4) : fallbackImages);
      })
      .catch(() => setImages(fallbackImages));
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const media = mediaRef.current;
    const cards = cardsRef.current.filter(Boolean);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!section || reduceMotion) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.atmosphere-copy > *',
        { autoAlpha: 0, y: 36 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.1,
          ease: 'power3.out',
          stagger: 0.14,
          scrollTrigger: {
            trigger: section,
            start: 'top 72%',
          },
        }
      );

      gsap.fromTo(
        media,
        { scale: 1.06, y: 60, autoAlpha: 0.65 },
        {
          scale: 1,
          y: -45,
          autoAlpha: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.9,
          },
        }
      );

      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 80 + index * 24, autoAlpha: 0 },
          {
            y: index % 2 === 0 ? -36 : -72,
            autoAlpha: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top 82%',
              end: 'bottom 18%',
              scrub: 0.8,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, [images]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-obsidian py-28 md:py-44">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_28%,rgba(197,160,89,0.12),transparent_34%),linear-gradient(180deg,rgba(5,7,6,0),rgba(13,17,15,0.72))]" />
      <div className="absolute left-0 top-20 hidden h-px w-1/3 bg-gradient-to-r from-gold/35 to-transparent md:block" />
      <div className="container relative z-10 mx-auto px-6 md:px-12">
        <div className="grid items-center gap-16 lg:grid-cols-[0.82fr_1.18fr] lg:gap-24">
          <div className="atmosphere-copy max-w-xl">
            <span className="section-label mb-8 block">THE ATMOSPHERE</span>
            <h2 className="premium-h2 text-ivory">
              Luxury that moves with the <span className="italic-serif text-gold">mist</span>
            </h2>
            <p className="mt-8 text-lg font-light leading-relaxed text-cream/68 md:text-xl">
              Layered views, tactile materials, and quiet corners unfold with the calm rhythm of the highlands.
            </p>

            <div className="mt-12 grid gap-5 sm:grid-cols-3">
              {details.map(([label, value]) => (
                <div key={label} className="border-l border-gold/25 pl-5">
                  <p className="text-[10px] uppercase tracking-[0.32em] text-gold/55">{label}</p>
                  <p className="mt-3 font-serif text-xl text-ivory">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[620px] md:min-h-[760px]">
            <div
              ref={mediaRef}
              className="absolute inset-x-0 top-8 mx-auto h-[560px] max-w-[760px] overflow-hidden rounded-[2px] border border-white/10 shadow-[0_60px_140px_rgba(0,0,0,0.55)] md:h-[680px]"
            >
              <img
                src={images[0]}
                alt="Estilo Mansa atmosphere"
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/85 via-transparent to-white/5" />
              <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between gap-6">
                <div>
                  <p className="section-label mb-3">WAYANAD</p>
                  <p className="max-w-sm font-serif text-3xl text-ivory md:text-4xl">Every frame holds the hush of the valley.</p>
                </div>
                <div className="hidden h-24 w-px bg-gradient-to-b from-transparent via-gold/60 to-transparent md:block" />
              </div>
            </div>

            {images.slice(1, 4).map((src, index) => (
              <div
                key={src}
                ref={el => { cardsRef.current[index] = el; }}
                className={[
                  'absolute hidden overflow-hidden rounded-[2px] border border-white/10 bg-forest shadow-[0_35px_90px_rgba(0,0,0,0.42)] md:block',
                  index === 0 ? 'left-0 top-0 h-56 w-44 lg:h-72 lg:w-56' : '',
                  index === 1 ? 'right-0 top-28 h-64 w-48 lg:h-80 lg:w-60' : '',
                  index === 2 ? 'bottom-0 left-[18%] h-52 w-72 lg:h-60 lg:w-96' : '',
                ].join(' ')}
              >
                <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" decoding="async" />
                <div className="absolute inset-0 bg-obsidian/15" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImmersiveSection;
