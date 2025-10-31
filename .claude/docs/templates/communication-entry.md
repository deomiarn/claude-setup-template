# Communication Entry Template

Append to: `.claude/docs/internal/communication/[feature]-comms.md`

## Format

```markdown
## [ISO_8601] - [agent-name]

Task: [Brief description]
Status: started | in_progress | completed | blocked
Files: [Modified file paths with line ranges]
Notes: [Key decisions, findings, blockers]
Next: [What follows or dependencies]
```

## Example

```markdown
## 2025-10-31T14:30:00Z - frontend-developer

Task: Implement homepage hero section
Status: completed
Files:
  - app/page.tsx:15-45
  - components/Hero.tsx:1-89
  - styles/hero.module.css:1-34
Notes:
  - Used Swiss minimalism design tokens from ui-design-architect
  - Coordinated with animation-specialist for scroll triggers
  - Responsive breakpoints at sm/md/lg
Next: animation-specialist to add scroll animations
```

## Guidelines

- **Extremely concise** - sacrifice grammar for brevity
- **File refs** - always include line ranges
- **Decisions** - note key choices made
- **Handoffs** - clear what comes next
- **Blockers** - call out dependencies immediately
