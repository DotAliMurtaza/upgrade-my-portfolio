import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { motion } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface CinematicIntroProps {
  avatarSrc: string;
  onComplete: () => void;
}

const NAME_CHARS = PERSONAL_INFO.name.toUpperCase().split('');

export function CinematicIntro({ avatarSrc, onComplete }: CinematicIntroProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const spotlightBeamRef = useRef<HTMLDivElement>(null);
  const spotlightPoolRef = useRef<HTMLDivElement>(null);
  const photoContainerRef = useRef<HTMLDivElement>(null);
  const photoImgRef = useRef<HTMLImageElement>(null);
  const nameLettersRef = useRef<Array<HTMLSpanElement | null>>([]);
  const greenSweepRef = useRef<HTMLDivElement>(null);
  const completedRef = useRef(false);
  const exitTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isExiting, setIsExiting] = useState(false);

  const triggerExit = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    setIsExiting(true);
    exitTimeoutRef.current = setTimeout(() => {
      onComplete();
    }, 850);
  };

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      const quickTimer = setTimeout(triggerExit, 9150);
      return () => {
        clearTimeout(quickTimer);
        if (exitTimeoutRef.current) clearTimeout(exitTimeoutRef.current);
      };
    }

    const ctx = gsap.context(() => {
      gsap.set(spotlightBeamRef.current, { opacity: 0, scaleY: 0.4, transformOrigin: 'top center' });
      gsap.set(spotlightPoolRef.current, { opacity: 0, scale: 0.7 });
      gsap.set(photoContainerRef.current, { opacity: 0, y: 48, scale: 0.88, filter: 'brightness(0.2)' });
      gsap.set(photoImgRef.current, { scale: 1 });
      gsap.set(nameLettersRef.current.filter(Boolean), { opacity: 0, y: 18 });
      gsap.set(greenSweepRef.current, { xPercent: -120, opacity: 0 });

      const tl = gsap.timeline();

      // 0.0–1.8s: Black cinematic screen; dramatic white spotlight turns on from TOP
      tl.to(
        spotlightBeamRef.current,
        {
          opacity: 1,
          scaleY: 1,
          duration: 1.7,
          ease: 'power2.out',
        },
        0.1
      ).to(
        spotlightPoolRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: 'power2.out',
        },
        0.35
      );

      // 1.8–3.8s: Real photograph slowly emerges from darkness into center of spotlight
      tl.to(
        photoContainerRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 0.96,
          filter: 'brightness(0.75)',
          duration: 2.0,
          ease: 'power2.out',
        },
        1.8
      );

      // 3.8–5.6s: Photograph becomes fully illuminated with soft shadows & cinematic zoom
      tl.to(
        photoContainerRef.current,
        {
          scale: 1.03,
          filter: 'brightness(1)',
          duration: 1.8,
          ease: 'power1.inOut',
        },
        3.8
      ).to(
        photoImgRef.current,
        {
          scale: 1.06,
          duration: 1.8,
          ease: 'power1.inOut',
        },
        3.8
      );

      // 5.6–7.4s: Name ALI MURTAZA appears letter by letter in large elegant white typography
      tl.to(
        nameLettersRef.current.filter(Boolean),
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.115,
          ease: 'power3.out',
        },
        5.6
      );

      // 7.4–9.15s: Subtle green light sweep across name while portrait & name stay illuminated
      tl.to(
        greenSweepRef.current,
        {
          opacity: 0.95,
          duration: 0.2,
        },
        7.45
      )
        .to(
          greenSweepRef.current,
          {
            xPercent: 140,
            duration: 1.45,
            ease: 'power2.inOut',
          },
          7.5
        )
        .to(
          greenSweepRef.current,
          {
            opacity: 0,
            duration: 0.2,
          },
          8.95
        );

      // 9.15–10.0s: Smooth 0.85s upward slide transition finishing at exact 10.0s
      tl.call(() => triggerExit(), [], 9.15);
    }, rootRef);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        triggerExit();
      }
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      ctx.revert();
      window.removeEventListener('keydown', onKeyDown);
      if (exitTimeoutRef.current) clearTimeout(exitTimeoutRef.current);
    };
  }, []);

  return (
    <motion.div
      ref={rootRef}
      initial={{ y: '0%', opacity: 1 }}
      animate={
        isExiting
          ? { y: '-100%', opacity: 0.92 }
          : { y: '0%', opacity: 1 }
      }
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] bg-[#04060A] flex flex-col items-center justify-center overflow-hidden select-none px-4 will-change-transform"
      role="dialog"
      aria-modal="true"
      aria-label="Ali Murtaza Portfolio Introduction"
    >
      {/* 0–2s Dramatic White Top Spotlight Beam */}
      <div
        ref={spotlightBeamRef}
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[28rem] sm:w-[40rem] h-[78vh] opacity-0"
        style={{
          background:
            'radial-gradient(ellipse 46% 90% at 50% 0%, rgba(255,255,255,0.34) 0%, rgba(255,255,255,0.12) 45%, rgba(255,255,255,0) 80%)',
          clipPath: 'polygon(36% 0%, 64% 0%, 96% 100%, 4% 100%)',
        }}
      />

      {/* Soft White Center Spotlight Pool */}
      <div
        ref={spotlightPoolRef}
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[22rem] h-[22rem] sm:w-[30rem] sm:h-[30rem] rounded-full opacity-0"
        style={{
          background:
            'radial-gradient(circle, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.05) 48%, rgba(4,6,10,0) 75%)',
        }}
      />

      {/* Center Portrait + Name Only */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        {/* Real Profile Photograph */}
        <div
          ref={photoContainerRef}
          className="relative w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-full p-1 bg-gradient-to-b from-white/75 via-white/25 to-white/5 shadow-[0_24px_70px_rgba(255,255,255,0.18)] overflow-hidden"
        >
          <div className="w-full h-full rounded-full overflow-hidden bg-black">
            <img
              ref={photoImgRef}
              src={avatarSrc}
              alt="Ali Murtaza"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 6–8s Letter-by-letter Name + 8–10s Subtle Green Light Sweep */}
        <h1 className="relative mt-9 sm:mt-11 overflow-hidden px-3 py-1 font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-[0.22em] text-white">
          <span className="inline-flex">
            {NAME_CHARS.map((ch, idx) => (
              <span
                key={idx}
                ref={(el) => {
                  nameLettersRef.current[idx] = el;
                }}
                className={ch === ' ' ? 'w-3 sm:w-5 inline-block' : 'inline-block'}
              >
                {ch === ' ' ? '\u00A0' : ch}
              </span>
            ))}
          </span>

          {/* Subtle Green Light Sweep Overlay */}
          <div
            ref={greenSweepRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-1/2"
            style={{
              background:
                'linear-gradient(90deg, rgba(37,199,122,0) 0%, rgba(37,199,122,0.75) 50%, rgba(37,199,122,0) 100%)',
              mixBlendMode: 'screen',
            }}
          />
        </h1>
      </div>
    </motion.div>
  );
}
