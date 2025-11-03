# Parent Workflow

Parent orchestrates. Never executes.

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

## Step 2: Create Plan

File: `.claude/sessions/[session]/planning.md` if no existing plan.

**Budget**: 500 tokens max

**Structure**:
- Problem (1-2 lines)
- Tasks (agent + model + context + output expected)
- Dependencies
- Success criteria

Check `.mcp.json` for existing MCPs that may help.
**IMPORTANT**: ALWAYS create the `.claude/sessions/[session]/planning.md` file before proceeding and include the full plan as specified.

## Step 3: Write Todos

Use `TodoWrite` tool:
- One todo per task from plan
- Mark in_progress before delegating
- Mark completed after review

**IMPORTANT**: Include the todos also in the `.claude/sessions/[session]/planning.md` file to ensure clarity and tracking.

## Step 4: Delegate

Use `Task` tool:
- One agent per task
- Pass planning doc path
- Specify model (haiku/sonnet/opus)
- Include context requirements
- Tell subagents need to read ALWAYS about `.subagent-workflow.md`

**IMPORTANT**: ALWAYS tell the subagents in which file to append their output (`.claude/sessions/[session]/communication.md`). If there is no such file yet, they should create it.

**Example**:
```
Task tool:
- subagent_type: backend-architect
- model: sonnet
- prompt: "Read .claude/sessions/auth-feature/planning.md.
          Design API per task 1. Output to /docs/features/auth/."
```

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
