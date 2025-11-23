# SOP: Agent Context Generation

**Created**: 2025-01-23
**Agent**: Parent Orchestrator
**Pattern**: Filtered context handoffs to reduce token waste

## Overview
Before launching any subagent, Parent generates a filtered context file containing only relevant information from dependency agents. This eliminates the need for agents to read entire communication.md logs.

## When to Apply
**ALWAYS** before launching a subagent via Task tool.

## Workflow

### Step 1: Identify Dependencies
Read `planning.md` → Find agent's task definition:
```markdown
**[5] seo-orchestrator** (sonnet)
  Depends: [3]  ← This agent depends on task 3 (sitemap-analyst)
  Context: sitemap.md, requirements.md
```

### Step 2: Extract Relevant Context
Read `communication.md` → Find entries from dependency agents (task IDs 3 in example):
- Extract: `Artifacts`, `Key Context`, `Summary for Future` sections ONLY
- Ignore: Full `Solution` prose, file paths details (unless critical)

### Step 3: Read Validation Feedback (if retry)
If agent is retrying after validation failure:
- Read `metadata.json` → Get validation gate results
- Extract: `issues` array from failed validation
- Include: Specific fixes needed

### Step 4: Generate agent-context File
Create `.claude/sessions/[session]/agent-context-[agent-name].md`:

```markdown
# Context for [agent-name]

## Your Task (from planning.md)
[Exact task description including Problem, Dependencies, Expected Output]

## Model Assignment
[haiku|sonnet|opus] - [reason for model choice]

## Dependency Context

### From [dependency-agent-1] (Task [ID])
**Completed**: [timestamp]
**Artifacts**:
  - [artifact-name]: [path] (purpose: [what it contains])

**Key Context**:
  - [data point 1]
  - [data point 2]

**Summary**: [50 token condensed version]

### From [dependency-agent-2] (Task [ID])
[Repeat structure]

## Validation Feedback (if retry)
**Previous Attempt**: [failed|incomplete]
**Validation Score**: [score]/100
**Issues to Fix**:
  - [issue 1 with specific file/line reference]
  - [issue 2]
**Retry Instructions**: [what to do differently]

## Artifact Registry (Direct Paths)
From metadata.json:
- sitemap.md: `.claude/planning/[project]/sitemap.md`
- seo-report.md: `.claude/planning/[project]/seo-report.md`
- brand.json: `.claude/planning/[project]/brand.json`
- requirements.md: `.claude/planning/[project]/requirements.md`

## Full Communication History
**Recent context**: Read last 3 entries in `communication.md` for immediate context.
**Older context**: Summaries above are sufficient (do NOT read entries older than last 3).

## MCPs Available
Check `.mcp.json` for available servers:
- **shadcn-search**: Component discovery (NEVER read .claude/skills/shadcn-ui-blocks/)
- **context7**: Library docs (Next.js, next-intl, etc.)
- **next-devtools**: Runtime diagnostics (if dev server running)

## Success Criteria
[Copy from planning.md for this specific task]

---
**Token Budget for This Context File**: ~300 tokens
**Agent Reading Budget**: agent-context (300) + metadata (50) + artifacts (200) + last 3 comm entries (600) = **~1150 tokens**
**Savings vs Full Read**: 4200 - 1150 = **3050 tokens (73% reduction)**
```

### Step 5: Update planning.md
Mark task as ready to launch:
```markdown
**[5] seo-orchestrator** (sonnet)
  Status: ⏸️ pending → ⏳ launching
  Context File: agent-context-seo-orchestrator.md (generated)
```

## Template Variables

Replace these when generating:
- `[agent-name]`: Task name from planning.md
- `[session]`: Current session ID
- `[project]`: Project path from metadata.json
- `[dependency-agent-X]`: Name of dependency agent
- `[Task [ID]]`: Task ID from planning.md
- `[timestamp]`: ISO 8601 completion time
- `[artifact-name]`: File name (sitemap.md, seo-report.md, etc.)
- `[path]`: Full file path from metadata.json artifacts registry

## Example (Concrete)

