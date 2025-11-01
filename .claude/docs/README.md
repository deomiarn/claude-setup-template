# Claude Operations Documentation

Claude-specific documentation for multi-agent orchestration.

## Overview

**Claude ops**: `.claude/` (workflows, templates, agents, sessions)
**Developer docs**: `/docs/` (architecture, features)

See `CLAUDE.md` for orchestrator instructions.

## Navigation

### Core Documentation
- [Model Selection](model-selection.md) - Haiku/Sonnet/Opus patterns
- [Output Format](output-format.md) - Standard agent output
- [Workflows](workflows/) - Parent + subagent workflows
- [Templates](templates/) - Standard formats

### Agent Context
- [Custom Agents](../agents/) - Project-specific agents
- Marketplace agents: `settings.json` → `enabledPlugins`

### Internal Work
- [Sessions](../sessions/) - Active work (planning + communication)
- [SOPs](../sop/) - Agent-created patterns

## Structure

```
.claude/
├── agents/              # Custom agent definitions
├── docs/                # Claude ops docs (this folder)
│   ├── model-selection.md
│   ├── output-format.md
│   ├── workflows/       # Parent + subagent workflows
│   └── templates/       # Standard formats
├── sessions/            # Internal work
│   └── [session]/
│       ├── planning.md
│       └── communication.md
├── sop/                 # Agent-created patterns
└── commands/            # Slash commands
```

## Workflows

### Parent (Orchestrator)
See: [workflows/parent-workflow.md](workflows/parent-workflow.md)
1. Read context (caching-optimized order)
2. Create plan (sessions/[session]/planning.md)
3. TodoWrite
4. Delegate via Task tool
5. Review output
6. Update tracking

### Subagent (Executor)
See: [workflows/subagent-workflow.md](workflows/subagent-workflow.md)
1. Read context (plan + comms + /docs + SOPs)
2. Execute task
3. Document (sessions/[session]/communication.md)
4. Update /docs/ if user-facing
5. Create SOP if new pattern

## Sessions

Each session = folder with:
- `planning.md` - Task breakdown (500 token budget)
- `communication.md` - Agent I/O stream (append-only)

Agents append using format from [output-format.md](output-format.md).

See: [sessions/example-session/](../sessions/example-session/)

## SOPs (Standard Operating Procedures)

Agent-created reusable patterns. Dynamic discovery.

Location: `.claude/sop/[pattern-name].md`

See: [sop/README.md](../sop/README.md) for template.

## Quality Standards

- Extreme concision in all artifacts
- Every change documented
- Timestamps ISO 8601
- File refs include line numbers
- Sessions track all work
- SOPs for reusable patterns

## Caching Strategy

Read stable first (cache):
1. CLAUDE.md
2. model-selection.md
3. SOPs
4. /docs/architecture/
5. /docs/features/

Read dynamic last (no cache):
1. sessions/[session]/planning.md
2. sessions/[session]/communication.md

~90% cost reduction on cached tokens.

## Maintenance

Run `/update-docs` after feature work to consolidate docs.

Check for:
- No duplicate content
- All cross-references valid
- Sessions updated
- SOPs created for patterns
