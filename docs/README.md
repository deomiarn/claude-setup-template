# Developer Documentation

External documentation for developers.

## Structure

```
docs/
├── architecture/    # System design (runtime)
└── features/        # Implementation guides (runtime)
```

## Usage

Agents write here for user-facing docs. Clean, concise guides.

## Separation

- **Claude ops**: `.claude/docs/` (workflows, templates, model selection)
- **Developer docs**: `/docs/` (architecture, features)

Internal work (planning, agent comms) in `.claude/sessions/`.
