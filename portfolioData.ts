import type { ExperienceItem, ProjectItem, ServiceItem, TechSkill } from '../types/portfolio';

export const PERSONAL_INFO = {
  name: 'Ali Murtaza',
  title: 'AI Full Stack Developer',
  email: 'amsiddiquikhan147@gmail.com',
  hireMailto:
    'mailto:amsiddiquikhan147@gmail.com?subject=Hiring%20Inquiry%20-%20Ali%20Murtaza&body=Hello%20Ali%20Murtaza%2C%0A%0AI%20visited%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project%20with%20you.',
  location: 'Model Colony, Karachi, Pakistan',
  whatsappDisplay: '+92 328 2305470',
  whatsappLink: 'https://wa.me/923282305470',
  githubUrl: 'https://github.com/DotAliMurtaza',
  defaultAvatarUrl: '/src/assets/images/ali_github_avatar.jpg',
};

export const HERO_TYPING_ROLES = [
  'AI Full Stack Developer',
  'Frontend Developer',
  'Backend Developer',
  'AI Application Developer',
];

export const TECH_SKILLS: TechSkill[] = [
  { name: 'HTML5', category: 'Markup', iconKey: 'html' },
  { name: 'CSS3', category: 'Styling', iconKey: 'css' },
  { name: 'JavaScript', category: 'Language', iconKey: 'js' },
  { name: 'TypeScript', category: 'Typed JS', iconKey: 'ts' },
  { name: 'React.js', category: 'UI Library', iconKey: 'react' },
  { name: 'Next.js', category: 'Framework', iconKey: 'next' },
  { name: 'Tailwind CSS', category: 'Utility CSS', iconKey: 'tailwind' },
  { name: 'Node.js', category: 'Runtime', iconKey: 'node' },
  { name: 'Python', category: 'Backend & AI', iconKey: 'python' },
  { name: 'Git', category: 'Versioning', iconKey: 'git' },
  { name: 'GitHub', category: 'Collaboration', iconKey: 'github' },
  { name: 'AI Integration', category: 'Intelligent Apps', iconKey: 'ai' },
];

export const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    id: 'ai-fullstack',
    title: 'AI Full Stack Development',
    focus: 'End-to-End Application Engineering',
    points: [
      'Building modern web applications.',
      'Integrating AI-powered features.',
      'Frontend and backend development.',
      'Creating responsive digital experiences.',
    ],
  },
  {
    id: 'frontend-dev',
    title: 'Frontend Development',
    focus: 'Modern UI & Motion Craft',
    points: [
      'React.js and Next.js.',
      'HTML, CSS and JavaScript.',
      'Modern user interfaces.',
      'Responsive website development.',
    ],
  },
  {
    id: 'practical-projects',
    title: 'Projects & Practical Experience',
    focus: 'Hands-On Shipping & Iteration',
    points: [
      'Developing browser-based games.',
      'Building modern websites.',
      'Working with GitHub repositories.',
      'Improving application performance.',
    ],
  },
];

export const PROJECT_IMAGE_MAP: Record<string, string> = {
  'car-game': '/src/assets/images/project_car_game_1794906899639.jpg',
  'ludo-king': '/src/assets/images/project_ludo_king_1794906900258.jpg',
  'tom-gold-run-': '/src/assets/images/project_tom_gold_run_1794906901093.jpg',
  shoes: '/src/assets/images/project_shoes_store_1794906901951.jpg',
  'uniq-glasses': '/src/assets/images/project_uniq_glasses_1794906901328.jpg',
  'Ali-fragrance': '/src/assets/images/project_ali_fragrance_1794906901865.jpg',
};

