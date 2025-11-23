# How to Add Documentation

## Directory Structure

```
.claude/docs/
├── workflows/          # How Parent + agents work
├── templates/          # Reusable templates (planning, etc.)
├── prompts/           # Old system (deprecated, keep for reference)
├── HOW-TO-ADD-DOCS.md # This file
├── IMPLEMENTATION-GUIDE.md
├── model-selection.md
└── output-format.md
```

## Document Types

### 1. Workflows (How-To Guides)
**Location**: `workflows/`

**Purpose**: Step-by-step processes for agents/parent

**Template**:
```markdown
# [Workflow Name]

## Overview
[What this workflow does]

## When to Use
[Triggers/situations]

## Steps
### Step 1: [Action]
[Details]

### Step 2: [Action]
[Details]

## Example
[Concrete example]

## Common Mistakes
[Pitfalls to avoid]
```

**Examples**:
- `parent-workflow.md` - How Parent orchestrates
- `subagent-workflow.md` - How agents execute tasks

### 2. Guides (Reference Documentation)
**Location**: `docs/`

**Purpose**: Comprehensive references (architecture, features)

**Template**:
```markdown
# [Topic] Guide

## Introduction
[What this covers]

## Core Concepts
### Concept 1
[Explanation]

### Concept 2
[Explanation]

## Best Practices
[Guidelines]

## Examples
[Code/patterns]

## Troubleshooting
[Common issues + fixes]
```

**Examples**:
- `IMPLEMENTATION-GUIDE.md` - Complete setup guide
- `model-selection.md` - When to use haiku/sonnet/opus

### 3. Templates (Boilerplate)
**Location**: `templates/`

**Purpose**: Copy-paste starting points

**Examples**:
- `planning-template.md` - Session planning structure
- Agent templates (in IMPLEMENTATION-GUIDE.md)

### 4. Architecture Docs (System Design)
**Location**: `docs/` or root `CLAUDE.md`

**Purpose**: How the system works

**Sections**:
- Architecture overview
- Component interactions
- Data flow
- Token optimization strategies

## File Naming

**Workflows**: `[action]-workflow.md`
- `parent-workflow.md`
- `subagent-workflow.md`

**Guides**: `[topic]-guide.md` or just `[topic].md`
- `IMPLEMENTATION-GUIDE.md`
- `model-selection.md`

**Templates**: `[thing]-template.md`
- `planning-template.md`
- `communication-entry.md` (deprecated)

**HOW-TOs**: `HOW-TO-[ACTION].md` (uppercase)
- `HOW-TO-ADD-DOCS.md` (this file)
- `HOW-TO-ADD-AGENTS.md`

## Documentation Standards

### 1. Be Concise
- One idea per paragraph
- Use bullets for lists
- Code blocks for examples
- Max 1000 lines (split if longer)

### 2. Be Specific
- ❌ "Use MCPs when possible"
- ✅ "Use mcp__shadcn-search__search_components for UI component queries"

### 3. Include Examples
- Show don't tell
- Before/after comparisons
- Concrete code snippets

### 4. Link Related Docs
```markdown
See also:
- `.claude/sop/mcp-first-documentation.md` (MCP rules)
- `CLAUDE.md` (architecture)
```

### 5. Update When Changing
If you modify a workflow:
1. Update the workflow doc
2. Update related guides
3. Update CLAUDE.md if architecture changed
4. Update WHATS-NEW.md if user-facing

## Common Documentation Patterns

### Pattern 1: Workflow
```markdown
Problem → Steps → Example → Mistakes to Avoid
```

### Pattern 2: Guide
```markdown
Introduction → Concepts → Best Practices → Examples → Troubleshooting
```

### Pattern 3: Template
```markdown
# [Template Name]

[Boilerplate with placeholders]
[Comments explaining each section]
```

### Pattern 4: Reference
```markdown
Quick reference table/list
Detailed explanations
Edge cases
```

## Token Optimization in Docs

**Keep docs under 1000 lines**:
- Longer docs = more tokens when agents read
- Split into focused topics
- Use references/links instead of duplication

**Use structured formats**:
- Bullets > paragraphs (easier to scan)
- Code blocks > prose
- Tables > lists (for comparisons)

**Avoid redundancy**:
- Don't repeat CLAUDE.md in workflow docs
- Link instead of duplicating
- Use templates for common patterns

## Deprecation Process

When replacing old documentation:

1. **Mark as deprecated** at top of file:
```markdown
# [Old Doc Name]

**Status**: ⚠️ DEPRECATED
**Replaced by**: [new-doc.md](./new-doc.md)
**Migration deadline**: [date]

[Keep old content for reference]
```

2. **Update references**:
- Find all docs linking to old doc
- Update links to new doc
- Add deprecation warnings

3. **Archive after 30 days**:
```bash
mkdir docs/archive
mv old-doc.md docs/archive/
```

4. **Update CLEANUP-LOG.md**:
- Document what was deprecated
- Explain why
- Link to replacement

## Quality Checklist

Before committing documentation:

- [ ] File name follows convention
- [ ] Location makes sense (workflows/ vs docs/)
- [ ] Concise (under 1000 lines)
- [ ] Examples included
- [ ] Links to related docs
- [ ] No redundancy with existing docs
- [ ] Grammar/spelling checked
- [ ] Code blocks tested (if applicable)

## Need Help?

**Examples of good documentation**:
- `IMPLEMENTATION-GUIDE.md` - Comprehensive guide
- `parent-workflow.md` - Clear workflow
- `mcp-first-documentation.md` - Specific SOP
- `CLAUDE.md` - Architecture overview

**For questions**:
1. Check existing docs for patterns
2. Ask: "Does this add value or duplicate?"
3. Consider: "Will agents/users read this?"
