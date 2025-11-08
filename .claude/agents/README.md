# Skills Registry

Context-relevant skills for current project. Load only what's needed.

## Format

```
- **[skill-name]**: Brief description
  Path: `.claude/skills/[skill-name]/Skill.md`
  When: Trigger conditions
```

## Available Skills

- **shadcn-ui-blocks**: 959 pre-built website components across 45+ categories (hero, feature, pricing, testimonial, CTA, footer, navbar, blog, gallery, contact, FAQ, etc.)
  Path: `.claude/skills/shadcn-ui-blocks/Skill.md`
  When: Building websites, landing pages, marketing sites, or need responsive UI components with pnpm install commands

- **shadcn-ui-theme**: 17 pre-configured color themes with CSS variables (Default, Claude, Cyberpunk, Neo Brutalism, Supabase, Vercel, etc.)
  Path: `.claude/skills/shadcn-ui-theme/Skill.md`
  When: User requests theme changes, color scheme updates, design system modifications, or asks to "change theme to X"

- **website-builder**: Complete SEO-optimized website creation workflow orchestrator. Coordinates SEO analysis, sitemap planning, shadcn component selection, theme application, and content optimization.
  Path: `.claude/skills/website-builder/Skill.md`
  When: Building websites, creating landing pages, SEO optimization, requesting site architecture planning, designing web interfaces with search optimization

- **sitemap-pages**: Page-type templates with proven conversion-friendly section architectures for sitemap planning. 13 templates covering homepage, about, services, blog, contact, pricing, portfolio, FAQ, careers, landing-page, and 404 pages.
  Path: `.claude/skills/sitemap-pages/skill.md`
  When: Planning website pages, creating page templates, defining page structures during sitemap analysis, implementing section architectures with conversion optimization

<!-- Add skills below. Template:

- **example-skill**: Description of what skill does
  Path: `.claude/skills/example-skill/Skill.md`
  When: Use when [specific context/trigger]

-->

## Updating This File
If you add or remove skills, always update this README.md to reflect the current set of skills available for auto-loading based on context.

---

*Note: Skills auto-load based on context. Update this file when adding/removing skills.*
