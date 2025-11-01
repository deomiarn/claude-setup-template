# Communication Entry Template

Append to: `.claude/sessions/[session]/communication.md`

See: `.claude/docs/output-format.md` for current standard.

## Format

```markdown
## [ISO_8601] - [agent-name]
Problem: [1-2 lines]
Solution: [how done]
Files: [path:line-range]
Next: [dependencies/handoffs]
```

## Example

```markdown
## 2025-01-15T14:30:00Z - frontend-developer
Problem: Implement homepage hero section per design spec
Solution: Created responsive Hero component with Swiss minimalism tokens, scroll triggers ready
Files: app/page.tsx:15-45, components/Hero.tsx:1-89, styles/hero.module.css:1-34
Next: animation-specialist adds scroll animations
```

## Guidelines

- **Extremely concise** - sacrifice grammar for brevity
- **Problem** - what needed solving (not implementation details)
- **Solution** - how task accomplished
- **Files** - always include line ranges
- **Next** - clear handoffs/dependencies
- **Append only** - never overwrite existing entries
