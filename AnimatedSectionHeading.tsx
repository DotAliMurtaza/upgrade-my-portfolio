import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

interface AnimatedSectionHeadingProps {
  title: string;
  subtitle: string;
  align?: 'center' | 'left';
}

export function AnimatedSectionHeading({
  title,
  subtitle,
  align = 'center',
}: AnimatedSectionHeadingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [sweepToRed, setSweepToRed] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let timer: ReturnType<typeof setTimeout> | null = null;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          timer = setTimeout(() => {
            setSweepToRed(true);
          }, 320);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, []);

  const isCenter = align === 'center';

  return (
    <div
      ref={containerRef}
      className={`mb-14 ${isCenter ? 'text-center mx-auto max-w-2xl' : 'text-left max-w-2xl'}`}
    >
      <div className={`inline-flex flex-col ${isCenter ? 'items-center' : 'items-start'}`}>
        <h2 className="relative inline-block text-3xl sm:text-4xl font-bold tracking-tight text-balance leading-tight">
          {/* Base Green Layer */}
          <span className="text-[#25C77A] select-none" aria-hidden="true">
            {title}
          </span>
          {/* Left-to-Right Red Sweep Overlay Layer */}
          <motion.span
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            animate={{ clipPath: sweepToRed ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 text-[#E74C5A]"
          >
            {title}
          </motion.span>
        </h2>

        {/* Animated Underline */}
        <div className="relative mt-3 h-1 w-24 rounded-full bg-[#25C77A]/25 overflow-hidden">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: inView ? 1 : 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="h-full w-full origin-left bg-[#25C77A]"
          />
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: sweepToRed ? 1 : 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 h-full w-full origin-left bg-[#E74C5A]"
          />
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="mt-4 text-base text-[#64748B] leading-relaxed"
      >
        {subtitle}
      </motion.p>
    </div>
  );
}
