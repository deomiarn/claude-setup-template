# System Architecture

**Date**: 2025-10-30
**Status**: Initial Definition
**Related**: [README](../README.md) | [Tech Stack](tech-stack.md)

## Overview
System architecture for local-studios-website.
Multi-agent development workflow with comprehensive documentation protocol.

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Parent Orchestrator                    │
│  (Claude Code with wshobson/agents integration)          │
└────────────┬────────────────────────────────┬───────────┘
             │                                │
             ├─ Read Docs                     ├─ Distribute Tasks
             ├─ Coordinate Agents             ├─ Consolidate Results
             └─ Update Documentation          └─ Ensure Non-Redundancy

┌────────────┴──────────────┬─────────────────┴────────────┐
│                            │                              │
▼                            ▼                              ▼
┌──────────────┐    ┌──────────────┐            ┌──────────────┐
│ Code Review  │    │   Docs       │            │  Frontend    │
│   Agent      │    │ Architect    │            │  Developer   │
└──────────────┘    └──────────────┘            └──────────────┘
        │                   │                           │
        └───────────────────┴───────────────────────────┘
                            │
                    Create Summary
                            │
┌───────────────────────────┴──────────────────────────────┐
│                   Agent Summaries                         │
│  - Task Context                                           │
│  - Approach Taken                                         │
│  - Files Modified (with line numbers)                     │
│  - Key Decisions                                          │
└───────────────────────────────────────────────────────────┘
```

## Component Architecture

### Frontend Layer
- **Framework**: React with Next.js
- **Components**: Modular, reusable UI components
- **State Management**: TBD
- **Styling**: TBD (likely Tailwind CSS + shadcn/ui)

### Backend Layer (if applicable)
- **Runtime**: Node.js
- **API**: TBD (REST/GraphQL)
- **Middleware**: TBD

### Data Layer
- **Database**: TBD
- **ORM**: TBD
- **Migrations**: Follow SOP (created by agents when pattern discovered)

### Documentation Layer
```
.claude/
├── CLAUDE.md              # Orchestrator instructions
├── agents/
│   ├── context/          # Agent input files
│   └── summaries/        # Agent output summaries
├── docs/
│   ├── README.md         # Main documentation index
│   ├── architecture/     # System design docs (this file)
│   ├── features/         # Feature-specific docs
│   └── implementations/  # Timestamped implementation logs
├── sop/                  # Agent-created SOPs (dynamic)
└── sessions/             # Active work tracking
```

## Data Flow

### Development Workflow
```
1. Parent creates/reads session in .claude/sessions/
   ↓
2. Parent reads .claude/docs/README.md
   ↓
3. Parent reads feature docs + SOPs (if any exist)
   ↓
4. Parent creates agent context with prerequisites (including session)
   ↓
5. Agent reads session + prerequisite docs
   ↓
6. Agent implements changes
   ↓
7. Agent creates implementation doc
   ↓
8. Agent generates summary (4-part structure)
   ↓
9. Agent updates session with progress
   ↓
10. Agent creates SOP if new pattern discovered
   ↓
11. Parent reads summary
   ↓
12. Parent continues or delegates next task
```

### Documentation Flow
```
Agent completes work
   ↓
Create: .claude/docs/features/[feature]/[timestamp]-change.md
   ↓
Create: .claude/agents/summaries/[agent]_[feature]_[timestamp].md
   ↓
Update: .claude/sessions/[session].md (progress)
   ↓
Update: .claude/docs/README.md (add cross-reference)
   ↓
Check redundancy → Auto-merge if duplicate
   ↓
Create SOP if new reusable pattern discovered
   ↓
Update README to reference new SOP (if created)
```

## Agent Integration

### Available Agents
From wshobson/agents marketplace:
- `code-reviewer` - Code quality assurance
- `docs-architect` - Documentation creation/consolidation
- `frontend-developer` - UI implementation
- `test-automator` - Test creation/automation
- `debugger` - Error resolution
- `typescript-pro` - TypeScript patterns
- `performance-engineer` - Optimization
- `security-auditor` - Security assessment
- `database-architect` - Data layer design
- `deployment-engineer` - CI/CD workflows

### Agent Communication Protocol
**Input Format**: `.claude/agents/context/[agent]_[feature]_[timestamp].md`
- Session ID
- Feature name
- Task description
- Model preference
- Prerequisite docs to read

**Output Format**: `.claude/agents/summaries/[agent]_[feature]_[timestamp].md`
- Task Context (what & why)
- Approach Taken (how)
- Files Modified (with line refs)
- Key Decisions (what & rationale)

## Deployment Architecture
*To be defined when deployment strategy is decided*

## Scaling Considerations
*To be defined as system grows*

## Security Architecture
*To be defined with security-auditor agent*

## Monitoring & Observability
*To be defined with performance-engineer agent*

## References
- [Main Documentation Index](../README.md)
- [Tech Stack Details](tech-stack.md)
- Sessions: `.claude/sessions/` (track active work)
- SOPs: `.claude/sop/` (agent-created, dynamic)

## Change Log

### 2025-10-30
- Initial system architecture defined
- Multi-agent workflow documented
- Documentation layer structure established
- Session management integrated
- Dynamic SOP creation by agents
- Removed reports/ (use summaries only)
