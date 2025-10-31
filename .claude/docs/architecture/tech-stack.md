# Technology Stack

**Date**: 2025-10-30
**Status**: Initial Definition
**Related**: [System Design](system-design.md) | [README](../README.md)

## Frontend

### Core Framework
- **React** - UI library
- **Next.js** - React framework with SSR/SSG
- **TypeScript** - Type safety

### UI & Styling
- **shadcn/ui** - Component library (expected)
- **Tailwind CSS** - Utility-first CSS (expected)
- **Radix UI** - Headless UI components (via shadcn)

### State Management
*To be determined based on requirements*
- Options: Zustand, Jotai, Redux Toolkit, React Context

## Backend

### Runtime
- **Node.js** - JavaScript runtime

### API Layer
*To be determined*
- Options: Next.js API Routes, Express, Fastify, tRPC

## Database

### Primary Database
*To be determined based on data requirements*
- Options: PostgreSQL, MySQL, MongoDB, Supabase

### ORM/Query Builder
*To be determined after database selection*
- Options: Prisma, Drizzle, TypeORM

## Development Tools

### Multi-Agent System
- **Claude Code** - Parent orchestrator
- **Installed Plugins** - 15 specialized plugin packages from wshobson/agents marketplace

**Plugin List**:
1. `seo-content-creation` - SEO content writing, planning, auditing
2. `seo-technical-optimization` - Technical SEO (meta, keywords, structure)
3. `seo-analysis-monitoring` - Content freshness, cannibalization, authority
4. `code-documentation` - Doc generation, code explanation, tutorials
5. `debugging-toolkit` - Interactive debugging, DX optimization
6. `git-pr-workflows` - Git automation, PR enhancement
7. `frontend-mobile-development` - Frontend UI, mobile apps
8. `full-stack-orchestration` - Testing, security, performance, deployment
9. `unit-testing` - Test automation, debugging
10. `code-review-ai` - Architectural review, code quality
11. `javascript-typescript` - JS/TS with modern frameworks
12. `database-design` - Database architecture, SQL optimization
13. `application-performance` - Profiling, optimization, observability
14. `codebase-cleanup` - Technical debt, refactoring
15. `content-marketing` - Content strategy, web research

**Total: 28 marketplace agents** (see CLAUDE.md for complete list)

### Custom Agents (Project-Specific)
- **ui-design-architect** - Premium design systems, Swiss minimalism, custom shadcn/ui
- **animation-specialist** - Framer Motion, micro-interactions, 60fps performance
- **sitemap-analyst** - SEO-friendly site structure, URL hierarchy

Located in `.claude/agents/` - see README for usage.

**Total: 31 agents (28 marketplace + 3 custom)**

### MCP Servers
- **context7** - Library documentation and code examples
- **filesystem** - Project filesystem access for agents
- **memory** - Persistent memory across sessions
- **brave-search** - Web search (optional, requires API key)

Configuration: `mcp-config.json` in project root

### Documentation
- **Markdown** - All documentation format
- **context7 MCP** - Library docs access via MCP protocol

### Testing
*To be determined*
- Options: Jest, Vitest, Testing Library, Playwright, Cypress

### Code Quality
*To be determined*
- Options: ESLint, Prettier, Husky, lint-staged

## Infrastructure

### Hosting
*To be determined*
- Options: Vercel, Netlify, AWS, Railway

### CI/CD
*To be determined*
- Options: GitHub Actions, Vercel CI, GitLab CI

### Monitoring
*To be determined*
- Options: Sentry, LogRocket, Datadog

## Caching Strategy

Claude Code automatically implements Anthropic prompt caching:
- **Static content** (CLAUDE.md, SOPs, architecture): High cache priority
- **Semi-static** (README, feature docs): Medium cache priority
- **Dynamic** (sessions, agent contexts): Never cached
- **Effectiveness**: ~90% token cost reduction on multi-agent workflows

See CLAUDE.md "Prompt Caching Strategy" section for complete details.

## Version Control

### Git Workflow
- **Branch**: main (primary)
- **Commit Style**: Concise, grammar sacrificed for brevity
  - Example: "add auth flow" not "Added authentication flow"

## Decision Log

### Decisions Made
1. **Multi-agent workflow** with wshobson/agents
   - Rationale: Specialized agents for specific tasks
   - Impact: Improved code quality, comprehensive docs

2. **Non-redundant documentation protocol**
   - Rationale: Prevent duplicate content, maintain clarity
   - Impact: Clean docs, easier maintenance

### Pending Decisions
- State management library
- Database selection
- Testing framework
- API architecture
- Hosting platform

## References
- [System Design](system-design.md) - System architecture and data flow
- [Main Documentation](../README.md) - Documentation index
- [CLAUDE.md](../../../CLAUDE.md) - Parent orchestrator configuration
- [MCP Config](../../../mcp-config.json) - MCP server configuration
- SOPs: `.claude/sop/` - Baseline + dynamic SOPs

## Change Log

### 2025-10-30
- Initial tech stack documented
- Multi-agent system defined with 15 installed plugins (28 marketplace agents)
- Custom agents created (2): ui-design-architect, animation-specialist
- Total agents: 30 (28 marketplace + 2 custom)
- Baseline SOPs created: design-standards, animation-patterns
- MCP servers configured (context7, filesystem, memory)
- Prompt caching strategy documented (~90% token savings)
- Pending decisions identified
