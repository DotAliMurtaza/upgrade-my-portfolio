import { jsPDF } from 'jspdf';
import {
  EXPERIENCE_ITEMS,
  FALLBACK_PROJECTS,
  PERSONAL_INFO,
  SERVICES_LIST,
} from '../data/portfolioData';
import type { ProjectItem } from '../types/portfolio';

async function renderCircularAvatarPng(src: string): Promise<string | null> {
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.crossOrigin = 'anonymous';
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error('Image load failed'));
      el.src = src;
    });

    const size = 440;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const center = size / 2;
    const outerRadius = size / 2 - 8;
    const innerRadius = outerRadius - 14;

    // Subtle green outer glow ring (Canva style)
    ctx.save();
    ctx.beginPath();
    ctx.arc(center, center, outerRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#25C77A';
    ctx.fill();
    ctx.restore();

    // Thin white inner spacer ring
    ctx.save();
    ctx.beginPath();
    ctx.arc(center, center, innerRadius + 5, 0, Math.PI * 2);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.restore();

    // Circular clipped portrait (aspect-fill center crop)
    ctx.save();
    ctx.beginPath();
    ctx.arc(center, center, innerRadius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    const imgAspect = img.width / img.height;
    let drawW = innerRadius * 2;
    let drawH = innerRadius * 2;
    if (imgAspect > 1) {
      drawW = drawH * imgAspect;
    } else {
      drawH = drawW / imgAspect;
    }
    const drawX = center - drawW / 2;
    const drawY = center - drawH / 2;
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
    ctx.restore();

    return canvas.toDataURL('image/png');
  } catch {
    return null;
  }
}

