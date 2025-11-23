# Skills Registry

Context-relevant skills for current project. Load only what's needed.

## Format

```
- **[skill-name]**: Brief description
  Path: `.claude/skills/[skill-name]/Skill.md`
  When: Trigger conditions
```

## Available Skills

- **sitemap-pages**: 13 pre-defined page templates (homepage, about, services, blog, contact, pricing, portfolio, etc.) with structured sections
  Path: `.claude/skills/sitemap-pages/skill.md`
  When: Planning website architecture, structuring page layouts, or generating sitemaps

- **website-builder**: Website sitemap generation workflow. Analyzes requirements, delegates to sitemap-analyst agent, generates sitemap using shadcn-search MCP.
  Path: `.claude/skills/website-builder/Skill.md`
  When: Planning website architecture, structuring pages, selecting components, or requesting sitemap/page structure planning

**Note**: For shadcn/ui components, use `mcp__shadcn-search__search_components` MCP tool instead of static docs (90% token reduction)

<!-- Add skills below. Template:

- **example-skill**: Description of what skill does
  Path: `.claude/skills/example-skill/Skill.md`
  When: Use when [specific context/trigger]

-->

## Updating This File
If you add or remove skills, always update this README.md to reflect the current set of skills available for auto-loading based on context.

---

*Note: Skills auto-load based on context. Update this file when adding/removing skills.*
