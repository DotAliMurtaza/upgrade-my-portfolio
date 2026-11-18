import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Atom,
  Bot,
  Braces,
  Check,
  Code2,
  FileCode2,
  Github,
  Layers,
  Palette,
  RotateCcw,
  Server,
  SlidersHorizontal,
  Terminal,
} from 'lucide-react';
import { SKILLS_LIST } from '../data/portfolioData';
import type { TechSkill } from '../types/portfolio';
import { AnimatedSectionHeading } from './AnimatedSectionHeading';
import { FloatingIconBadge } from './FloatingIconBadge';

const SKILL_LEVELS_STORAGE_KEY = 'ali_murtaza_skill_levels_v1';

function renderSkillIcon(iconKey: TechSkill['iconKey']) {
  const cls = 'w-5 h-5';
  switch (iconKey) {
    case 'html':
      return <Code2 className={cls} />;
    case 'css':
      return <Palette className={cls} />;
    case 'js':
      return <Braces className={cls} />;
    case 'ts':
      return <FileCode2 className={cls} />;
    case 'react':
      return <Atom className={cls} />;
    case 'next':
      return <Layers className={cls} />;
    case 'tailwind':
      return <Palette className={cls} />;
    case 'node':
      return <Server className={cls} />;
    case 'python':
      return <Terminal className={cls} />;
    case 'github':
    case 'git':
      return <Github className={cls} />;
    case 'ai':
      return <Bot className={cls} />;
  }
}

export function SkillsSection() {
  const [editMode, setEditMode] = useState(false);
  const [customLevels, setCustomLevels] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem(SKILL_LEVELS_STORAGE_KEY);
      return saved ? (JSON.parse(saved) as Record<string, number>) : {};
    } catch {
      return {};
    }
  });

  const hasCustomLevels = Object.keys(customLevels).length > 0;

  const updateLevel = (id: string, value: number) => {
    const next = { ...customLevels, [id]: value };
    setCustomLevels(next);
    try {
      localStorage.setItem(SKILL_LEVELS_STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Ignore storage quota errors
    }
  };

  const resetLevels = () => {
    setCustomLevels({});
    try {
      localStorage.removeItem(SKILL_LEVELS_STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
  };

  return (
    <section id="skills" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimatedSectionHeading
          title="My Skills"
          subtitle="Technologies and Tools I Work With."
        />

        {/* Optional Editable Levels Bar */}
        <div className="flex flex-wrap items-center justify-end gap-3 mb-8">
          {hasCustomLevels && editMode && (
            <button
              type="button"
              onClick={resetLevels}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white text-[#64748B] text-xs font-semibold border border-slate-200 hover:border-[#E74C5A] hover:text-[#E74C5A] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>
          )}
          <button
            type="button"
            onClick={() => setEditMode((prev) => !prev)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25C77A] ${
              editMode
                ? 'bg-[#25C77A] text-white border-[#25C77A] shadow-xs'
                : 'bg-white text-[#1E293B] border-slate-200 hover:border-[#25C77A] hover:text-[#189D5E]'
            }`}
          >
            {editMode ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Done Editing</span>
              </>
            ) : (
              <>
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Customize Levels</span>
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILLS_LIST.map((skill, idx) => {
            const level = customLevels[skill.id] ?? skill.defaultLevel;
            return (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.45,
                  delay: idx * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 hover:border-[#25C77A] hover:-translate-y-1.5 hover:shadow-[0_14px_30px_rgba(37,199,122,0.16)] transition-all duration-300"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <FloatingIconBadge size="md" delayMs={(idx % 5) * 180}>
                      {renderSkillIcon(skill.iconKey)}
                    </FloatingIconBadge>
                    <div className="min-w-0">
                      <h3 className="text-lg font-bold text-[#1E293B] group-hover:text-[#189D5E] transition-colors truncate">
                        {skill.name}
                      </h3>
                      <p className="text-xs font-medium text-[#64748B]">
                        {skill.category}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Animated Green Progress Bar Indicator */}
                <div className="mt-5">
                  <div className="h-2.5 w-full rounded-full bg-[#EEF3FA] overflow-hidden">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: level / 100 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{
                        duration: 0.9,
                        delay: 0.1 + idx * 0.04,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      style={{ transformOrigin: 'left center' }}
                      className="h-full w-full rounded-full bg-gradient-to-r from-[#25C77A] to-[#2EDB88] shadow-[0_0_10px_rgba(37,199,122,0.45)]"
                    />
                  </div>

                  {editMode && (
                    <div className="mt-3 flex items-center gap-3">
                      <label htmlFor={`skill-range-${skill.id}`} className="sr-only">
                        Adjust {skill.name} level
                      </label>
                      <input
                        id={`skill-range-${skill.id}`}
                        type="range"
                        min={20}
                        max={100}
                        step={5}
                        value={level}
                        onChange={(e) => updateLevel(skill.id, Number(e.target.value))}
                        className="w-full accent-[#25C77A] cursor-pointer"
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
