# How to Create Sessions

## What is a Session?

A session tracks a complete multi-agent workflow (e.g., website build, feature development, refactoring).

## Quick Start

Parent automatically creates sessions. You just provide the project name.

**Parent creates**:
```
.claude/sessions/[session-id]/
├── metadata.json          (from metadata-template.json)
├── planning.md            (500 token budget, Task DAG)
├── communication.md       (agent logs, append-only)
└── agent-context-*.md     (Parent generates before each agent)
```

## Session Types

**initial-build**: New project from scratch
- Creates `.claude/planning/[project]/` directory
- Full validation gates active
- Optimized for speed + quality

**revision**: Update existing project
- References existing `.claude/planning/[project]/`
- Incremental task graph
- Targeted validation only

**ab-test**: Variant testing
- Compares to baseline
- Performance diff analysis

## Session ID Format

Convention: `[type]-[project]-[date]`

Examples:
- `website-local-studios-2025-01-23`
- `revision-acme-corp-2025-01-24`
- `ab-test-hero-variant-2025-01-25`

## metadata.json Structure

```json
{
  "sessionId": "website-example-2025-01-23",
  "projectName": "Example Corp Website",
  "projectPath": ".claude/planning/example-corp/",
  "sessionType": "initial-build",
  "created": "2025-01-23T10:00:00Z",
  "updated": "2025-01-23T12:30:00Z",
  "status": "in_progress",
  "progress": {"completed": 3, "total": 10, "percentage": 30},
  "artifacts": {
    "sitemap.md": {
      "path": ".claude/planning/example-corp/sitemap.md",
      "producer": "sitemap-analyst",
      "consumers": ["sitemap-executor", "seo-orchestrator"]
    }
  },
  "validationGates": {
    "requirements-validation": {
      "status": "pass",
      "timestamp": "2025-01-23T10:15:00Z",
      "score": 95,
      "issues": [],
      "retriesRemaining": 2
    }
  },
  "checkpoints": [
    {"task": "brand-analyzer", "status": "completed", "timestamp": "..."}
  ]
}
```

## planning.md Structure

```markdown
# Session: [session-id]

## Problem
[What we're building - 2-3 sentences]

## Requirements
[Business context - bullets]

## Task Graph

### Phase 1: [Name] (Parallel if applicable)
**[1] agent-name** (model) [PARALLEL with 2]
  Status: ⏸️ pending | ⏳ in_progress | ✅ completed | ❌ failed
  Context: [what agent needs]
  Output: [what agent produces]
  Triggers: [next task IDs]

### Validation Gate 1
**[VALIDATE-1] validator-name** (model)
  Depends: [1]
  Validates: [what to check]
  If PASS → [next task] | If FAIL → retry [failed task]

[Repeat for all phases + gates]

## Success Criteria
- [ ] Criterion 1
- [ ] Criterion 2
```

## communication.md Format

Agents append using this format:
```markdown
## [ISO_8601] - agent-name
Problem: [what solved]
Solution: [how solved]
Files: [path:line-range]
Artifacts:
  - name: path (for: [consumers])
Key Context:
  - [data point 1]
  - [data point 2]
Next Agents: [task-ids]
Validation Ready: yes|no
Summary for Future:
  [50 tokens max]
```

## agent-context-[name].md

Parent generates before launching each agent:
```markdown
# Context for [agent-name]

## Your Task
[Exact task from planning.md]

## Dependency Context
### From [dependency-agent]
Artifacts: [paths]
Key Context: [bullets]
Summary: [50 tokens]

## Artifact Registry
- sitemap.md: .claude/planning/[project]/sitemap.md
- brand.json: .claude/planning/[project]/brand.json

## Validation Feedback (if retry)
Issues: [specific fixes needed]
```

## Workflow

**1. Parent Creates Session**
```
- Detect if project exists
- Copy metadata-template.json → metadata.json
- Create planning.md with Task DAG
- Set all validation gates to "pending"
```

**2. Parent Orchestrates**
```
while (tasks remaining):
  - Identify ready tasks (dependencies met, validation passed)
  - Generate agent-context-[name].md for each
  - Launch agents (parallel if same phase)
  - Update metadata.json (progress, artifacts)
  - Trigger validation gates
  - Handle retries if FAIL
```

**3. Agents Execute**
```
- Read agent-context-[name].md
- Read metadata.json (artifact paths)
- Do work
- Update metadata.json (add artifacts)
- Append to communication.md
```

**4. Session Complete**
```
- All tasks ✅ completed
- All validation gates PASS
- metadata.json status = "completed"
- Final artifact: validation-report.md
```

## Resumability

Sessions support resume from checkpoints:
```json
"checkpoints": [
  {"task": "sitemap-analyst", "status": "completed", "canResumeFrom": true},
  {"task": "sitemap-executor", "status": "failed", "canResumeFrom": false}
]
```

To resume:
1. Parent reads metadata.json
2. Finds last successful checkpoint
3. Marks subsequent tasks as pending
4. Includes validation feedback in agent-context
5. Continues from that point

## Best Practices

**1. Keep planning.md Under 500 Tokens**
- Use task IDs (not full descriptions)
- Reference artifacts by path
- Concise problem statement

**2. Update metadata.json Frequently**
- After each agent completes
- After each validation gate
- Update progress percentage

**3. Clean Up Old Sessions**
- Archive sessions >30 days old
- Keep metadata.json for audit trail
- Delete communication.md if not needed

**4. Use Meaningful Session IDs**
- Include project name
- Include date
- Include session type

## Validation Gates

5 gates in website workflow:
1. **requirements-validation** - After discovery
2. **sitemap-quality-validation** - After architecture
3. **code-structure-validation** - After build
4. **content-quality-validation** - After content
5. **production-readiness-validation** - Final

Each scores 0-100, PASS ≥80, max 2 retries.

## Example Session

See `.claude/sessions/example-session/` (will be created) for complete example with:
- Full metadata.json
- Complete planning.md with Task DAG
- Sample communication.md entries
- Sample agent-context files

## See Also

- **Session Details**:
  - `.claude/sessions/README.md` - Comprehensive session structure guide
  - `metadata-template.json` - Complete metadata template
- **Workflows**:
  - `.claude/docs/workflows/parent-workflow.md` - How Parent creates and manages sessions
  - `.claude/docs/workflows/subagent-workflow.md` - How agents work within sessions
  - `.claude/docs/output-format.md` - Communication format for communication.md
- **SOPs**:
  - `.claude/sop/agent-context-generation.md` - How agent-context files are generated
- **Core Docs**:
  - `/CLAUDE.md` - Architecture overview
