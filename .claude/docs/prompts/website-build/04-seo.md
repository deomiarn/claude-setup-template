# SEO Optimization
Purpose: Meta tags, structured data, performance

Token Budget: <500 tokens

---

## INPUTS [EDIT HERE]

**Keywords:**
- Primary: [main keywords, comma-separated]
- Secondary: [long-tail keywords]
- Location: [if local SEO: city, region]

**Competition:**
- Competitors: [competitor URLs to analyze]
- Target Rankings: [keywords to track]

**Business Info:**
- Business Name: [name]
- Address: [if local business]
- Phone: [if applicable]
- Social Media: [URLs]

---

## AGENT WORKFLOW

**Execute with:**
- Agents: Marketplace SEO plugins (enabled in settings.json)
- Model: `haiku` (established SEO patterns)

**SEO Plugins Available:**
```
seo-content-creation:seo-content-planner
seo-content-creation:seo-content-writer
seo-content-creation:seo-content-auditor
seo-technical-optimization:seo-structure-architect
seo-technical-optimization:seo-meta-optimizer
seo-technical-optimization:seo-keyword-strategist
seo-technical-optimization:seo-snippet-hunter
seo-analysis-monitoring:seo-authority-builder
seo-analysis-monitoring:seo-cannibalization-detector
seo-analysis-monitoring:seo-content-refresher
```

**Process:**
1. **Meta Tags** - Title, description, Open Graph
2. **Structured Data** - JSON-LD schemas
3. **Sitemap.xml** - Auto-generate from routes
4. **robots.txt** - Crawling directives
5. **Performance** - Core Web Vitals optimization
6. **Accessibility** - ARIA labels, semantic HTML

**Output Location:**
`.claude/planning/[project]/seo-report.md`

---

## SEO IMPLEMENTATIONS

**Meta Tags (per page):**
```tsx
<Head>
  <title>[Page Title] | [Brand Name]</title>
  <meta name="description" content="[150-160 chars]" />

  {/* Open Graph */}
  <meta property="og:title" content="[Title]" />
  <meta property="og:description" content="[Description]" />
  <meta property="og:image" content="[Image URL]" />
  <meta property="og:type" content="website" />

  {/* Twitter */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="[Title]" />
  <meta name="twitter:description" content="[Description]" />
</Head>
```

**Structured Data (Organization):**
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "[Business Name]",
  "url": "[Website URL]",
  "logo": "[Logo URL]",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "[Phone]",
    "contactType": "customer service"
  },
  "sameAs": [
    "[Social Media URLs]"
  ]
}
```

**sitemap.xml:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>[URL]</loc>
    <lastmod>[Date]</lastmod>
    <priority>1.0</priority>
  </url>
</urlset>
```

---

## PERFORMANCE OPTIMIZATIONS

**Core Web Vitals Targets:**
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

**Optimization Checklist:**
- ✓ Image optimization (WebP, lazy loading)
- ✓ Font optimization (preload, font-display: swap)
- ✓ Code splitting (dynamic imports)
- ✓ Minification (CSS, JS)
- ✓ Caching strategy (service worker)

---

## SUCCESS CRITERIA

✓ All pages have optimized meta tags
✓ Structured data (JSON-LD) implemented
✓ sitemap.xml + robots.txt generated
✓ Core Web Vitals within targets
✓ Accessibility score > 95
✓ SEO report generated

---

## NEXT STEP

**After this step:**
Optionally proceed to:
- `05-midjourney.md` - Custom AI image generation prompts

**Or finalize:**
- Run Lighthouse audit
- Test on mobile devices
- Submit sitemap to Google Search Console
