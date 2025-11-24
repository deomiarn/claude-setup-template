# Claude Code Setup - Directory Guide

**Version**: 2.0 - Multi-Agent with Validation Loops
**Status**: Production Ready

## Quick Navigation

```
.claude/
├── agents/              # Custom agents (validators, builders, orchestrators)
├── docs/               # Documentation (guides, workflows, templates)
├── sessions/           # Active sessions (planning, communication, context)
├── sop/                # Standard Operating Procedures (patterns, best practices)
├── skills/             # Skills (sitemap-pages templates)
├── planning/           # Project artifacts (sitemap.md, seo-report.md, etc.)
├── prompts/            # Prompts for workflows
├── settings.json       # Claude Code settings (plugins, permissions)
└── README.md           # This file
```

## Directory Purposes

### `/agents/` - Custom Agents
**What**: Agent definitions (validators, builders, orchestrators)
**When to use**: Creating new agents for your workflow
**How-to**: Read `agents/HOW-TO-ADD-AGENTS.md`

**Key agents**:
- **Validators** (5): requirements, sitemap-quality, code-structure, content-quality, production-readiness
- **Execution**: brand-analyzer, sitemap-analyst, sitemap-executor, seo-orchestrator, seo-content-planner, seo-content-executor, i18n-setup-agent, seo-content-writer-en, seo-content-writer-de
- **Specialists**: animation-specialist, midjourney-prompt-generator

### `/docs/` - Documentation
**What**: Guides, workflows, references
**When to use**: Understanding the system, updating workflows

**Key docs**:
- `workflows/parent-workflow.md` - Parent orchestration
- `workflows/subagent-workflow.md` - Agent execution
- `output-format.md` - Communication format
- `model-selection.md` - haiku/sonnet/opus guide

### `/sessions/` - Active Sessions
**What**: Session tracking (planning, communication, agent context)
**When to use**: Running multi-agent workflows
**How-to**: Read `sessions/HOW-TO-CREATE-SESSIONS.md`

**Details**: See `sessions/README.md` for complete session structure and workflow

### `/sop/` - Standard Operating Procedures
**What**: Repeatable patterns discovered during workflows
**When to use**: Standardizing common tasks, preventing mistakes
**How-to**: Read `sop/HOW-TO-ADD-SOPS.md`

**Current SOPs**:
- `agent-context-generation.md` - How Parent generates filtered context (76% token savings)
- `mcp-first-documentation.md` - MCP usage rules (90% token savings)

### `/skills/` - Skills
**What**: Page templates and component references
**Status**: Partially deprecated

**Active**:
- `sitemap-pages/` - Page structure templates (homepage, about, services, etc.)

**Deprecated**:
- `shadcn-ui-blocks/` - Component docs (deleted, use `mcp__shadcn-search__search_components` MCP)

### `/planning/` - Project Artifacts
**What**: Persistent project artifacts across sessions
**Structure**:
```
planning/[project-name]/
├── requirements.md        # Business context, pages, features
├── brand.json            # Colors, fonts, logo, tone
├── sitemap.md            # Page structure, components
├── seo-report.md         # Keywords, strategy, meta tags
└── validation-report.md  # Final quality audit
```

## Configuration Files

### `settings.json`
**What**: Claude Code configuration
**Key changes**:
- ❌ Skills hook removed (was ~100 tokens per input)
- ✂️ Marketplace plugins trimmed: 44 → 12 (web-focused only)
- ✅ Permissions for security

### `CLAUDE.md` (Root Instructions)
**What**: Architecture overview, rules for ALL agents
**Location**: `/CLAUDE.md` (root level, not in .claude/)

**Sections**:
- Parent role (orchestrate only, never execute)
- Multi-agent architecture
- Validation loop workflow
- Website automation workflow (5 phases, 5 gates)
- Agent communication system
- Token optimization (62% reduction)
- MCP enforcement rules

## Getting Started

### Recommended Reading Order

**1. Overview** (15 minutes):
- `/README.md` - Project overview, features, quick start
- `/CLAUDE.md` - Core architecture and rules (concise format)

**2. Workflows** (30 minutes):
- `.claude/docs/workflows/parent-workflow.md` - Orchestration workflow
- `.claude/docs/workflows/subagent-workflow.md` - Agent execution
- `.claude/docs/output-format.md` - Communication standards

