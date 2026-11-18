import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import PDFDocument from 'pdfkit';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = Number(process.env.PORT || 3000);
const isProduction = process.env.NODE_ENV === 'production';

interface GitHubRepoSnapshot {
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
}

const VERIFIED_REPO_BASE: GitHubRepoSnapshot[] = [
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
  },
  {
    slug: 'shoes',
    title: 'Shoes Website — AeroSole',
    category: 'website',
    repoOwner: 'DotAliMurtaza',
    repoName: 'shoes',
    requestedRef: 'github.com/muhammadshoaibkhan607-png/shoes (redirects to DotAliMurtaza/shoes)',
    htmlUrl: 'https://github.com/DotAliMurtaza/shoes',
    homepageUrl: 'https://shoes-five-nu.vercel.app',
    description:
      'Modern footwear e-commerce storefront featuring interactive sizing, wishlist management, real-time shopping cart, and seamless checkout flow.',
    primaryLanguage: 'TypeScript',
    languages: ['TypeScript', 'React', 'Tailwind CSS', 'Context API'],
    stars: 0,
    updatedAt: '2026-09-18T00:00:00Z',
  },
  {
    slug: 'uniq-glasses',
    title: 'Unique Glasses — LUMOS Atelier',
    category: 'website',
    repoOwner: 'DotAliMurtaza',
    repoName: 'uniq-glasses',
    requestedRef:
      'github.com/muhammadshoaibkhan607-png/uniq-glasses (redirects to DotAliMurtaza/uniq-glasses)',
    htmlUrl: 'https://github.com/DotAliMurtaza/uniq-glasses',
    homepageUrl: 'https://aliglasses.vercel.app',
    description:
      'Handcrafted eyewear and sunglasses showcase with curated frame collections, optical specifications, and interactive product browsing.',
    primaryLanguage: 'TypeScript',
    languages: ['TypeScript', 'React', 'Tailwind CSS', 'Motion'],
    stars: 0,
    updatedAt: '2026-09-19T00:00:00Z',
  },
  {
    slug: 'Ali-fragrance',
    title: 'Ali Fragrance Website',
    category: 'website',
    repoOwner: 'DotAliMurtaza',
    repoName: 'Ali-fragrance',
    requestedRef:
      'github.com/muhammadshoaibkhan607-png/Ali-fragrance (redirects to DotAliMurtaza/Ali-fragrance)',
    htmlUrl: 'https://github.com/DotAliMurtaza/Ali-fragrance',
    homepageUrl: 'https://ali-fragrance-five.vercel.app',
    description:
      'Luxury fragrance and perfumery storefront crafted with editorial product pages, scent note explorers, and responsive shopping bag controls.',
    primaryLanguage: 'TypeScript',
    languages: ['TypeScript', 'React', 'Tailwind CSS', 'Motion'],
    stars: 0,
    updatedAt: '2026-09-25T00:00:00Z',
  },
];

let githubCache: {
  expiresAt: number;
  profile: { login: string; avatarUrl: string; htmlUrl: string; publicRepos: number; bio: string };
  projects: GitHubRepoSnapshot[];
  source: 'live' | 'verified-fallback';
} | null = null;

