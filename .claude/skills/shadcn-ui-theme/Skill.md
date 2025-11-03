---
name: shadcn-ui-theme
description: Apply pre-configured shadcn/ui themes with CSS variables. Use when user requests theme changes, color scheme updates, or design system modifications. Supports 17 themes including Default, Claude, Cyberpunk, Neo Brutalism, Supabase, Vercel, and more.
version: 1.0.0
dependencies: shadcn/ui, Tailwind CSS
allowed-tools: Read,Write,Edit
---

# Shadcn UI Theme System

Apply pre-configured shadcn/ui themes by replacing CSS variables in `app/globals.css` or `src/app/globals.css`.

**Available Themes:** 17 options with light/dark mode support

---

## Available Themes

### Default (by shadcn)
Neutral grayscale with balanced contrast. Professional, clean design.
**Use:** Corporate sites, SaaS dashboards, documentation

### Amber Minimal (by tweakcn)
Warm amber accent with minimal color palette. Earthy, inviting tone.
**Use:** Blogs, portfolios, creative agencies

### Blue (by shadcn)
Classic blue primary with cool tones. Trust-building, familiar.
**Use:** Finance, healthcare, enterprise apps

### Citrus (by styleglide)
Lime green with teal accents. Fresh, energetic vibe.
**Use:** Eco-friendly brands, fitness apps, food/beverage

### Claude (by tweakcn)
Terracotta and warm neutrals. Sophisticated, approachable.
**Use:** Design studios, consulting firms, premium brands

### Claymorphism (by tweakcn)
Soft purple with clay-inspired pastels. Modern, tactile feel.
**Use:** Creative tools, design apps, startups

### Cleanslate (by tweakcn)
Cool blue-grays with minimal saturation. Ultra-clean, spacious.
**Use:** Minimalist portfolios, tech products, meditation apps

### Cyberpunk (by tweakcn)
Hot pink and cyan neon. Bold, futuristic aesthetic.
**Use:** Gaming, tech events, nightlife, music platforms

### Kodama Grove (by tweakcn)
Olive greens with earthy browns. Nature-inspired palette.
**Use:** Outdoor brands, sustainability, organic products

### Modern Minimal (by tweakcn)
Pale blues with extreme simplicity. Scandinavian design.
**Use:** Architecture, furniture, high-end retail

### Neo Brutalism (by tweakcn)
Primary colors (red/blue/yellow) with black. Bold, geometric.
**Use:** Streetwear, art galleries, bold brands

### Red (by shadcn)
Vibrant red primary. High-energy, attention-grabbing.
**Use:** Sales, promotions, food delivery, alerts

### Spring Bouquet (by styleglide)
Forest green with purple accents. Botanical, elegant.
**Use:** Florists, weddings, lifestyle brands

### Sunset Horizon (by tweakcn)
Coral orange with peach tones. Warm, optimistic.
**Use:** Travel, hospitality, wellness, summer campaigns

### Supabase (by tweakcn)
Teal green signature color. Modern developer aesthetic.
**Use:** Developer tools, APIs, tech startups

### Typewriter (by styleglide)
High-contrast black/white. Newspaper-inspired.
**Use:** Publishing, journalism, vintage aesthetics

### Vercel (by tweakcn)
Pure black/white monochrome. Sleek, minimal.
**Use:** Tech portfolios, minimalist products, developer tools

---

## How to Apply Themes

### Step 1: Locate globals.css
Theme CSS variables typically live in:
- Next.js App Router: `app/globals.css`
- Next.js Pages Router: `src/app/globals.css` or `styles/globals.css`

### Step 2: Replace :root and .dark sections
Find existing `:root` and `.dark` blocks in globals.css and replace with chosen theme variables.

### Step 3: Verify Tailwind Config
Ensure `tailwind.config.ts` references CSS variables:
```typescript
theme: {
  extend: {
    colors: {
      background: 'hsl(var(--background))',
      foreground: 'hsl(var(--foreground))',
      // ... other color mappings
    }
  }
}
```

