import { useEffect, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { AboutSection } from './components/AboutSection';
import { CinematicIntro } from './components/CinematicIntro';
import { ContactSection } from './components/ContactSection';
import { CvPreviewModal } from './components/CvPreviewModal';
import { ExperienceSection } from './components/ExperienceSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { Navbar, type NavSectionId } from './components/Navbar';
import { ProjectsSection } from './components/ProjectsSection';
import { ServicesSection } from './components/ServicesSection';
import { SkillsSection } from './components/SkillsSection';
import { FALLBACK_PROJECTS, PERSONAL_INFO, PROJECT_IMAGE_MAP } from './data/portfolioData';
import type { ProjectItem } from './types/portfolio';
import { downloadCanvaCvPdf } from './utils/generateCvPdf';

const AVATAR_STORAGE_KEY = 'ali_murtaza_custom_avatar_v1';
const INTRO_SESSION_KEY = 'ali_murtaza_intro_completed_v2';
const SECTION_IDS: NavSectionId[] = [
  'home',
  'about',
  'experience',
  'projects',
  'services',
  'skills',
  'contact',
];

export default function App() {
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(INTRO_SESSION_KEY) !== 'true';
    } catch {
      return true;
    }
  });
  const [activeSection, setActiveSection] = useState<NavSectionId>('home');
  const [projects, setProjects] = useState<ProjectItem[]>(FALLBACK_PROJECTS);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [cvPreviewOpen, setCvPreviewOpen] = useState(false);
  const [customAvatar, setCustomAvatar] = useState<string | null>(() => {
    try {
      return localStorage.getItem(AVATAR_STORAGE_KEY);
    } catch {
      return null;
    }
  });

  const avatarSrc = customAvatar || PERSONAL_INFO.defaultAvatarUrl;

  const handleIntroComplete = () => {
    setShowIntro(false);
    try {
      sessionStorage.setItem(INTRO_SESSION_KEY, 'true');
    } catch {
      // Ignore storage error
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const handleReplayIntro = () => {
    try {
      sessionStorage.removeItem(INTRO_SESSION_KEY);
    } catch {
      // Ignore storage error
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
    setShowIntro(true);
  };

  // Fetch live GitHub repository details from backend proxy
  useEffect(() => {
    let cancelled = false;
    async function loadGitHubProjects() {
      try {
        const res = await fetch('/api/github/projects');
        if (!res.ok) throw new Error('Failed to load GitHub projects');
        const data = (await res.json()) as {
          projects?: Array<Omit<ProjectItem, 'imageUrl'>>;
        };
        if (!cancelled && Array.isArray(data.projects) && data.projects.length > 0) {
          const merged: ProjectItem[] = data.projects.map((p) => ({
            ...p,
            imageUrl: PROJECT_IMAGE_MAP[p.slug] || PROJECT_IMAGE_MAP['car-game'],
          }));
          setProjects(merged);
        }
      } catch {
        // Keep verified fallback snapshot
      } finally {
        if (!cancelled) setProjectsLoading(false);
      }
    }
    loadGitHubProjects();
    return () => {
      cancelled = true;
    };
  }, []);

  // Track active section in viewport for Navbar highlighting
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id as NavSectionId;
            if (SECTION_IDS.includes(id)) {
              setActiveSection(id);
            }
          }
        }
      },
      { rootMargin: '-40% 0px -45% 0px', threshold: 0.05 }
    );

    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  const handleNavigate = (sectionId: NavSectionId) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleUploadAvatar = (dataUrl: string) => {
    setCustomAvatar(dataUrl);
    try {
      localStorage.setItem(AVATAR_STORAGE_KEY, dataUrl);
    } catch {
      // Ignore quota errors while keeping in-memory portrait
    }
  };

  const handleResetAvatar = () => {
    setCustomAvatar(null);
    try {
      localStorage.removeItem(AVATAR_STORAGE_KEY);
    } catch {
      // Ignore storage error
    }
  };

  return (
    <div className="min-h-screen bg-[#EEF3FA] text-[#1E293B] overflow-x-clip">
      <AnimatePresence>
        {showIntro && (
          <CinematicIntro avatarSrc={avatarSrc} onComplete={handleIntroComplete} />
        )}
      </AnimatePresence>

      <Navbar
        activeSection={activeSection}
        avatarSrc={avatarSrc}
        onNavigate={handleNavigate}
      />

      <main>
        <HeroSection
          avatarSrc={avatarSrc}
          isCustomAvatar={Boolean(customAvatar)}
          introDone={!showIntro}
          projects={projects}
          onUploadAvatar={handleUploadAvatar}
          onResetAvatar={handleResetAvatar}
          onOpenCvPreview={() => setCvPreviewOpen(true)}
        />

        <AboutSection
          avatarSrc={avatarSrc}
          onUploadAvatar={handleUploadAvatar}
        />

        <ExperienceSection />

        <ProjectsSection projects={projects} loading={projectsLoading} />

        <ServicesSection />

        <SkillsSection />

        <ContactSection />
      </main>

      <Footer onNavigate={handleNavigate} onReplayIntro={handleReplayIntro} />

      <CvPreviewModal
        open={cvPreviewOpen}
        avatarSrc={avatarSrc}
        projects={projects}
        onClose={() => setCvPreviewOpen(false)}
        onDownloadPdf={() => {
          void downloadCanvaCvPdf(avatarSrc, projects);
        }}
      />
    </div>
  );
}