async function fetchGitHubPortfolioData() {
  if (githubCache && Date.now() < githubCache.expiresAt) {
    return githubCache;
  }

  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'Ali-Murtaza-Portfolio-App',
  };

  try {
    const userRes = await fetch('https://api.github.com/users/DotAliMurtaza', { headers });
    if (!userRes.ok) {
      throw new Error(`GitHub user API returned ${userRes.status}`);
    }
    const userJson = (await userRes.json()) as {
      login?: string;
      avatar_url?: string;
      html_url?: string;
      public_repos?: number;
      bio?: string;
    };

    const repoResults = await Promise.all(
      VERIFIED_REPO_BASE.map(async (base) => {
        try {
          const rRes = await fetch(
            `https://api.github.com/repos/${base.repoOwner}/${base.repoName}`,
            { headers }
          );
          if (!rRes.ok) return base;
          const rJson = (await rRes.json()) as {
            html_url?: string;
            homepage?: string;
            description?: string | null;
            language?: string | null;
            stargazers_count?: number;
            updated_at?: string;
            owner?: { login?: string };
          };
          return {
            ...base,
            repoOwner: rJson.owner?.login || base.repoOwner,
            htmlUrl: rJson.html_url || base.htmlUrl,
            homepageUrl: rJson.homepage || base.homepageUrl,
            description:
              rJson.description && rJson.description.trim().length > 12
                ? rJson.description.trim()
                : base.description,
            primaryLanguage: rJson.language || base.primaryLanguage,
            stars:
              typeof rJson.stargazers_count === 'number' ? rJson.stargazers_count : base.stars,
            updatedAt: rJson.updated_at || base.updatedAt,
          };
        } catch {
          return base;
        }
      })
    );

    githubCache = {
      expiresAt: Date.now() + 10 * 60 * 1000,
      profile: {
        login: userJson.login || 'DotAliMurtaza',
        avatarUrl: userJson.avatar_url || 'https://avatars.githubusercontent.com/u/327850361?v=4',
        htmlUrl: userJson.html_url || 'https://github.com/DotAliMurtaza',
        publicRepos: userJson.public_repos ?? 15,
        bio:
          userJson.bio ||
          'Full-Stack Developer | Next.js, React, TypeScript & Tailwind CSS | Building modern, responsive & scalable web applications',
      },
      projects: repoResults,
      source: 'live',
    };
    return githubCache;
  } catch {
    githubCache = {
      expiresAt: Date.now() + 2 * 60 * 1000,
      profile: {
        login: 'DotAliMurtaza',
        avatarUrl: 'https://avatars.githubusercontent.com/u/327850361?v=4',
        htmlUrl: 'https://github.com/DotAliMurtaza',
        publicRepos: 15,
        bio: 'Full-Stack Developer | Next.js, React, TypeScript & Tailwind CSS | Building modern, responsive & scalable web applications',
      },
      projects: VERIFIED_REPO_BASE,
      source: 'verified-fallback',
    };
    return githubCache;
  }
}

