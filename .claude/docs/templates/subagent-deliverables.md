# Subagent Deliverables

All subagents MUST deliver after completing tasks.

## 1. Implementation

Execute assigned task per planning doc spec.

## 2. Communication Stream Update (Required)

**File**: `.claude/sessions/[session]/communication.md`

Append using format from `.claude/docs/output-format.md`:

```markdown
## [ISO_8601] - [agent-name]
Problem: [1-2 lines]
Solution: [how done]
Files: [path:line-range]
Next: [dependencies/handoffs]
```

Read ALL entries before executing for full context.

## 3. External Documentation (If User-Facing)

**If feature adds capability:**

Update `/docs/features/[feature]/implementation.md`:
- What implemented
- How works
- Usage examples
- Testing approach

**If architecture changed:**

Update `/docs/architecture/[relevant].md`

## 4. SOP Creation (If New Pattern)

If reusable pattern discovered:

**File**: `.claude/sop/[pattern-name].md`

```markdown
# SOP: [Pattern Name]

**Created**: [ISO_8601]
**Agent**: [agent-name]
**Discovered During**: [feature]

## Overview
[What pattern solves]

## When to Use
[Situations where applicable]

## Workflow
[Step-by-step instructions]

## Examples
[Code/implementation examples]

## References
- Feature: [where discovered]
- Related: [other SOPs]
```

## Quality Checklist

Before reporting completion:
- [ ] Implementation works as specified
- [ ] Communication stream appended
- [ ] External docs updated (if user-facing)
- [ ] SOP created (if new pattern)
- [ ] All file refs include line numbers
- [ ] Extreme concision maintained
