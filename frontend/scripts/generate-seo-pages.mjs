import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const frontendRoot = path.resolve(__dirname, '..');
const distRoot = path.join(frontendRoot, 'dist');
const publicRoot = path.join(frontendRoot, 'public');
const siteUrl = 'https://www.jetpulse.in';

// Import SEO Configuration
const { SEO_PAGES, NOINDEX_ROUTES, generatePageSchema } = await import('../src/seo/seoConfig.js');

function escapeHtml(value) {
  if (!value) return '';
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[character]));
}

const RELATED_SERVICES = [
  { href: '/healthcare-companion', label: 'Healthcare Companion' },
  { href: '/doctor-visit-assistance', label: 'Doctor Visit Assistance' },
  { href: '/diagnostic-test-assistance', label: 'Diagnostic Tests' },
  { href: '/hospital-visit-assistance', label: 'Hospital Navigation' },
  { href: '/post-discharge-care', label: 'Post-Discharge Care' },
  { href: '/family-healthcare', label: 'Family Healthcare' },
  { href: '/care-navigator', label: 'Care Navigator AI' },
];

const CITY_LINKS = [
  { href: '/cities/bangalore', label: 'Bangalore' },
  { href: '/cities/varanasi', label: 'Varanasi' },
  { href: '/cities/jaipur', label: 'Jaipur' },
];