async function generateCvPdfBuffer(): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: 'A4',
      margin: 0,
      info: {
        Title: 'Ali Murtaza - AI Full Stack Developer CV',
        Author: 'Ali Murtaza',
        Subject: 'Curriculum Vitae',
      },
    });

    const chunks: Buffer[] = [];
    doc.on('data', (chunk: Buffer) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    const pageW = 595.28;
    const pageH = 841.89;
    const sidebarW = 205;
    const mainX = sidebarW + 24;
    const mainW = pageW - mainX - 24;

    // Left Canva Dark Sidebar (#1E293B)
    doc.rect(0, 0, sidebarW, pageH).fill('#1E293B');

    // Top Green & Red Canva Accent Bars
    doc.rect(0, 0, sidebarW, 7).fill('#25C77A');
    doc.rect(sidebarW, 0, pageW - sidebarW, 5).fill('#E74C5A');

    // Circular Profile Photo
    const avatarPath = path.join(__dirname, 'src', 'assets', 'images', 'ali_github_avatar.jpg');
    const cx = sidebarW / 2;
    const cy = 84;
    const outerR = 54;
    const innerR = 48;

    doc.circle(cx, cy, outerR).fill('#25C77A');
    doc.circle(cx, cy, innerR + 2).fill('#FFFFFF');

    if (fs.existsSync(avatarPath)) {
      doc.save();
      doc.circle(cx, cy, innerR).clip();
      doc.image(avatarPath, cx - innerR, cy - innerR, {
        width: innerR * 2,
        height: innerR * 2,
      });
      doc.restore();
    }

    // Sidebar Name & Title
    doc.font('Helvetica-Bold').fontSize(17).fillColor('#FFFFFF');
    doc.text('ALI MURTAZA', 0, 152, { width: sidebarW, align: 'center', lineBreak: false });

    doc.roundedRect(24, 176, sidebarW - 48, 17, 4).fill('#25C77A');
    doc.font('Helvetica-Bold').fontSize(8.2).fillColor('#FFFFFF');
    doc.text('AI FULL STACK DEVELOPER', 24, 181, {
      width: sidebarW - 48,
      align: 'center',
      lineBreak: false,
    });

    const drawSideHeading = (title: string, y: number) => {
      doc.font('Helvetica-Bold').fontSize(9.5).fillColor('#25C77A');
      doc.text(title, 20, y, { lineBreak: false });
      doc.moveTo(20, y + 13).lineTo(sidebarW - 20, y + 13).lineWidth(1).stroke('#334155');
    };

    // Contact Info
    let sy = 216;
    drawSideHeading('CONTACT', sy);
    sy += 22;

    const contactRows = [
      { label: 'LOCATION', value: 'Model Colony, Karachi, Pakistan' },
      { label: 'EMAIL', value: 'amsiddiquikhan147@gmail.com' },
      { label: 'WHATSAPP', value: '+92 328 2305470' },
      { label: 'GITHUB', value: 'github.com/DotAliMurtaza' },
    ];

    for (const c of contactRows) {
      doc.font('Helvetica-Bold').fontSize(7.2).fillColor('#94A3B8');
      doc.text(c.label, 20, sy, { lineBreak: false });
      doc.font('Helvetica').fontSize(8.3).fillColor('#F1F5F9');
      doc.text(c.value, 20, sy + 10, { width: sidebarW - 40 });
      sy += 29;
    }

    // Technical Stack Skill Bars
    sy += 8;
    drawSideHeading('TECHNICAL STACK', sy);
    sy += 22;

    const skills = [
      { name: 'React.js / Next.js', pct: 0.9 },
      { name: 'TypeScript / JavaScript', pct: 0.88 },
      { name: 'HTML5 / CSS3 / Tailwind', pct: 0.92 },
      { name: 'Node.js / Express', pct: 0.85 },
      { name: 'Python & AI Integration', pct: 0.86 },
      { name: 'Git & GitHub', pct: 0.88 },
    ];

    for (const sk of skills) {
      doc.font('Helvetica-Bold').fontSize(8.2).fillColor('#F1F5F9');
      doc.text(sk.name, 20, sy, { lineBreak: false });
      doc.roundedRect(20, sy + 12, sidebarW - 40, 4.5, 2).fill('#334155');
      doc.roundedRect(20, sy + 12, (sidebarW - 40) * sk.pct, 4.5, 2).fill('#25C77A');
      sy += 24;
    }

    // Services
    sy += 10;
    drawSideHeading('SERVICES', sy);
    sy += 22;
    for (const srv of ['Web Development', 'Responsive Design', 'AI & Full Stack Development']) {
      doc.circle(23, sy + 4, 2).fill('#25C77A');
      doc.font('Helvetica-Bold').fontSize(8.2).fillColor('#F1F5F9');
      doc.text(srv, 30, sy, { lineBreak: false });
      sy += 16;
    }

    // Right Main White Canvas
    doc.font('Helvetica-Bold').fontSize(22).fillColor('#1E293B');
    doc.text('Curriculum Vitae', mainX, 24, { lineBreak: false });

    doc.font('Helvetica-Bold').fontSize(9.2).fillColor('#E74C5A');
    doc.text('Modern Web Applications  ·  Interactive 3D Games  ·  AI Solutions', mainX, 50, {
      lineBreak: false,
    });

    // Summary Card (#EEF3FA)
    doc.roundedRect(mainX, 72, mainW, 74, 6).fill('#EEF3FA');
    doc.rect(mainX, 72, 4, 74).fill('#25C77A');

    doc.font('Helvetica-Bold').fontSize(9.5).fillColor('#1E293B');
    doc.text('PROFESSIONAL SUMMARY', mainX + 14, 83, { lineBreak: false });
    doc.font('Helvetica').fontSize(8.6).fillColor('#475569');
    doc.text(
      "I'm Ali Murtaza, an AI Full Stack Developer passionate about creating modern, responsive, and intelligent digital experiences. Focused on clean architecture, expressive UI animations, and AI-integrated full-stack systems.",
      mainX + 14,
      98,
      { width: mainW - 26, lineGap: 2 }
    );

    const drawMainHeading = (title: string, y: number) => {
      doc.font('Helvetica-Bold').fontSize(10.5).fillColor('#1E293B');
      doc.text(title, mainX, y, { lineBreak: false });
      doc.rect(mainX, y + 14, 42, 2.2).fill('#25C77A');
      doc.rect(mainX + 46, y + 14.8, mainW - 46, 0.8).fill('#E2E8F0');
    };

    // Development Experience Timeline
    let my = 166;
    drawMainHeading('DEVELOPMENT EXPERIENCE', my);
    my += 26;

    const expBlocks = [
      {
        title: 'AI Full Stack Development',
        focus: 'End-to-End Application Engineering',
        desc: 'Building modern web applications · Integrating AI-powered features · Frontend and backend development · Creating responsive digital experiences.',
      },
      {
        title: 'Frontend Development',
        focus: 'Modern UI & Motion Craft',
        desc: 'React.js and Next.js · HTML, CSS and JavaScript · Modern user interfaces · Responsive website development.',
      },
      {
        title: 'Projects & Practical Experience',
        focus: 'Hands-On Shipping & Iteration',
        desc: 'Developing browser-based games · Building modern websites · Working with GitHub repositories · Improving application performance.',
      },
    ];

    const lineStartY = my + 5;
    doc.moveTo(mainX + 5, lineStartY).lineTo(mainX + 5, my + 126).lineWidth(1.2).stroke('#25C77A');

    for (const exp of expBlocks) {
      doc.circle(mainX + 5, my + 5, 3.5).fill('#25C77A');
      doc.font('Helvetica-Bold').fontSize(9.5).fillColor('#1E293B');
      doc.text(exp.title, mainX + 16, my, { lineBreak: false });
      doc.font('Helvetica').fontSize(7.8).fillColor('#64748B');
      doc.text(exp.focus, mainX + 16, my + 1, { width: mainW - 16, align: 'right', lineBreak: false });

      doc.font('Helvetica').fontSize(8.2).fillColor('#475569');
      doc.text(exp.desc, mainX + 16, my + 14, { width: mainW - 20, lineGap: 1.5 });
      my += 48;
    }

    // Featured GitHub Projects (2-Column Canva Cards)
    my += 6;
    drawMainHeading('FEATURED GITHUB PROJECTS', my);
    my += 24;

    const cardGap = 10;
    const cardW = (mainW - cardGap) / 2;
    const cardH = 74;

    for (let i = 0; i < VERIFIED_REPO_BASE.length; i++) {
      const p = VERIFIED_REPO_BASE[i];
      const col = i % 2;
      const row = Math.floor(i / 2);
      const cxCard = mainX + col * (cardW + cardGap);
      const cyCard = my + row * (cardH + 10);

      doc.roundedRect(cxCard, cyCard, cardW, cardH, 5).fill('#EEF3FA');
      doc.rect(cxCard + 8, cyCard, cardW - 16, 2).fill('#25C77A');

      doc.font('Helvetica-Bold').fontSize(8.6).fillColor('#1E293B');
      doc.text(p.title, cxCard + 10, cyCard + 9, { width: cardW - 20, lineBreak: false });

      doc.font('Helvetica-Bold').fontSize(7.2).fillColor('#189D5E');
      doc.text(p.languages.slice(0, 3).join(' · '), cxCard + 10, cyCard + 21, {
        width: cardW - 20,
        lineBreak: false,
      });

      doc.font('Helvetica').fontSize(7.3).fillColor('#475569');
      doc.text(p.description, cxCard + 10, cyCard + 33, {
        width: cardW - 20,
        height: 20,
        ellipsis: true,
      });

      doc.font('Helvetica-Bold').fontSize(7.2).fillColor('#1E293B');
      doc.text('Live Demo', cxCard + 10, cyCard + 59, {
        link: p.homepageUrl || p.htmlUrl,
        lineBreak: false,
      });
      doc.font('Helvetica-Bold').fontSize(7.2).fillColor('#E74C5A');
      doc.text('GitHub Code', cxCard + 62, cyCard + 59, {
        link: p.htmlUrl,
        lineBreak: false,
      });
    }

    doc.font('Helvetica').fontSize(7.5).fillColor('#94A3B8');
    doc.text('Ali Murtaza — AI Full Stack Developer  |  github.com/DotAliMurtaza', mainX, pageH - 22, {
      width: mainW,
      align: 'center',
      lineBreak: false,
    });

    doc.end();
  });
}

