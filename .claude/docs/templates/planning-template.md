# [Feature Name] Plan

**Created**: [ISO_8601]
**Token Budget**: 500 tokens max

## Problem

[1-2 line problem statement]

## Tasks

### 1. [Task Name]
- **Agent**: [agent-name] (from agents-reference.md)
- **Model**: haiku|sonnet|opus
- **Context**:
  - .claude/docs/README.md
  - .claude/docs/architecture/[relevant].md
  - .claude/docs/features/[feature]/[relevant].md
  - .claude/docs/internal/communication/[feature]-comms.md
- **Output**:
  - Implementation in [location]
  - Documentation update in .claude/docs/features/[feature]/
  - Append to communication stream
  - Summary report

### 2. [Next Task]
[Repeat structure]

## Dependencies

[Execution order, blockers]

## Success Criteria

Done when:
- [Criterion 1]
- [Criterion 2]

---

## Model Decision Guide

Use **Haiku** for:
- Code generation from spec
- Test writing
- Documentation
- Deployments

Use **Sonnet** for:
- Architecture
- Complex implementation
- Code review
- Security

Use **Opus** for:
- System design
- Critical security
- Database architecture
