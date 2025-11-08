# Sitemap Execution
Purpose: Build Next.js structure from sitemap.md

Token Budget: <300 tokens

---

## INPUTS

**Project:**
- Path to sitemap.md: `.claude/planning/[project-name]/sitemap.md`
- Target: `app/` folder structure

---

## AGENT WORKFLOW

**Execute with:**
- Agent: `sitemap-executor`
- Model: `haiku` (fast execution)

**Process:**
1. Read sitemap.md from `.claude/planning/`
2. Extract all pages + routes
3. Create Next.js page files (`page.tsx`, `layout.tsx`)
4. Auto-run `pnpm dlx shadcn add` commands
5. Wire components into pages

**Output Location:**
`app/` folder with:
- Route directories (matching sitemap pages)
- `page.tsx` files with imported components
- Updated `layout.tsx` if needed

---

## SUCCESS CRITERIA

✓ All pages from sitemap.md created in `app/`
✓ Component imports match sitemap blocks
✓ Routes match sitemap structure
✓ All commands executed successfully
✓ No manual integration needed

---

## NEXT STEP

**After this step:**
- Review generated pages
- Customize copy/content
- Fine-tune styling

Then proceed to optional steps:
- `02-unsplash.md` - Image integration
- `03-animation.md` - Mikroanimations
- `04-seo.md` - SEO optimization
- `05-midjourney.md` - AI image prompts
