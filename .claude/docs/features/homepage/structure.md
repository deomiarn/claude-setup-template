# Homepage Structure - High-Converting UBS-Style Design

**Date**: 2025-10-31T10:00:00Z
**Agent**: Parent Orchestrator (sitemap analysis)
**Related**:
- Session: `.claude/sessions/local-studios-v1-website.md`
- Design System: `.claude/docs/features/design-system/implementation.md`
- Current: `src/app/[locale]/page.tsx` (3 sections → 7 sections)

## Current State vs. Target

**Current** (3 sections):
- Hero (basic title/subtitle/CTA)
- ServicesGrid (4 services, 2x2 grid)
- CTASection (dark background CTA)

**Problem**: Too basic, not converting, no trust signals, no proof, no depth.

**Target** (7 sections): Conversion-optimized flow with trust building, proof, and clear value.

---

## Section Architecture

### Section 1: Hero (Enhanced)
**Path**: `/` (above fold)
**Priority**: Critical
**Purpose**: Immediate impact + credibility. Clear value prop + trust signal.

**Content Hierarchy**:
- H1: "Software That Scales Your Business" (primary keyword: software solutions)
- Subtitle: Trust statement ("Trusted by 50+ Swiss enterprises")
- Body: 1-line value prop (automation, dashboards, platforms)
- CTA Primary: "Start Your Project"
- CTA Secondary: "View Case Studies" (soft conversion)

**Visual**:
- Full viewport height
- Center aligned
- Lots of whitespace (UBS style)
- Subtle grid pattern background (optional)
- Trust badge row below CTAs (3-4 client logos, monochrome)

**SEO Focus**:
- Primary: "software solutions", "business automation"
- Schema: Organization, LocalBusiness
- H1 includes primary keyword

**Conversion Goal**:
- Hard: CTA click (15-20% target)
- Soft: Scroll engagement (80%+ target)

---

### Section 2: Trust Bar
**Path**: `/` (just below hero)
**Priority**: High
**Purpose**: Immediate credibility. Stop scroll, build trust.

**Content Hierarchy**:
- Label: "Trusted by Leading Companies" (small, muted)
- 6-8 client logos (monochrome Ink, equal sized)
- OR Stats row: "50+ Projects | 15+ Industries | 8 Years"

**Visual**:
- Horizontal strip, white or mist background
- Logos evenly spaced, 150px max width
- Fade-in on scroll animation
- No borders (clean)

**SEO Focus**:
- Structured data: clients list
- Alt text for logos (company names)

**Conversion Goal**: Increase time on page, reduce bounce (target: <30% bounce)

---

### Section 3: Value Proposition
**Path**: `/`
**Priority**: Critical
**Purpose**: Differentiation. Why Local Studios vs. competitors.

**Content Hierarchy**:
- H2: "We Build Software That Actually Works"
- Subheading: "No bloat. No complexity. Just solutions that scale."
- 3-column value props:
  - H3: "Swiss Precision" | Body: Quality-first, detail-oriented
  - H3: "Full Ownership" | Body: You own everything, no vendor lock-in
  - H3: "Future-Proof" | Body: Modern stack, scalable architecture

**Visual**:
- White background, generous padding
- 3 columns on desktop, stacked mobile
- Icon or number above each H3 (minimal, Ink color)
- Center-aligned text

**SEO Focus**:
- Keywords: "custom software development", "scalable solutions"
- Schema: Service, Offer

**Conversion Goal**: Establish unique value, increase scroll depth (70%+ past this section)

---

### Section 4: Services Deep Dive
**Path**: `/` (keep current ServicesGrid, enhance)
**Priority**: High
**Purpose**: Detail what we offer. Drive to service pages.

**Content Hierarchy**:
- H2: "What We Build"
- 4 services (current structure):
  - H3: Service name
  - Body: 2-3 sentences, benefit-focused
  - Link: "Learn More →" (to service detail pages)
- Grid layout: 2x2 desktop, 1 column mobile

**Visual**:
- Mist background (keep)
- Cards with hover state (subtle lift + shadow)
- Arrow icon on "Learn More" link
- Generous card padding

**SEO Focus**:
- Keywords: specific services (automation, dashboards, web design)
- Internal links to `/[locale]/services/[service-slug]`
- Schema: Service list

