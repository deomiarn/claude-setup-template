# Shadcn Search MCP Server

A Model Context Protocol (MCP) server that provides intelligent search across 892 Shadcn/UI component blocks for rapid website development.

## Features

- 🔍 **Semantic Search** - Find components using natural language queries
- 🏷️ **72 Smart Tags** - Organized by layout, UI elements, and content types  
- 📂 **Category Filtering** - Search within specific component types
- ⚡ **Fast & Reliable** - In-memory Fuse.js search (no API calls)
- 📊 **892 Components** - Across 44 categories (hero, pricing, contact, etc.)
- 🎯 **Relevance Scoring** - AI-weighted search for best matches

## Quick Start

### Installation

```bash
npm install
npm run build
```

### Configuration

Add to your Claude Desktop config (`~/Library/Application Support/Claude/claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "shadcn-search": {
      "command": "node",
      "args": ["/path/to/mcp-servers/shadcn-search/build/index.js"]
    }
  }
}
```

### Usage

**Search for components:**
```typescript
// Basic search
mcp__shadcn-search__search_components({
  query: "hero with email signup form",
  limit: 5
})

// Category-filtered search
mcp__shadcn-search__search_components({
  query: "pricing table with features",
  category: "pricing",
  limit: 3
})
```

**Discover available categories:**
```typescript
mcp__shadcn-search__list_categories({})
```

## Available Tools

### 1. `search_components`

Search for Shadcn/UI blocks with natural language queries.

**Parameters:**
- `query` (string, required) - Descriptive search term
  - Examples: "hero with email signup", "pricing table", "contact form"
- `category` (string, optional) - Filter by category slug
  - Examples: "hero", "pricing", "contact", "testimonial", "cta"
- `limit` (number, optional) - Max results (default: 5, max: 20)

**Output:**
```
Found 3 component(s):

1. **hero12** (Hero Sections) (relevance: 0.95)
   Description: A centered hero section contains a main heading, subheading text, and an email input field with a button...
   Tags: centered, vertical, button, form, email, heading, hero...
   Install: `pnpm dlx shadcn add @shadcnblocks/hero12`
```

### 2. `list_categories`

List all available component categories with counts.

**Output:**
```
Available Categories (44 total, 892 components):

- **Feature Sections** (feature): 257 components
- **Hero Sections** (hero): 151 components
- **Pricing** (pricing): 35 components
...
```

## Component Categories

Top categories by count:
- **Feature Sections** (257) - Product features, benefits, showcases
- **Hero Sections** (151) - Landing page heroes, CTAs
- **Pricing** (35) - Pricing tables, plans, comparison
- **Testimonials** (28) - Reviews, social proof
- **Call-to-Action** (23) - Conversion sections
- **Blog** (22) - Blog listings, article cards
- **Footer** (21) - Site footers with links
- **Contact** (18) - Contact forms, info sections
- **Team** (17) - Team member displays
- **Services** (18) - Service offerings

[Full list: 44 categories]

## Searchable Tags

**Layout Patterns:**
`two-column`, `three-column`, `grid`, `centered`, `horizontal`, `vertical`, `stacked`

**UI Elements:**
`button`, `form`, `card`, `image`, `icon`, `heading`, `navigation`, `links`, `avatar`, `badge`, `table`, `list`

**Content Types:**
`email`, `signup`, `login`, `search`, `filter`, `stats`, `testimonial`, `pricing`, `faq`, `video`, `slider`, `timeline`, `gallery`, `social`, `logo`

## Examples

```typescript
// Hero section with form
search_components({
  query: "hero with email signup",
  category: "hero"
})

// Pricing tables
search_components({
  query: "pricing table with toggle",
  limit: 5
})

// Contact forms
search_components({
  query: "contact form with map",
  category: "contact"
})

// Social proof
search_components({
  query: "testimonial cards grid",
  category: "testimonial"
})

// CTAs
search_components({
  query: "call to action with background",
  category: "cta",
  limit: 3
})
```

## Architecture

```
shadcn-search/
├── src/
│   └── index.ts          # MCP server implementation
├── data/
│   └── blocks-db.json    # 892 component definitions
├── scripts/
│   ├── enhance-tags.js   # Tag enhancement utility
│   └── test-search.js    # Search quality tests
├── build/                # Compiled JavaScript
└── package.json
```

## Search Algorithm

Uses Fuse.js with optimized weights:
- **Tags**: 2.0× weight (highest priority)
- **Category**: 1.5× weight
- **ID**: 1.2× weight  
- **Description**: 0.8× weight

**Threshold**: 0.5 (balanced for good matches)
**Special**: Ignores location, min 2-char matches

## Maintenance

**Regenerate enhanced tags:**
```bash
node scripts/enhance-tags.js
npm run build
```

**Test search quality:**
```bash
node scripts/test-search.js
```

## Quality Metrics

- ✅ 892 components across 44 categories
- ✅ 72 semantic tags for precise search
- ✅ Average 8-12 tags per component
- ✅ 150+ character descriptions
- ✅ Relevance scoring for best matches
- ✅ Category filtering for targeted discovery

## License

MIT

## Credits

Component data sourced from shadcn/ui blocks. Enhanced with semantic tagging and intelligent search for MCP integration.
