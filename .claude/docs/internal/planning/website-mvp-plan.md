# Website MVP Implementation Plan

**Date**: 2025-10-31T13:45:00Z
**Feature**: Local Studios Website MVP
**Status**: In Progress
**Parent**: Parent Orchestrator

## Problem
Build SEO-optimized, bilingual (DE/EN) website for Local Studios (IT services company, Zürich). Need 6 pages for MVP, ready to deploy and rank on Google.

## Context Requirements
All agents must read:
- `.claude/docs/features/homepage/structure.md` - 7-section homepage architecture
- `.claude/docs/features/design-system/implementation.md` - Brand tokens, components
- `.claude/docs/architecture/tech-stack.md` - Stack decisions
- This planning doc

## Tasks

### Task 1: Project Initialization
**Agent**: general-purpose (haiku)
**Model**: haiku
**Context**: Fresh project, no existing code
**Input**: User requirements (bilingual, IT services, Zürich)
**Output**:
- Next.js 15 initialized with App Router
- TypeScript configured (strict mode)
- Tailwind CSS with brand colors (Ink #111827, White #FFFFFF, Mist #F3F4F6, Muted #585D68)
- Fonts: Helvetica (headings), Inter (body)
- Directory structure: src/app, src/components, src/lib
- Dependencies: next-intl, framer-motion, clsx, tailwind-merge
**Success**: `npm run build` succeeds, no errors

### Task 2: i18n Setup
**Agent**: general-purpose (haiku)
**Model**: haiku
**Context**: Next.js project from Task 1
**Input**: Locale routing requirements (DE/EN)
**Output**:
- next-intl configured
- Middleware for locale detection (default: DE for CH)
- Routing: /de/*, /en/*
- Message files: messages/de.json, messages/en.json (empty structure)
- i18n utility: i18n/request.ts
**Success**: Locale routing works, language switcher possible

### Task 3: Design System Implementation
**Agent**: ui-design-architect (sonnet)
**Model**: sonnet
**Context**: `.claude/docs/features/design-system/implementation.md`
**Input**: Brand identity (see user prompt), Swiss minimalism
**Output**:
- `src/components/ui/Button.tsx` - primary/secondary variants
- `src/components/ui/Typography.tsx` - Heading, Paragraph, Label
- `src/components/ui/Container.tsx` - Max width, padding control
- `src/components/ui/Link.tsx` - Underline on hover only
- `src/lib/utils.ts` - cn() helper
- `src/components/ui/index.ts` - Barrel exports
**Success**: Components match brand spec, TypeScript strict

### Task 4: Navigation & Layout
**Agent**: frontend-developer (sonnet)
**Model**: sonnet
**Context**: Design system from Task 3
**Input**: Text logo "LOCAL STUDIOS", i18n navigation
**Output**:
- `src/components/navigation/Header.tsx` - Logo, nav menu, language switcher
- `src/components/navigation/Footer.tsx` - Links, copyright, legal
- `src/app/[locale]/layout.tsx` - Root layout with Header/Footer
**Success**: Navigation works on all pages, language switching functional

### Task 5: Homepage Sections
**Agent**: frontend-developer (sonnet)
**Model**: sonnet
**Context**: `.claude/docs/features/homepage/structure.md`, design system
**Input**: 7-section structure documented
**Output**:
- `src/components/sections/Hero.tsx` - Hero with CTA
- `src/components/sections/TrustBar.tsx` - Client logos/stats
- `src/components/sections/ValueProposition.tsx` - 3-column values
- `src/components/sections/ServicesGrid.tsx` - 4 services (2x2)
- `src/components/sections/FeaturedWork.tsx` - 3 case studies
- `src/components/sections/ProcessTimeline.tsx` - 4-step process
- `src/components/sections/CTASection.tsx` - Footer CTA
- `src/app/[locale]/page.tsx` - Compose all sections
**Success**: Homepage renders all 7 sections, responsive

### Task 6: Additional Pages
**Agent**: frontend-developer (haiku)
**Model**: haiku
**Context**: Design system, navigation from Task 4
**Input**: Page requirements (Services, About, Contact, Legal)
**Output**:
- `src/app/[locale]/services/page.tsx` - Services overview
- `src/app/[locale]/about/page.tsx` - Company info
- `src/app/[locale]/contact/page.tsx` - Contact form + info
- `src/components/forms/ContactForm.tsx` - Form component
- `src/app/[locale]/impressum/page.tsx` - Imprint
- `src/app/[locale]/datenschutz/page.tsx` - Privacy policy
**Success**: All 6 pages accessible, forms work

### Task 7: Placeholder Content
**Agent**: seo-content-writer (haiku)
**Model**: haiku
**Context**: Company info (IT solutions, Zürich), target keywords
**Input**: Local Studios brand, services (web design to dashboards)
**Output**:
- `messages/de.json` - All German content
- `messages/en.json` - All English content
- SEO-optimized copy for: hero, services, about, process
- Keywords: "IT Lösungen Zürich", "Software Entwicklung Schweiz"
**Success**: All text professional, SEO-friendly, bilingual

### Task 8: SEO Implementation
**Agent**: seo-meta-optimizer (haiku)
**Model**: haiku
**Context**: All pages from Tasks 5-6, content from Task 7
**Input**: Target keywords, local SEO requirements (Zürich)
**Output**:
- Metadata API setup in all pages (title, description, OG)
- `src/app/sitemap.ts` - Dynamic sitemap generation
- `src/app/robots.ts` - Robots.txt config
- Structured data: Organization, LocalBusiness schemas
- hreflang tags for DE/EN
**Success**: Lighthouse SEO score 95+, sitemap accessible

### Task 9: Animations
**Agent**: animation-specialist (sonnet)
**Model**: sonnet
**Context**: Homepage sections, design system
**Input**: Brand aesthetic (subtle, premium, Swiss)
**Output**:
- `src/lib/animations.ts` - Reusable animation configs
- Scroll-triggered fade-ins for sections
- Button hover states (brand-specific)
- Page transitions (locale switching)
- Performance: 60fps maintained
**Success**: Animations enhance UX, no jank

### Task 10: Performance Audit
**Agent**: performance-engineer (sonnet)
**Model**: sonnet
**Context**: Completed website from Tasks 1-9
**Input**: Performance targets (Lighthouse 95+, Core Web Vitals)
**Output**:
- Lighthouse audit report
- Image optimization recommendations
- Bundle size analysis
- Core Web Vitals optimizations applied
**Success**: All metrics green, ready for deploy

## Dependencies
- Task 2 depends on Task 1 (project must exist)
- Task 3 depends on Task 1 (needs Tailwind config)
- Task 4 depends on Task 3 (needs design system)
- Task 5 depends on Task 3, Task 4 (needs design + layout)
- Task 6 depends on Task 3, Task 4 (needs design + layout)
- Task 7 can run parallel with Tasks 5-6
- Task 8 depends on Tasks 5-7 (needs pages + content)
- Task 9 depends on Task 5 (needs sections to animate)
- Task 10 depends on all previous tasks (final audit)

## Success Criteria
- ✅ 6 pages functional (Homepage, Services, About, Contact, Impressum, Datenschutz)
- ✅ Bilingual DE/EN with working language switcher
- ✅ Contact form submits (can use form action or API)
- ✅ Lighthouse Score: Performance 90+, SEO 95+, Accessibility 95+
- ✅ Mobile responsive (all viewports)
- ✅ TypeScript strict mode, zero errors
- ✅ Build succeeds: `npm run build`
- ✅ Sitemap at /sitemap.xml
- ✅ Robots.txt at /robots.txt

## Deliverables
1. **Code**: Complete Next.js project in repo
2. **Documentation**: Update `.claude/docs/features/` with implementation notes
3. **Session**: Update `.claude/sessions/local-studios-v1-website.md`
4. **Communication**: Append to `.claude/docs/internal/communication/website-mvp-comms.md`

## Communication Stream
File: `.claude/docs/internal/communication/website-mvp-comms.md`
Agents append after completing tasks.

## Next Phase (Post-MVP)
- Individual service pages (/services/[slug])
- Case study CMS and pages
- Blog setup for content marketing
- Advanced animations (parallax, custom cursors)
- Analytics integration (Plausible/Vercel Analytics)
- Form backend (email integration)
