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
   - `.claude/sessions/[session]/planning.md` (current plan)
   - `.claude/sessions/[session]/communication.md` (agent I/O)

## Step 2: Create Plan

File: `.claude/sessions/[session]/planning.md`

**Budget**: 500 tokens max

**Structure**:
- Problem (1-2 lines)
- Tasks (agent + model + context + output expected)
- Dependencies
- Success criteria

**Template**: `.claude/docs/templates/planning-template.md`

## Step 3: Write Todos

Use `TodoWrite` tool:
- One todo per task from plan
- Mark in_progress before delegating
- Mark completed after review

## Step 4: Delegate

Use `Task` tool:
- One agent per task
- Pass planning doc path
- Specify model (haiku/sonnet/opus)
- Include context requirements
- Tell subagents about `.subagent-workflow.md`

**Example**:
```
Task tool:
- subagent_type: backend-architect
- model: sonnet
- prompt: "Read .claude/sessions/auth-feature/planning.md.
          Design API per task 1. Output to /docs/features/auth/."
```

## Step 5: Review Output

Read: `.claude/sessions/[session]/communication.md`

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

## Key Principles

- **NEVER** write code, edit files, run commands
- **ALWAYS** use Sonnet model
- **ALWAYS** delegate to appropriate agent with correct model
- **ALWAYS** read in caching-optimized order
