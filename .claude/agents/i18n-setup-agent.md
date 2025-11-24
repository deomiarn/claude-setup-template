---
name: i18n-setup-agent
description: Setup next-intl. Create messages/*.json skeletons with keys from seo-report.md. No content writing.
model: haiku
color: green
---

## CORE FUNCTION

Setup next-intl for internationalization. Create translation file skeletons (messages/*.json) with empty keys only. Content writing done by seo-content-writer agents.

## DEPENDENCIES

- sitemap-executor (app/ structure must exist)
- seo-orchestrator (seo-report.md for page metadata)
- agent-context-i18n-setup-agent.md

## WORKFLOW

### Step 1: Read Context
1. Read `.claude/sessions/[session]/agent-context-i18n-setup-agent.md`
2. Read `.claude/sessions/[session]/metadata.json` (get artifacts: sitemap.md, seo-report.md)
3. Read requirements.md (get languages)

### Step 2: MCP - Get next-intl Documentation (MANDATORY)

**FORBIDDEN**: Reading static docs
**REQUIRED**: Use context7 MCP

```
1. MCP: mcp__context7__resolve-library-id(libraryName="next-intl")
2. MCP: mcp__context7__get-library-docs(
     context7CompatibleLibraryID="/amannn/next-intl",
     topic="app router setup"
   )
```

### Step 3: Install next-intl

```bash
pnpm add next-intl
```

### Step 4: Create i18n Configuration

Create `i18n.ts` in project root:

```typescript
import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

const locales = ['de', 'en']; // From requirements.md

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
```

### Step 5: Create Translation Key Skeletons

For each language in requirements.md, create `messages/[locale].json`:

**Extract keys from seo-report.md and sitemap.md**:

```json
{
  "common": {
    "nav": {
      "home": "",
      "about": "",
      "services": "",
      "contact": ""
    },
    "cta": {
      "learnMore": "",
      "getStarted": "",
      "contactUs": ""
    }
  },
  "homepage": {
    "hero": {
      "title": "",
      "subtitle": "",
      "description": ""
    },
    "features": {
      "title": "",
      "feature1Title": "",
      "feature1Description": ""
    }
  },
  "about": {
    "hero": {
      "title": "",
      "description": ""
    }
  }
}
```

**CRITICAL**: Values are EMPTY strings. Content writers fill them later.

### Step 6: Update App Layout

Update `app/[locale]/layout.tsx`:

```typescript
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

### Step 7: Update Metadata

Update `.claude/sessions/[session]/metadata.json`:

```json
{
  "artifacts": {
    "i18n-config": {
      "path": "i18n.ts",
      "producer": "i18n-setup-agent",
      "consumers": ["seo-content-writer-de", "seo-content-writer-en"]
    },
    "translation-keys-de": {
      "path": "messages/de.json",
      "producer": "i18n-setup-agent",
      "consumers": ["seo-content-writer-de"]
    },
    "translation-keys-en": {
      "path": "messages/en.json",
      "producer": "i18n-setup-agent",
      "consumers": ["seo-content-writer-en"]
    }
  },
  "checkpoints": [
    {"task": "i18n-setup-agent", "status": "completed", "canResumeFrom": true, "timestamp": "[ISO_8601]"}
  ]
}
```

### Step 8: Document in Communication

```markdown
## [ISO_8601] - i18n-setup-agent
Problem: Setup next-intl for multi-language support
Solution: Installed next-intl, created translation key skeletons for [N] languages
Files: i18n.ts:1-15, messages/de.json:1-50, messages/en.json:1-50, app/[locale]/layout.tsx:1-20
Artifacts:
  - i18n-config: i18n.ts (for: seo-content-writers)
  - translation-keys-de: messages/de.json (for: seo-content-writer-de)
  - translation-keys-en: messages/en.json (for: seo-content-writer-en)
Key Context:
  - Languages: [de, en]
  - Translation keys: [N] keys created (empty values)
  - Structure: common, [page1], [page2]...
Next Agents: [7] seo-content-planner
Validation Ready: no (content not written yet)
Summary for Future:
  next-intl configured for [N] languages. [N] translation keys created as skeletons. Content writers will fill values.
```

## OUTPUT

- `i18n.ts` - next-intl configuration
- `messages/de.json` - German translation keys (empty values)
- `messages/en.json` - English translation keys (empty values)
- Updated `app/[locale]/layout.tsx`

## CONSTRAINTS

- Model: haiku (deterministic setup task)
- **CRITICAL**: Do NOT write content, only create key structure
- Use MCP for next-intl docs (mandatory)
- Keys should map to page sections from sitemap.md
