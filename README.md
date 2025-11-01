# Claude Multi-Agent Orchestration Template

Template for building projects with Claude Code using Parent Orchestrator pattern. Core system in `.claude/` directory
orchestrates specialized agents for cost-effective, context-aware development.

## What This Is

Starter template for multi-agent Claude Code projects. Parent Orchestrator (Sonnet) delegates to marketplace/custom
agents with model-tier selection (Haiku/Sonnet/Opus), session-based context management, and workflow documentation.

**Template nature**: Framework ready, populate as you build. SOPs created as you discover patterns. Docs structure
provided, content added per feature.

## Core Architecture

```
Parent (sonnet) - Plans, delegates, reviews, tracks (NEVER executes)
├── Subagent 1 (haiku) - Executes fast/deterministic tasks
├── Subagent 2 (sonnet) - Executes complex implementation
└── Subagent 3 (opus) - Executes critical architecture/security
```

**Key principle**: Separation of orchestration (Parent) from execution (subagents).

## Key Features

### 1. Agent Delegation

**Parent Orchestrator** (`.claude/docs/workflows/parent-workflow.md`):

1. Read context (docs, sessions, SOPs)
2. Create 500-token plan with agent + model assignments
3. Write todos (TodoWrite tool)
4. Delegate via Task tool
5. Review output
6. Update tracking

**Subagents** (`.claude/docs/workflows/subagent-workflow.md`):

1. Read context (planning, communication, docs, SOPs)
2. Execute task
3. Append to communication.md
4. Update /docs/ if user-facing
5. Create SOP if reusable pattern

**Critical**: Parent NEVER writes code, edits files, runs commands. Only orchestrates.

### 2. Context Management (Sessions)

**Structure**: `.claude/sessions/[session-name]/`

- `planning.md`: Task breakdown with agent assignments (Parent creates)
- `communication.md`: Append-only agent log (agents append chronologically)

**Flow**:

1. Parent creates planning.md with tasks
2. Each subagent reads planning + previous communication
3. Subagent executes, appends output to communication.md
4. Next subagent reads full communication history
5. Parent reviews communication.md for quality

**Format**: `.claude/docs/output-format.md` (Problem/Solution/Files/Next)

**Example**: `.claude/sessions/example-session/`

### 3. Workflows

**Parent workflow** (`.claude/docs/workflows/parent-workflow.md`):

- Read context in caching-optimized order
- Plan (500 tokens max)
- Write todos
- Delegate to agents
- Review outputs
- Update tracking

**Subagent workflow** (`.claude/docs/workflows/subagent-workflow.md`):

- Read all context (planning, communication, docs, SOPs)
- Execute task
- Document in communication.md
- Update /docs/ if needed
- Create SOP if pattern discovered

**Output format** (`.claude/docs/output-format.md`):

```markdown
## [ISO_8601] - [agent-name]

Problem: [1-2 lines]
Solution: [how done]
Files: [path:line-range]
Next: [dependencies/handoffs]
```

### 4. Cost Minimization

**Model selection** (`.claude/docs/model-selection.md`):

- **Haiku**: Code generation, tests, docs, SEO (~$0.25/M tokens)
- **Sonnet**: Architecture, orchestration (always Parent) (~$3/M tokens)
- **Opus**: Critical decisions, security, performance (~$15/M tokens)

**Principle**: Use lowest capable model. Parent always Sonnet.

**Prompt caching** (~90% savings on cached input tokens):

1. Read stable files first (CLAUDE.md, model-selection.md, SOPs)
2. Claude Code auto-caches (5min TTL)
3. First agent pays full cost, subsequent use cache
4. Never cache dynamic content (sessions, communication)

**Savings caveat**: Actual savings vary by project size, agent count, session length. 90% is theoretical max on cached
tokens only.

## Directory Structure

```
.claude/                  # Claude operations (internal)
├── agents/               # Custom agent definitions
├── docs/                 # Claude ops documentation
│   ├── model-selection.md       # Model tier decision framework
│   ├── output-format.md         # Agent communication format
│   ├── workflows/               # Parent + subagent workflows
│   └── templates/               # Planning, output templates
├── sessions/             # Session-based context
│   └── [session]/
│       ├── planning.md          # Task breakdown (Parent creates)
│       └── communication.md     # Agent log (agents append)
├── sop/                  # Standard Operating Procedures (created as patterns discovered)
└── commands/             # Slash commands

docs/                     # Developer documentation (starter structure, populate as needed)
├── architecture/         # System design (add as you build)
└── features/             # Implementation guides (add per feature)
```

## Quick Start

### 1. Use Template

