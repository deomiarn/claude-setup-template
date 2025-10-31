# Agent Reference

Quick reference for Parent orchestrator to delegate tasks efficiently. Lists all available agents with models and roles.

## Marketplace Agents

### General
- `general-purpose` (sonnet) - Complex multi-step tasks, codebase research
- `statusline-setup` (haiku) - Configure Claude Code status line
- `Explore` (sonnet) - Fast codebase exploration, file search
- `Plan` (sonnet) - Planning and task breakdown

### SEO Content Creation
- `seo-content-creation:seo-content-auditor` (sonnet) - Content quality, E-E-A-T analysis
- `seo-content-creation:seo-content-planner` (haiku) - Content outlines, topic clusters
- `seo-content-creation:seo-content-writer` (sonnet) - SEO-optimized content creation

### SEO Technical Optimization
- `seo-technical-optimization:seo-keyword-strategist` (haiku) - Keyword analysis, density calculation
- `seo-technical-optimization:seo-meta-optimizer` (haiku) - Meta titles, descriptions optimization
- `seo-technical-optimization:seo-snippet-hunter` (haiku) - Featured snippet formatting
- `seo-technical-optimization:seo-structure-architect` (haiku) - Header hierarchy, schema markup

### SEO Analysis & Monitoring
- `seo-analysis-monitoring:seo-authority-builder` (sonnet) - E-E-A-T signal analysis
- `seo-analysis-monitoring:seo-cannibalization-detector` (haiku) - Keyword overlap detection
- `seo-analysis-monitoring:seo-content-refresher` (haiku) - Content freshness updates

### Code & Documentation
- `code-documentation:code-reviewer` (opus) - Code review, security, performance analysis
- `code-documentation:docs-architect` (opus) - Comprehensive technical documentation
- `code-documentation:tutorial-engineer` (sonnet) - Step-by-step tutorials

### Debugging & DX
- `debugging-toolkit:debugger` (sonnet) - Error resolution, test failures
- `debugging-toolkit:dx-optimizer` (sonnet) - Developer experience optimization

### Git & PR Workflows
- `git-pr-workflows:code-reviewer` (opus) - PR code review, security scanning

### Frontend & Mobile
- `frontend-mobile-development:frontend-developer` (sonnet) - React components, layouts, state management
- `frontend-mobile-development:mobile-developer` (sonnet) - React Native, Flutter, native mobile

### Full Stack Orchestration
- `full-stack-orchestration:deployment-engineer` (sonnet) - CI/CD pipelines, deployment automation
- `full-stack-orchestration:performance-engineer` (opus) - Application optimization, observability
- `full-stack-orchestration:security-auditor` (opus) - Security audits, DevSecOps, compliance
- `full-stack-orchestration:test-automator` (sonnet) - Test automation, quality engineering

### Testing
- `unit-testing:debugger` (sonnet) - Test failures, debugging
- `unit-testing:test-automator` (sonnet) - Unit test generation

### Code Review AI
- `code-review-ai:architect-review` (opus) - Architectural analysis, system design review

### Languages
- `javascript-typescript:javascript-pro` (sonnet) - Modern JavaScript, ES6+, async patterns
- `javascript-typescript:typescript-pro` (sonnet) - Advanced TypeScript, type systems

### Database
- `database-design:database-architect` (opus) - Database architecture, schema design
- `database-design:sql-pro` (sonnet) - SQL optimization, query tuning

### Performance
- `application-performance:frontend-developer` (sonnet) - Frontend optimization
- `application-performance:observability-engineer` (opus) - Production monitoring, tracing
- `application-performance:performance-engineer` (opus) - Performance optimization, scalability

### Codebase Cleanup
- `codebase-cleanup:code-reviewer` (opus) - Code quality assurance
- `codebase-cleanup:test-automator` (sonnet) - Test coverage automation

### Marketing
- `content-marketing:content-marketer` (sonnet) - Content strategy, SEO optimization
- `content-marketing:search-specialist` (haiku) - Web research, information synthesis

## Custom Project Agents

- `sitemap-analyst` (haiku) - Website architecture, information structure planning
- `animation-specialist` (sonnet) - Animation implementation, micro-interactions, Framer Motion
- `ui-design-architect` (sonnet) - Premium design systems, custom components, Swiss minimalism

## Model Usage Guide

**Haiku (fast, deterministic):**
- Code generation from specs
- Test writing
- Documentation generation
- SEO optimization
- Simple searches

**Sonnet (balanced, complex reasoning):**
- Architecture design
- Code review
- Frontend development
- Complex implementation
- **Parent orchestration (always)**

**Opus (most capable, expensive):**
- System architecture
- Security audits
- Database design
- Performance engineering
- Critical business logic

## Delegation Pattern

```
Parent (sonnet) reads context →
  Creates plan →
  Delegates to specialist agent (haiku/sonnet/opus) →
  Reviews summary →
  Updates tracking
```
