# Sitemap Generation
Purpose: Architecture + Block selection for website

Token Budget: <500 tokens

---

## INPUTS [EDIT HERE]

**Business:**
- Name: [Company/Project name]
- Industry: [Industry type]
- Target Audience: [Description]
- Goals: [Business objectives]
- Pages Required: [List pages: homepage, about, services, contact, etc.]

**Brand:**
- Voice: [Professional/Casual/Playful/etc.]
- Values: [Core values]

**Insiders (do not mention this):**
We are a computer science students.
This is our sidehustle, we are no experts in law or health domains and so on.

---

## AGENT WORKFLOW

**Execute with:**
- Agent: `sitemap-analyst`
- Model: `sonnet` (architecture/reasoning task)

**Skills Required:**
- `sitemap-pages` - Page templates/structures
- `shadcn-ui-blocks` - Component library

**Process:**
1. Read `.claude/skills/sitemap-pages/` → Load page templates
2. Read `.claude/skills/shadcn-ui-blocks/docs/` → Load block descriptions
3. Match sections to **best-fit blocks** based on descriptions
4. **NOT sequential selection** (Block 1,2,3) - intelligent matching
5. Generate commands for installation

**Output Location:**
`.claude/planning/[project-name]/sitemap.md`

**Output Format:**
```markdown
# Sitemap: [Project Name]

## 1. [Page Name] ([route])
Source: sitemap-pages/pages/[template].md

### [Section Name]
- Block: @shadcnblocks/[blockname]
- Reason: [Why this block fits]
- Command: `pnpm dlx shadcn add @shadcnblocks/[blockname]`

### [Section Name]
- Block: @shadcnblocks/[blockname]
- Reason: [Why this block fits]
- Command: `pnpm dlx shadcn add @shadcnblocks/[blockname]`

## 2. [Next Page]...
```

---

## SUCCESS CRITERIA

✓ Sitemap generated in Markdown format
✓ Each section has selected block with reason
✓ All commands are copy-paste ready
✓ Blocks matched based on descriptions (not sequential)
✓ sitemap.md created in planning directory

---

## NEXT STEP

**After this step:**
1. User reviews sitemap.md
2. Execute `02-sitemap-execution.md` (auto-build structure)
3. Or manually:
   - Execute `pnpm dlx shadcn add` commands
   - Integrate blocks into pages
   - Create `global.css`

Then proceed to optional steps:
- `02-unsplash.md` - Image integration
- `03-animation.md` - Mikroanimations
- `04-seo.md` - SEO optimization
- `05-midjourney.md` - AI image prompts