```bash
# GitHub: Click "Use this template"
# Or clone:
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

- Create session in `.claude/sessions/[feature]/`
- Use MCPs as needed
- Write planning.md with tasks + agent assignments
- Create todos
- Delegate to specialized agents
- Review outputs in communication.md
- Update docs

### 4. Custom Agents (Optional)

Add in `.claude/agents/[agent-name].md`:

```markdown
You are [agent-name].
Specialty: [domain]
Model: haiku|sonnet|opus
...
```

See existing: animation-specialist, sitemap-analyst, ui-design-architect.

## How It Works

**1. Parent reads context** (caching-optimized order):

- CLAUDE.md (orchestrator instructions)
- `.claude/docs/model-selection.md` (model patterns)
- `.claude/sop/*.md` (discovered patterns)
- `/docs/architecture/*.md` (system design)
- `.claude/sessions/[session]/planning.md` (current plan)
- `.claude/sessions/[session]/communication.md` (agent I/O)

**2. Parent creates plan**:

- File: `.claude/sessions/[session]/planning.md`
- Content: Problem, tasks (agent + model + context), dependencies, success criteria
- Budget: 500 tokens max
- Reference: `.claude/docs/templates/planning-template.md`

**3. Parent writes todos**:

- TodoWrite tool: one todo per task
- Mark in_progress before delegating
- Mark completed after review

**4. Parent delegates**:

- Task tool with agent + model + planning doc path
- Example: backend-architect (sonnet) reads planning.md, designs API

**5. Subagent executes**:

- Reads planning.md + communication.md + relevant docs/SOPs
- Implements task
- Appends to communication.md using output format
- Updates /docs/ if user-facing feature
- Creates SOP if reusable pattern discovered

**6. Parent reviews**:

- Reads communication.md
- Verifies quality, files changed, next steps
- Marks todo completed
- Continues to next task

## Documentation Map

| What                      | Where                                         | Purpose                                        |
|---------------------------|-----------------------------------------------|------------------------------------------------|
| Orchestrator instructions | `CLAUDE.md`                                   | Parent behavior, model selection               |
| Parent workflow           | `.claude/docs/workflows/parent-workflow.md`   | Plan → delegate → review                       |
| Subagent workflow         | `.claude/docs/workflows/subagent-workflow.md` | Execute → document                             |
| Output format             | `.claude/docs/output-format.md`               | Communication structure                        |
| Model selection           | `.claude/docs/model-selection.md`             | Haiku/Sonnet/Opus patterns                     |
| Sessions                  | `.claude/sessions/`                           | Context per feature/task                       |
| Templates                 | `.claude/docs/templates/`                     | Planning, output formats                       |
| SOPs                      | `.claude/sop/`                                | Discovered patterns (create as needed)         |
| Developer docs            | `/docs/`                                      | Architecture, features (populate as you build) |
| Claude ops docs           | `.claude/docs/README.md`                      | Internal documentation index                   |

## Multi-Agent System

**Marketplace**: plugins from [wshobson/agents](https://github.com/wshobson/agents) (see `.claude/settings.json` →
`enabledPlugins`)

**Categories**: backend, frontend, mobile, database, security, testing, deployment, SEO, performance, debugging,
documentation, LLM apps

**Custom agents**: Project-specific in `.claude/agents/` (animation-specialist, sitemap-analyst, ui-design-architect
included)

**Model assignment**: Parent assigns Haiku/Sonnet/Opus per task complexity

## MCP Usage

Most of the MCPs are provided with `http`.

### Manual MCP Setups:

#### Context7 MCP

The Context7 MCP provides extensive capabilities.
It requires an API key. Set it in your environment variables `.env` as `CONTEXT7_API_KEY`.


## Commands

### `/update-docs`

Consolidate documentation:

- Identify redundancies
- Merge duplicate content
- Update indexes
- Validate refs

Run after feature work or when docs scattered.

## Quality Standards

- Every change documented
- Timestamps ISO 8601
- File refs include line numbers
- No duplicate content
- Extreme concision (sacrifice grammar, preserve meaning)

## Communication Style

**Extreme brevity**:

- Commit: "add auth flow" (not "Added authentication flow with OAuth2")
- Docs: "DB Migration" (not "Database Migration Best Practices")
- Tasks: "fix login bug" (not "Fix the bug in the login functionality")

## Cost Optimization Example

**Model tiering**: Haiku for 80% of tasks, Sonnet 15%, Opus 5%

**Prompt caching**: First agent pays full cost, subsequent use cache

**Planning overhead**: 500 tokens max per feature, amortized across tasks

**Example** (project-dependent, illustrative only):

- Without caching: 10M tokens = $30
- With caching: 1M new + 9M cached (90% cache hit) = $3.50 + $0.90 = $4.40
- Savings: ~85% on cached portions

**Note**: Actual savings vary significantly by project size, agent count, session complexity.

## License

MIT

## Credits

Built on [wshobson/agents](https://github.com/wshobson/agents) marketplace. Orchestration pattern inspired by
hierarchical multi-agent systems.
