import { AnimatePresence, motion } from 'motion/react';
import {
  CheckCircle2,
  Download,
  ExternalLink,
  Github,
  Mail,
  MapPin,
  Phone,
  X,
} from 'lucide-react';
import {
  EXPERIENCE_ITEMS,
  PERSONAL_INFO,
  SERVICES_LIST,
} from '../data/portfolioData';
import type { ProjectItem } from '../types/portfolio';

interface CvPreviewModalProps {
  open: boolean;
  avatarSrc: string;
  projects: ProjectItem[];
  onClose: () => void;
  onDownloadPdf: () => void;
}

const SIDEBAR_SKILLS = [
  { name: 'React.js / Next.js', pct: 90 },
  { name: 'TypeScript / JS', pct: 88 },
  { name: 'HTML5 / CSS3 / Tailwind', pct: 92 },
  { name: 'Node.js / Express', pct: 85 },
  { name: 'Python & AI Integration', pct: 86 },
  { name: 'Git & GitHub', pct: 88 },
];

export function CvPreviewModal({
  open,
  avatarSrc,
  projects,
  onClose,
  onDownloadPdf,
}: CvPreviewModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[90] bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Ali Murtaza Canva CV Preview"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col"
          >
            {/* Top Modal Bar */}
            <div className="px-5 py-3.5 bg-white border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div>
                <h3 className="text-base font-bold text-[#1E293B]">
                  Ali Murtaza — Curriculum Vitae
                </h3>
                <p className="text-xs text-[#64748B]">
                  Canva-styled resume with your portrait and verified portfolio data
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={onDownloadPdf}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#25C77A] text-white text-xs sm:text-sm font-semibold hover:bg-[#1EB46D] transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </button>
                <a
                  href="/api/cv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#EEF3FA] text-[#1E293B] text-xs sm:text-sm font-semibold hover:bg-slate-200 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open PDF</span>
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close CV preview"
                  className="w-9 h-9 rounded-xl bg-slate-100 text-[#1E293B] hover:bg-[#E74C5A] hover:text-white transition-colors flex items-center justify-center cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Scrollable Canva Two-Column CV Sheet */}
            <div className="overflow-y-auto p-4 sm:p-6 bg-[#EEF3FA]">
              <div className="mx-auto max-w-[780px] bg-white rounded-xl shadow-md overflow-hidden grid grid-cols-1 md:grid-cols-12 border border-slate-200">
                {/* Left Dark Canva Sidebar */}
                <aside className="md:col-span-4 bg-[#1E293B] text-white p-6 border-t-4 border-[#25C77A] flex flex-col gap-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-28 h-28 rounded-full p-1 bg-[#25C77A] shadow-[0_0_24px_rgba(37,199,122,0.4)]">
                      <img
                        src={avatarSrc}
                        alt="Ali Murtaza"
                        referrerPolicy="no-referrer"
                        className="w-full h-full rounded-full object-cover border-2 border-white"
                      />
                    </div>
                    <h4 className="mt-4 font-display text-lg font-extrabold tracking-wide">
                      ALI MURTAZA
                    </h4>
                    <span className="mt-1.5 inline-block px-3 py-1 rounded-md bg-[#25C77A] text-white text-[10px] font-bold tracking-wider">
                      AI FULL STACK DEVELOPER
                    </span>
                  </div>

                  {/* Contact */}
                  <div>
                    <h5 className="text-xs font-bold tracking-wider text-[#25C77A] pb-1.5 border-b border-slate-700">
                      CONTACT
                    </h5>
                    <ul className="mt-3 space-y-2.5 text-xs text-slate-200">
                      <li className="flex items-start gap-2">
                        <MapPin className="w-3.5 h-3.5 text-[#25C77A] shrink-0 mt-0.5" />
                        <span>{PERSONAL_INFO.location}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Mail className="w-3.5 h-3.5 text-[#25C77A] shrink-0 mt-0.5" />
                        <span className="break-all">{PERSONAL_INFO.email}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Phone className="w-3.5 h-3.5 text-[#25C77A] shrink-0 mt-0.5" />
                        <span>{PERSONAL_INFO.whatsappDisplay}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Github className="w-3.5 h-3.5 text-[#25C77A] shrink-0 mt-0.5" />
                        <span>github.com/DotAliMurtaza</span>
                      </li>
                    </ul>
                  </div>

                  {/* Technical Stack */}
                  <div>
                    <h5 className="text-xs font-bold tracking-wider text-[#25C77A] pb-1.5 border-b border-slate-700">
                      TECHNICAL STACK
                    </h5>
                    <div className="mt-3 space-y-2.5">
                      {SIDEBAR_SKILLS.map((sk) => (
                        <div key={sk.name}>
                          <p className="text-[11px] font-semibold text-slate-100 mb-1">
                            {sk.name}
                          </p>
                          <div className="h-1.5 w-full rounded-full bg-slate-700 overflow-hidden">
                            <div
                              style={{ width: `${sk.pct}%` }}
                              className="h-full rounded-full bg-[#25C77A]"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Services */}
                  <div>
                    <h5 className="text-xs font-bold tracking-wider text-[#25C77A] pb-1.5 border-b border-slate-700">
                      SERVICES
                    </h5>
                    <ul className="mt-3 space-y-2 text-xs text-slate-200">
                      {SERVICES_LIST.map((srv) => (
                        <li key={srv.id} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#25C77A] shrink-0" />
                          <span>{srv.title}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </aside>

                {/* Right Main Content */}
                <div className="md:col-span-8 p-6 sm:p-7 border-t-4 border-[#E74C5A] space-y-6">
                  <div>
                    <h4 className="font-display text-2xl font-extrabold text-[#1E293B]">
                      Curriculum Vitae
                    </h4>
                    <p className="text-xs font-semibold text-[#E74C5A] mt-1">
                      Modern Web Applications · Interactive 3D Games · AI Solutions
                    </p>
                  </div>

                  {/* Summary Card */}
                  <div className="rounded-xl bg-[#EEF3FA] p-4 border border-slate-200/70">
                    <h5 className="text-xs font-bold text-[#1E293B] tracking-wide mb-1.5">
                      PROFESSIONAL SUMMARY
                    </h5>
                    <p className="text-xs text-[#64748B] leading-relaxed">
                      I&apos;m Ali Murtaza, an AI Full Stack Developer passionate about creating
                      modern, responsive, and intelligent digital experiences. Focused on clean
                      architecture, expressive UI animations, and AI-integrated full-stack systems.
                    </p>
                  </div>

                  {/* Experience */}
                  <div>
                    <h5 className="text-xs font-bold tracking-wider text-[#1E293B] pb-1.5 border-b border-slate-200">
                      DEVELOPMENT EXPERIENCE
                    </h5>
                    <div className="mt-3 space-y-3">
                      {EXPERIENCE_ITEMS.map((exp) => (
                        <div key={exp.id}>
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-xs font-bold text-[#1E293B]">{exp.title}</p>
                            <span className="text-[10px] text-[#64748B]">{exp.focus}</span>
                          </div>
                          <p className="text-[11px] text-[#64748B] mt-0.5 leading-relaxed">
                            {exp.points.join(' · ')}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Featured GitHub Projects */}
                  <div>
                    <h5 className="text-xs font-bold tracking-wider text-[#1E293B] pb-1.5 border-b border-slate-200">
                      FEATURED GITHUB PROJECTS
                    </h5>
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {projects.slice(0, 6).map((p) => (
                        <div
                          key={p.slug}
                          className="rounded-lg bg-[#EEF3FA] p-3 border-t-2 border-[#25C77A]"
                        >
                          <p className="text-xs font-bold text-[#1E293B]">{p.title}</p>
                          <p className="text-[10px] font-semibold text-[#189D5E] mt-0.5">
                            {p.languages.slice(0, 3).join(' · ')}
                          </p>
                          <p className="text-[10px] text-[#64748B] mt-1 line-clamp-2">
                            {p.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