---

## CSS Variable Structure

Each theme includes:

**Light Mode (`:root`):**
- `--background`: Page background
- `--foreground`: Main text color
- `--primary`: Primary action color (buttons, links)
- `--secondary`: Secondary elements
- `--accent`: Highlights, badges
- `--muted`: Disabled states, subtle backgrounds
- `--destructive`: Error/delete actions
- `--border`, `--input`, `--ring`: UI element styling
- `--card`, `--popover`: Elevated surfaces
- `--chart-1` through `--chart-5`: Data visualization colors
- `--sidebar-*`: Sidebar-specific colors
- `--radius`: Border radius (e.g., `1.25rem`)
- `--shadow-*`: Box shadow definitions
- Font variables: `--font-sans`, `--font-serif`, `--font-mono`

**Dark Mode (`.dark`):**
Same variable names with adjusted values for dark backgrounds.

---

## Example: Applying Claude Theme

**User request:** "Change to Claude theme"

**Action:**
1. Read current `app/globals.css`
2. Replace `:root` section with Claude light mode variables
3. Replace `.dark` section with Claude dark mode variables
4. Preserve other CSS (typography, base styles)

**Claude Theme CSS Variables:**

```css
:root {
  --background: oklch(0.92 0.00 48.72);
  --foreground: oklch(0.28 0.04 260.03);
  --card: oklch(0.97 0.00 106.42);
  --card-foreground: oklch(0.28 0.04 260.03);
  --popover: oklch(0.97 0.00 106.42);
  --popover-foreground: oklch(0.28 0.04 260.03);
  --primary: oklch(0.59 0.20 277.12);
  --primary-foreground: oklch(1.00 0 0);
  --secondary: oklch(0.87 0.00 56.37);
  --secondary-foreground: oklch(0.45 0.03 256.80);
  --muted: oklch(0.92 0.00 48.72);
  --muted-foreground: oklch(0.55 0.02 264.36);
  --accent: oklch(0.94 0.03 321.94);
  --accent-foreground: oklch(0.37 0.03 259.73);
  --destructive: oklch(0.64 0.21 25.33);
  --destructive-foreground: oklch(1.00 0 0);
  --border: oklch(0.87 0.00 56.37);
  --input: oklch(0.87 0.00 56.37);
  --ring: oklch(0.59 0.20 277.12);
  --chart-1: oklch(0.59 0.20 277.12);
  --chart-2: oklch(0.51 0.23 276.97);
  --chart-3: oklch(0.46 0.21 277.02);
  --chart-4: oklch(0.40 0.18 277.37);
  --chart-5: oklch(0.36 0.14 278.70);
  --sidebar: oklch(0.87 0.00 56.37);
  --sidebar-foreground: oklch(0.28 0.04 260.03);
  --sidebar-primary: oklch(0.59 0.20 277.12);
  --sidebar-primary-foreground: oklch(1.00 0 0);
  --sidebar-accent: oklch(0.94 0.03 321.94);
  --sidebar-accent-foreground: oklch(0.37 0.03 259.73);
  --sidebar-border: oklch(0.87 0.00 56.37);
  --sidebar-ring: oklch(0.59 0.20 277.12);
  --font-sans: Plus Jakarta Sans, sans-serif;
  --font-serif: Lora, serif;
  --font-mono: Roboto Mono, monospace;
  --radius: 1.25rem;
}

.dark {
  --background: oklch(0.22 0.01 67.44);
  --foreground: oklch(0.93 0.01 255.51);
  --card: oklch(0.28 0.01 59.34);
  --card-foreground: oklch(0.93 0.01 255.51);
  --popover: oklch(0.28 0.01 59.34);
  --popover-foreground: oklch(0.93 0.01 255.51);
  --primary: oklch(0.68 0.16 276.93);
  --primary-foreground: oklch(0.22 0.01 67.44);
  --secondary: oklch(0.34 0.01 59.42);
  --secondary-foreground: oklch(0.87 0.01 258.34);
  --muted: oklch(0.28 0.01 59.34);
  --muted-foreground: oklch(0.71 0.02 261.32);
  --accent: oklch(0.39 0.01 59.47);
  --accent-foreground: oklch(0.87 0.01 258.34);
  --destructive: oklch(0.64 0.21 25.33);
  --destructive-foreground: oklch(0.22 0.01 67.44);
  --border: oklch(0.34 0.01 59.42);
  --input: oklch(0.34 0.01 59.42);
  --ring: oklch(0.68 0.16 276.93);
  --chart-1: oklch(0.68 0.16 276.93);
  --chart-2: oklch(0.59 0.20 277.12);
  --chart-3: oklch(0.51 0.23 276.97);
  --chart-4: oklch(0.46 0.21 277.02);
  --chart-5: oklch(0.40 0.18 277.37);
  --sidebar: oklch(0.34 0.01 59.42);
  --sidebar-foreground: oklch(0.93 0.01 255.51);
  --sidebar-primary: oklch(0.68 0.16 276.93);
  --sidebar-primary-foreground: oklch(0.22 0.01 67.44);
  --sidebar-accent: oklch(0.39 0.01 59.47);
  --sidebar-accent-foreground: oklch(0.87 0.01 258.34);
  --sidebar-border: oklch(0.34 0.01 59.42);
  --sidebar-ring: oklch(0.68 0.16 276.93);
  --font-sans: Plus Jakarta Sans, sans-serif;
  --font-serif: Lora, serif;
  --font-mono: Roboto Mono, monospace;
  --radius: 1.25rem;
}
```