**Conversion Goal**:
- Click to service pages (10-15% CTR target)
- Engagement with cards (hover, read)

---

### Section 5: Featured Work
**Path**: `/`
**Priority**: High
**Purpose**: Social proof through work. Show capability.

**Content Hierarchy**:
- H2: "Work We're Proud Of"
- Subheading: "Real projects, real results"
- 3 featured case studies:
  - Image: Project screenshot or logo (16:9 ratio)
  - Category label: "E-commerce Platform" (small, muted)
  - H3: Client name or project title
  - Metric: "50% faster checkout" or "200K users/month"
  - Link: "View Case Study →"
- Grid: 3 columns desktop, 1 column mobile

**Visual**:
- White background
- Image placeholders: mist gray rectangles with subtle border
- Hover: image scales 1.05x, shadow increases
- Category label in Ink, uppercase, tracked

**SEO Focus**:
- Keywords: "case studies", "portfolio", specific industries
- Schema: CreativeWork, ImageObject
- Alt text with project keywords

**Conversion Goal**:
- Click to case studies (8-12% CTR)
- Build desire through proof

---

### Section 6: Our Process
**Path**: `/`
**Priority**: Medium
**Purpose**: Transparency. Reduce friction. Show professionalism.

**Content Hierarchy**:
- H2: "How We Work"
- 4-step horizontal process:
  - Number "01" (large, muted)
  - H3: "Discovery"
  - Body: "We understand your goals and challenges"
  - (Repeat for: 02 Design, 03 Build, 04 Launch)

**Visual**:
- Mist background
- Horizontal timeline (dotted line connecting steps)
- 4 columns desktop, stacked mobile
- Numbers prominent (Helvetica, 96px, very light Ink)

**SEO Focus**:
- Keywords: "software development process", "methodology"
- Schema: HowTo

**Conversion Goal**:
- Reduce objections
- Increase trust score
- Smooth path to CTA

---

### Section 7: Final CTA (Enhanced)
**Path**: `/` (bottom, keep current CTASection structure)
**Priority**: Critical
**Purpose**: Convert. Primary conversion point.

**Content Hierarchy**:
- H2: "Ready to Start Your Project?"
- Body: "Let's discuss how we can help your business grow."
- Form option A: Inline email capture + CTA
- Form option B: Button to `/[locale]/contact`
- Social proof: "Response within 24 hours" (small text)

**Visual**:
- Ink background, white text (keep current)
- Generous padding (py-32)
- Center-aligned
- Primary button (secondary variant): White bg, Ink text

**SEO Focus**:
- Keywords: "contact", "get started", "free consultation"
- Schema: ContactPage

**Conversion Goal**:
- Form submission or contact page click (5-10% of visitors)
- Primary KPI section

---

## SEO Strategy

### Heading Hierarchy
```
H1: Hero title (1x per page)
  H2: Value Proposition (1x)
  H2: Services (1x)
    H3: Individual services (4x)
  H2: Featured Work (1x)
    H3: Case study titles (3x)
  H2: Process (1x)
    H3: Process steps (4x)
  H2: CTA (1x)
```

### Internal Linking Strategy
- Hero → Services (via primary CTA)
- Services → Service detail pages (4 links)
- Featured Work → Case study pages (3 links)
- CTA → Contact page (1 link)

**Total**: 8 internal links, all contextual

