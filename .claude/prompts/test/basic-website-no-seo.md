# Basic Website Build (No SEO)

**Purpose**: Fast website creation without SEO optimization. Perfect for MVPs, internal tools, or projects where SEO isn't a priority.

**Agents**: 5 agents (3 execution + 2 validators)
**Time**: ~35-45 minutes
**Automation**: 95% hands-off

---

## INPUTS [EDIT HERE]

### Business Information
Context:
🚗🔧 Reale Continental GmbH – Dein zuverlässiger Partner rund ums Auto!

Hallo zusammen!
Ich wollte euch kurz informieren, dass ich mit meiner Firma Reale Continental GmbH schon seit einiger Zeit Reparaturarbeiten rund ums Auto durchführe – hauptsächlich im Bereich Versicherungsfälle.

💥 Unfall? Kleiner Schaden? Steinschlag in der Scheibe?
Wir kümmern uns schnell und unkompliziert um:

✅ Karosserieschäden
✅ Frontscheibenreparaturen/-tausch
✅ Allgemeine Reparaturen nach Versicherungsschäden
✅ Abwicklung direkt mit der Versicherung möglich

Wenn bei euch selbst oder im Umfeld mal was sein sollte – denkt gerne an uns!
**Es würde uns wirklich freuen, wenn ihr uns bei solchen Fällen berücksichtigt.**🙏

Ich freue mich auf eure Kontaktaufnahme – und gerne auch, wenn ihr meine Nummer speichert oder weitergebt.

Vielen Dank für eure Unterstützung!

Luigi Reale

📍 Reale Continental GmbH
📞 076 420 97 60
📧 luigireale@hotmail.com



### Pages Required
List all pages you need (simpler structure):
- Homepage (Single page website)
- Simple Impressum and Privacy Policy pages

### Languages
- **Languages**: only german

### Features
Check what you need:
- [x] Contact form
- [ ] Multi-language support (next-intl)
- [ ] Newsletter signup
- [ ] Simple blog

### Brand Guidelines (Optional)
- **Tone**: [Professional]

---

## EXECUTION PROMPT

Copy this entire prompt to Parent:

```
Create a basic Next.js 15 website without SEO optimization.

**Business:**
- Name: [Company/Project Name]
- Industry: [Industry]
- Purpose: [Purpose]
- Audience: [Audience]

**Pages Required:**
[Paste list of pages from above]

**Languages:**
[Paste languages]

**Features:**
[List checked features from above]

**Brand:**
- Tone: [Tone]
- Colors: [Colors if provided]

**Architecture:**
- Framework: Next.js 15 (App Router)
- Styling: Tailwind CSS + shadcn/ui components
- i18n: next-intl (if multi-language)
- Deployment: Vercel

**Workflow:**
Use simplified workflow (NO SEO agents):

**Phase 1: Discovery**
[1] brand-analyzer (extract brand assets)
[VALIDATE-1] Skip requirements-validator (no SEO validation needed)

**Phase 2: Architecture + Build**
[2] sitemap-analyst (plan pages, select components via MCP)
[3] sitemap-executor (create app/ structure)
[VALIDATE-2] code-structure-validator (TypeScript check only)

**Phase 3: i18n Setup (if multi-language)**
[4] i18n-setup-agent (next-intl config)

**Phase 4: Basic Content**
[5] Create placeholder content (no SEO optimization)

**Skip entirely:**
- ❌ requirements-validator (no SEO requirements)
- ❌ sitemap-quality-validator (no SEO URL validation)
- ❌ seo-orchestrator (no keyword research)
- ❌ seo-content-planner (no content strategy)
- ❌ seo-content-writer-de/en (no SEO content)
- ❌ content-quality-validator (no SEO validation)
- ❌ production-readiness-validator (no SEO audit)

**Requirements:**
1. Use `.claude/sessions/` for tracking
2. Create planning.md with simplified Task DAG
3. Use MCPs: shadcn-search (components), context7 (Next.js docs)
4. Output to `.claude/planning/[project-name]/`

**Expected Deliverables:**
- ✅ brand.json - Brand assets
- ✅ sitemap.md - Page structure
- ✅ app/ - Complete Next.js structure
- ✅ i18n.ts - If multi-language
- ✅ messages/*.json - Basic translations (if multi-language)

**Success Criteria:**
- TypeScript compiles without errors
- All pages functional
- Basic content present
- Fast delivery (~35-45 minutes)
```

---

## WORKFLOW OVERVIEW

Simplified workflow (NO SEO):

### Phase 1: Discovery - 10 min
```
[1] brand-analyzer (extract brand assets from project files)
```

### Phase 2: Architecture + Build - 20 min
```
[2] sitemap-analyst (plan pages, select shadcn components)
[3] sitemap-executor (create app/ structure, install components)
    ↓
[VALIDATE-2] code-structure-validator (TypeScript check)
```

