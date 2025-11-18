# SEO Content Execution
Purpose: Apply SEO optimizations from seo-report.md to frontend pages

Token Budget: <300 tokens

---

## INPUTS

**Project:**
- Path to seo-report.md: `.claude/planning/[project-name]/seo-report.md`
- Target: `app/` folder pages + components
- Languages: Extract from seo-report.md (dynamic)
- CRUCIAL, ALWAYS  delegate to the custom seo-content-executor agent from `.claude/agents/seo-content-executor.md`
- Delegate ALL of the work to that agent, NO exceptions
- 
---

## AGENT WORKFLOW

**Execute with:**
- Agent: ALWAYS delegate to custom `seo-content-executor` in `.claude/agents/seo-content-executor.md`
- Model: `sonnet` (complex content optimization)

**Process:**
1. Read seo-report.md from `.claude/planning/`
2. Extract page-by-page SEO recommendations + languages
3. Create i18n structure + WRITE CONTENT FOR ALL PAGES:
   - Create `messages/de.json`, `messages/en.json`, etc.
   - Use next-intl format (NO middleware/complex setup)
   - MANDATORY: Write professional content for EVERY page, EVERY section:
     * Home: hero, features, benefits, CTAs, ALL sections
     * Services: ALL service descriptions and value props
     * About: COMPLETE company story and info
     * Contact: ALL headings, labels, instructions
     * Portfolio: ALL project descriptions
     * Pricing: ALL package details and features
     * ANY other pages in app/ folder
   - Use keywords from seo-report.md
   - Replace 100% of filler/placeholder text
   - NO page left with dummy content
4. Update ALL page components to i18n-only:
   - EVERY page component: replace text with t('key')
   - Components = ONLY i18n references, ZERO hard-coded text
   - This applies to: Home, Services, About, Contact, Pricing, Portfolio, ALL pages
   - Update meta tags per page
   - Apply heading structure (H1, H2, H3)
5. Implement internal linking strategy:
   - Buttons → conversion/relevant pages (remove if sinnlos)
   - Text links → keyword-rich anchors
   - Cards → cross-page navigation
   - Verify all link targets exist
6. Optimize Navbar & Footer:
   - Navbar: logical hierarchy, SEO-optimized labels, mobile-friendly
   - Footer: sitemap links, legal (Impressum/Datenschutz), social, CTAs
   - Remove dummy/placeholder links
7. Verify all languages have complete coverage

**Output Location:**
- `messages/[locale].json` - Translation files per language
- `app/**/*.tsx` - Updated with i18n variables + meta tags

---

## SUCCESS CRITERIA

✓ ALL pages have complete content in messages/[locale].json
✓ EVERY section of EVERY page has professional copy
✓ ALL components use ONLY i18n variables (zero hard-coded text)
✓ 100% filler/placeholder text eliminated across entire site
✓ Content SEO-optimized per seo-report.md for ALL pages
✓ All SEO recommendations from report applied
✓ Meta tags match report specifications
✓ Lightweight i18n setup (messages/ only, NO middleware)
✓ All languages have complete translation coverage
✓ Internal links strategically placed (buttons, text, cards)
✓ Navbar/Footer SEO-optimized with relevant links
✓ Sinnlose buttons/links removed and documented
✓ All links have descriptive anchor text
✓ No broken links or dummy CTAs

---

## NEXT STEP

**After this step:**
- Verify SEO implementation in browser
- Test all language versions
- Optional: Run Lighthouse audit
- Optional: `05-midjourney.md` for custom brand images
