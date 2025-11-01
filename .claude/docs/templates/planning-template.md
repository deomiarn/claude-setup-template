# [Feature Name] Plan

**Created**: [ISO_8601]
**Token Budget**: 500 tokens max

## Problem

[1-2 line problem statement]

## Tasks

### 1. [Task Name]
- **Agent**: [agent-name] (from settings.json or .claude/agents/)
- **Model**: haiku|sonnet|opus
- **Context**:
  - .claude/docs/README.md
  - /docs/architecture/[relevant].md
  - /docs/features/[feature]/[relevant].md
  - .claude/sessions/[session]/communication.md (previous work)
  - .claude/sop/[relevant].md (if applicable)
- **Output**:
  - Implementation in [location]
  - Documentation update in /docs/features/[feature]/
  - Append to .claude/sessions/[session]/communication.md
  - Use format from .claude/docs/output-format.md

### 2. [Next Task]
[Repeat structure]

## Dependencies

[Execution order, blockers]

## Success Criteria

Done when:
- [Criterion 1]
- [Criterion 2]

---

See `.claude/docs/model-selection.md` for model decision patterns.
