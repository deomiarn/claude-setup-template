# Claude Multi-Agent Orchestration Template

Universal template for building projects with Claude Code using Parent Orchestrator pattern coordinating specialized agents.

## Problem

Building with AI introduces complexity:
- **Cost overhead**: Wrong model for task wastes budget
- **Context fragmentation**: Each conversation loses history
- **No reusable patterns**: Solutions lost across projects
- **Manual coordination**: Juggling multiple agent conversations
- **Documentation drift**: Code changes, docs fall behind

## Solution

Parent Orchestrator pattern: single Sonnet-powered coordinator delegates to specialized agents (haiku/sonnet/opus) based on task complexity.

**Key insight**: Parent never executes. Only plans, delegates, reviews, tracks. Subagents execute and document.

## Architecture

```
Parent (sonnet) - Plan & delegate only
├── Subagent 1 (haiku) - Fast deterministic tasks
├── Subagent 2 (sonnet) - Complex implementation
└── Subagent 3 (opus) - Architecture & security
```

**Parent workflow**:
1. Read context (docs, sessions, SOPs)
2. Create 500-token plan → agent + model assignment
3. Delegate via Task tool
4. Review output, update tracking

**Subagent workflow**:
1. Read context (plan, communication, docs, SOPs)
2. Execute task
3. Document (append communication, update docs, create SOP if pattern)
4. Report to parent

## Features

### Multi-Agent System
- **Marketplace agents**: 54 plugins from wshobson/agents (enabled in settings.json)
- **Custom agents**: Project-specific (examples: animation-specialist, sitemap-analyst, ui-design-architect)
- **Model-tier assignment**: Haiku (fast), Sonnet (balanced), Opus (critical)
- **Cost optimization**: Use lowest capable model per task
- **Specialization**: SEO, frontend, mobile, database, performance, security

### Documentation Protocol
- **Separation**: `.claude/` (Claude ops) vs `/docs/` (developer docs)
- **Sessions**: Internal work per session (planning + communication)
- **Non-redundant**: Auto-merge via `/update-docs` command
- **Versioned**: ISO 8601 timestamps, file refs with line numbers

### Prompt Caching (~90% Savings)
Claude Code auto-caches stable content (5min TTL):
- **High priority**: CLAUDE.md, model-selection.md, SOPs, architecture docs
- **Medium priority**: Feature docs
- **Never cache**: Sessions, communication streams (dynamic)

**Cost benefit**: First agent pays full token cost, subsequent agents use cache.

### Reusable SOPs
Agents create Standard Operating Procedures when discovering reusable patterns:
- **Dynamic**: Agents document patterns during work
- **Referenced**: Future agents read SOPs before execution
- **Prevents mistakes**: Codified best practices

## Structure

```
.claude/
├── agents/               # Custom agent definitions
├── docs/                 # Claude operations docs
│   ├── model-selection.md
│   ├── output-format.md
│   ├── workflows/        # Parent + subagent workflows
│   └── templates/        # Standard formats
├── sessions/             # Internal work
│   └── [session]/
│       ├── planning.md
│       └── communication.md
├── sop/                  # Agent-created patterns
└── commands/             # Slash commands

docs/                     # Root - developer docs
├── architecture/         # System design
└── features/             # Implementation guides
```

## Quick Start

### 1. Use This Template

Click "Use this template" on GitHub or clone:
```bash
git clone https://github.com/your-username/your-project.git
cd your-project
```

### 2. Open with Claude Code

```bash
claude code .
```

### 3. Start Building

Ask Parent Orchestrator:
```
"Build [feature]. Use Parent Orchestrator pattern."
```

Parent will:
- Create plan with agent assignments
- Delegate to specialists
- Track progress via todos
- Review quality, update docs

### 4. Custom Agents (Optional)

Add project-specific agents in `.claude/agents/[agent-name].md`:
```markdown
You are [agent-name].
Specialty: [specific domain]
Model: haiku|sonnet|opus
...
```

See existing agents (animation-specialist, sitemap-analyst, ui-design-architect) as examples.

## Documentation

**Claude operations**: [`.claude/docs/README.md`](.claude/docs/README.md)
**Orchestrator instructions**: [`CLAUDE.md`](CLAUDE.md)
**Developer docs**: [`docs/README.md`](docs/README.md)
**Workflows**: [`.claude/docs/workflows/`](.claude/docs/workflows/)

## Commands

### `/update-docs`
Auto-consolidate documentation:
- Identify redundancies across docs
- Merge duplicate content
- Regenerate README index
- Validate cross-references

Run after feature work or when docs feel scattered.

## Model Decision Tree

**Haiku** (fast, ~$0.25/million tokens):
- Code generation from specs
- Test writing, documentation
- SEO optimization

**Sonnet** (balanced, ~$3/million tokens):
- Architecture design
- Frontend implementation
- **Parent orchestration (always)**

**Opus** (most capable, ~$15/million tokens):
- System architecture
- Security audits, database design
- Performance engineering

Use lowest capable model. Parent always Sonnet.

See [`.claude/docs/model-selection.md`](.claude/docs/model-selection.md) for orchestration patterns.

## Quality Standards

- Every file change documented
- Every feature has context + implementation docs
- Every reusable pattern creates SOP
- All timestamps ISO 8601
- All file refs include line numbers
- No duplicate content

## Communication Style

Extreme brevity:
- Commit: "add auth flow" (not "Added authentication flow with OAuth2")
- Docs: "DB Migration" (not "Database Migration Best Practices")
- Tasks: "fix login bug" (not "Fix the bug in the login functionality")

Sacrifice grammar, preserve meaning.

## Cost Optimization

**Prompt caching**: ~90% reduction on cached input tokens
**Model tiering**: Use haiku for 80% of tasks, sonnet 15%, opus 5%
**Planning overhead**: 500 tokens max per feature (amortized across tasks)
**Context efficiency**: Read cached docs once, reuse across agents

**Example project**:
- Without caching: 10M tokens = $30
- With caching: 1M new + 9M cached = $3.50 + $0.90 = $4.40 (85% savings)

## License

MIT

## Credits

Built on [wshobson/agents](https://github.com/wshobson/agents) marketplace.
Orchestration pattern inspired by hierarchical multi-agent systems.
