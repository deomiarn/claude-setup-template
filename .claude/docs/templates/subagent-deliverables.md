# Subagent Deliverables Template

All subagents MUST deliver following artifacts after completing tasks.

## 1. Implementation

Execute the assigned task per planning doc spec.

## 2. Communication Stream Update

**File**: `.claude/docs/internal/communication/[feature]-comms.md`

Append entry using communication-entry template:
```markdown
## [ISO_8601] - [your-agent-name]
Task: [brief]
Status: completed|blocked
Files: [paths:lines]
Notes: [decisions/findings]
Next: [handoff]
```

## 3. External Documentation Update

**If feature adds new capability:**

Update `.claude/docs/features/[feature]/implementation.md`:
- What was implemented
- How it works
- Usage examples
- Testing approach

**If architecture changed:**

Update `.claude/docs/architecture/[relevant].md`

## 4. Agent Summary Report

**File**: `.claude/agents/summaries/[agent]_[feature]_[timestamp].md`

```markdown
---
agent: [your-name]
feature: [feature-name]
model: [haiku|sonnet|opus]
tokens: [estimate]
duration: [estimate]
timestamp: [ISO_8601]
---

## Task Context
Requested: [what was asked]
Scope: [boundaries]

## Approach
Strategy: [high-level approach]
Tools/Patterns: [technologies used]
Alternatives: [other options considered]

## Files Modified
- `path/file.ts:123-145` - [description]

## Key Decisions
1. Decision: [what]
   Rationale: [why]
   Impact: [implications]

## Next Steps
[Recommended follow-up]
```

## 5. Session Update (Optional)

If major milestone or blocker, update `.claude/sessions/[session].md`

## 6. SOP Creation (If New Pattern)

If you discovered reusable pattern:

**File**: `.claude/sop/[pattern-name].md`

```markdown
# SOP: [Pattern Name]

Created: [ISO_8601]
Agent: [your-name]
Discovered During: [feature]

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
- [ ] Summary report created
- [ ] Session updated (if milestone)
- [ ] SOP created (if new pattern)
- [ ] All file refs include line numbers
- [ ] Concise, brevity-first communication style
