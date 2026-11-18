import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { CheckCircle2, Cpu, Layers, Sparkles } from 'lucide-react';
import { EXPERIENCE_ITEMS } from '../data/portfolioData';
import { AnimatedSectionHeading } from './AnimatedSectionHeading';
import { FloatingIconBadge } from './FloatingIconBadge';

function getExperienceIcon(index: number) {
  if (index === 0) return <Cpu className="w-5 h-5" />;
  if (index === 1) return <Layers className="w-5 h-5" />;
  return <Sparkles className="w-5 h-5" />;
}

export function ExperienceSection() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 80%', 'end 65%'],
  });
  const lineScaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <section id="experience" className="py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <AnimatedSectionHeading
          title="My Experience"
          subtitle="My Professional Journey & Development Experience."
        />

        <div ref={timelineRef} className="relative pl-8 sm:pl-14">
          {/* Background Vertical Track */}
          <div
            aria-hidden="true"
            className="absolute left-3.5 sm:left-6 top-2 bottom-2 w-0.5 bg-slate-300/80 rounded-full"
          />

          {/* Scroll-Animated Green Progress Line */}
          <motion.div
            aria-hidden="true"
            style={{ scaleY: lineScaleY }}
            className="absolute left-3.5 sm:left-6 top-2 bottom-2 w-0.5 origin-top bg-[#25C77A] rounded-full shadow-[0_0_12px_rgba(37,199,122,0.5)]"
          />

          <div className="space-y-8 sm:space-y-10">
            {EXPERIENCE_ITEMS.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -36 : 36 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.55, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                {/* Animated Timeline Dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    type: 'spring',
                    stiffness: 320,
                    damping: 22,
                    delay: idx * 0.12,
                  }}
                  aria-hidden="true"
                  className="absolute -left-8 sm:-left-14 top-7 w-7 h-7 sm:w-8 sm:h-8 -translate-x-1/2 rounded-full bg-white border-4 border-[#25C77A] shadow-[0_0_16px_rgba(37,199,122,0.4)] flex items-center justify-center"
                >
                  <span className="w-2 h-2 rounded-full bg-[#25C77A]" />
                </motion.div>

                {/* Experience Card */}
                <div className="group bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/70 hover:border-[#25C77A]/60 hover:shadow-md transition-all duration-300">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <FloatingIconBadge size="md" delayMs={idx * 220}>
                        {getExperienceIcon(idx)}
                      </FloatingIconBadge>
                      <div>
                        <h3 className="text-xl font-bold text-[#1E293B] group-hover:text-[#189D5E] transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-sm font-medium text-[#64748B] mt-0.5">
                          {item.focus}
                        </p>
                      </div>
                    </div>
                  </div>

                  <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {item.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2.5 text-sm sm:text-base text-[#1E293B]/85 leading-relaxed"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#25C77A] shrink-0 mt-1" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
