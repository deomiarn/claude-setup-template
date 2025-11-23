# Session Management System

## Overview
Sessions organize multi-agent workflows with parallel execution, validation loops, and artifact tracking. Supports both one-shot builds and iterative development.

## Session Structure

```
.claude/sessions/[session-id]/
├── metadata.json          # Session tracking, artifacts, checkpoints, validation state
├── planning.md            # Task DAG with phases, dependencies, validation gates (500 token budget)
├── communication.md       # Full agent audit trail (append-only log)
└── agent-context-[name].md  # Filtered context per agent (Parent-generated)
```

## Session Types

### Initial Build (`sessionType: "initial-build"`)
- Creates new project in `.claude/planning/[project]/`
- Full parallel workflow execution
- All validation gates active
- Optimized for speed with quality gates

### Revision (`sessionType: "revision"`)
- References existing project in `.claude/planning/[project]/`
- Incremental task graph (smaller scope)
- Targeted validation (only affected components)
- Client feedback integration

### A/B Test (`sessionType: "ab-test"`)
- Variant creation from existing project
- Comparison validation loops
- Performance diff analysis

## Artifact Storage

**Project-Level (Persistent):** `.claude/planning/[project]/`
- sitemap.md (page structure + component selections)
- seo-report.md (SEO strategy + keywords)
- brand.json (colors, fonts, logo, tone)
- requirements.md (business context)
- validation-report.md (quality audit results)

**Session-Level (Scoped):** `.claude/sessions/[session]/`
- metadata.json (session state)
- planning.md (task execution plan)
- communication.md (agent logs)
- agent-context-*.md (filtered handoffs)

## Validation Loop Architecture

**Details**: See `/CLAUDE.md` lines 72-86 for complete validation loop workflow

Sessions include validation checkpoints after each major phase. Validators score 0-100, PASS ≥80. Failed validations trigger retries with feedback (max 2 retries).

### Validation Metadata Structure

Each validation gate records results in metadata.json:
```json
{
  "validationGates": {
    "requirements-validation": {
      "status": "pass|fail|skipped",
      "timestamp": "ISO_8601",
      "score": 95,
      "issues": [],
      "retriesRemaining": 2
    }
  }
}
```

## Workflow

### 1. Parent Creates Session
```markdown
1. Detect if project exists in .claude/planning/[project]/
2. Set sessionType (initial-build | revision | ab-test)
3. Create metadata.json
4. Create planning.md with Task DAG + validation checkpoints
```

### 2. Parent Orchestrates (Parallel + Validation)
```markdown
1. Read planning.md task graph
2. Identify ready tasks (dependencies met, validation passed)
3. Group tasks by phase (parallel execution)
4. Generate agent-context-[name].md for each task
5. Launch tasks in parallel (same phase)
6. Wait for phase completion
7. Trigger validation gate
8. If PASS → Next phase | If FAIL → Retry with feedback
```

### 3. Validation Loop Execution
```markdown
When validation gate triggers:
1. Parent launches validator agent
2. Validator scores quality (0-100)
3. If score ≥ 80 → PASS
4. If score < 80 → FAIL with feedback
5. If FAIL and retriesRemaining > 0:
   - Parent relaunches failed phase with feedback
   - retriesRemaining--
6. If FAIL and retriesRemaining = 0:
   - Escalate to user for manual review
```

### 4. Agents Read Context (Optimized)
```markdown
Order:
1. agent-context-[name].md (Parent-generated, 300 tokens)
2. metadata.json (artifact paths, validation feedback, 50 tokens)
3. Artifact files (sitemap.md, seo-report.md, etc.)
4. communication.md (last 3 full entries, 600 tokens)

Token budget: ~1000 tokens (vs 4200 before = 76% reduction)
```

## Token Optimization

### Before: ~31,400 tokens per session
- Parent reads all communication entries: 1400 tokens
- Each agent reads all entries: 1400 tokens × 7 = 9,800 tokens
- Static doc reading: 2000 tokens × 7 = 14,000 tokens

### After: ~11,850 tokens per session (62% reduction)
- Parent reads summaries: 350 tokens
- Each agent reads agent-context: 300 tokens × 7 = 2,100 tokens
- MCP queries (not static): 200 tokens × 7 = 1,400 tokens

## Resumability

Sessions support resume from any checkpoint via metadata.json checkpoints array.

## Example Session Flow

```
Session: website-local-studios-2025-01-15
Type: initial-build

Timeline:
1. [10:00] Parent creates session
2. [10:01] Phase 1 (parallel): brand-analyzer || requirements-analyst
3. [10:05] Validation Gate 1 (score: 95, PASS)
4. [10:06] Phase 2: sitemap-analyst
5. [10:15] Validation Gate 2 (score: 78, FAIL - retry)
6. [10:20] Validation Gate 2 retry (score: 92, PASS)
7. [10:21] Phase 3 (parallel): sitemap-executor || seo-orchestrator
8. [11:15] Session complete

Total time: 75 minutes (vs 3+ hours sequential)
Validation catches: 1
Token usage: 11,850 tokens (62% savings)
```
