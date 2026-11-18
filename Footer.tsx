import { ArrowUp, Github, Mail, MessageCircle, RotateCcw } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import type { NavSectionId } from './Navbar';
import { FloatingIconBadge } from './FloatingIconBadge';

interface FooterProps {
  onNavigate: (sectionId: NavSectionId) => void;
  onReplayIntro?: () => void;
}

const QUICK_LINKS: Array<{ id: NavSectionId; label: string }> = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'services', label: 'Services' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

export function Footer({ onNavigate, onReplayIntro }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-slate-200/80 pt-14 pb-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-slate-200/80">
          {/* Identity */}
          <div className="md:col-span-4 space-y-3">
            <h3 className="text-2xl font-bold text-[#25C77A]">{PERSONAL_INFO.name}</h3>
            <p className="text-sm font-semibold text-[#1E293B]">{PERSONAL_INFO.title}</p>
            <p className="text-sm text-[#64748B] leading-relaxed">
              Crafting modern, responsive web applications, interactive 3D browser games, and
              AI-assisted digital experiences from {PERSONAL_INFO.location}.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4">
            <h4 className="text-sm font-bold text-[#1E293B] mb-4">Quick Links</h4>
            <ul className="grid grid-cols-2 gap-y-2.5 gap-x-4 text-sm">
              {QUICK_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(link.id);
                    }}
                    className="text-[#64748B] hover:text-[#25C77A] font-medium transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Channels */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-sm font-bold text-[#1E293B] mb-4">Connect</h4>
            <div className="space-y-2 text-sm text-[#64748B]">
              <p>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="hover:text-[#25C77A] transition-colors break-all"
                >
                  {PERSONAL_INFO.email}
                </a>
              </p>
              <p>
                <a
                  href={PERSONAL_INFO.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#25C77A] transition-colors tabular-nums"
                >
                  WhatsApp: {PERSONAL_INFO.whatsappDisplay}
                </a>
              </p>
              <p>
                <a
                  href={PERSONAL_INFO.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#25C77A] transition-colors"
                >
                  github.com/DotAliMurtaza
                </a>
              </p>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <FloatingIconBadge size="sm" delayMs={0}>
                  <Github className="w-4 h-4" />
                </FloatingIconBadge>
              </a>
              <a href={`mailto:${PERSONAL_INFO.email}`} aria-label="Email">
                <FloatingIconBadge size="sm" delayMs={200}>
                  <Mail className="w-4 h-4" />
                </FloatingIconBadge>
              </a>
              <a
                href={PERSONAL_INFO.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <FloatingIconBadge size="sm" delayMs={400}>
                  <MessageCircle className="w-4 h-4" />
                </FloatingIconBadge>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[#64748B]">
          <p>
            © {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            {onReplayIntro && (
              <button
                type="button"
                onClick={onReplayIntro}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#EEF3FA] text-[#1E293B] font-semibold text-sm hover:bg-[#25C77A] hover:text-white transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25C77A]"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Replay Intro</span>
              </button>
            )}

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#EEF3FA] text-[#1E293B] font-semibold text-sm hover:bg-[#25C77A] hover:text-white transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25C77A]"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
