export type ProjectCategory = 'all' | 'game' | 'website';

export interface ProjectItem {
  slug: string;
  title: string;
  category: 'game' | 'website';
  repoOwner: string;
  repoName: string;
  requestedRef?: string;
  htmlUrl: string;
  homepageUrl: string;
  description: string;
  primaryLanguage: string;
  languages: string[];
  stars: number;
  updatedAt: string;
  imageUrl: string;
}

export interface GitHubProfileSummary {
  login: string;
  avatarUrl: string;
  htmlUrl: string;
  publicRepos: number;
  bio: string;
}

export interface ExperienceItem {
  id: string;
  title: string;
  focus: string;
  points: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: 'laptop' | 'smartphone' | 'brain';
}

export interface TechSkill {
  name: string;
  category: string;
  iconKey:
    | 'html'
    | 'css'
    | 'js'
    | 'ts'
    | 'react'
    | 'next'
    | 'tailwind'
    | 'node'
    | 'python'
    | 'git'
    | 'github'
    | 'ai';
}

export interface SkillCardItem {
  id: string;
  name: string;
  category: string;
  defaultLevel: number;
  iconKey: TechSkill['iconKey'];
}
