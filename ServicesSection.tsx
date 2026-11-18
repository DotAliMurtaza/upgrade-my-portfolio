import { motion } from 'motion/react';
import { BrainCircuit, Laptop, Smartphone } from 'lucide-react';
import { SERVICES_LIST } from '../data/portfolioData';
import type { ServiceItem } from '../types/portfolio';
import { AnimatedSectionHeading } from './AnimatedSectionHeading';

function renderServiceIcon(iconName: ServiceItem['iconName']) {
  const cls = 'w-7 h-7';
  if (iconName === 'laptop') return <Laptop className={cls} />;
  if (iconName === 'smartphone') return <Smartphone className={cls} />;
  return <BrainCircuit className={cls} />;
}

export function ServicesSection() {
  return (
    <section id="services" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimatedSectionHeading
          title="My Services"
          subtitle="I Offer Professional Services to Bring Your Digital Ideas to Life."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {SERVICES_LIST.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.5,
                delay: idx * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative overflow-hidden bg-white rounded-2xl p-8 shadow-sm border border-slate-200/80 transition-all duration-300 hover:-translate-y-2 hover:border-[#25C77A] hover:shadow-[0_18px_40px_rgba(37,199,122,0.28)]"
            >
              {/* Top-to-Bottom Animated Green Fill Layer */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[#25C77A] -translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              />

              {/* Card Foreground Content */}
              <div className="relative z-10 flex flex-col items-start">
                <div
                  style={{ animationDelay: `${idx * 240}ms` }}
                  className="animate-float-gentle w-14 h-14 rounded-2xl bg-[#1E293B] text-white flex items-center justify-center shadow-sm transition-all duration-300 group-hover:bg-white/20 group-hover:text-white group-hover:scale-110 group-hover:rotate-6"
                >
                  {renderServiceIcon(service.iconName)}
                </div>

                <h3 className="mt-6 text-xl font-bold text-[#1E293B] group-hover:text-white transition-colors duration-300">
                  {service.title}
                </h3>

                <p className="mt-3 text-base text-[#64748B] group-hover:text-white/95 leading-relaxed transition-colors duration-300">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
