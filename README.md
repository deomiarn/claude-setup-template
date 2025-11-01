# Claude Multi-Agent Orchestration Template

Starter template for building custom websites efficiently using Claude Code with a Parent Orchestrator pattern coordinating 31+ specialized agents.

## Problem

Building custom websites with AI introduces complexity:
- **Cost overhead**: Running Opus model for simple tasks wastes budget
- **Context fragmentation**: Each conversation loses history, repeating research
- **No reusable patterns**: Hard-won solutions lost across projects
- **Manual coordination**: Developers juggle multiple agent conversations manually
- **Documentation drift**: Code changes, docs fall behind, teams lose sync

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
1. Read context (docs, session, SOPs)
2. Create 500-token plan → agent + model assignment
3. Delegate via Task tool
4. Review summaries, update tracking

**Subagent workflow**:
1. Read context (plan, communication stream, SOPs)
2. Execute task
3. Document (append communication, update docs, create summary)
4. Report to parent

## Features

### Multi-Agent System
- **31+ agents**: 28 marketplace (wshobson/agents) + 3 custom project agents
- **Model-tier assignment**: Haiku (fast), Sonnet (balanced), Opus (critical)
- **Cost optimization**: Use lowest capable model per task
- **Specialization**: SEO, frontend, mobile, database, performance, security

### Documentation Protocol
- **External**: User-facing (README, architecture, features, agent catalog)
- **Internal**: Agent context (planning, communication streams, templates)
- **Non-redundant**: Auto-merge duplicate content via `/update-docs` command
- **Versioned**: ISO 8601 timestamps, file references with line numbers

### Prompt Caching (~90% Savings)
Claude Code auto-caches stable content (5min TTL):
- **High priority**: CLAUDE.md, agents-reference.md, SOPs, architecture docs
- **Medium priority**: Feature docs, planning docs
- **Never cache**: Sessions, communication streams (dynamic)

**Cost benefit**: First agent pays full token cost, subsequent agents use cache.

### Reusable SOPs
Agents create Standard Operating Procedures when discovering reusable patterns:
- **Baseline**: Pre-seeded critical patterns (design-standards, animation-patterns)
- **Dynamic**: Agents document patterns during work
- **Referenced**: Future agents read SOPs before execution
- **Prevents mistakes**: Codified best practices

## Quick Start

### 1. Clone Template
```bash
git clone https://github.com/[your-username]/claude-setup-template.git
cd claude-setup-template
```

### 2. Understand Structure
```
.claude/
├── docs/
│   ├── README.md                    # Documentation index
│   ├── agents-reference.md          # All 31+ agents
│   ├── internal/                    # Agent context
│   │   ├── planning/                # 500-token task plans
│   │   └── communication/           # Per-feature agent logs
│   ├── architecture/                # System design
│   ├── features/                    # Implementation guides
│   └── templates/                   # Standard formats
├── sessions/                         # Active work tracking
├── sop/                             # Reusable patterns
├── agents/
│   ├── custom/                      # Project-specific agents
│   └── summaries/                   # Agent deliverables
└── commands/                        # Custom slash commands
```

### 3. Start Building
Open with Claude Code:
```bash
claude code .
```

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
Add project-specific agents in `.claude/agents/custom/[agent-name].md`:
```markdown
You are [agent-name].
Specialty: [specific domain]
Model: haiku|sonnet|opus
...
```

Register in `.claude/docs/agents-reference.md` Custom section.

## Documentation

**Main index**: [`.claude/docs/README.md`](.claude/docs/README.md)
**Agent catalog**: [`.claude/docs/agents-reference.md`](.claude/docs/agents-reference.md)
**Orchestrator instructions**: [`CLAUDE.md`](CLAUDE.md)

## Commands

### `/update-docs`
Auto-consolidate documentation:
- Identify redundancies across all docs
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

## Quality Standards

- Every file change documented
- Every feature has context + implementation docs
- Every reusable pattern creates SOP
- Every doc referenced in README
- All timestamps ISO 8601
- All file references include line numbers
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