interface InquiryRecord {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  deliveredVia: 'smtp-and-inbox' | 'server-inbox';
}

function saveInquiryToDisk(record: InquiryRecord) {
  const dataDir = path.join(__dirname, 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  const filePath = path.join(dataDir, 'inquiries.json');
  let existing: InquiryRecord[] = [];
  if (fs.existsSync(filePath)) {
    try {
      const raw = fs.readFileSync(filePath, 'utf8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) existing = parsed;
    } catch {
      existing = [];
    }
  }
  existing.unshift(record);
  fs.writeFileSync(filePath, JSON.stringify(existing, null, 2), 'utf8');
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '1mb' }));

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true, timestamp: new Date().toISOString() });
  });

  app.get('/api/github/projects', async (_req, res) => {
    const data = await fetchGitHubPortfolioData();
    res.json({
      profile: data.profile,
      projects: data.projects,
      source: data.source,
    });
  });

  app.get('/api/cv', async (_req, res) => {
    try {
      const pdfBuffer = await generateCvPdfBuffer();
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'inline; filename="Ali_Murtaza_CV.pdf"');
      res.setHeader('Content-Length', String(pdfBuffer.length));
      res.send(pdfBuffer);
    } catch (err) {
      console.error('PDF generation failed:', err);
      res.status(500).json({ ok: false, error: 'Failed to generate CV PDF.' });
    }
  });

  app.post('/api/contact', async (req, res) => {
    const { name, email, subject, message } = (req.body || {}) as Record<string, unknown>;

    const cleanName = typeof name === 'string' ? name.trim() : '';
    const cleanEmail = typeof email === 'string' ? email.trim() : '';
    const cleanSubject = typeof subject === 'string' ? subject.trim() : '';
    const cleanMessage = typeof message === 'string' ? message.trim() : '';

    if (cleanName.length < 2 || cleanName.length > 100) {
      res.status(400).json({ ok: false, error: 'Please enter your name (2–100 characters).' });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail) || cleanEmail.length > 160) {
      res.status(400).json({ ok: false, error: 'Please enter a valid email address.' });
      return;
    }
    if (cleanSubject.length < 2 || cleanSubject.length > 160) {
      res.status(400).json({ ok: false, error: 'Please provide a brief subject line.' });
      return;
    }
    if (cleanMessage.length < 10 || cleanMessage.length > 4000) {
      res.status(400).json({
        ok: false,
        error: 'Please write a message of at least 10 characters.',
      });
      return;
    }

    const smtpHost = process.env.SMTP_HOST?.trim();
    const smtpUser = process.env.SMTP_USER?.trim();
    const smtpPass = process.env.SMTP_PASS?.trim();
    const receiver = process.env.CONTACT_RECEIVER_EMAIL?.trim() || 'amsiddiquikhan147@gmail.com';
    let deliveredVia: 'smtp-and-inbox' | 'server-inbox' = 'server-inbox';

    if (smtpHost && smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: Number(process.env.SMTP_PORT || 587),
          secure: Number(process.env.SMTP_PORT || 587) === 465,
          auth: { user: smtpUser, pass: smtpPass },
        });
        await transporter.sendMail({
          from: `"Portfolio Contact" <${smtpUser}>`,
          to: receiver,
          replyTo: cleanEmail,
          subject: `[Portfolio Inquiry] ${cleanSubject}`,
          text: `Name: ${cleanName}\nEmail: ${cleanEmail}\nSubject: ${cleanSubject}\n\nMessage:\n${cleanMessage}`,
        });
        deliveredVia = 'smtp-and-inbox';
      } catch (err) {
        console.error('SMTP delivery error:', err);
        res.status(502).json({
          ok: false,
          error:
            'Email relay configuration failed. Please contact Ali directly at amsiddiquikhan147@gmail.com or WhatsApp +92 328 2305470.',
        });
        return;
      }
    }

    try {
      const record: InquiryRecord = {
        id: `inq_${Date.now().toString(36)}`,
        name: cleanName,
        email: cleanEmail,
        subject: cleanSubject,
        message: cleanMessage,
        createdAt: new Date().toISOString(),
        deliveredVia,
      };
      saveInquiryToDisk(record);
      res.status(200).json({
        ok: true,
        id: record.id,
        deliveredVia,
        timestamp: record.createdAt,
      });
    } catch (err) {
      console.error('Failed to persist inquiry:', err);
      res.status(500).json({
        ok: false,
        error: 'Server could not record your message. Please try WhatsApp or email directly.',
      });
    }
  });

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.join(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('/{*path}', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}

startServer();
