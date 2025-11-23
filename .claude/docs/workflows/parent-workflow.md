# Parent Workflow

Parent orchestrates. Never executes.

## Core Principles

1. **Orchestration Only**: Parent NEVER writes code/edits files. Only delegates.
2. **Parallel Execution**: Launch agents in same phase simultaneously (use single message with multiple Task calls)
3. **Validation Loops**: After each phase, trigger validator. If FAIL + retriesRemaining >0, relaunch with feedback.
4. **Agent Context Generation**: ALWAYS create agent-context-[name].md before launching agent (see `.claude/sop/agent-context-generation.md`)
5. **MCP Enforcement**: Verify agents use MCPs (see `.claude/sop/mcp-first-documentation.md`)

## Step 1: Read Context

**Reading order** (optimizes caching):

1. **Stable** (cache first):
   - `CLAUDE.md` (orchestrator instructions)
   - `.claude/docs/model-selection.md` (model patterns)
   - `.claude/sop/*.md` (reusable patterns)

2. **Semi-stable** (shorter cache):
   - `/docs/architecture/*.md` (system design)
   - `/docs/features/*.md` (existing features)

3. **Dynamic** (always fresh):
   - `.claude/sessions/[session]/planning.md` (current plan if exists)
   - `.claude/sessions/[session]/communication.md` (agent I/O if exists)

## Step 2: Create Session + Planning

1. Detect if project exists:
   - Check: `.claude/planning/[project-name]/` exists?
   - If yes: sessionType = "revision"
   - If no: sessionType = "initial-build", create planning directory

2. Create `.claude/sessions/[session-id]/metadata.json`:
   - Copy from `.claude/sessions/metadata-template.json`
   - Fill: sessionId, projectName, projectPath, created
   - Set: All validation gates to "pending"

3. Create `.claude/sessions/[session-id]/planning.md`:
   - Budget: 500 tokens max
   - Structure: Problem, Task Graph (with phases + parallel markers), Success Criteria

### Task Graph Template (Website Build)

```markdown
## Task Graph

### Phase 1: Discovery (Parallel)
**[1] brand-analyzer** (haiku) [PARALLEL with 2]
  Status: ⏸️ pending
  Context: project files
  Output: brand.json

**[2] requirements-analyst** (sonnet) [PARALLEL with 1]
  Status: ⏸️ pending
  Context: client brief
  Output: requirements.md
  Triggers: [3, VALIDATE-1]

### Validation Gate 1
**[VALIDATE-1] requirements-validator** (haiku)
  Depends: [1, 2]
  Validates: requirements.md completeness
  If PASS → [3] | If FAIL → retry [2]

### Phase 2: Architecture
**[3] sitemap-analyst** (sonnet)
  Status: ⏸️ pending
  Depends: [1, 2, VALIDATE-1]
  MCP: shadcn-search, context7
  Output: sitemap.md
  Triggers: [VALIDATE-2]

### Validation Gate 2
**[VALIDATE-2] sitemap-quality-validator** (haiku)
  Depends: [3]
  Validates: sitemap.md quality
  If PASS → [4, 5] | If FAIL → retry [3]

### Phase 3: Build + SEO (Parallel)
**[4] sitemap-executor** (haiku) [PARALLEL with 5]
  Depends: [3, VALIDATE-2]
  MCP: shadcn-search, context7
  Output: app/ structure
  Triggers: [VALIDATE-3]

**[5] seo-orchestrator** (sonnet) [PARALLEL with 4]
  Depends: [3, VALIDATE-2]
  Delegates: seo-keyword-strategist, seo-structure-architect, seo-meta-optimizer
  Output: seo-report.md
  Triggers: [6]

### Validation Gate 3
**[VALIDATE-3] code-structure-validator** (haiku)
  Depends: [4]
  MCP: next-devtools (if available)
  Validates: TypeScript compilation, component imports
  If PASS → [6] | If FAIL → retry [4]

### Phase 4: i18n Setup
**[6] i18n-setup-agent** (haiku)
  Depends: [4, 5, VALIDATE-3]
  MCP: context7 (next-intl docs)
  Output: i18n.ts, messages/*.json skeletons
  Triggers: [7]

**[7] seo-content-planner** (sonnet)
  Depends: [5, 6]
  Input: seo-report.md, sitemap.md
  Output: content-plan.md
  Triggers: [8, 9]

### Phase 5: Content (Parallel by Language)
**[8] seo-content-writer-de** (haiku) [PARALLEL with 9]
  Depends: [7]
  Output: messages/de.json (full content)

**[9] seo-content-writer-en** (haiku) [PARALLEL with 8]
  Depends: [7]
  Output: messages/en.json (full content)
  Triggers: [VALIDATE-4]

### Validation Gate 4
**[VALIDATE-4] content-quality-validator** (sonnet)
  Depends: [8, 9]
  Validates: SEO quality, i18n completeness
  If PASS → [VALIDATE-5] | If FAIL → retry [8, 9]

### Phase 6: Final Validation
**[VALIDATE-5] production-readiness-validator** (sonnet)
  Depends: [VALIDATE-4]
  Delegates: accessibility-compliance, performance-testing-review, seo-content-auditor
  Output: validation-report.md
  If PASS → Complete | If FAIL → retry relevant phases
```