```markdown
# Context for seo-orchestrator

## Your Task (from planning.md)
**Problem**: Coordinate complete SEO workflow for Local Studios website
**Dependencies**: [3] sitemap-analyst, [2] requirements-analyst
**Expected Output**: `.claude/planning/local-studios/seo-report.md` with keyword strategy, meta tags, content plan

## Model Assignment
sonnet - Complex orchestration requiring reasoning to coordinate 3 sub-agents

## Dependency Context

### From sitemap-analyst (Task 3)
**Completed**: 2025-01-23T10:30:00Z
**Artifacts**:
  - sitemap.md: `.claude/planning/local-studios/sitemap.md` (7 pages, block selections, routes)

**Key Context**:
  - 7 pages: /, /about, /services, /portfolio, /contact, /pricing, /blog
  - Primary keyword target: "video production Stuttgart"
  - Used hero-18, feature-12, testimonial-5, pricing-3, contact-8 blocks
  - Target audience: small businesses (1-50 employees), B2B focus

**Summary**: Sitemap complete for video production agency. Stuttgart local SEO focus. 7 pages with shadcn blocks selected.

### From requirements-analyst (Task 2)
**Completed**: 2025-01-23T10:15:00Z
**Artifacts**:
  - requirements.md: `.claude/planning/local-studios/requirements.md` (business context)

**Key Context**:
  - Company: Local Studios (video production, corporate videos, commercials)
  - Geography: Stuttgart, Germany (local SEO critical)
  - Languages: de (primary), en (secondary)
  - Competitors: 3 local agencies identified

**Summary**: B2B video production agency. Stuttgart local market. German-first content strategy.

## Validation Feedback
None (first attempt)

## Artifact Registry
- sitemap.md: `.claude/planning/local-studios/sitemap.md`
- requirements.md: `.claude/planning/local-studios/requirements.md`

## Full Communication History
Read last 3 entries in `communication.md` for recent context.

## MCPs Available
- **context7**: Query SEO best practices, competitor analysis patterns
- **shadcn-search**: Not needed for this task

## Success Criteria
- [ ] Keyword research complete (primary + 10 secondary keywords)
- [ ] Meta tags strategy (title, description, OG tags)
- [ ] Content plan (sections per page, word counts, E-E-A-T signals)
- [ ] Internal linking strategy
- [ ] Local SEO optimization (Stuttgart focus)
- [ ] Output file: seo-report.md (structured markdown)
```

## Token Savings Calculation

### Before (no agent-context)
Agent reads:
1. Full planning.md: 500 tokens
2. All communication.md entries (7 agents × 200 tokens): 1400 tokens
3. Hunt for artifact paths in entries: +200 tokens
4. Architecture docs: 500 tokens
**Total: 2600 tokens per agent**

### After (with agent-context)
Agent reads:
1. agent-context-[name].md: 300 tokens (includes task, dependencies, artifacts)
2. metadata.json: 50 tokens (validation state, project path)
3. Last 3 communication entries: 600 tokens (recent context only)
4. Artifact files directly (no hunting): 0 token overhead
**Total: 950 tokens per agent**

**Savings: 1650 tokens per agent (63% reduction)**

## Best Practices

1. **Be Concise**: agent-context should be 300 tokens max
2. **Structured Data**: Use bullets, not prose
3. **Direct Paths**: Always include full artifact paths from metadata.json
4. **Validation Integration**: Include feedback if retry attempt
5. **MCP Reminders**: List available MCPs to prevent static doc reading
6. **Success Criteria**: Copy from planning.md so agent knows done state
7. **Model Justification**: Explain why haiku/sonnet/opus for this specific task

## Common Mistakes to Avoid

❌ **Don't**: Copy entire communication.md entries into agent-context
✅ **Do**: Extract Key Context + Summary sections only

❌ **Don't**: Write prose explanations
✅ **Do**: Use structured bullets

❌ **Don't**: Forget validation feedback on retries
✅ **Do**: Include specific issues from metadata.json validation gate

❌ **Don't**: Let agent-context exceed 300 tokens
✅ **Do**: Ruthlessly condense to essential context only

❌ **Don't**: Make agents hunt for artifact file paths
✅ **Do**: Provide direct paths from metadata.json

## Pattern Recognition

This SOP emerged from observing:
- Agents reading entire communication logs (token waste)
- Agents re-reading same architecture docs (redundancy)
- Agents hunting for artifact file paths (wasted tool calls)
- No integration of validation feedback into retry attempts

This pattern is now MANDATORY for all agent launches.