**3. Sessions** (20 minutes):
- `.claude/sessions/HOW-TO-CREATE-SESSIONS.md` - Session setup
- `.claude/sessions/README.md` - Session structure details

**4. Customization** (as needed):
- `.claude/agents/HOW-TO-ADD-AGENTS.md` - Create custom agents
- `.claude/sop/HOW-TO-ADD-SOPS.md` - Document patterns
- `.claude/sop/mcp-first-documentation.md` - MCP usage rules

## Key Concepts

### 1. Validation Loops
**Details**: See `/CLAUDE.md` lines 72-86 for complete validation loop workflow

**5 Quality Gates**: Requirements → Sitemap → Code → Content → Production

### 2. Agent Context Generation
**Details**: See `.claude/sop/agent-context-generation.md` for complete pattern

Parent generates filtered context (~300 tokens) before each agent, replacing full communication logs (4200 tokens)

### 3. MCP-First Documentation
**Details**: See `.claude/sop/mcp-first-documentation.md` for enforcement rules

Use MCPs instead of static docs: shadcn-search, context7, next-devtools (90% token reduction)

### 4. Parallel Execution
**Details**: See `.claude/docs/workflows/parent-workflow.md` for phase definitions

Agents in same phase launch in parallel: 60% time reduction (140 min → 75 min)

## Performance Metrics

**Token Reduction**: 62-70%
- Before: 31,400 tokens/session
- After: 11,850 tokens/session
- Saved: 19,550 tokens/session

**Time Reduction**: 60%
- Before: 140 minutes (sequential)
- After: 75 minutes (parallel)
- Saved: 65 minutes

**Automation**: 95%
- Manual: Client brief + final review only
- Automated: Discovery → Build → SEO → Content → Validation

**Quality**: 5 Validation Gates
- ~60% of sessions trigger ≥1 retry
- Higher quality with automated QA

## Common Tasks

### Create a New Agent
```bash
1. Read: .claude/agents/HOW-TO-ADD-AGENTS.md
2. Create: .claude/agents/my-agent.md (use template)
3. Test: Add to planning.md task graph
```

### Add a New SOP
```bash
1. Read: .claude/sop/HOW-TO-ADD-SOPS.md
2. Create: .claude/sop/my-pattern.md
3. Reference: Update agent docs to reference SOP
```

### Start a New Session
```bash
Parent automatically creates session structure
See: .claude/sessions/HOW-TO-CREATE-SESSIONS.md
```

## Troubleshooting

### Skills hook still showing?
- Check settings.json (hooks section should not exist)
- Restart Claude Code

### Token usage still high?
- Verify MCP usage (should see mcp__* tool calls in communication.md)
- Check agent-context files (~300 tokens each, not >500)
- Ensure communication summaries are concise (50 tokens max)

### Validation gates too strict?
- Lower PASS threshold (80 → 75 in validator agents)
- Increase retry limits (2 → 3 in metadata-template.json)
- Skip optional gates for time-sensitive work

### Agents not using MCPs?
- Read `.claude/sop/mcp-first-documentation.md`
- Check .mcp.json for available servers
- Verify agent prompts reference MCPs explicitly

## Next Steps

### Customize for Your Use Case
1. Create domain-specific agents (see `.claude/agents/HOW-TO-ADD-AGENTS.md`)
2. Add validation gates for your quality standards
3. Document patterns as SOPs (see `.claude/sop/HOW-TO-ADD-SOPS.md`)
4. Optimize token usage further

## Resources

**Primary Docs**:
- `/README.md` - Project overview
- `/CLAUDE.md` - Architecture overview (concise)
- `.claude/docs/workflows/` - Workflow documentation
- `.claude/sessions/README.md` - Session structure

**HOW-TOs**:
- `.claude/agents/HOW-TO-ADD-AGENTS.md` - Create agents
- `.claude/sop/HOW-TO-ADD-SOPS.md` - Document patterns
- `.claude/sessions/HOW-TO-CREATE-SESSIONS.md` - Session setup

**SOPs**:
- `.claude/sop/agent-context-generation.md` - Context filtering pattern
- `.claude/sop/mcp-first-documentation.md` - MCP usage enforcement

---

**Multi-agent Claude Code setup template - Production ready, optimized for token efficiency and quality**
