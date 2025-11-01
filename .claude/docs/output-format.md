# Agent Output Format

All agents output to `.claude/sessions/[session]/communication.md`.

## Standard Format

```markdown
## [ISO_8601] - [agent-name]
Problem: [1-2 lines]
Solution: [how done]
Files: [path:line-range]
Next: [dependencies/handoffs]
```

## Example

```markdown
## 2025-01-15T10:30:00Z - backend-architect
Problem: Design user auth API
Solution: REST endpoints with JWT, OAuth2 integration per spec
Files: /docs/features/auth/api-design.md:1-45
Next: Haiku generates endpoints per spec
```

## Guidelines

- **Problem**: Brief context (what needed solving)
- **Solution**: How task accomplished (not what changed)
- **Files**: Changed/created files with line ranges
- **Next**: Dependencies, handoffs, follow-up tasks

Agents read ALL entries for full context before execution.

## Location

Append to `.claude/sessions/[session]/communication.md` chronologically.
Never overwrite. Append only.
