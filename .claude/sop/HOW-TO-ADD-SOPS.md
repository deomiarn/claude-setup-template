# How to Add Standard Operating Procedures (SOPs)

## What is an SOP?

A repeatable pattern discovered during multi-agent workflows. Document it so all agents follow the same best practice.

## Quick Template

Create `your-pattern-name.md`:

```markdown
# SOP: [Pattern Name]

**Created**: [date]
**Agent**: [who discovered this]
**Pattern**: [what problem this solves]

## Overview
1-2 sentence explanation of the pattern.

## When to Apply
Specific triggers/situations where this SOP applies.

## Workflow
1. Step 1
2. Step 2
3. Step 3

## Example
Concrete example showing the pattern in action.

## Common Mistakes
❌ Don't do this
✅ Do this instead

## Verification
How to check if pattern was applied correctly.
```

## Current SOPs

**agent-context-generation.md**
- When: Before EVERY agent launch
- What: Parent generates filtered context (300 tokens vs 4200)
- Benefit: 76% token reduction per agent

**mcp-first-documentation.md**
- When: ANY documentation query
- What: Use MCPs instead of reading static files
- Benefit: 90% token reduction on docs

## When to Create an SOP

Create an SOP if you notice:
1. **Repetitive mistakes** across agents (same error multiple times)
2. **Token waste patterns** (agents reading redundant files)
3. **Quality issues** (outputs inconsistent, need standardization)
4. **Novel patterns** (discovered better way to do something)

## Example Patterns Worth Documenting

- **Error handling**: How agents should handle retries
- **File organization**: Where to save different artifact types
- **Parallel coordination**: How agents avoid file conflicts
- **Validation feedback**: How to write actionable retry feedback
- **MCP fallbacks**: What to do if MCP server is down

## Best Practices

**1. Be Specific**
- ❌ "Use MCPs when possible"
- ✅ "ALWAYS use mcp__shadcn-search__search_components for UI components"

**2. Include Examples**
- Show before/after
- Demonstrate token savings
- Provide concrete code

**3. Link to Related Docs**
- Reference agents that use this SOP
- Link to architecture docs

**4. Keep Concise**
- 200-500 lines max
- Use bullets and code blocks
- One pattern per SOP

## Referencing SOPs

In agent prompts:
```markdown
## WORKFLOW
1. Read context (see `.claude/sop/agent-context-generation.md`)
2. Use MCP (see `.claude/sop/mcp-first-documentation.md`)
```

In Parent orchestration:
```markdown
Before launching agent:
1. Generate agent-context (SOP: agent-context-generation.md)
2. Verify MCP usage in planning (SOP: mcp-first-documentation.md)
```

## File Naming

- Use kebab-case: `my-pattern-name.md`
- Be descriptive: `mcp-first-documentation.md` (not `docs.md`)
- Start with verb if action: `generate-agent-context.md`

## Testing Your SOP

1. Apply pattern in 3+ different agents
2. Measure token/time savings
3. Verify consistency improves
4. Document results in SOP

## See Also

- **Existing SOPs**:
  - `agent-context-generation.md` - Complex workflow SOP example
  - `mcp-first-documentation.md` - Simple rule-based SOP example
- **Related HOW-TOs**:
  - `.claude/agents/HOW-TO-ADD-AGENTS.md` - How to reference SOPs in agents
  - `.claude/sessions/HOW-TO-CREATE-SESSIONS.md` - How sessions use SOPs
- **Workflows**:
  - `.claude/docs/workflows/parent-workflow.md` - How Parent enforces SOPs
  - `.claude/docs/workflows/subagent-workflow.md` - How agents follow SOPs
