#!/bin/bash
# SessionStart hook: Prompts Claude to check available skills

# Output reminder for Claude to read skills README
echo "📚 Skills available. Check .claude/skills/README.md for context-relevant skills."

# Set environment flag
if [ -n "$CLAUDE_ENV_FILE" ]; then
  echo "export SKILLS_LOADED=true" >> "$CLAUDE_ENV_FILE"
fi

exit 0