export async function downloadCanvaCvPdf(
  avatarSrc: string,
  projects: ProjectItem[] = FALLBACK_PROJECTS
): Promise<void> {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4',
    compress: true,
  });

  // A4 dimensions: 595.28 x 841.89 pt
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const sidebarW = 205;
  const mainX = sidebarW + 24;
  const mainW = pageW - mainX - 24;

  // === LEFT CANVA SIDEBAR (#1E293B) ===
  doc.setFillColor(30, 41, 59);
  doc.rect(0, 0, sidebarW, pageH, 'F');

  // Top decorative Canva green & red corner bars
  doc.setFillColor(37, 199, 122);
  doc.rect(0, 0, sidebarW, 7, 'F');
  doc.setFillColor(231, 76, 90);
  doc.rect(sidebarW, 0, pageW - sidebarW, 5, 'F');

  // Circular Avatar Image
  const circularPng = await renderCircularAvatarPng(avatarSrc);
  const avatarSize = 112;
  const avatarX = (sidebarW - avatarSize) / 2;
  const avatarY = 28;
  if (circularPng) {
    doc.addImage(circularPng, 'PNG', avatarX, avatarY, avatarSize, avatarSize);
  } else {
    doc.setFillColor(37, 199, 122);
    doc.circle(sidebarW / 2, avatarY + avatarSize / 2, avatarSize / 2, 'F');
  }

  // Name & Role in Sidebar
  let sideY = 164;
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(17);
  doc.text('ALI MURTAZA', sidebarW / 2, sideY, { align: 'center' });

  sideY += 16;
  doc.setFillColor(37, 199, 122);
  doc.roundedRect(26, sideY - 10, sidebarW - 52, 16, 4, 4, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text('AI FULL STACK DEVELOPER', sidebarW / 2, sideY + 1, { align: 'center' });

  // Sidebar Contact Section
  sideY += 32;
  const drawSideHeading = (label: string, y: number) => {
    doc.setTextColor(37, 199, 122);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text(label, 20, y);
    doc.setDrawColor(51, 65, 85);
    doc.setLineWidth(1);
    doc.line(20, y + 5, sidebarW - 20, y + 5);
  };

  drawSideHeading('CONTACT', sideY);
  sideY += 20;

  const contactItems = [
    { label: 'Location', value: PERSONAL_INFO.location },
    { label: 'Email', value: PERSONAL_INFO.email },
    { label: 'WhatsApp', value: PERSONAL_INFO.whatsappDisplay },
    { label: 'GitHub', value: 'github.com/DotAliMurtaza' },
  ];

  for (const item of contactItems) {
    doc.setTextColor(148, 163, 184);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.text(item.label.toUpperCase(), 20, sideY);
    sideY += 11;

    doc.setTextColor(241, 245, 249);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    const wrapped = doc.splitTextToSize(item.value, sidebarW - 40);
    doc.text(wrapped, 20, sideY);
    sideY += wrapped.length * 10 + 7;
  }

  // Sidebar Skills Bars (Canva style)
  sideY += 10;
  drawSideHeading('TECHNICAL STACK', sideY);
  sideY += 20;

  const sidebarSkills = [
    { name: 'React.js / Next.js', pct: 0.9 },
    { name: 'TypeScript / JS', pct: 0.88 },
    { name: 'HTML5 / CSS3 / Tailwind', pct: 0.92 },
    { name: 'Node.js / Express', pct: 0.85 },
    { name: 'Python & AI Integration', pct: 0.86 },
    { name: 'Git & GitHub', pct: 0.88 },
  ];

  for (const sk of sidebarSkills) {
    doc.setTextColor(241, 245, 249);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.2);
    doc.text(sk.name, 20, sideY);
    sideY += 5;

    // Track
    doc.setFillColor(51, 65, 85);
    doc.roundedRect(20, sideY, sidebarW - 40, 4.5, 2, 2, 'F');
    // Green Fill
    doc.setFillColor(37, 199, 122);
    doc.roundedRect(20, sideY, (sidebarW - 40) * sk.pct, 4.5, 2, 2, 'F');
    sideY += 15;
  }

  // Sidebar Services
  sideY += 8;
  drawSideHeading('SERVICES', sideY);
  sideY += 18;
  for (const srv of SERVICES_LIST) {
    doc.setFillColor(37, 199, 122);
    doc.circle(23, sideY - 2.5, 2, 'F');
    doc.setTextColor(241, 245, 249);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.3);
    doc.text(srv.title, 30, sideY);
    sideY += 14;
  }

  // === RIGHT MAIN WHITE CANVAS ===
  let mainY = 36;

  // Top Header Title on Right Side
  doc.setTextColor(30, 41, 59);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text('Curriculum Vitae', mainX, mainY);

  mainY += 14;
  doc.setTextColor(231, 76, 90);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.text('Modern Web Applications  ·  Interactive 3D Games  ·  AI Solutions', mainX, mainY);

  mainY += 22;

  // Profile Summary Card (#EEF3FA)
  doc.setFillColor(238, 243, 250);
  doc.roundedRect(mainX, mainY, mainW, 68, 6, 6, 'F');
  doc.setFillColor(37, 199, 122);
  doc.roundedRect(mainX, mainY, 4, 68, 2, 2, 'F');

  doc.setTextColor(30, 41, 59);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('PROFESSIONAL SUMMARY', mainX + 14, mainY + 16);

  doc.setTextColor(71, 85, 105);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.8);
  const summaryLines = doc.splitTextToSize(
    "I'm Ali Murtaza, an AI Full Stack Developer passionate about creating modern, responsive, and intelligent digital experiences. Focused on clean architecture, expressive UI animations, and AI-integrated full-stack systems.",
    mainW - 26
  );
  doc.text(summaryLines, mainX + 14, mainY + 30);

  mainY += 86;

  // Helper for Main Section Headings
  const drawMainHeading = (title: string, y: number) => {
    doc.setTextColor(30, 41, 59);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text(title, mainX, y);
    doc.setFillColor(37, 199, 122);
    doc.rect(mainX, y + 4, 42, 2.2, 'F');
    doc.setFillColor(226, 232, 240);
    doc.rect(mainX + 46, y + 4.8, mainW - 46, 0.8, 'F');
  };

  // Development Experience Timeline
  drawMainHeading('DEVELOPMENT EXPERIENCE', mainY);
  mainY += 20;

  const timelineStartY = mainY;
  const timelineLineX = mainX + 5;

  for (let i = 0; i < EXPERIENCE_ITEMS.length; i++) {
    const exp = EXPERIENCE_ITEMS[i];
    // Timeline dot
    doc.setFillColor(37, 199, 122);
    doc.circle(timelineLineX, mainY - 3, 3.5, 'F');

    doc.setTextColor(30, 41, 59);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.text(exp.title, mainX + 16, mainY);

    doc.setTextColor(100, 116, 139);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text(exp.focus, mainX + mainW, mainY, { align: 'right' });

    mainY += 12;
    const summaryPoint = exp.points.join(' · ');
    const wrappedExp = doc.splitTextToSize(summaryPoint, mainW - 20);
    doc.setTextColor(71, 85, 105);
    doc.setFontSize(8.2);
    doc.text(wrappedExp, mainX + 16, mainY);
    mainY += wrappedExp.length * 10 + 10;
  }

  // Draw vertical timeline connector behind dots
  doc.setDrawColor(37, 199, 122);
  doc.setLineWidth(1.2);
  doc.line(timelineLineX, timelineStartY + 2, timelineLineX, mainY - 22);

  mainY += 8;

  // Featured GitHub Projects (2-Column Canva Grid)
  drawMainHeading('FEATURED GITHUB PROJECTS', mainY);
  mainY += 18;

  const cardGap = 10;
  const cardW = (mainW - cardGap) / 2;
  const cardH = 74;
  const displayProjects = projects.slice(0, 6);

  for (let i = 0; i < displayProjects.length; i++) {
    const p = displayProjects[i];
    const col = i % 2;
    const row = Math.floor(i / 2);
    const cx = mainX + col * (cardW + cardGap);
    const cy = mainY + row * (cardH + 10);

    // Card Background (#EEF3FA)
    doc.setFillColor(238, 243, 250);
    doc.roundedRect(cx, cy, cardW, cardH, 5, 5, 'F');

    // Top Green Accent Strip
    doc.setFillColor(37, 199, 122);
    doc.rect(cx + 8, cy, cardW - 16, 2, 'F');

    // Project Title
    doc.setTextColor(30, 41, 59);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.8);
    doc.text(p.title, cx + 10, cy + 15);

    // Tech stack
    doc.setTextColor(24, 157, 94);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.2);
    doc.text(p.languages.slice(0, 3).join(' · '), cx + 10, cy + 25);

    // Description (2 lines max)
    doc.setTextColor(71, 85, 105);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    const descLines = doc.splitTextToSize(p.description, cardW - 20).slice(0, 2);
    doc.text(descLines, cx + 10, cy + 36);

    // Links
    doc.setTextColor(30, 41, 59);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.2);
    const liveLabel = p.homepageUrl ? 'Live Demo' : 'Repository';
    doc.textWithLink(liveLabel, cx + 10, cy + 63, { url: p.homepageUrl || p.htmlUrl });
    doc.setTextColor(100, 116, 139);
    doc.text('·', cx + 52, cy + 63);
    doc.setTextColor(231, 76, 90);
    doc.textWithLink('GitHub Code', cx + 60, cy + 63, { url: p.htmlUrl });
  }

  // Footer
  doc.setTextColor(148, 163, 184);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.text(
    'Ali Murtaza — AI Full Stack Developer  |  github.com/DotAliMurtaza',
    mainX + mainW / 2,
    pageH - 18,
    { align: 'center' }
  );

  doc.save('Ali_Murtaza_CV.pdf');
}