function staticContent(page) {
  const isTrustPage = page.category === 'trust';
  const isLocationPage = page.category === 'location';

  // Breadcrumbs HTML
  const breadcrumbsHtml = page.breadcrumbs && page.breadcrumbs.length > 0
    ? `<nav aria-label="Breadcrumb" style="margin-bottom:20px;"><ol style="display:flex;align-items:center;flex-wrap:wrap;gap:8px;list-style:none;padding:0;margin:0;font-size:13px;color:#64748b;">${page.breadcrumbs.map((crumb, idx) => {
        const isLast = idx === page.breadcrumbs.length - 1;
        const separator = idx > 0 ? '<span style="color:#cbd5e1;" aria-hidden="true">›</span>' : '';
        return `<li style="display:flex;align-items:center;gap:8px;">${separator}${isLast ? `<span style="color:#0F9F96;font-weight:600;" aria-current="page">${escapeHtml(crumb.name)}</span>` : `<a href="${crumb.url}" style="color:#64748b;text-decoration:none;">${escapeHtml(crumb.name)}</a>`}</li>`;
      }).join('')}</ol></nav>`
    : '';

  // Service Points
  const pointsHtml = page.points && page.points.length > 0
    ? `<section class="seo-page-section" aria-labelledby="service-features-heading" style="margin-bottom:40px;"><h2 id="service-features-heading" style="font-size:22px;font-weight:800;color:#041B32;margin-bottom:18px;">What this service includes</h2><ul class="seo-page-list" style="list-style:none;padding:0;margin:0;">${page.points.map((pt) => `<li style="display:flex;align-items:flex-start;gap:12px;font-size:15px;color:#041B32;line-height:1.5;margin-bottom:14px;"><span style="color:#0F9F96;font-weight:bold;" aria-hidden="true">✓</span> <span>${escapeHtml(pt)}</span></li>`).join('')}</ul></section>`
    : '';

  // How it helps
  const howItHelpsHtml = page.howItHelps && page.howItHelps.length > 0
    ? `<section class="seo-page-section" aria-labelledby="how-it-helps-heading" style="margin-bottom:40px;"><h2 id="how-it-helps-heading" style="font-size:22px;font-weight:800;color:#041B32;margin-bottom:18px;">Who benefits most from this support</h2><div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:16px;">${page.howItHelps.map((c) => `<div class="jp-card" style="padding:20px;border-radius:14px;border:1px solid #e2e8f0;background:#ffffff;"><h3 style="font-size:16px;font-weight:700;color:#041B32;margin-bottom:8px;">${escapeHtml(c.title)}</h3><p style="font-size:13px;color:#64748b;line-height:1.5;margin:0;">${escapeHtml(c.desc)}</p></div>`).join('')}</div></section>`
    : '';

  // FAQs Accordion
  const faqsHtml = page.faqs && page.faqs.length > 0
    ? `<section class="seo-page-section" aria-labelledby="faqs-heading" style="margin-bottom:40px;"><h2 id="faqs-heading" style="font-size:22px;font-weight:800;color:#041B32;margin-bottom:18px;">Frequently Asked Questions</h2><div style="display:flex;flex-direction:column;gap:12px;">${page.faqs.map((f) => `<details style="border:1px solid #e2e8f0;border-radius:12px;background:#ffffff;padding:16px 20px;cursor:pointer;"><summary style="font-weight:700;font-size:15px;color:#041B32;">${escapeHtml(f.question)}</summary><div style="padding-top:12px;margin-top:10px;border-top:1px solid #f1f5f9;font-size:14px;color:#64748b;line-height:1.6;">${escapeHtml(f.answer)}</div></details>`).join('')}</div></section>`
    : '';

  // Disclaimer
  const disclaimerHtml = `<section class="seo-page-section" style="padding:18px 20px;border-radius:14px;background:#F3FAFB;border:1px solid #D2EFF3;margin-bottom:36px;"><h3 style="font-size:13px;font-weight:700;color:#041B32;margin-bottom:4px;">Non-Clinical Healthcare Notice &amp; Emergency Guidelines</h3><p style="font-size:12px;color:#64748b;line-height:1.5;margin:0;">JetPulse companions provide non-clinical escort, mobility, and administrative navigation support. JetPulse does not diagnose conditions, prescribe medications, or replace emergency medical services. In an emergency, please dial <strong>112 / 108</strong>.</p></section>`;

  // CTA
  const ctaHtml = !isTrustPage
    ? `<div style="margin-bottom:48px;display:flex;gap:14px;flex-wrap:wrap;"><a class="jp-btn jp-btn-primary jp-btn-lg" href="/#booking">${escapeHtml(page.cta || 'Get Assistance Now')}</a><a class="jp-btn jp-btn-secondary jp-btn-lg" href="/care-navigator">Explore Care Navigator AI</a></div>`
    : '';

  // Internal link footer
  const internalFooterHtml = `<footer style="border-top:1px solid #e2e8f0;padding-top:32px;margin-top:20px;"><div style="margin-bottom:24px;"><h3 style="font-size:13px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:12px;">Explore Related Healthcare Services</h3><div style="display:flex;flex-wrap:wrap;gap:8px;">${RELATED_SERVICES.map((s) => `<a href="${s.href}" style="font-size:13px;padding:6px 12px;border-radius:8px;background:#f8fafc;border:1px solid #e2e8f0;color:#041B32;text-decoration:none;">${escapeHtml(s.label)}</a>`).join('')}</div></div><div><h3 style="font-size:13px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:12px;">Service Hubs in India</h3><div style="display:flex;flex-wrap:wrap;gap:8px;">${CITY_LINKS.map((c) => `<a href="${c.href}" style="font-size:13px;padding:6px 14px;border-radius:8px;background:#EAF8F6;border:1px solid rgba(15,159,150,0.2);color:#0F9F96;text-decoration:none;font-weight:600;">${escapeHtml(c.label)}</a>`).join('')}</div></div></footer>`;

  return `<div class="seo-page-shell" style="min-height:100vh;display:flex;flex-direction:column;"><header class="seo-page-header"><div class="jp-container seo-page-header-inner"><a class="seo-back-link" href="/" style="text-decoration:none;font-weight:800;font-size:20px;color:#041B32;">JetPulse</a><div style="display:flex;align-items:center;gap:12px;"><a href="/faq" style="font-size:14px;font-weight:600;color:#041B32;text-decoration:none;">FAQ</a>${!isTrustPage ? '<a class="jp-btn jp-btn-primary jp-btn-sm" href="/#booking">Get Assistance</a>' : ''}</div></div></header><main class="seo-page-main" style="flex:1;"><article class="jp-container seo-page-content">${breadcrumbsHtml}<div class="seo-page-eyebrow" style="margin-bottom:12px;color:#0F9F96;font-weight:700;font-size:14px;">${isLocationPage ? 'JetPulse City Service Hub' : isTrustPage ? 'JetPulse Trust & Safety Protocol' : 'Verified Healthcare Logistical Support'}</div><h1 style="font-size:clamp(28px, 4vw, 42px);font-weight:800;color:#041B32;line-height:1.25;margin-bottom:16px;">${escapeHtml(page.h1 || page.title)}</h1><p class="seo-page-intro" style="font-size:18px;color:#64748b;line-height:1.6;margin-bottom:36px;max-width:720px;">${escapeHtml(page.intro)}</p>${pointsHtml}${howItHelpsHtml}${faqsHtml}${disclaimerHtml}${ctaHtml}${internalFooterHtml}</article></main></div>`;
}

