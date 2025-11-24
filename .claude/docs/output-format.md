# Agent Output Format

All agents output to `.claude/sessions/[session]/communication.md`.

## Enhanced Format (With Validation Support)

```markdown
## [ISO_8601] - [agent-name]
Problem: [what solved in 1-2 lines]
Solution: [how solved]
Files: [path:line-range, path:line-range]
Artifacts:
  - name: path (for: [consumer-agent-1, consumer-agent-2])
  - name: path (for: [consumer-agent-3])
Key Context:
  - [Structured data point 1]
  - [Structured data point 2]
  - [Structured data point 3]
Next Agents: [task-id] agent-name, [task-id] agent-name
Validation Ready: yes|no
Summary for Future:
  [50 tokens max - what future agents need to know]
```

## Field Descriptions

### Problem (Required)
Brief context (1-2 lines) - what needed solving

### Solution (Required)
How task accomplished (methodology, not just "created file X")

### Files (Required)
Changed/created files with line ranges
- Format: `path/to/file.ext:start-end`
- Multiple files: `file1.ts:1-50, file2.ts:10-30`

### Artifacts (Required for producers)
Files consumed by other agents
- Format: `- artifact-name: path (for: [consumer1, consumer2])`
- Enables Parent to track dependencies
- Stored in metadata.json artifact registry

### Key Context (Required)
Structured data points for Parent to filter into agent-context files
- **NOT prose**: Use bullets with specific data
- Examples:
  - Languages: de, en
  - Pages: 7 pages (homepage, about, services, contact, blog, pricing, FAQ)
  - Brand colors: Primary #007bff, Secondary #6c757d
  - Keywords: [primary keyword], [secondary keywords]

### Next Agents (Required)
Task IDs from planning.md that should run after this
- Format: `[3] sitemap-analyst, [VALIDATE-1] requirements-validator`
- Enables Parent to trigger next phase

### Validation Ready (Required)
Whether output is ready for validation
- `yes` = validator can run now
- `no` = dependencies incomplete (e.g., content keys created but not filled)

### Summary for Future (Required)
50 tokens max - compact summary for agent-context generation
- Parent extracts this for future agents instead of full entry
- Focus on outcomes, not process
- Example: "Created sitemap for 7 pages. Selected 12 shadcn components. SEO-friendly URLs defined."

## Example (Execution Agent)

```markdown
## 2025-01-23T10:30:00Z - requirements-analyst
Problem: Gathered project requirements from client brief
Solution: Extracted business context, pages, languages, features, SEO goals into structured requirements.md
Files: .claude/planning/acme-corp/requirements.md:1-80
Artifacts:
  - requirements.md: .claude/planning/acme-corp/requirements.md (for: sitemap-analyst, seo-orchestrator, requirements-validator)
Key Context:
  - Business: Acme Corp, B2B SaaS, project management software
  - Pages: 7 pages (homepage, about, features, pricing, contact, blog, FAQ)
  - Languages: Primary en, Secondary de
  - Features: Contact form, blog, pricing calculator, demo booking
  - SEO: Keywords "project management software", "team collaboration tools"
Next Agents: [3] sitemap-analyst, [VALIDATE-1] requirements-validator
Validation Ready: yes
Summary for Future:
  Requirements for Acme Corp: 7 pages, en+de languages, B2B SaaS focus. SEO targeting "project management software". Features: contact, blog, pricing calculator.
```

## Example (Validator Agent)

```markdown
## 2025-01-23T10:35:00Z - requirements-validator
Problem: Validate requirements.md completeness before architecture phase
Solution: Scored requirements.md: 92/100 (PASS). All sections complete, clear business context, specific features.
Files: .claude/sessions/website-acme-2025-01-23/metadata.json:45-55 (updated validation gate)
Artifacts:
  - validation-result: metadata.json validationGates.requirements-validation (for: Parent orchestrator)
Key Context:
  - Score: 92/100 (PASS threshold: 80)
  - Strengths: Complete business context, clear pages, specific SEO keywords
  - Minor: Could add more competitor details (not blocking)
  - Retries: 0 used, 2 remaining
Next Agents: [3] sitemap-analyst (validation PASS, proceed to architecture)
Validation Ready: yes
Summary for Future:
  requirements.md validated: 92/100 PASS. All critical sections complete. Proceed to architecture phase.
```

## Guidelines

### For Execution Agents
- **Artifacts**: List ALL files other agents will read
- **Key Context**: Structured bullets (not prose)
- **Summary**: Focus on deliverables, not process

### For Validator Agents
- **Score**: Always include 0-100 score
- **Issues**: Specific, actionable feedback (not generic "improve quality")
- **Update metadata.json**: validation gate status

### Token Optimization
- **Summary for Future**: Max 50 tokens (enforced)
- **Key Context**: 3-5 bullets max (not 10+)
- Parent uses summaries for older entries, full format for last 3 only

## Common Mistakes

❌ **DON'T**:
```markdown
Key Context:
  - I analyzed the requirements and found them to be comprehensive with good coverage of business needs.
```
(Prose, not structured data)

✅ **DO**:
```markdown
Key Context:
  - Business: Acme Corp, B2B SaaS, project management
  - Pages: 7 (homepage, about, features, pricing, contact, blog, FAQ)
  - Languages: en (primary), de (secondary)
```
(Structured, scannable data)

## Location

Append to `.claude/sessions/[session]/communication.md` chronologically.
Never overwrite. Append only.
