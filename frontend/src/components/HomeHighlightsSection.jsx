import React, { memo, useEffect, useRef } from 'react';
import LazyVideo from './ui/LazyVideo';
import OptimizedImage from './ui/OptimizedImage';

import sofaArea from '../assets/sofaarea.webp';
import roomThree from '../assets/room3.webp';
import kasaMain from '../assets/Kasa.webp';
import kasaArea from '../assets/kasaarea.webp';
import djAreaPoster from '../assets/djareamain.webp';
import djAreaVideo from '../assets/djarea.mp4';
import homeWalkthroughVideo from '../assets/WhatsApp Video 2026-05-02 at 09.56.16.mp4';

const highlightCards = [
  {
    title: 'Sofa Area',
    description: 'A laid-back corner for conversations, coffee, and slow evenings.',
    image: sofaArea,
  },
  {
    title: 'Room View',
    description: 'A warm stay experience with soft light and a restful private feel.',
    image: roomThree,
  },
  {
    title: 'Kasa Corner',
    description: 'A character-filled nook that adds charm to the home experience.',
    image: kasaMain,
  },
  {
    title: 'Kasa Area',
    description: 'An inviting shared space designed for easy moments and small gatherings.',
    image: kasaArea,
  },
];

const HomeHighlightsSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const elements = Array.from(section.querySelectorAll('.fade-up'));
    if (elements.length === 0) return undefined;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 bg-[radial-gradient(circle_at_top,rgba(200,169,110,0.08),transparent_22%),linear-gradient(180deg,#060907_0%,#0b100d_100%)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
        <div className="fade-up mb-12 md:mb-14 text-center">
          <p className="section-label mb-4 md:mb-5">Signature Spaces</p>
          <h2 className="font-serif text-[2.25rem] leading-[1.05] sm:text-4xl md:text-5xl text-luxury-cream">
            Discover More of the{' '}
            <em className="font-script text-luxury-gold not-italic">Home</em>
          </h2>
          <p className="mt-4 max-w-2xl text-sm md:text-base leading-7 text-luxury-text/60 mx-auto">
            From intimate corners inside the stay to the open balcony DJ area outside, these
            spaces bring a little more of Estilo Mansa into the Home tab.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div className="fade-up overflow-hidden rounded-[1.75rem] sm:rounded-[2rem] border border-white/10 bg-white/[0.03] shadow-2xl">
            <div className="relative">
              <LazyVideo
                src={djAreaVideo}
                poster={djAreaPoster}
                alt="Balcony DJ area at Estilo Mansa"
                buttonLabel="Play balcony DJ area video"
                className="aspect-[4/5] sm:aspect-[16/10] w-full"
                videoClassName="h-full w-full object-cover"
                muted
                showCenterPlaybackButton
                showButtonLabel={false}
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
              </LazyVideo>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5 sm:p-6 md:p-8">
                <p className="section-label mb-2 sm:mb-3 text-white/75">Balcony Section</p>
                <h3 className="font-serif text-[1.9rem] sm:text-3xl md:text-4xl text-white">DJ Area</h3>
                <p className="mt-2 sm:mt-3 max-w-xl text-sm md:text-base leading-6 sm:leading-7 text-white/70">
                  A balcony-side hangout with an energetic setup for music, views, and evening
                  gatherings.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6">
            <article className="fade-up overflow-hidden rounded-[1.6rem] sm:rounded-[1.75rem] border border-white/10 bg-white/[0.03] shadow-xl">
              <div className="relative">
                <LazyVideo
                  src={homeWalkthroughVideo}
                  poster={sofaArea}
                  alt="Stay walkthrough at Estilo Mansa"
                  buttonLabel="Play home walkthrough video"
                  className="min-h-[24rem] sm:min-h-[26rem] lg:min-h-[30rem] w-full bg-black"
                  videoClassName="h-full w-full object-contain bg-black"
                  muted
                  posterObjectFit="contain"
                  showCenterPlaybackButton
                  showButtonLabel={false}
                >
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                </LazyVideo>

                <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <p className="section-label mb-2 text-white/75">Home Experience</p>
                  <h3 className="font-serif text-2xl sm:text-[2rem] text-white">Stay Walkthrough</h3>
                  <p className="mt-2 text-sm leading-6 text-white/72">
                    A quick moving look through the stay so guests can feel the mood before they
                    arrive.
                  </p>
                </div>
              </div>
            </article>

            <div className="flex overflow-x-auto sm:grid sm:grid-cols-2 gap-4 pb-4 sm:pb-0 hide-scrollbar snap-x snap-mandatory">
              {highlightCards.map((card, index) => (
                <article
                  key={card.title}
                  className="fade-up flex-none w-[78vw] snap-center overflow-hidden rounded-[1.35rem] sm:rounded-[1.5rem] border border-white/10 bg-white/[0.03] shadow-xl sm:w-auto"
                  style={{ transitionDelay: `${index * 0.08}s` }}
                >
                  <div className="relative">
                    <OptimizedImage
                      src={card.image}
                      alt={card.title}
                      aspectRatio="4/3"
                      className="w-full"
                      sizes="(min-width: 1024px) 28vw, (min-width: 640px) 44vw, 78vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                      <h4 className="font-serif text-xl sm:text-2xl text-white">{card.title}</h4>
                      <p className="mt-2 text-sm leading-6 text-white/72">{card.description}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(HomeHighlightsSection);
