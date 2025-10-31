---
description: Consolidate and update project documentation, removing redundancies
---

# Documentation Update Protocol

**CRITICAL: Read ALL existing documentation BEFORE creating or updating any docs.**

## Step 1: Read Existing Documentation

Read in this order:
1. `.claude/docs/README.md` - Main documentation index
2. `.claude/docs/architecture/system-design.md` - System architecture
3. `.claude/docs/architecture/tech-stack.md` - Technology stack
4. All files in `.claude/docs/features/` - Feature-specific docs
5. All files in `.claude/sop/` - Standard operating procedures
6. Recent agent summaries in `.claude/agents/summaries/`

## Step 2: Invoke docs-architect Agent

Create agent context file: `.claude/agents/context/docs-architect_consolidation_[timestamp].md`

```markdown
---
session: [current_session_id]
feature: documentation-consolidation
task: consolidate docs, remove redundancies, update system design, create SOPs for new patterns
model: sonnet
token_limit: 150000
prerequisite_docs:
  - .claude/docs/README.md
  - .claude/docs/architecture/
  - .claude/docs/features/
  - .claude/sop/
  - .claude/agents/summaries/
---

## Context (from existing docs)
[Summarize current state of documentation:
- Number of feature docs
- Number of implementation docs
- Number of SOPs
- Identified redundancies
- Missing cross-references
- Outdated content]

## Task Specifics
1. **Identify Redundancies**:
   - Find duplicate headings across docs
   - Find duplicate code examples
   - Find duplicate explanations
   - List all redundancies found

2. **Auto-Merge Duplicates**:
   - Keep content in most specific location (feature > architecture > README)
   - Add reference links in other locations
   - Remove redundant text
   - Add "Updated from: [old_doc]" notes

3. **Update System Design**:
   - Add any new architectural patterns
   - Update component relationships
   - Document new integrations
   - Update data flow diagrams

4. **Create/Update SOPs**:
   - Create SOPs for reusable patterns discovered in recent work
   - Update existing SOPs with refined best practices
   - Add troubleshooting steps from recent issues
   - Cross-reference new examples from implementations

5. **Regenerate README**:
   - Update feature status
   - Add new feature sections
   - Update cross-references
   - Validate all links
   - Update "Recent Changes" section

6. **Validate Structure**:
   - Check all cross-references resolve
   - Verify no orphaned docs (not referenced in README)
   - Ensure all timestamps ISO 8601
   - Confirm all file refs include line numbers

## Expected Deliverables
- Updated documentation files (list all modified)
- Redundancy report (what was merged/removed)
- Updated system-design.md
- Updated SOPs (if patterns changed)
- Regenerated README.md
- Summary report with 4-part structure
```

## Step 3: Invoke docs-architect Agent

Use Task tool with `subagent_type: "docs-architect"` and the context created above.

## Step 4: Wait for Agent Completion

Agent will:
1. Read all prerequisite docs
2. Identify redundancies across all files
3. Auto-merge duplicate content
4. Update system-design.md with new patterns
5. Create/update SOPs for patterns discovered
6. Regenerate README with current references
7. Validate all cross-references
8. Create implementation doc
9. Generate summary

## Step 5: Read Agent Summary

Read: `.claude/agents/summaries/docs-architect_consolidation_[timestamp].md`

Extract:
- **Files modified** - What changed
- **Redundancies removed** - What was merged
- **Key decisions** - Consolidation choices
- **Documentation updates** - New structure
- **Next steps** - Follow-up tasks

## Step 6: Verify Results

Check:
- [ ] README.md updated with new references
- [ ] No duplicate content across docs
- [ ] All cross-references valid
- [ ] System design reflects current architecture
- [ ] SOPs include recent patterns
- [ ] All timestamps ISO 8601
- [ ] All file refs have line numbers
- [ ] No orphaned docs

## Step 7: Commit Changes

```bash
git add .claude/docs/ .claude/agents/summaries/
git commit -m "docs: consolidate and update documentation

- merged redundant content
- updated system design
- updated SOPs
- regenerated README

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

## When to Use This Command

### Regular Maintenance
- After completing major features
- Weekly during active development
- Monthly for stable projects
- Before releases

### Triggered Events
- Documentation feels scattered
- Duplicate content noticed
- Cross-references broken
- New patterns emerged
- Architecture changed

### After Agent Work
- Multiple agents completed tasks
- Many implementation docs created
- Feature docs accumulated
- SOPs need updates

## Quality Assurance

### Before Running
- Commit current work (don't lose changes)
- Verify all recent work documented
- Check for pending agent summaries

### After Running
- Review consolidation changes
- Test that all links work
- Verify no information lost
- Confirm structure improved

## Troubleshooting

### Agent Not Available
```bash
# Install docs-architect from marketplace
# Or use alternative: manually consolidate
```

### Too Many Redundancies
- Agent will prioritize most egregious duplicates
- May need multiple passes
- Review agent summary for deferred items

### Cross-References Broken
- Check file paths correct
- Verify files not moved/deleted
- Update references manually if needed

### Information Lost
- Review agent summary for merge decisions
- Check implementation doc for details
- Revert specific changes if needed

## Examples

### Redundancy: Duplicate Heading
**Before**:
- `features/auth/implementation.md` - "## OAuth Setup"
- `architecture/system-design.md` - "## OAuth Setup"

**After**:
- `features/auth/implementation.md` - "## OAuth Setup" (detailed)
- `architecture/system-design.md` - "## OAuth Setup - See [auth/implementation](../features/auth/implementation.md#oauth-setup)"

### Redundancy: Duplicate Code
**Before**:
- `features/auth/implementation.md` - Full OAuth config code
- `sop/component-development.md` - Same OAuth config code

**After**:
- `features/auth/implementation.md` - Full OAuth config code
- `sop/component-development.md` - "See OAuth config in [auth/implementation](../docs/features/auth/implementation.md#oauth-config)"

### Update SOP
**New pattern discovered**: All forms now use react-hook-form

**Before**: `sop/component-development.md` - No mention of react-hook-form

**After**: `sop/component-development.md` - Added section "Form State" with react-hook-form examples

## Notes

- This command is NON-DESTRUCTIVE (adds references, doesn't delete info)
- Agent will ask before major structural changes
- All changes documented in agent summary
- Can revert via git if needed

## References
- [Agent Workflow SOP](../sop/agent-workflow.md)
- [Documentation README](../docs/README.md)
- [CLAUDE.md](../../CLAUDE.md)
