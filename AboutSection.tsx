import { useRef } from 'react';
import type { ChangeEvent } from 'react';
import { motion } from 'motion/react';
import {
  Atom,
  Bot,
  Braces,
  Camera,
  Code2,
  FileCode2,
  GitBranch,
  Github,
  Layers,
  MapPin,
  Palette,
  Server,
  Terminal,
} from 'lucide-react';
import { PERSONAL_INFO, TECH_SKILLS } from '../data/portfolioData';
import type { TechSkill } from '../types/portfolio';
import { AnimatedSectionHeading } from './AnimatedSectionHeading';
import { FloatingIconBadge } from './FloatingIconBadge';

interface AboutSectionProps {
  avatarSrc: string;
  onUploadAvatar: (dataUrl: string) => void;
}

function renderTechIcon(iconKey: TechSkill['iconKey']) {
  const iconClass = 'w-5 h-5';
  switch (iconKey) {
    case 'html':
      return <Code2 className={iconClass} />;
    case 'css':
      return <Palette className={iconClass} />;
    case 'js':
      return <Braces className={iconClass} />;
    case 'ts':
      return <FileCode2 className={iconClass} />;
    case 'react':
      return <Atom className={iconClass} />;
    case 'next':
      return <Layers className={iconClass} />;
    case 'tailwind':
      return <Palette className={iconClass} />;
    case 'node':
      return <Server className={iconClass} />;
    case 'python':
      return <Terminal className={iconClass} />;
    case 'git':
      return <GitBranch className={iconClass} />;
    case 'github':
      return <Github className={iconClass} />;
    case 'ai':
      return <Bot className={iconClass} />;
  }
}

export function AboutSection({ avatarSrc, onUploadAvatar }: AboutSectionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onUploadAvatar(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <section id="about" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimatedSectionHeading
          title="About Me"
          subtitle="Learn more about my skills, experience, and passion for technology."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-9 shadow-sm border border-slate-200/70 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-2xl font-bold text-[#1E293B]">
                AI Full Stack Developer
              </h3>

              <p className="mt-4 text-base text-[#1E293B]/90 leading-relaxed">
                I&apos;m Ali Murtaza, an AI Full Stack Developer who loves building modern,
                responsive and intelligent digital experiences. I enjoy transforming creative ideas
                into powerful web applications using modern technologies and clean code.
              </p>

              <p className="mt-4 text-base text-[#64748B] leading-relaxed">
                I&apos;m passionate about AI integration, frontend development, backend systems and
                modern web technologies—connecting expressive user interfaces with reliable
                full-stack architecture.
              </p>

              {/* Technology Grid */}
              <div className="mt-8">
                <h4 className="text-sm font-semibold text-[#1E293B] mb-4">
                  Core Technologies &amp; Capabilities
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
                  {TECH_SKILLS.map((skill, idx) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ delay: idx * 0.035, duration: 0.4 }}
                      className="group flex flex-col items-center justify-center text-center gap-2.5 p-3.5 rounded-xl bg-[#EEF3FA]/70 border border-slate-200/70 hover:bg-white hover:border-[#25C77A]/60 hover:shadow-md transition-all duration-250"
                    >
                      <FloatingIconBadge size="sm" delayMs={(idx % 4) * 180}>
                        {renderTechIcon(skill.iconKey)}
                      </FloatingIconBadge>
                      <span className="text-xs sm:text-sm font-semibold text-[#1E293B] group-hover:text-[#189D5E] transition-colors whitespace-nowrap">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE: Medium-Sized Portrait Card */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex items-center justify-center"
          >
            <div className="w-full max-w-[330px] bg-white rounded-2xl p-4 shadow-sm border border-slate-200/70 group">
              <div className="relative overflow-hidden rounded-xl bg-[#EEF3FA] aspect-[4/4.3]">
                <img
                  src={avatarSrc}
                  alt="Ali Murtaza portrait"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-x-0 bottom-0 p-3.5 bg-gradient-to-t from-slate-900/75 via-slate-900/25 to-transparent flex items-end justify-between gap-2.5">
                  <div className="text-white min-w-0">
                    <p className="font-display font-bold text-base leading-tight">
                      {PERSONAL_INFO.name}
                    </p>
                    <p className="text-[11px] text-white/85 flex items-center gap-1 mt-0.5 truncate">
                      <MapPin className="w-3 h-3 text-[#25C77A] shrink-0" />
                      <span className="truncate">{PERSONAL_INFO.location}</span>
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/95 text-[#1E293B] text-[11px] font-semibold hover:bg-[#25C77A] hover:text-white transition-colors cursor-pointer shrink-0"
                  >
                    <Camera className="w-3 h-3" />
                    <span>Upload</span>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    aria-label="Upload portrait image"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