export const FALLBACK_PROJECTS: ProjectItem[] = [
  {
    slug: 'car-game',
    title: 'Car Game — Apex Racer',
    category: 'game',
    repoOwner: 'DotAliMurtaza',
    repoName: 'car-game',
    htmlUrl: 'https://github.com/DotAliMurtaza/car-game',
    homepageUrl: 'https://car-game-virid-six.vercel.app',
    description:
      'Fast-paced arcade car racing game featuring multiple difficulty levels, responsive touch and keyboard controls, and smooth animation.',
    primaryLanguage: 'TypeScript',
    languages: ['TypeScript', 'React', 'Tailwind CSS', 'Motion'],
    stars: 1,
    updatedAt: '2026-09-20T00:00:00Z',
    imageUrl: PROJECT_IMAGE_MAP['car-game'],
  },
  {
    slug: 'ludo-king',
    title: 'Ludo King — Ludo 3D Realm',
    category: 'game',
    repoOwner: 'DotAliMurtaza',
    repoName: 'ludo-king',
    htmlUrl: 'https://github.com/DotAliMurtaza/ludo-king',
    homepageUrl: 'https://ludokingmurtaza.vercel.app',
    description:
      'Interactive 3D Ludo board game with smooth turn-based gameplay, sound effects, responsive layout, and intelligent bot opponents.',
    primaryLanguage: 'TypeScript',
    languages: ['TypeScript', 'React', 'Tailwind CSS', 'Canvas Confetti'],
    stars: 1,
    updatedAt: '2026-09-22T00:00:00Z',
    imageUrl: PROJECT_IMAGE_MAP['ludo-king'],
  },
  {
    slug: 'tom-gold-run-',
    title: 'Tom Gold Run 3D',
    category: 'game',
    repoOwner: 'DotAliMurtaza',
    repoName: 'tom-gold-run-',
    htmlUrl: 'https://github.com/DotAliMurtaza/tom-gold-run-',
    homepageUrl: 'https://tomgoldrun.vercel.app',
    description:
      'Three.js 3D endless-runner game with character selection, oncoming train and car obstacles, gold collection, and pass-and-play modes.',
    primaryLanguage: 'TypeScript',
    languages: ['TypeScript', 'Three.js', 'React', 'Tailwind CSS'],
    stars: 1,
    updatedAt: '2026-09-24T00:00:00Z',
    imageUrl: PROJECT_IMAGE_MAP['tom-gold-run-'],
  },
  {
    slug: 'shoes',
    title: 'Shoes Website — AeroSole',
    category: 'website',
    repoOwner: 'DotAliMurtaza',
    repoName: 'shoes',
    requestedRef: 'muhammadshoaibkhan607-png/shoes -> DotAliMurtaza/shoes',
    htmlUrl: 'https://github.com/DotAliMurtaza/shoes',
    homepageUrl: 'https://shoes-five-nu.vercel.app',
    description:
      'Modern footwear e-commerce storefront featuring interactive sizing, wishlist management, real-time shopping cart, and seamless checkout flow.',
    primaryLanguage: 'TypeScript',
    languages: ['TypeScript', 'React', 'Tailwind CSS', 'Context API'],
    stars: 0,
    updatedAt: '2026-09-18T00:00:00Z',
    imageUrl: PROJECT_IMAGE_MAP['shoes'],
  },
  {
    slug: 'uniq-glasses',
    title: 'Unique Glasses — LUMOS Atelier',
    category: 'website',
    repoOwner: 'DotAliMurtaza',
    repoName: 'uniq-glasses',
    requestedRef: 'muhammadshoaibkhan607-png/uniq-glasses -> DotAliMurtaza/uniq-glasses',
    htmlUrl: 'https://github.com/DotAliMurtaza/uniq-glasses',
    homepageUrl: 'https://aliglasses.vercel.app',
    description:
      'Handcrafted eyewear and sunglasses showcase with curated frame collections, optical specifications, and interactive product browsing.',
    primaryLanguage: 'TypeScript',
    languages: ['TypeScript', 'React', 'Tailwind CSS', 'Motion'],
    stars: 0,
    updatedAt: '2026-09-19T00:00:00Z',
    imageUrl: PROJECT_IMAGE_MAP['uniq-glasses'],
  },
  {
    slug: 'Ali-fragrance',
    title: 'Ali Fragrance Website',
    category: 'website',
    repoOwner: 'DotAliMurtaza',
    repoName: 'Ali-fragrance',
    requestedRef: 'muhammadshoaibkhan607-png/Ali-fragrance -> DotAliMurtaza/Ali-fragrance',
    htmlUrl: 'https://github.com/DotAliMurtaza/Ali-fragrance',
    homepageUrl: 'https://ali-fragrance-five.vercel.app',
    description:
      'Luxury fragrance and perfumery storefront crafted with editorial product pages, scent note explorers, and responsive shopping bag controls.',
    primaryLanguage: 'TypeScript',
    languages: ['TypeScript', 'React', 'Tailwind CSS', 'Motion'],
    stars: 0,
    updatedAt: '2026-09-25T00:00:00Z',
    imageUrl: PROJECT_IMAGE_MAP['Ali-fragrance'],
  },
];

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'web-development',
    title: 'Web Development',
    description: 'Modern, responsive and high-performance websites.',
    iconName: 'laptop',
  },
  {
    id: 'responsive-design',
    title: 'Responsive Design',
    description: 'Beautiful websites optimized for mobile, tablet and desktop.',
    iconName: 'smartphone',
  },
  {
    id: 'ai-fullstack',
    title: 'AI & Full Stack Development',
    description:
      'AI-powered applications, backend development and intelligent digital solutions.',
    iconName: 'brain',
  },
];

export const SKILLS_LIST = [
  { id: 'html5', name: 'HTML5', category: 'Semantic Markup', defaultLevel: 90, iconKey: 'html' as const },
  { id: 'css3', name: 'CSS3', category: 'Modern Styling', defaultLevel: 88, iconKey: 'css' as const },
  { id: 'javascript', name: 'JavaScript', category: 'Core Language', defaultLevel: 88, iconKey: 'js' as const },
  { id: 'typescript', name: 'TypeScript', category: 'Type Safety', defaultLevel: 86, iconKey: 'ts' as const },
  { id: 'reactjs', name: 'React.js', category: 'UI Architecture', defaultLevel: 90, iconKey: 'react' as const },
  { id: 'nextjs', name: 'Next.js', category: 'Full-Stack Framework', defaultLevel: 85, iconKey: 'next' as const },
  { id: 'tailwindcss', name: 'Tailwind CSS', category: 'Design Systems', defaultLevel: 92, iconKey: 'tailwind' as const },
  { id: 'nodejs', name: 'Node.js', category: 'Backend Runtime', defaultLevel: 84, iconKey: 'node' as const },
  { id: 'python', name: 'Python', category: 'AI & Scripting', defaultLevel: 82, iconKey: 'python' as const },
  { id: 'git-github', name: 'Git & GitHub', category: 'Version Control', defaultLevel: 88, iconKey: 'github' as const },
  { id: 'ai-integration', name: 'AI Integration', category: 'Intelligent Apps', defaultLevel: 86, iconKey: 'ai' as const },
];
