# Model Selection

## Decision Criteria

### Haiku - Fast Execution & Deterministic Tasks
Use when:
- Generating code from well-defined specs
- Creating tests following established patterns
- Writing documentation with clear templates
- Executing infrastructure operations
- Performing database query optimization
- Handling customer support responses
- Processing SEO optimization tasks
- Managing deployment pipelines

### Sonnet - Complex Reasoning & Architecture
Use when:
- Designing system architecture
- Making technology selection decisions
- Performing security audits
- Reviewing code for architectural patterns
- Creating complex AI/ML pipelines
- Providing language-specific expertise
- Orchestrating multi-agent workflows
- Handling business-critical legal/HR matters

### Opus - Most Capable (Expensive)
Use when:
- System architecture (critical decisions)
- Security audits (comprehensive)
- Database design (complex schemas)
- Performance engineering (optimization)
- Critical business logic

## Hybrid Orchestration Patterns

### Pattern 1: Planning → Execution
```
Sonnet: backend-architect (design API architecture)
  ↓
Haiku: Generate API endpoints following spec
  ↓
Haiku: test-automator (generate comprehensive tests)
  ↓
Sonnet: code-reviewer (architectural review)
```

### Pattern 2: Reasoning → Action (Incident Response)
```
Sonnet: incident-responder (diagnose issue, create strategy)
  ↓
Haiku: devops-troubleshooter (execute fixes)
  ↓
Haiku: deployment-engineer (deploy hotfix)
  ↓
Haiku: Implement monitoring alerts
```

### Pattern 3: Complex → Simple (Database Design)
```
Sonnet: database-architect (schema design, technology selection)
  ↓
Haiku: sql-pro (generate migration scripts)
  ↓
Haiku: database-admin (execute migrations)
  ↓
Haiku: database-optimizer (tune query performance)
```

### Pattern 4: Multi-Agent Workflows
Full-Stack Feature Development:
```
Sonnet: backend-architect + frontend-developer (design components)
  ↓
Haiku: Generate code following designs
  ↓
Haiku: test-automator (unit + integration tests)
  ↓
Sonnet: security-auditor (security review)
  ↓
Haiku: deployment-engineer (CI/CD setup)
  ↓
Haiku: Setup observability stack
```

## Cost Optimization

**Principle**: Use lowest capable model. Parent always Sonnet.

**Benefits**:
- ~90% cost reduction on Haiku vs Sonnet
- Sonnet for decisions, Haiku for execution
- Parallel execution where possible
- Caching reduces repeated reads

**Key**: Design work requires reasoning (Sonnet), implementation work follows specs (Haiku).
