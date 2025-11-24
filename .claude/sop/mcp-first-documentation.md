# SOP: MCP-First Documentation Strategy

**Created**: 2025-01-23
**Agent**: All subagents
**Discovered**: Token optimization analysis - static doc reading = 2000 tokens vs MCP query = 200 tokens (90% savings)

## Overview
**CRITICAL RULE**: ALL documentation queries MUST use MCP servers. Reading static documentation files when an MCP exists is FORBIDDEN.

## Rationale

### Token Waste Example
**Static file reading**:
```
Agent reads: .claude/skills/shadcn-ui-blocks/docs/hero-01.md (500 tokens)
Agent reads: .claude/skills/shadcn-ui-blocks/docs/hero-02.md (500 tokens)
Agent reads: .claude/skills/shadcn-ui-blocks/docs/hero-03.md (500 tokens)
Total: 1500 tokens for 3 components
```

**MCP query**:
```
search_components(query="hero with video background", limit=3)
Returns: [{id, category, installCommand, description}] in 150 tokens
Total: 150 tokens
Savings: 90% reduction
```

## Available MCPs

Check `.mcp.json` at project root for current list.

### 1. shadcn-search (Custom Server)
**Purpose**: Component discovery for 900+ shadcn/ui blocks
**Tool**: `mcp__shadcn-search__search_components`
**When**: Selecting UI components for pages, searching for specific patterns
**FORBIDDEN**: Reading `.claude/skills/shadcn-ui-blocks/docs/*.md` files (DELETED)

**Usage Example**:
```markdown
Query: search_components(query="hero section with video background and email signup", limit=5)

Returns:
[
  {
    "id": "hero-18",
    "category": "Hero Sections",
    "installCommand": "pnpm dlx shadcn add https://...hero-18",
    "description": "Full-width hero with background video, headline, subtext, email signup form, CTA button"
  },
  {
    "id": "hero-23",
    "category": "Hero Sections",
    "installCommand": "pnpm dlx shadcn add https://...hero-23",
    "description": "Split hero with video on left, headline + email capture on right"
  }
]
```

**Query Tips**:
- Be descriptive (not just "hero", say "hero with pricing cards")
- Include key features (e.g., "testimonial carousel with star ratings")
- Use common UI patterns (e.g., "pricing table with annual/monthly toggle")

### 2. context7
**Purpose**: Library documentation (Next.js, next-intl, React, any npm package)
**Tools**:
1. `mcp__context7__resolve-library-id(libraryName: "next-intl")` → Returns library ID
2. `mcp__context7__get-library-docs(context7CompatibleLibraryID: "/amannn/next-intl", topic: "setup")` → Returns docs

**When**:
- Setting up next-intl (i18n)
- Querying Next.js app router patterns
- Learning library APIs (react-hook-form, zod, etc.)
- Understanding framework best practices

**Usage Example**:
```markdown
Task: Setup next-intl for i18n

Step 1: Resolve library ID
Tool: mcp__context7__resolve-library-id
Input: {libraryName: "next-intl"}
Output: {libraryId: "/amannn/next-intl", version: "latest", ...}

Step 2: Get setup documentation
Tool: mcp__context7__get-library-docs
Input: {
  context7CompatibleLibraryID: "/amannn/next-intl",
  topic: "app router setup",
  page: 1
}
Output: [Documentation for next-intl app router integration]

Step 3: If context insufficient
Tool: mcp__context7__get-library-docs
Input: {
  context7CompatibleLibraryID: "/amannn/next-intl",
  topic: "middleware configuration",
  page: 1
}
Output: [Additional context for middleware]
```

**Topic Examples**:
- Next.js: "app router", "metadata API", "server components", "data fetching", "routing"
- next-intl: "setup", "app router", "middleware", "useTranslations", "translation files"
- React: "hooks", "server components", "suspense", "error boundaries"

**Pagination**:
If context insufficient, increment `page` parameter (max: 10):
```markdown
page: 1 → Initial query
page: 2 → More details on same topic
page: 3 → Advanced patterns
```

### 3. next-devtools
**Purpose**: Runtime diagnostics for running Next.js dev server
**Tool**: `mcp__next-devtools__nextjs_runtime`
**When**: Validate pages compile, check for errors, inspect routes, runtime debugging
**Requires**: Next.js 16+ dev server running

**Usage Example**:
```markdown
Task: Validate all pages compile without errors

Step 1: Discover server
Tool: mcp__next-devtools__nextjs_runtime
Input: {action: "discover_servers"}
Output: [List of running Next.js servers with ports]

Step 2: List available runtime tools
Tool: mcp__next-devtools__nextjs_runtime
Input: {action: "list_tools", port: "3000"}
Output: [Available tools: getErrors, getRoutes, getLogs, etc.]

Step 3: Check for errors
Tool: mcp__next-devtools__nextjs_runtime
Input: {action: "call_tool", port: "3000", toolName: "getErrors"}
Output: [List of TypeScript/compilation errors if any]
```

**Note**: If no dev server running, skip this MCP. Used for validation, not initial setup.

## Enforcement Rules