---

## Getting Full Theme CSS

To get complete CSS for any theme:

1. **Official Themes Source:** https://ui.shadcn.com/themes
2. **Community Themes:**
   - tweakcn themes: Search "tweakcn shadcn themes"
   - styleglide themes: Search "styleglide shadcn themes"
3. **Theme Generators:** Online tools for creating custom themes

**Workflow:**
- User requests theme → Look up theme CSS variables
- If theme not in this skill → Search official sources
- Copy `:root` and `.dark` blocks → Replace in globals.css

---

## Color Space: OKLCH

Themes use OKLCH color space:
- **Format:** `oklch(lightness chroma hue)`
- **Benefits:** Perceptually uniform, better gradients, wider gamut
- **Browser Support:** Modern browsers (2023+)
- **Fallback:** Consider HSL fallbacks for older browsers if needed

---

## Theme Selection Guide

**Corporate/Professional:** Default, Blue, Cleanslate, Modern Minimal
**Creative/Bold:** Cyberpunk, Neo Brutalism, Claude, Claymorphism
**Nature/Organic:** Citrus, Kodama Grove, Spring Bouquet
**Warm/Inviting:** Amber Minimal, Sunset Horizon, Red
**Developer/Tech:** Supabase, Vercel, Typewriter
**Minimal/Clean:** Modern Minimal, Vercel, Typewriter, Cleanslate

---

## Usage Tips

- **Test both modes:** Always verify light + dark mode appearance
- **Accessibility:** Check contrast ratios (WCAG AA minimum)
- **Brand alignment:** Match theme to brand colors/identity
- **User preference:** Support system theme detection
- **Gradual changes:** Preview theme before committing
- **Custom tweaks:** Adjust individual variables post-application

---

## Common Requests

**"Change to dark theme"** → Apply dark mode toggle, not full theme change
**"Make it more colorful"** → Suggest Cyberpunk, Neo Brutalism, Spring Bouquet
**"Corporate look"** → Default, Blue, Cleanslate
**"Match Supabase"** → Apply Supabase theme
**"Minimalist design"** → Modern Minimal, Vercel, Typewriter

---

**Reference:** https://ui.shadcn.com/themes