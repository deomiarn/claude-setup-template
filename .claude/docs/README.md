# Project Documentation

**Last Updated**: 2025-10-31
**Project**: local-studios-website
**Status**: Active Development

## Overview
Documentation split into **External** (for users/developers) and **Internal** (for agents).
All docs follow non-redundant protocol from `CLAUDE.md`.

## For Users & Developers

Quick navigation to external documentation:
- [Agent Reference](agents-reference.md) - All available agents
- [Architecture](#architecture) - System design, tech stack
- [Features](#features) - Feature implementations
- [SOPs](#standard-operating-procedures) - Best practices

## For Agents (Internal)

Agent context documentation:
- [Planning](internal/planning/) - Feature task breakdowns
- [Communication](internal/communication/) - Agent conversation logs
- [Templates](templates/) - Standard formats
- [Sessions](#active-sessions) - Work tracking
- [Summaries](#agent-summaries) - Agent reports

---

## Architecture

### System Design
[→ architecture/system-design.md](architecture/system-design.md)
- System architecture overview
- Component relationships
- Data flow patterns
- Deployment architecture

### Tech Stack
- **Frontend**: React 19, Next.js 15 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 3.4 (custom design tokens)
- **i18n**: next-intl 3.22 (German + English)
- **Forms**: React Hook Form + Zod (pending)
- **Email**: Resend (pending)
- **Analytics**: Vercel Analytics (pending)
- **Utilities**: clsx, tailwind-merge

---

## Features

### Design System
**Status**: ✅ Phase 1 Complete
**Docs**: [features/design-system/](features/design-system/)
- [Implementation](features/design-system/implementation.md) - Custom component library (Button, Typography, Container, Link)
- Design tokens (colors, typography)
- Swiss minimalism principles
- No template libraries used

### UI Components
**Status**: In Progress (base components done)
**Docs**: [features/ui-components/](features/ui-components/)

### Authentication
**Status**: Not Started
**Docs**: [features/authentication/](features/authentication/)

### API Layer
**Status**: Not Started
**Docs**: [features/api-layer/](features/api-layer/)

### Database Layer
**Status**: Not Started
**Docs**: [features/database-layer/](features/database-layer/)

---

## Implementations

### Recent Changes
*No implementations yet. Timestamped implementation docs appear here.*

### All Implementations
[→ implementations/](implementations/)

---

## Active Sessions

**Current Work**: Local Studios v1 Website Build (Phase 1)

Sessions track ongoing work from start to completion. Created by Parent Orchestrator, updated by agents.

### Session Structure
```
.claude/sessions/
└── [session-name].md   # Active work tracking
```

### Active Sessions List
- **[local-studios-v1-website.md](../sessions/local-studios-v1-website.md)** - Building professional bilingual website for Local Studios
  - Phase 1 (Foundation): ✅ Complete
  - Phase 2 (Core Pages): In Progress
  - Next: Navigation component + language switcher

---

## Standard Operating Procedures

**SOPs created dynamically by agents when reusable patterns discovered.**
**Baseline SOPs pre-seeded for critical patterns.**

### Available SOPs
- [animation-patterns.md](../sop/animation-patterns.md) - Timing, easing, accessibility
- [design-standards.md](../sop/design-standards.md) - Typography, spacing, color patterns

### When SOPs Created
- **Baseline**: Parent pre-seeds critical patterns before work begins
- **Dynamic**: Agents discover reusable patterns during work
- Pattern likely to repeat across features
- Best practice worth documenting
- Prevents future mistakes

### SOP Location
All SOPs stored in: `.claude/sop/[pattern-name].md`

### Creating New SOPs
Agents should create new SOP when discovering pattern not covered by existing SOPs.

---

## Documentation Guidelines

### Creating New Documentation
1. **Check current session** - Read `.claude/sessions/[session].md` for context
2. **Read existing docs** - Check this README and relevant feature docs
3. **Identify correct location**:
   - Feature-specific → `features/[feature-name]/`
   - Cross-feature → `implementations/`
   - Architecture → `architecture/`
   - Reusable pattern → `sop/[pattern-name].md`
4. **Check for redundancy** - Auto-merge duplicate content
5. **Update this README** - Add reference to new doc
6. **Update session** - Document progress in current session
7. **Cross-reference** - Link related docs bidirectionally

### File Naming Conventions
- Feature context: `features/[feature-name]/context.md`
- Feature implementation: `features/[feature-name]/implementation.md`
- Timestamped changes: `features/[feature-name]/2025-10-30T14-30-00-description.md`
- Cross-feature work: `implementations/2025-10-30T14-30-00-description.md`
- Sessions: `sessions/2025-10-30-feature-name.md`
- SOPs: `sop/pattern-name.md` (created by agents)

### Required Metadata
Every doc must include:
```markdown
**Date**: [ISO 8601 timestamp]
**Agent**: [agent that created/modified]
**Related**: [links to related docs]
```

### Auto-Merge Rules
When updating docs:
- Duplicate headings → merge content, keep latest timestamp
- Duplicate code examples → keep most recent version
- Duplicate explanations → consolidate into one, reference others
- Add "Updated from: [old_doc]" for merged content

---

## Agent Summaries

All agent outputs stored in `.claude/agents/summaries/[agent]_[feature]_[timestamp].md`

### Available Agents

**See**: [agents-reference.md](agents-reference.md) for complete catalog

**Quick Stats**:
- Marketplace agents: 80+ (wshobson/agents)
- Custom project agents: 3
  - sitemap-analyst (haiku) - Website architecture
  - animation-specialist (sonnet) - Animation implementation
  - ui-design-architect (sonnet) - Design systems

### Recent Summaries
*No agent summaries yet.*

---

## Maintenance

### Regular Tasks
- Run `/update-docs` after feature work to consolidate docs
- Review README weekly to prune outdated references
- Check for orphaned docs (not referenced in README)
- Validate all cross-references resolve correctly

### Quality Checklist
- [ ] No duplicate content across docs
- [ ] All docs referenced in README
- [ ] All cross-references valid
- [ ] All timestamps in ISO 8601
- [ ] All file changes include line numbers
- [ ] Sessions updated with progress
- [ ] SOPs created for new reusable patterns

---

## Change Log

### 2025-10-31 (Evening)
**Workflow Infrastructure Improvements**
- ✅ Restructured .claude/ with internal/external separation
- ✅ Created agents-reference.md (all marketplace + custom agents)
- ✅ Added planning protocol (500 token budget)
- ✅ Added communication streams (per-feature)
- ✅ Created templates/ (planning, communication, deliverables)
- ✅ Enhanced CLAUDE.md with Parent Never Executes policy
- ✅ Added Model Decision Tree (haiku/sonnet/opus)
- ✅ Moved custom agents to agents/custom/
- ✅ Updated README with internal/external docs
- **Result**: Cost-optimized, quality-focused, clean documentation

**New Structure**:
- `.claude/docs/internal/planning/` - Feature plans
- `.claude/docs/internal/communication/` - Agent logs
- `.claude/docs/templates/` - Standard formats
- `.claude/docs/agents-reference.md` - Agent catalog
- `.claude/agents/custom/` - Project agents

### 2025-10-31 (Morning)
**Local Studios Website - Foundation Complete**
- ✅ Next.js 15 + TypeScript + Tailwind CSS initialized
- ✅ next-intl configured for bilingual (DE/EN) support
- ✅ Design system tokens (Ink, White, Mist, Muted colors)
- ✅ Custom UI components (Button, Typography, Container, Link)
- ✅ Static site generation working for both locales
- ✅ Build successful with zero type errors
- **Next**: Navigation component + language switcher

**Components Created**:
- `Button.tsx` - Primary/secondary variants with hover states
- `Typography.tsx` - Heading, Paragraph, Label components
- `Container.tsx` - Responsive container with padding system
- `Link.tsx` - Styled links with focus rings

**Documentation**:
- Session: `local-studios-v1-website.md` created
- Implementation doc: `features/design-system/implementation.md`
- Agent context: `ui-design-architect_design-system_20251031.md`

### 2025-10-30
**Documentation Protocol Established**
- Created multi-agent documentation system
- Implemented session tracking workflow
- Dynamic SOP creation by agents (not predefined)
- Non-redundant documentation protocol
- 31 total agents (28 marketplace + 3 custom)

**Custom Agents Created**
- `ui-design-architect` - Premium design systems, Swiss minimalism, custom components
- `animation-specialist` - Framer Motion animations, 60fps performance
- `sitemap-analyst` - SEO-friendly site structure, URL hierarchy
- Custom agent workflow documented

**Baseline SOPs Created**
- `design-standards.md` - Typography, spacing, color, responsive patterns
- `animation-patterns.md` - Timing, easing, accessibility, client adaptations

**Infrastructure**
- Prompt caching strategy implemented (~90% token savings)
- MCP servers configured (context7, filesystem, memory)
- Agent templates created (context, summary, session)
- `/update-docs` command for consolidation

**Architecture**
- System design documented
- Tech stack defined with 15 plugins
- Feature area organization
- Session-based workflow

**Status**: Foundation complete, ready to build premium custom websites