function pageHtml(template, page) {
  const canonical = `${siteUrl}${page.path === '/' ? '' : page.path}`;
  const schema = JSON.stringify(generatePageSchema(page));

  let output = template
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(page.title)}</title>`)
    .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/>/s, `<meta name="description" content="${escapeHtml(page.description)}" />`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${canonical}" />`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/>/, `<meta property="og:title" content="${escapeHtml(page.title)}" />`)
    .replace(/<meta property="og:description"\s+content="[^"]*"\s*\/>/s, `<meta property="og:description" content="${escapeHtml(page.description)}" />`)
    .replace(/<meta property="og:url" content="[^"]*"\s*\/>/, `<meta property="og:url" content="${canonical}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*"\s*\/>/, `<meta name="twitter:title" content="${escapeHtml(page.title)}" />`)
    .replace(/<meta name="twitter:description"\s+content="[^"]*"\s*\/>/s, `<meta name="twitter:description" content="${escapeHtml(page.description)}" />`);

  if (page.path !== '/') {
    output = output
      .replace('<div id="root"></div>', `<div id="root">${staticContent(page)}</div>`)
      .replace('</head>', `<script id="jetpulse-page-schema" type="application/ld+json">${schema}</script></head>`);
  }

  return output;
}

// Generate Sitemap XML
function generateSitemapXml() {
  const today = new Date().toISOString().split('T')[0];
  const urlNodes = Object.values(SEO_PAGES).map((p) => {
    const loc = `${siteUrl}${p.path === '/' ? '/' : p.path}`;
    const priority = p.priority || '0.8';
    const changefreq = p.changefreq || 'monthly';
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlNodes}\n</urlset>\n`;
}

// Generate Robots TXT
function generateRobotsTxt() {
  const disallows = NOINDEX_ROUTES.map((route) => `Disallow: ${route}`).join('\n');
  return `User-agent: *\nAllow: /\n${disallows}\nDisallow: /api/\n\nSitemap: ${siteUrl}/sitemap.xml\n`;
}

// Execute Build Prerendering
async function build() {
  const template = await fs.readFile(path.join(distRoot, 'index.html'), 'utf8');
  let count = 0;

  for (const [routePath, page] of Object.entries(SEO_PAGES)) {
    if (routePath === '/') {
      // Overwrite dist/index.html with optimized homepage
      await fs.writeFile(path.join(distRoot, 'index.html'), pageHtml(template, page), 'utf8');
      count++;
      continue;
    }

    const outputDir = path.join(distRoot, routePath.slice(1));
    await fs.mkdir(outputDir, { recursive: true });
    await fs.writeFile(path.join(outputDir, 'index.html'), pageHtml(template, page), 'utf8');
    count++;
  }

  // Write Sitemap & Robots to dist/ and public/
  const sitemapContent = generateSitemapXml();
  const robotsContent = generateRobotsTxt();

  await fs.writeFile(path.join(distRoot, 'sitemap.xml'), sitemapContent, 'utf8');
  await fs.writeFile(path.join(publicRoot, 'sitemap.xml'), sitemapContent, 'utf8');

  await fs.writeFile(path.join(distRoot, 'robots.txt'), robotsContent, 'utf8');
  await fs.writeFile(path.join(publicRoot, 'robots.txt'), robotsContent, 'utf8');

  console.log(`✅ Prerendered ${count} static SEO pages.`);
  console.log(`✅ Generated sitemap.xml with ${Object.keys(SEO_PAGES).length} public indexable URLs.`);
  console.log(`✅ Generated robots.txt with ${NOINDEX_ROUTES.length} protected private routes.`);
}

build().catch((err) => {
  console.error('❌ Error during SEO prerendering:', err);
  process.exit(1);
});
