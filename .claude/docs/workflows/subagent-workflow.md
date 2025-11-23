# Subagent Workflow

Subagents execute tasks. Document everything.

## Step 1: Read Context (Optimized Order)

**CRITICAL**: Parent generates filtered context for you. Read in this order for maximum efficiency:

1. **agent-context-[your-name].md** (Parent-generated, ~300 tokens)
   - Your specific task from planning.md
   - Filtered dependency summaries (not full communication.md)
   - Direct artifact paths (from metadata.json)
   - Validation feedback (if retry)

2. **metadata.json** (~50 tokens)
   - Artifact registry (paths to files you need)
   - Validation state (if relevant)
   - Current progress checkpoint

3. **Artifact files** (variable, only what you need)
   - Read from paths in agent-context
   - Example: sitemap.md, brand.json, requirements.md

4. **communication.md (last 3 entries only)** (~600 tokens)
   - Recent context for continuity
   - **FORBIDDEN**: Reading ALL entries (wasteful)

5. **SOPs** (if referenced in agent-context)
   - `.claude/sop/agent-context-generation.md`
   - `.claude/sop/mcp-first-documentation.md`

6. **Check `.mcp.json`** for existing MCPs that may help.

**Token Budget**: ~1000 tokens context vs 4200 tokens (76% reduction)

**Example**:
```
Read order for sitemap-analyst:
1. agent-context-sitemap-analyst.md (300 tokens)
   → Tells you: brand.json path, requirements.md path, task details
2. metadata.json (50 tokens)
   → Confirms artifact locations
3. brand.json (100 tokens)
4. requirements.md (150 tokens)
5. communication.md last 3 entries (400 tokens)
6. .claude/sop/mcp-first-documentation.md (200 tokens)

Total: ~1200 tokens
Old way: 4200 tokens (reading all communication, architecture, features)
```

## Step 2: Execute Task

Follow plan. Use assigned model.

**Implementation**:
- Always document in communication.md as you go.
- Write code
- Edit files
- Run commands
- Create tests
- Deploy changes

Follow extreme concision principle.

## Step 3: Document

### Internal (Required)
**IMPORTANT**: ALWAYS append to `.claude/sessions/[session]/communication.md`:
**IMPORTANT**: Check if new lines in the communication.md file exist and read them before appending. Adapt your code/implementation if needed based on new information.

```markdown
## [ISO_8601] - [agent-name]
Problem: [1-2 lines]
Solution: [how done]
Files: [path:line-range]
Next: [dependencies/handoffs]
```

Always check format: `.claude/docs/output-format.md`

### External (If User-Facing)
Always Update `/docs/` if changes affect users/devs:
- `/docs/architecture/` (if architectural changes)
- `/docs/features/[feature]/` (implementation guide)

Keep concise. Devs read these.
No duplicates. Check first if content exists.

### SOPs (If New Pattern)
Create `.claude/sop/[pattern].md` when:
- Pattern repeats across features
- Best practice worth documenting
- Prevents future mistakes

Template in `CLAUDE.md` (lines 211-234 old version).

## Step 4: Report to Parent

Output in communication.md serves as report.
Parent reads, verifies, continues.

## Key Principles

- **Extreme concision**: Sacrifice grammar, preserve meaning
- **Read first**: Always check current state before acting
- **Document everything**: Internal (sessions/), external (/docs/), patterns (sop/)
- **Use output format**: Consistent structure for parent review
- **Append only**: Never overwrite communication.md

## Example Flow

```
1. Read current session planning.md → Task: "Design auth API"
2. Read current session communication.md → Previous: DB schema done
3. Read /docs/architecture/ → Understand system
4. Read .claude/sop/api-design.md → Follow pattern
5. Execute: Create API design doc
6. Document: Append to communication.md
7. Update: /docs/features/auth/api-design.md
8. Optional: Create .claude/sop/jwt-auth.md if new pattern
```