### FORBIDDEN Actions
❌ Reading `.claude/skills/shadcn-ui-blocks/docs/*.md` (files deleted, use shadcn-search MCP)
❌ Reading static Next.js documentation files (use context7 MCP)
❌ Reading static library docs when MCP available (use context7 MCP)
❌ Using WebFetch to scrape library docs when context7 MCP has it

### REQUIRED Actions
✅ ALWAYS check `.mcp.json` before attempting documentation reading
✅ Use `search_components` for ALL shadcn component queries
✅ Use `context7` for ALL library documentation (Next.js, next-intl, React, etc.)
✅ Use `next-devtools` for runtime validation when dev server available

### Fallback Chain
```
1. Check if MCP exists in .mcp.json → Use MCP
2. If no MCP → Check if official docs online → Use WebFetch (with user permission)
3. If no online docs → Request user to provide documentation or install relevant MCP
```

## Integration with Agent Workflows

### Example: sitemap-analyst
```markdown
## Workflow

1. Read requirements.md → Extract pages needed
2. For EACH page:
   a. **MCP**: search_components(query="[page type] with [features]", limit=3)
   b. Select best match based on description
   c. Store: {id, installCommand, description}
3. For route structure decisions:
   a. **MCP**: resolve-library-id("next.js")
   b. **MCP**: get-library-docs(libraryId, topic="app router")
4. Write sitemap.md with block selections + install commands
```

### Example: i18n-setup-agent
```markdown
## Workflow

1. **MCP**: resolve-library-id("next-intl") → Get library ID
2. **MCP**: get-library-docs(libraryId, topic="app router setup") → Installation steps
3. Install: pnpm add next-intl
4. **MCP**: get-library-docs(libraryId, topic="middleware") → Middleware configuration
5. Create i18n.ts, middleware.ts following MCP docs exactly
6. **MCP**: get-library-docs(libraryId, topic="translation files") → JSON structure patterns
7. Create messages/de.json, messages/en.json skeletons
```

### Example: sitemap-executor
```markdown
## Workflow

1. Read sitemap.md → Extract block IDs
2. For EACH block:
   a. **MCP**: search_components(query="[block-id]") → Verify block exists
   b. Run installCommand from sitemap.md
   c. If install fails → Log error, use fallback component
3. **MCP**: get-library-docs("/amannn/next-intl", topic="useTranslations") → Hook usage
4. Replace hard-coded text with {t('key')} following MCP docs
5. **Validation** (if dev server running):
   a. **MCP**: nextjs_runtime(action="call_tool", toolName="getErrors")
   b. If errors → Fix and re-validate
```

## Token Savings Calculator

### Per Agent (Conservative Estimate)
Static doc reading: 2000 tokens average
MCP query: 200 tokens average
**Savings: 1800 tokens per agent (90% reduction)**

### Per Session (7 agents)
Static: 7 × 2000 = 14,000 tokens
MCP: 7 × 200 = 1,400 tokens
**Total savings: 12,600 tokens (90% reduction) on documentation alone**

### Combined with Other Optimizations
- MCP usage: 12,600 tokens saved
- Communication summaries: 4,200 tokens saved
- Agent-context filtering: 11,550 tokens saved
**Total: 28,350 tokens saved per session (90% of original 31,400 token budget)**

## Error Handling

### If MCP Server Down
```markdown
1. Attempt MCP query
2. If error "Server not available":
   a. Check .mcp.json for server configuration
   b. Attempt restart (if local server)
   c. If still failing → Escalate to user with error message
3. Do NOT fallback to static file reading without user permission
```

### If MCP Returns No Results
```markdown
1. Refine query (be more specific or more general)
2. Try alternate topic names:
   - "setup" vs "installation" vs "getting started"
   - "app router" vs "app directory" vs "routing"
3. Increase page parameter (page: 2, 3, etc.)
4. If still no results → Log in communication.md, ask user for guidance
```

## Validation

Parent Orchestrator will validate MCP usage:
```markdown
During code review:
1. Check communication.md for agents reading static docs
2. If found: ❌ FAIL with message "Use MCP instead of static doc reading"
3. If MCP used correctly: ✅ PASS
```

Agents found violating this SOP will trigger validation gate failure.

## Migration Notes

### Old Pattern (DEPRECATED)
```markdown
1. Read .claude/skills/README.md
2. Find relevant skill
3. Read .claude/skills/[skill]/Skill.md
4. Read .claude/skills/[skill]/docs/*.md (multiple files)
Total: 2000-5000 tokens
```

### New Pattern (REQUIRED)
```markdown
1. Check .mcp.json for relevant server
2. Use MCP tool with descriptive query
3. Receive structured response
Total: 150-300 tokens
```

## Summary

**Core Principle**: If an MCP exists, you MUST use it. No exceptions.

**Benefit**: 90% token reduction on documentation queries + faster responses + always up-to-date docs.

**Enforcement**: Validation gates check for MCP compliance. Violations = retry.

**Skills Hook Removed**: No longer reading skills on every user input. Agent prompts explicitly state when to use MCPs.

---

**This SOP is MANDATORY for all agents. Violations will cause validation gate failures.**
