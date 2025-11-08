# Skills Registry

Context-relevant skills for current project. Load only what's needed.

## Format

```
- **[skill-name]**: Brief description
  Path: `.claude/skills/[skill-name]/Skill.md`
  When: Trigger conditions
```

## Available Skills

- **shadcn-ui-blocks**: 929 pre-built website components across 45+ categories (hero, feature, pricing, testimonial, CTA, footer, navbar, blog, gallery, contact, FAQ, etc.)
  Path: `.claude/skills/shadcn-ui-blocks/Skill.md`
  When: Building websites, landing pages, marketing sites, or need responsive UI components with pnpm install commands

- **sitemap-pages**: 13 pre-defined page templates (homepage, about, services, blog, contact, pricing, portfolio, etc.) with structured sections
  Path: `.claude/skills/sitemap-pages/skill.md`
  When: Planning website architecture, structuring page layouts, or generating sitemaps

- **website-builder**: Website sitemap generation workflow. Analyzes requirements, delegates to sitemap-analyst agent, generates sitemap with shadcn-ui-blocks component selections.
  Path: `.claude/skills/website-builder/Skill.md`
  When: Planning website architecture, structuring pages, selecting components, or requesting sitemap/page structure planning

<!-- Add skills below. Template:

- **example-skill**: Description of what skill does
  Path: `.claude/skills/example-skill/Skill.md`
  When: Use when [specific context/trigger]

-->

## Updating This File
If you add or remove skills, always update this README.md to reflect the current set of skills available for auto-loading based on context.

---

*Note: Skills auto-load based on context. Update this file when adding/removing skills.*
