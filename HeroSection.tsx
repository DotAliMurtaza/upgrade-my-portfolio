import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent } from 'react';
import gsap from 'gsap';
import { motion } from 'motion/react';
import {
  Braces,
  Camera,
  Code2,
  Cpu,
  Download,
  Eye,
  Github,
  Globe,
  Loader2,
  Mail,
  MessageCircle,
  RotateCcw,
  Send,
} from 'lucide-react';
import { HERO_TYPING_ROLES, PERSONAL_INFO } from '../data/portfolioData';
import type { ProjectItem } from '../types/portfolio';
import { downloadCanvaCvPdf } from '../utils/generateCvPdf';
import { FloatingIconBadge } from './FloatingIconBadge';

interface HeroSectionProps {
  avatarSrc: string;
  isCustomAvatar: boolean;
  introDone: boolean;
  projects: ProjectItem[];
  onUploadAvatar: (dataUrl: string) => void;
  onResetAvatar: () => void;
  onOpenCvPreview: () => void;
}

export function HeroSection({
  avatarSrc,
  isCustomAvatar,
  introDone,
  projects,
  onUploadAvatar,
  onResetAvatar,
  onOpenCvPreview,
}: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const nameRevealRef = useRef<HTMLSpanElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [downloadingCv, setDownloadingCv] = useState(false);

  const [roleIndex, setRoleIndex] = useState(0);
  const [typedText, setTypedText] = useState(HERO_TYPING_ROLES[0]);
  const [isDeleting, setIsDeleting] = useState(false);

  // Special Hero Entrance Animation using GSAP once intro completes
  useEffect(() => {
    if (!introDone) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        leftRef.current,
        { opacity: 0, x: -52 },
        { opacity: 1, x: 0, duration: 0.85 }
      )
        .fromTo(
          nameRevealRef.current,
          { clipPath: 'inset(0 100% 0 0)', opacity: 0.4 },
          { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 0.9, ease: 'power4.out' },
          '-=0.5'
        )
        .fromTo(
          buttonsRef.current ? Array.from(buttonsRef.current.children) : [],
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.12 },
          '-=0.45'
        )
        .fromTo(
          rightRef.current,
          { opacity: 0, x: 52, scale: 0.86 },
          { opacity: 1, x: 0, scale: 1, duration: 0.95 },
          0.12
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [introDone]);

  // Typing role effect
  useEffect(() => {
    const currentRole = HERO_TYPING_ROLES[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && typedText === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), 1700);
    } else if (isDeleting && typedText === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % HERO_TYPING_ROLES.length);
    } else {
      const delta = isDeleting ? 34 : 62;
      timeout = setTimeout(() => {
        const nextLength = isDeleting ? typedText.length - 1 : typedText.length + 1;
        setTypedText(currentRole.slice(0, nextLength));
      }, delta);
    }

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, roleIndex]);

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

  const handleDownloadCv = async () => {
    if (downloadingCv) return;
    setDownloadingCv(true);
    try {
      await downloadCanvaCvPdf(avatarSrc, projects);
    } finally {
      setDownloadingCv(false);
    }
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* LEFT SIDE */}
          <div ref={leftRef} className="lg:col-span-7 space-y-6">
            <p className="text-sm font-semibold tracking-wide text-[#189D5E]">
              {PERSONAL_INFO.title}
            </p>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight text-[#1E293B] leading-[1.12] text-balance">
              Hello, I&apos;m{' '}
              <span
                ref={nameRevealRef}
                className="inline-block text-[#25C77A]"
              >
                {PERSONAL_INFO.name}
              </span>
            </h1>

            {/* Typing Text Row */}
            <div className="flex items-center gap-2 min-h-[2.25rem]">
              <span className="text-xl sm:text-2xl font-semibold text-[#E74C5A]">
                {typedText}
              </span>
              <span
                aria-hidden="true"
                className="inline-block w-0.5 h-6 bg-[#25C77A] animate-pulse"
              />
            </div>

            <p className="max-w-xl text-base sm:text-lg text-[#64748B] leading-relaxed">
              I&apos;m Ali Murtaza, an AI Full Stack Developer passionate about creating modern
              websites, intelligent applications and innovative digital experiences.
            </p>

            {/* Primary Action Buttons */}
            <div ref={buttonsRef} className="flex flex-wrap items-center gap-4 pt-2">
              <motion.a
                href={PERSONAL_INFO.hireMailto}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#25C77A] text-white font-semibold text-base shadow-[0_8px_22px_rgba(37,199,122,0.28)] hover:bg-[#2EDB88] hover:shadow-[0_12px_28px_rgba(37,199,122,0.36)] transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25C77A] focus-visible:ring-offset-2"
              >
                <Send className="w-4 h-4" />
                <span>Hire Me</span>
              </motion.a>

              <motion.button
                type="button"
                onClick={handleDownloadCv}
                disabled={downloadingCv}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#25C77A] text-white font-semibold text-base shadow-[0_8px_22px_rgba(37,199,122,0.28)] hover:bg-[#2EDB88] hover:shadow-[0_12px_28px_rgba(37,199,122,0.36)] disabled:opacity-75 transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25C77A] focus-visible:ring-offset-2"
              >
                {downloadingCv ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
                <span>{downloadingCv ? 'Generating CV...' : 'Download CV'}</span>
              </motion.button>

              <motion.button
                type="button"
                onClick={onOpenCvPreview}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white text-[#1E293B] font-semibold text-base border border-slate-200 shadow-xs hover:border-[#25C77A] hover:text-[#189D5E] transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25C77A] focus-visible:ring-offset-2"
              >
                <Eye className="w-4 h-4" />
                <span>Preview CV</span>
              </motion.button>
            </div>

            {/* Social Media Floating Icons */}
            <div className="pt-3 flex items-center gap-4">
              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ali Murtaza GitHub profile"
                title="GitHub"
              >
                <FloatingIconBadge size="md" delayMs={0}>
                  <Github className="w-5 h-5" />
                </FloatingIconBadge>
              </a>

              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                aria-label="Send email to Ali Murtaza"
                title="Email"
              >
                <FloatingIconBadge size="md" delayMs={250}>
                  <Mail className="w-5 h-5" />
                </FloatingIconBadge>
              </a>

              <a
                href={PERSONAL_INFO.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with Ali Murtaza on WhatsApp"
                title="WhatsApp"
              >
                <FloatingIconBadge size="md" delayMs={500}>
                  <MessageCircle className="w-5 h-5" />
                </FloatingIconBadge>
              </a>
            </div>
          </div>

          {/* RIGHT SIDE: Circular Animated Profile Image */}
          <div
            ref={rightRef}
            className="lg:col-span-5 flex flex-col items-center justify-center relative py-6"
          >
            <div className="animate-float-slow relative flex items-center justify-center w-72 h-72 sm:w-84 sm:h-84 lg:w-96 lg:h-96">
              {/* Top Spotlight Illumination + Soft Green Glow Aura */}
              <div
                aria-hidden="true"
                className="absolute -top-6 left-1/2 -translate-x-1/2 w-56 h-72 bg-gradient-to-b from-white/75 via-[#25C77A]/18 to-transparent blur-xl rounded-full"
              />
              <div
                aria-hidden="true"
                className="absolute inset-4 rounded-full bg-[#25C77A]/25 blur-2xl"
              />

              {/* Outer Rotating Dashed Ring */}
              <div
                aria-hidden="true"
                className="animate-spin-slow absolute inset-0 rounded-full border-2 border-dashed border-[#25C77A]/55"
              />

              {/* Counter-Rotating Accent Arc Ring */}
              <div
                aria-hidden="true"
                className="animate-spin-reverse-slow absolute inset-3 rounded-full border-2 border-transparent border-t-[#25C77A] border-r-[#25C77A]/40"
              />

              {/* Circular Profile Photo Container */}
              <div className="relative z-10 w-56 h-56 sm:w-68 sm:h-68 lg:w-76 lg:h-76 rounded-full p-1.5 bg-white shadow-[0_14px_40px_rgba(37,199,122,0.28)] ring-4 ring-[#25C77A]/80 group overflow-hidden">
                <img
                  src={avatarSrc}
                  alt="Ali Murtaza — AI Full Stack Developer"
                  referrerPolicy="no-referrer"
                  className="w-full h-full rounded-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Easy Portrait Replacement Overlay */}
                <div className="absolute inset-x-0 bottom-0 pb-4 pt-8 bg-gradient-to-t from-slate-900/75 via-slate-900/35 to-transparent opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-[#1E293B] text-xs font-semibold shadow-sm hover:bg-[#25C77A] hover:text-white transition-colors cursor-pointer"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Replace Photo</span>
                  </button>
                  {isCustomAvatar && (
                    <button
                      type="button"
                      onClick={onResetAvatar}
                      aria-label="Reset to GitHub profile avatar"
                      title="Reset to GitHub avatar"
                      className="inline-flex items-center justify-center p-1.5 rounded-lg bg-white/90 text-[#1E293B] hover:bg-[#E74C5A] hover:text-white transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  aria-label="Upload custom profile portrait"
                />
              </div>

              {/* Floating Decorative Icons Around Circular Photo */}
              <div className="absolute top-3 left-4 z-20">
                <FloatingIconBadge size="sm" delayMs={0}>
                  <Code2 className="w-4 h-4" />
                </FloatingIconBadge>
              </div>
              <div className="absolute top-6 right-2 z-20">
                <FloatingIconBadge size="sm" delayMs={350}>
                  <Cpu className="w-4 h-4" />
                </FloatingIconBadge>
              </div>
              <div className="absolute bottom-6 left-2 z-20">
                <FloatingIconBadge size="sm" delayMs={650}>
                  <Braces className="w-4 h-4" />
                </FloatingIconBadge>
              </div>
              <div className="absolute bottom-3 right-5 z-20">
                <FloatingIconBadge size="sm" delayMs={950}>
                  <Globe className="w-4 h-4" />
                </FloatingIconBadge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