### Phase 3: i18n Setup (if multi-language) - 10 min
```
[4] i18n-setup-agent (next-intl config, basic translation keys)
```

### Phase 4: Placeholder Content - 5 min
```
[5] Add basic placeholder content (no SEO optimization)
```

**Total: ~35-45 minutes** (vs 90-110 with SEO)

---

## VALIDATION GATES

**Only 1 validation gate** (vs 5 with SEO):

### Gate 1: Code Structure (25 points)
- TypeScript compiles without errors
- Components properly imported
- i18n integration correct (if multi-language)
- File structure follows Next.js conventions

**If FAIL**: Parent retries sitemap-executor with feedback

---

## OUTPUT FILES

After completion, you'll find:

```
.claude/planning/[project-name]/
├── brand.json                # Extracted brand assets
└── sitemap.md                # Page structure + components

app/
├── [locale]/                 # Multi-language routes (if enabled)
│   ├── page.tsx             # Homepage
│   ├── about/page.tsx       # About page
│   ├── contact/page.tsx     # Contact page
│   └── ...                  # All pages from sitemap
├── layout.tsx               # Root layout
└── global.css               # Tailwind styles

messages/ (if multi-language)
├── de.json                  # German translations (placeholder)
├── en.json                  # English translations (placeholder)

components/
├── ui/                      # shadcn components
└── ...                      # Custom components

i18n.ts (if multi-language)  # next-intl config
next.config.js              # Next.js config
tailwind.config.ts          # Tailwind config
```

**Note**: No SEO files (seo-report.md, content-plan.md, validation-report.md)

---

## WHAT'S DIFFERENT FROM FULL BUILD?

### Skipped (Faster, No SEO):
- ❌ Requirements validation
- ❌ SEO keyword research
- ❌ Content strategy planning
- ❌ SEO-optimized content writing
- ❌ Meta tags optimization
- ❌ Structured data (JSON-LD)
- ❌ sitemap.xml generation
- ❌ Performance optimization
- ❌ Accessibility audit
- ❌ SEO audit

### Included (Basic Functionality):
- ✅ Next.js 15 App Router structure
- ✅ shadcn/ui components
- ✅ Tailwind CSS styling
- ✅ Multi-language support (optional)
- ✅ TypeScript compilation check
- ✅ Basic placeholder content
- ✅ Contact form (if requested)

### Trade-offs:
- **Time**: 35-45 min vs 90-110 min (60% faster)
- **SEO**: None vs Full optimization
- **Quality Gates**: 1 vs 5 (less validation)
- **Content**: Placeholders vs SEO-optimized
- **Production Ready**: Basic vs Fully audited

---

## WHEN TO USE THIS PROMPT

**Use Basic Website (No SEO) when:**
- Building an MVP or prototype
- Creating internal tools (intranet, admin panels)
- SEO isn't important (e.g., SaaS login pages)
- Speed is priority over SEO
- You'll add SEO manually later

**Use Full Website with SEO when:**
- Public-facing business website
- E-commerce or lead generation
- Competing for search rankings
- Content marketing is strategy
- Need production-ready quality

---

## CUSTOMIZATION AFTER BUILD

Once the basic build completes:

1. **Review app/ structure** - Check all pages created
2. **Add real content** - Replace placeholders in components
3. **Customize styling** - Adjust Tailwind config for brand
4. **Add images** - Replace placeholder images
5. **Test locally** - Run `pnpm dev`
6. **Deploy** - Push to Vercel

### To Add SEO Later:

If you decide you need SEO after building with this prompt:

```
Run full-website-with-seo.md on existing project:
- Parent will detect existing app/ structure
- Agents will add SEO layers (meta tags, content, optimization)
- Session type: "revision" (not "initial-build")
- Only runs SEO-specific agents (seo-orchestrator, content-planners, validators)
```

---

## TROUBLESHOOTING

### If code-structure-validator fails
- Check TypeScript errors in terminal
- Review component imports
- Fix errors manually if needed
- Re-run Parent with "retry from phase 2"

### If build is slower than 45 minutes
- Check if sitemap-analyst is stuck (reading wrong files)
- Verify shadcn-search MCP is working
- Reduce number of pages if very large site

---

## NEXT STEPS AFTER BUILD

1. **Local Testing**
   ```bash
   pnpm dev
   # Visit http://localhost:3000
   # Test all pages, forms
   ```

2. **Add Real Content**
   - Edit component files directly
   - Replace placeholder text
   - Add real images to /public


4. **Optional: Add SEO Later**
   - Run full-website-with-seo.md as "revision"
   - Parent adds SEO layers to existing structure

---

**Estimated Time**: 35-45 minutes (60% faster than full build)
**Token Cost**: ~4,500 tokens (85% optimized from full build)
**Success Rate**: 98% (minimal validation = fewer retries)