Check `.mcp.json` for existing MCPs that may help.
**IMPORTANT**: ALWAYS create the `.claude/sessions/[session]/planning.md` file before proceeding and include the full plan as specified.

## Step 3: Write Todos

Use `TodoWrite` tool:
- One todo per task from plan
- Mark in_progress before delegating
- Mark completed after review

**IMPORTANT**: Include the todos also in the `.claude/sessions/[session]/planning.md` file to ensure clarity and tracking.

## Step 4: Orchestrate with Validation Loops

### Loop Structure
```
while (tasks remaining in planning.md):
  1. Read planning.md task graph
  2. Identify ready tasks:
     - Status = ⏸️ pending
     - All dependencies ✅ completed
     - Validation gates PASS (if applicable)
  3. Group by phase (tasks marked [PARALLEL with X])
  4. For each ready task:
     a. Generate agent-context-[name].md (see SOP)
     b. Launch Task tool
     c. Update planning.md: ⏸️ → ⏳
  5. Wait for phase completion (all tasks in phase done)
  6. If next task is VALIDATE-X:
     a. Generate agent-context-[validator-name].md
     b. Launch validator
     c. Read validation result from metadata.json
     d. If PASS:
        - Update planning.md: validation ✅
        - Continue to next phase
     e. If FAIL:
        - If retriesRemaining > 0:
          - Update agent-context with validation feedback
          - Relaunch failed task(s)
          - Decrement retriesRemaining
        - Else:
          - Escalate to user (manual intervention)
  7. Update metadata.json: checkpoints, progress, validation state
```

### Parallel Launch Example
```markdown
Phase 1 ready: [brand-analyzer, requirements-analyst]

Single message with 2 Task calls:
Task(brand-analyzer, haiku, "Read agent-context-brand-analyzer.md")
Task(requirements-analyst, sonnet, "Read agent-context-requirements-analyst.md")
```

**IMPORTANT**:
- ALWAYS generate agent-context-[name].md before launching agent (see `.claude/sop/agent-context-generation.md`)
- ALWAYS tell the subagents in which file to append their output (`.claude/sessions/[session]/communication.md`). If there is no such file yet, they should create it.
- Tell subagents need to read ALWAYS about `.subagent-workflow.md`

## Step 5: Review Output

ALWAYS Read: `.claude/sessions/[session]/communication.md`
ALWAYS Update: `.claude/sessions/[session]/planning.md` (mark todos completed)

Agent appends output using format from `.claude/docs/output-format.md`.

**Verify**:
- Problem solved
- Files created/updated
- Next steps clear
- Quality acceptable

## Step 6: Update Tracking

- Mark todo completed
- Update session notes if needed
- Continue to next task or complete
- ALWAYS keep session up-to-date

## Step 7: Complete

When all tasks done and verified always do:
- Update `/docs/` if user-facing changes with docs agent. This includes updating the project architecture or implementation of new features. Extremely concise. Sacrifice grammar for brevity.
- Mark session as complete
- Summarize in planning.md

## Key Principles

- **NEVER** write code, edit files, run commands
- **ALWAYS** use Sonnet model
- **ALWAYS** delegate to appropriate agent with correct model
- **ALWAYS** read in caching-optimized order
