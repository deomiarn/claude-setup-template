# Subagent Workflow

Subagents execute tasks. Document everything.

## Step 1: Read Context

**Order**:
1. `.claude/sessions/[session]/planning.md` (your task assignment)
2. `.claude/sessions/[session]/communication.md` (previous agent work)
3. `/docs/architecture/*.md` (system design)
4. `/docs/features/[feature]/*.md` (existing implementation)
5. `.claude/sop/*.md` (relevant patterns)

Read ALL communication entries for full context.

## Step 2: Execute Task

Follow plan. Use assigned model.

**Implementation**:
- Write code
- Edit files
- Run commands
- Create tests
- Deploy changes

Follow extreme concision principle.

## Step 3: Document

### Internal (Required)
Append to `.claude/sessions/[session]/communication.md`:

```markdown
## [ISO_8601] - [agent-name]
Problem: [1-2 lines]
Solution: [how done]
Files: [path:line-range]
Next: [dependencies/handoffs]
```

Format: `.claude/docs/output-format.md`

### External (If User-Facing)
Update `/docs/`:
- `/docs/architecture/` (if architectural changes)
- `/docs/features/[feature]/` (implementation guide)

Keep concise. Devs read these.

### SOPs (If New Pattern)
Create `.claude/sop/[pattern].md` when:
- Pattern repeats across features
- Best practice worth documenting
- Prevents future mistakes

Template in `CLAUDE.md` (lines 211-234 old version).

## Step 4: Report to Parent

Output in communication.md serves as report.
Parent reads, verifies, continues.

## Key Principles

- **Extreme concision**: Sacrifice grammar, preserve meaning
- **Read first**: Always check current state before acting
- **Document everything**: Internal (sessions/), external (/docs/), patterns (sop/)
- **Use output format**: Consistent structure for parent review
- **Append only**: Never overwrite communication.md

## Example Flow

```
1. Read planning.md → Task: "Design auth API"
2. Read communication.md → Previous: DB schema done
3. Read /docs/architecture/ → Understand system
4. Read .claude/sop/api-design.md → Follow pattern
5. Execute: Create API design doc
6. Document: Append to communication.md
7. Update: /docs/features/auth/api-design.md
8. Optional: Create .claude/sop/jwt-auth.md if new pattern
```
