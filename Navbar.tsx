import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export type NavSectionId =
  | 'home'
  | 'about'
  | 'experience'
  | 'projects'
  | 'services'
  | 'skills'
  | 'contact';

interface NavbarProps {
  activeSection: NavSectionId;
  avatarSrc: string;
  onNavigate: (sectionId: NavSectionId) => void;
}

const NAV_ITEMS: Array<{ id: NavSectionId; label: string }> = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'services', label: 'Services' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

export function Navbar({ activeSection, avatarSrc, onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLinkClick = (id: NavSectionId) => {
    setMobileOpen(false);
    onNavigate(id);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Logo + Name */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('home');
          }}
          className="inline-flex items-center gap-3 shrink-0 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25C77A] rounded-lg py-1"
        >
          <img
            src={avatarSrc}
            alt="Ali Murtaza profile mark"
            referrerPolicy="no-referrer"
            className="w-9 h-9 rounded-full object-cover border-2 border-[#25C77A] shadow-xs"
          />
          <span className="font-display text-lg font-bold tracking-tight text-[#25C77A]">
            {PERSONAL_INFO.name}
          </span>
        </a>

        {/* Zone 2: Desktop Single-Line Navigation Links */}
        <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-7">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item.id);
                }}
                className={`relative py-1 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25C77A] rounded-sm ${
                  isActive ? 'text-[#25C77A]' : 'text-[#1E293B] hover:text-[#25C77A]'
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="navbar-active-underline"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    className="absolute left-0 right-0 -bottom-0.5 h-0.5 rounded-full bg-[#25C77A]"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Primary CTA + Mobile Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={PERSONAL_INFO.hireMailto}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-[#25C77A] rounded-xl hover:bg-[#1EB46D] shadow-xs hover:shadow-[0_6px_18px_rgba(37,199,122,0.32)] transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25C77A] focus-visible:ring-offset-2"
          >
            Hire Me
          </a>

          <button
            type="button"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-xl bg-[#1E293B] text-white hover:bg-white hover:text-[#25C77A] border border-[#1E293B] hover:border-[#25C77A] transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25C77A]"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Animated Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden overflow-hidden bg-white border-t border-slate-200/80 shadow-md"
          >
            <nav aria-label="Mobile navigation" className="px-4 py-4 flex flex-col gap-1">
              {NAV_ITEMS.map((item, idx) => {
                const isActive = activeSection === item.id;
                return (
                  <motion.a
                    key={item.id}
                    href={`#${item.id}`}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04, duration: 0.2 }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(item.id);
                    }}
                    className={`px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-[#25C77A]/12 text-[#189D5E]'
                        : 'text-[#1E293B] hover:bg-[#EEF3FA] hover:text-[#25C77A]'
                    }`}
                  >
                    {item.label}
                  </motion.a>
                );
              })}
              <a
                href={PERSONAL_INFO.hireMailto}
                onClick={() => setMobileOpen(false)}
                className="mt-2 w-full py-3 px-4 rounded-xl bg-[#25C77A] text-white text-center font-semibold text-base hover:bg-[#1EB46D] transition-colors cursor-pointer"
              >
                Hire Me
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