### Schema Markup
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Local Studios",
  "url": "https://localstudios.ch",
  "description": "Software solutions, automation, dashboards",
  "offers": [
    {"@type": "Service", "name": "Software Development"},
    {"@type": "Service", "name": "Process Automation"},
    {"@type": "Service", "name": "Dashboard Solutions"},
    {"@type": "Service", "name": "Web Design"}
  ],
  "areaServed": "Switzerland"
}
```

---

## User Journey Analysis

### Persona: CTO/Technical Decision Maker

**Entry**: Google search "custom software development Switzerland"
**Landing**: Hero section
**Path**:
1. Reads H1, scans trust badges → builds initial trust (5 sec)
2. Scrolls to Trust Bar → sees recognizable brands → credibility +1 (3 sec)
3. Reads Value Proposition → differentiators resonate (15 sec)
4. Scans Services → identifies need (10 sec)
5. Views Featured Work → proof of capability (20 sec)
6. Skims Process → feels comfortable (10 sec)
7. Clicks CTA → contacts (conversion!)

**Conversion Goal**: Contact form submission or meeting booking

### Persona: Startup Founder / CEO

**Entry**: Referral link or LinkedIn
**Landing**: Hero section
**Path**:
1. Quick scan of H1 → value relevance check (3 sec)
2. Jumps to Services → finds specific need (8 sec)
3. Clicks to Service detail page → explores OR
4. Scrolls to Featured Work → validates capability (15 sec)
5. Checks Process → timeline expectations (8 sec)
6. Clicks CTA → contacts (conversion!)

**Conversion Goal**: Initial consultation call

---

## CMS Collections (Future)

### Case Studies Collection
**Purpose**: Scale portfolio content without page edits
**Fields**:
- title (string)
- client (string)
- category (select: ecommerce | saas | automation | web)
- featured (boolean)
- thumbnail (image, 16:9)
- metrics (array: {label, value})
- slug (url-safe)

**Related Pages**: Homepage (featured: true, limit 3), Portfolio page (all)

### Client Logos Collection
**Purpose**: Reusable trust indicators
**Fields**:
- name (string)
- logo (image, SVG preferred)
- display_order (number)
- visible (boolean)

**Related Pages**: Homepage Trust Bar, About page

---

## Growth Recommendations

1. **A/B Test Hero**: Test trust statement vs. stats bar in hero
2. **Video Integration**: Add 30-sec explainer video to Value Prop section (Future Phase 3)
3. **Interactive Process**: Make process section interactive (click steps for details)
4. **Testimonials**: Add testimonial cards between Process and CTA (Phase 2+)
5. **Calculator/Tool**: ROI calculator or project estimator (Phase 3+)
6. **Live Chat**: Add chat widget for instant engagement (Phase 5+)

---

## Mobile Optimization

### Stacking Priority
1. Hero (full viewport)
2. Trust Bar (horizontal scroll OR 2x3 grid)
3. Value Proposition (3 cards stacked)
4. Services (4 cards stacked)
5. Featured Work (carousel OR 3 cards stacked)
6. Process (4 steps stacked, vertical timeline)
7. CTA (full width)

### Performance Targets
- FCP: <1.5s
- LCP: <2.5s (hero H1)
- CLS: <0.1
- TTI: <3.5s

---

## Implementation Priority

### Phase 1 (Current Sprint)
- [x] Hero enhancement (trust badges)
- [x] Trust Bar creation
- [x] Value Proposition section
- [x] Services enhancement (keep grid, add links)

### Phase 2 (Next Sprint)
- [ ] Featured Work section (with image placeholders)
- [ ] Process section
- [ ] CTA enhancement

### Phase 3 (Future)
- [ ] Actual images (photography/screenshots)
- [ ] Case study CMS integration
- [ ] Analytics and conversion tracking
- [ ] A/B testing setup

---

## Conversion Benchmarks

### Target Metrics (Industry Standard)
- Bounce Rate: <35%
- Avg. Time on Page: >2:30
- Scroll Depth (75%): >60% of visitors
- CTA Click Rate: 15-20% (hero), 5-10% (footer)
- Contact Form Conversion: 3-5% of total traffic

### Measurement Strategy
- Vercel Analytics: Page views, scroll depth
- Plausible: Goal tracking (CTA clicks, form submissions)
- Hotjar (optional): Heatmaps, session recordings

---

## Next Steps

1. **ui-design-architect**: Design detailed mockups for new sections (Trust Bar, Value Prop, Featured Work, Process)
2. **frontend-developer**: Implement new section components following design system
3. **seo-content-writer**: Write copy for all sections (DE + EN)
4. **animation-specialist**: Add scroll animations, hover states, micro-interactions
5. **test-automator**: Lighthouse audits, performance testing
6. **performance-engineer**: Optimize LCP, CLS metrics

---

## File Structure for Implementation

```
src/components/sections/
├── Hero.tsx (enhance existing)
├── TrustBar.tsx (new)
├── ValueProposition.tsx (new)
├── ServicesGrid.tsx (enhance existing - add links)
├── FeaturedWork.tsx (new)
├── ProcessTimeline.tsx (new)
└── CTASection.tsx (enhance existing)

src/app/[locale]/page.tsx
└── Import and compose all 7 sections
```

---

**Status**: Structure complete. Ready for design and implementation phases.
