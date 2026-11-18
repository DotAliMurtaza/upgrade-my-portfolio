import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowUpRight,
  Code2,
  ExternalLink,
  Gamepad2,
  Github,
  Globe,
  Star,
  X,
} from 'lucide-react';
import type { ProjectCategory, ProjectItem } from '../types/portfolio';
import { AnimatedSectionHeading } from './AnimatedSectionHeading';

interface ProjectsSectionProps {
  projects: ProjectItem[];
  loading: boolean;
}

const FILTER_TABS: Array<{ id: ProjectCategory; label: string }> = [
  { id: 'all', label: 'All Projects' },
  { id: 'game', label: 'Game Projects' },
  { id: 'website', label: 'Website Projects' },
];

export function ProjectsSection({ projects, loading }: ProjectsSectionProps) {
  const [filter, setFilter] = useState<ProjectCategory>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const filteredProjects =
    filter === 'all' ? projects : projects.filter((p) => p.category === filter);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <section id="projects" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimatedSectionHeading
          title="My Projects"
          subtitle="Explore My Latest Creative Work."
        />

        {/* Category Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <div className="inline-flex flex-wrap items-center gap-1.5 p-1.5 bg-white rounded-xl shadow-xs border border-slate-200/80">
            {FILTER_TABS.map((tab) => {
              const active = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFilter(tab.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25C77A] ${
                    active
                      ? 'bg-[#25C77A] text-white shadow-xs'
                      : 'text-[#64748B] hover:text-[#1E293B] hover:bg-[#EEF3FA]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Loading Skeleton or Responsive 6-Card Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200/70 animate-pulse"
              >
                <div className="aspect-[4/3] bg-slate-200/70" />
                <div className="p-6 space-y-3">
                  <div className="h-5 w-2/3 bg-slate-200 rounded" />
                  <div className="h-4 w-full bg-slate-100 rounded" />
                  <div className="h-4 w-5/6 bg-slate-100 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredProjects.map((project, idx) => (
              <motion.article
                key={project.slug}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200/80 transition-all duration-300 hover:-translate-y-2 hover:border-[#25C77A] hover:ring-2 hover:ring-[#25C77A]/35 hover:shadow-[0_18px_38px_rgba(37,199,122,0.18)] flex flex-col"
              >
                {/* Project Thumbnail Container */}
                <div
                  onClick={() => setSelectedProject(project)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedProject(project);
                    }
                  }}
                  aria-label={`Inspect details for ${project.title}`}
                  className="relative aspect-[4/3] overflow-hidden bg-slate-100 cursor-pointer"
                >
                  <img
                    src={project.imageUrl}
                    alt={`${project.title} preview`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-108"
                  />

                  {/* Subtle Green Overlay on Hover */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#25C77A]/45 via-[#25C77A]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />

                  {/* Small Floating Arrow Icon */}
                  <div className="animate-float-gentle absolute top-3.5 right-3.5 w-10 h-10 rounded-xl bg-[#1E293B] text-white flex items-center justify-center shadow-md transition-all duration-300 group-hover:bg-[#25C77A] group-hover:text-white group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-[0_0_18px_rgba(37,199,122,0.55)]">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 text-xs text-[#64748B] mb-2">
                      <span className="inline-flex items-center gap-1.5 font-medium text-[#189D5E]">
                        {project.category === 'game' ? (
                          <Gamepad2 className="w-3.5 h-3.5" />
                        ) : (
                          <Globe className="w-3.5 h-3.5" />
                        )}
                        <span>
                          {project.category === 'game' ? 'Browser Game' : 'Web Application'}
                        </span>
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono">{project.primaryLanguage}</span>
                    </div>

                    <h3 className="text-xl font-bold text-[#1E293B] group-hover:text-[#189D5E] transition-colors">
                      {project.title}
                    </h3>

                    <p className="mt-2.5 text-sm text-[#64748B] leading-relaxed">
                      {project.description}
                    </p>

                    {/* Unboxed Typographic Tech Metadata */}
                    <p className="mt-3.5 text-xs font-medium text-[#64748B]">
                      {project.languages.join(' · ')}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
                    <a
                      href={project.homepageUrl || project.htmlUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#25C77A] text-white text-sm font-semibold shadow-xs transition-all duration-200 group-hover:bg-[#2EDB88] hover:shadow-[0_6px_16px_rgba(37,199,122,0.34)] whitespace-nowrap"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>View Project</span>
                    </a>

                    <a
                      href={project.htmlUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#1E293B] text-white text-sm font-semibold transition-all duration-200 hover:bg-[#25C77A] hover:shadow-[0_6px_16px_rgba(37,199,122,0.3)] whitespace-nowrap"
                    >
                      <Github className="w-4 h-4" />
                      <span>GitHub Code</span>
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>

      {/* Project Lightbox Preview Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 bg-slate-900/65 backdrop-blur-xs flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-200"
            >
              <div className="relative aspect-[16/10] bg-slate-100">
                <img
                  src={selectedProject.imageUrl}
                  alt={selectedProject.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  aria-label="Close project preview"
                  className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-white/95 text-[#1E293B] hover:bg-[#E74C5A] hover:text-white transition-colors flex items-center justify-center shadow-md cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-3 text-xs text-[#64748B] mb-2">
                  <span className="font-semibold text-[#189D5E]">
                    {selectedProject.repoOwner}/{selectedProject.repoName}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1 tabular-nums">
                    <Star className="w-3.5 h-3.5 text-[#25C77A]" />
                    {selectedProject.stars} stars
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1">
                    <Code2 className="w-3.5 h-3.5" />
                    {selectedProject.primaryLanguage}
                  </span>
                </div>

                <h3
                  id="project-modal-title"
                  className="text-2xl font-bold text-[#1E293B]"
                >
                  {selectedProject.title}
                </h3>

                <p className="mt-3 text-base text-[#64748B] leading-relaxed">
                  {selectedProject.description}
                </p>

                {selectedProject.requestedRef && (
                  <p className="mt-3 text-xs text-[#64748B]">
                    Repository reference note: {selectedProject.requestedRef}
                  </p>
                )}

                <p className="mt-4 text-xs font-semibold text-[#1E293B]">
                  Stack: <span className="font-normal text-[#64748B]">{selectedProject.languages.join(' · ')}</span>
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href={selectedProject.homepageUrl || selectedProject.htmlUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#25C77A] text-white font-semibold text-sm hover:bg-[#2EDB88] transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Open Live Project</span>
                  </a>
                  <a
                    href={selectedProject.htmlUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1E293B] text-white font-semibold text-sm hover:bg-[#25C77A] transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>View GitHub Repository</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
