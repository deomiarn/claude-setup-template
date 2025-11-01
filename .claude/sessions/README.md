# Sessions

Each session = folder with internal work files.

## Structure

```
sessions/
└── [session-name]/
    ├── planning.md         # Task breakdown (500 token budget)
    └── communication.md    # Agent I/O stream (append-only)
```

## Files

**planning.md**: Parent creates. Contains problem, tasks, dependencies, success criteria.

**communication.md**: Agents append. Format: `.claude/docs/output-format.md`.

## Example

See `example-session/` for template structure.

## Usage

Parent creates session folder at start. Agents read/append during execution.
