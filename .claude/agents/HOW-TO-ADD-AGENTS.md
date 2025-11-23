# How to Add Custom Agents

## Quick Start

Create `your-agent-name.md` in this directory with this template:

```markdown
---
name: your-agent-name
description: What this agent does (1-2 sentences)
model: haiku|sonnet|opus
color: blue|green|orange|red|purple
---

## CORE FUNCTION
What this agent accomplishes in 1-2 sentences.

## DEPENDENCIES
- File/agent this depends on
- Another dependency

## WORKFLOW
1. Read context files
2. Do the work
3. Create output
4. Update metadata.json
5. Document in communication.md

## OUTPUT
What files/artifacts this agent creates.

## CONSTRAINTS
- Model choice (haiku=fast, sonnet=reasoning, opus=critical)
- Read-only or write permissions
- Token budget considerations
```

## Agent Categories

### Validators (Quality Gates)
- Score outputs 0-100, PASS ≥80
- Provide actionable feedback for retries
- Update metadata.json validation gates
- Examples: `requirements-validator.md`, `sitemap-quality-validator.md`

### Execution Agents
- Perform work (analyze, create, build)
- Produce artifacts for other agents
- Use MCPs when possible (90% token savings)
- Examples: `brand-analyzer.md`, `sitemap-analyst.md`

### Orchestrators
- Coordinate multiple agents
- Don't do work themselves, only delegate
- Example: `seo-orchestrator.md`

## Best Practices

**1. Context Reading (Optimized Order)**
```markdown
1. agent-context-[your-name].md (Parent-generated, ~300 tokens)
2. metadata.json (artifact paths, validation feedback)
3. Artifact files (from agent-context)
4. communication.md (last 3 entries only)
```

**2. MCP Usage (Mandatory)**
- ✅ Use `mcp__shadcn-search__search_components` for UI components
- ✅ Use `mcp__context7__get-library-docs` for Next.js/library docs
- ❌ Never read static docs when MCP exists

**3. Communication Format**
```markdown
## [ISO_8601] - your-agent-name
Problem: [what you solved]
Solution: [how you solved it]
Files: [path:line-range]
Artifacts:
  - name: path (for: [consumer-agents])
Key Context:
  - [structured data point]
Next Agents: [task-ids]
Validation Ready: yes|no
Summary for Future:
  [50 tokens max]
```

**4. Metadata Updates**
Always update `.claude/sessions/[session]/metadata.json`:
- Add artifacts to registry
- Add checkpoints
- Update validation gates (if validator)

## Model Selection

- **haiku**: Fast, deterministic tasks (extraction, simple validation, content writing)
- **sonnet**: Reasoning tasks (architecture, orchestration, complex validation)
- **opus**: Critical tasks only (rare, for highest quality needs)

## Common Patterns

### Pattern 1: Simple Analyzer
```markdown
Read files → Extract data → Create JSON/MD → Update metadata
Example: brand-analyzer.md
```

### Pattern 2: Validator
```markdown
Read output → Score 0-100 → Generate issues list → Update metadata.json
Example: requirements-validator.md
```

### Pattern 3: Builder
```markdown
Read plan → Use MCP for resources → Create files → Validate → Update metadata
Example: sitemap-executor.md
```

### Pattern 4: Orchestrator
```markdown
Read requirements → Delegate to N agents (parallel) → Aggregate results → Create report
Example: seo-orchestrator.md
```

## File Naming

- Use kebab-case: `my-agent-name.md`
- Be descriptive: `seo-content-writer-de.md` (not `writer.md`)
- Validators end with `-validator`: `code-structure-validator.md`

## Testing Your Agent

1. Add to `.claude/sessions/[session]/planning.md` task graph
2. Parent will generate `agent-context-[name].md` before launch
3. Agent executes, appends to `communication.md`
4. Check metadata.json updated correctly
5. Verify output artifacts created

## Examples

**See existing agents**:
- Simple: `brand-analyzer.md` (~80 lines)
- Complex: `sitemap-analyst.md` (~200 lines)
- Validator: `requirements-validator.md` (~180 lines)
- Orchestrator: Template in `IMPLEMENTATION-GUIDE.md`

## See Also

- **SOPs**:
  - `.claude/sop/agent-context-generation.md` - How Parent generates context for agents
  - `.claude/sop/mcp-first-documentation.md` - MCP enforcement rules
- **Workflows**:
  - `.claude/docs/workflows/subagent-workflow.md` - Standard agent execution workflow
  - `.claude/docs/workflows/parent-workflow.md` - How Parent delegates to agents
- **Core Docs**:
  - `/CLAUDE.md` - Architecture overview
  - `.claude/docs/output-format.md` - Communication format standards
