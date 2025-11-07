# Website Generation Prompt

**Purpose**: A-Z website build with SEO + shadcn-ui-blocks components

---

## Customer Info

**Business**:
- Name: [Company name]
- Industry: [Industry/vertical]
- Target audience: [Demographics, personas]
- Goals: [Business objectives]
- USP: [Unique selling points]

**Brand**:
- Voice: [Tone/personality]
- Values: [Core values]
- References: [Competitor sites, inspiration]

**Specifics**:
- Use images in the sections/blocks preferably when planning the layout
- Existing assets: [Logos, images, copy]

**Languages**:
- Create the website in following languages: German (primary), English

---

## Styleguide
**Font**: Use 16px base font size

**Theme**: [Select from shadcn-ui-theme: Default, Claude, Cyberpunk, Neo Brutalism, Supabase, Vercel, etc.]

**Colors**:
- Primary: [hex/name]
- Secondary: [hex/name]
- Accent: [hex/name]

**Aesthetic**:
- Style: [Modern, minimal, bold, playful, professional]
- Layout: [Dense, spacious, card-based, full-width]
- Components: [Preferred shadcn block categories]

---

## SEO Keywords

**Primary**: [Main keyword 1], [Main keyword 2], [Main keyword 3]

**Secondary**: [Long-tail 1], [Long-tail 2], [Long-tail 3]

**Competitors**: [competitor1.com], [competitor2.com]

**Focus Areas**:
- Local: [City/region if applicable]
- Industry terms: [Technical/niche keywords]
- Intent: [Informational, transactional, navigational]

---

## Agent Workflow

Execute in sequence:

### 1. Architecture (sitemap-analyst)
- Analyze requirements
- Create sitemap structure
- Define navigation hierarchy
- Output: `.claude/planning/sitemap.yaml`

### 2. SEO Analysis (marketplace: seo-*)
- Keyword research + mapping
- Competitor analysis
- Meta strategy
- Output: `.claude/planning/seo/`

### 3. Component Build (shadcn-website-builder)
- Select blocks from shadcn-ui-blocks (959 components, 45+ categories), always read the documentation in .claude/skills/shadcn-ui-blocks/docs/
- Apply shadcn-ui-theme (selected theme), always read the documentation in .claude/skills/shadcn-ui-theme/docs/
- Compose layouts per sitemap
- Integrate content + brand assets

### 4. Animation (animation-specialist)
crucial, micro animations only

- Hover effects, transitions
- Scroll-triggered animations
- Page route transitions
- Loading states, micro-interactions

### 5. SEO Integration (marketplace: seo-*)
crucial, only if mentioned from the customer
- Meta tags, structured data
- OpenGraph, Twitter cards
- Alt text, semantic HTML
- Performance optimization

### 6. Verification
- Browser automation testing
- Lighthouse audit
- Accessibility check
- Cross-device validation

---

## Skills to Use

**ALWAYS invoke**:
1. `website-builder` - Orchestrates full SEO workflow
2. `shadcn-ui-blocks` - Component catalog (929 blocks)
3. `shadcn-ui-theme` - Theme system (17 themes)

---

## MCPs to Use

**context7**: Library docs (Next.js, React, Tailwind)
**shadcn**: Component references if specific components used which are NOT from the shadcn-ui-blocks skill

---

## Output Format

Follow `.claude/docs/templates/communication-entry.md`:


---

## Example Usage

```
Build website for [CustomerName].

## Customer Info
- Name: Acme Inc
- Industry: SaaS
- Audience: B2B developers
- Goals: Generate leads, showcase product

## Styleguide
- Theme: Vercel
- Primary: #0070f3
- Style: Modern, minimal

## SEO Keywords
- Primary: project management software, team collaboration tools
- Secondary: agile project tracking, remote team coordination
- Competitors: asana.com, monday.com

[Agent workflow executes automatically per above]
```

---

**Token budget**: Keep plans <500 tokens. Extreme concision. Sacrifice grammar.
