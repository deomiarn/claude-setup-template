---
description: Consolidate and update project documentation, removing redundancies
---

# Documentation Update Protocol

**CRITICAL: Read ALL existing documentation BEFORE creating or updating any docs.**

## Step 1: Read Existing Documentation

Read in this order:
1. `.claude/docs/README.md` - Claude operations docs
2. `/docs/README.md` - Developer documentation index
3. `/docs/architecture/` - System architecture
4. `/docs/features/` - Feature implementations
5. `.claude/sop/` - Standard operating procedures
6. `.claude/sessions/[session]/communication.md` - Recent agent work

## Step 2: Invoke docs-architect Agent

Use Task tool with `subagent_type: "documentation-generation:docs-architect"` and context:

```markdown
Task: Consolidate documentation, remove redundancies

Context to read:
- .claude/docs/README.md (Claude ops)
- /docs/ (developer docs)
- .claude/sop/ (patterns)
- .claude/sessions/[recent-sessions]/ (recent work)

Actions:
1. Identify redundancies across docs
2. Auto-merge duplicate content (keep in most specific location)
3. Update /docs/architecture/ with new patterns
4. Create/update SOPs for reusable patterns
5. Regenerate /docs/README.md with current references
6. Validate all cross-references

Output:
- Append summary to .claude/sessions/[session]/communication.md
- Update /docs/ as needed
```

## Step 3: Verify Results

Check:
- [ ] No duplicate content across docs
- [ ] All cross-references valid
- [ ] Architecture reflects current state
- [ ] SOPs include recent patterns
- [ ] All timestamps ISO 8601
- [ ] All file refs include line numbers

## When to Use

**Regular maintenance**:
- After major features
- Weekly during active development
- When docs feel scattered

**Triggered events**:
- Duplicate content noticed
- Cross-references broken
- New patterns emerged
- Architecture changed

## Notes

- Non-destructive (adds references, doesn't delete)
- All changes in agent communication.md output
- Can revert via git if needed
