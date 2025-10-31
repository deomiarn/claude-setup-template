# SOP: Design Standards

**Created**: 2025-10-30
**Agent**: Parent Orchestrator
**Type**: Baseline standards (will evolve with client projects)

## Overview
Premium design standards for custom client websites. Baseline principles apply to all projects, with client-specific adaptations documented per project.

## Core Design Principles

### 1. Swiss Minimalism Foundation
**Baseline for all corporate/finance clients**

- **Clarity**: Every element has purpose
- **Grid systems**: Strong, consistent layout grids (12-column baseline)
- **White space**: Generous spacing (minimum 24px between major sections)
- **Typography**: Clear hierarchy, readable sizes
- **Alignment**: Pixel-perfect, left-aligned text (Western languages)

**When to deviate**: Playful/creative clients may use asymmetric grids, bold colors

### 2. Custom Over Generic
**Never ship default component styles**

- ❌ Default shadcn/ui without customization
- ❌ Template aesthetics
- ❌ Stock photos without custom treatment
- ✅ Client-specific color palettes
- ✅ Custom typography pairings
- ✅ Branded component variants

### 3. Responsive-First
**Mobile-first development**

- Design for mobile (320px+) first
- Enhance for tablet (768px+)
- Optimize for desktop (1024px+)
- Test on real devices, not just emulators

## Design Tokens

### Spacing Scale (8px Base)
```javascript
// Tailwind config extension
spacing: {
  'xs': '0.5rem',   // 8px  - tight spacing
  'sm': '1rem',     // 16px - compact
  'md': '1.5rem',   // 24px - comfortable (default)
  'lg': '2rem',     // 32px - generous
  'xl': '3rem',     // 48px - section breaks
  '2xl': '4rem',    // 64px - major sections
  '3xl': '6rem',    // 96px - hero sections
  '4xl': '8rem',    // 128px - dramatic spacing
}
```

**Usage**:
- Between text lines: `sm` to `md`
- Between paragraphs: `md` to `lg`
- Between sections: `xl` to `2xl`
- Hero sections: `2xl` to `4xl`

### Typography Scale
```javascript
// Font sizes with line heights
fontSize: {
  'xs': ['0.75rem', { lineHeight: '1rem' }],      // 12px/16px
  'sm': ['0.875rem', { lineHeight: '1.25rem' }],  // 14px/20px
  'base': ['1rem', { lineHeight: '1.5rem' }],     // 16px/24px (body)
  'lg': ['1.125rem', { lineHeight: '1.75rem' }],  // 18px/28px
  'xl': ['1.25rem', { lineHeight: '1.75rem' }],   // 20px/28px
  '2xl': ['1.5rem', { lineHeight: '2rem' }],      // 24px/32px
  '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px/36px
  '4xl': ['2.25rem', { lineHeight: '2.5rem' }],   // 36px/40px (H2)
  '5xl': ['3rem', { lineHeight: '1' }],           // 48px (H1)
  '6xl': ['3.75rem', { lineHeight: '1' }],        // 60px (Display)
  '7xl': ['4.5rem', { lineHeight: '1' }],         // 72px (Hero)
}
```

**Typography Hierarchy**:
- Body text: `base` (16px minimum)
- Small text: `sm` (captions, labels)
- Large body: `lg` (leads, quotes)
- H6: `lg` or `xl`
- H5: `xl` or `2xl`
- H4: `2xl`
- H3: `3xl`
- H2: `4xl`
- H1: `5xl` to `7xl` depending on impact needed

### Font Pairing Guidelines
**Baseline recommendation**:
- Headings: Sans-serif (Inter, Helvetica, System UI)
- Body: Sans-serif (same as headings for consistency)

**When to use serif**:
- Luxury brands: Serif headings (Playfair, Crimson)
- Editorial content: Serif body text

**Font weights**:
- Light (300): Large headlines only
- Regular (400): Body text
- Medium (500): Subheadings, emphasis
- Semibold (600): Buttons, CTAs
- Bold (700): Strong emphasis (use sparingly)

## Color System

### Semantic Colors
```javascript
colors: {
  // Brand (client-specific)
  primary: {
    50: '#...', // lightest
    500: '#...', // main brand color
    900: '#...', // darkest
  },

  // Neutrals (grayscale)
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0a0a0a'
  },

  // Semantic
  success: '#...', // green
  warning: '#...', // amber
  error: '#...', // red
  info: '#...', // blue
}
```

### Color Usage Rules
- **Primary**: CTAs, links, focus states
- **Neutral**: Text, backgrounds, borders
- **Semantic**: Feedback (success/error messages)
- **Background**: Light (`neutral-50/100`) or dark (`neutral-900/950`)
- **Text on light**: `neutral-900` for headings, `neutral-700` for body
- **Text on dark**: `neutral-50` for headings, `neutral-200` for body

### Accessibility
- **WCAG AA** minimum: 4.5:1 contrast for body text
- **WCAG AAA** ideal: 7:1 contrast for body text
- Test with tools: WebAIM Contrast Checker, Stark plugin

## Component Customization

### Button Variants
**Baseline variants to customize per client**:

```typescript
// Primary button
<Button
  variant="primary"
  size="default"
  className="font-semibold tracking-wide"
>
  Call to Action
</Button>

// Ghost button
<Button
  variant="ghost"
  size="default"
  className="hover:bg-neutral-100"
>
  Secondary Action
</Button>

// Link button
<Button
  variant="link"
  className="underline-offset-4"
>
  Learn More →
</Button>
```

**Customization points**:
- Border radius (rounded vs sharp)
- Padding (compact vs comfortable)
- Typography (weight, tracking)
- Hover effects (lift, scale, color shift)
- Icon placement (left, right, none)

### Card Patterns
**Baseline card structure**:

```typescript
<Card className="p-6 hover:shadow-lg transition-shadow">
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
  <CardFooter>
    {/* Actions */}
  </CardFooter>
</Card>
```

**Customization points**:
- Border style (shadow vs border vs none)
- Padding (tight vs generous)
- Hover effects (lift, shadow, border color)
- Image treatment (if included)

## Responsive Breakpoints

### Standard Breakpoints
```javascript
screens: {
  'sm': '640px',   // Mobile landscape, small tablets
  'md': '768px',   // Tablets
  'lg': '1024px',  // Small laptops
  'xl': '1280px',  // Desktops
  '2xl': '1536px', // Large desktops
}
```

### Container Max-Widths
```javascript
container: {
  center: true,
  padding: {
    DEFAULT: '1rem',  // 16px
    sm: '2rem',       // 32px
    lg: '4rem',       // 64px
    xl: '5rem',       // 80px
    '2xl': '6rem',    // 96px
  },
  screens: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1400px', // Limit max width for readability
  }
}
```

### Mobile-First CSS
```css
/* Base styles (mobile) */
.element {
  @apply text-base p-4;
}

/* Tablet and up */
@screen md {
  .element {
    @apply text-lg p-6;
  }
}

/* Desktop and up */
@screen lg {
  .element {
    @apply text-xl p-8;
  }
}
```

## Layout Patterns

### Grid Systems
**12-column grid baseline**:

```typescript
<div className="grid grid-cols-12 gap-6">
  <div className="col-span-12 md:col-span-8 lg:col-span-9">
    Main content
  </div>
  <div className="col-span-12 md:col-span-4 lg:col-span-3">
    Sidebar
  </div>
</div>
```

**Golden ratio layouts** (Swiss design):
```typescript
// 8:5 ratio (approx golden ratio)
<div className="grid grid-cols-13 gap-6">
  <div className="col-span-8">Feature content</div>
  <div className="col-span-5">Secondary</div>
</div>
```

### Section Structure
**Standard section pattern**:

```typescript
<section className="py-16 md:py-24 lg:py-32">
  <div className="container">
    <div className="max-w-3xl mx-auto text-center mb-12">
      <h2>Section Title</h2>
      <p className="text-lg text-neutral-600">Section description</p>
    </div>

    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {/* Content cards */}
    </div>
  </div>
</section>
```

## Accessibility Standards

### Minimum Requirements (WCAG AA)
- ✅ Color contrast 4.5:1 for text
- ✅ Touch targets 44x44px minimum
- ✅ Keyboard navigation support
- ✅ Focus indicators visible
- ✅ Alt text for images
- ✅ Semantic HTML (headings, landmarks)
- ✅ Form labels associated

### Best Practices
- Skip to content link
- Proper heading hierarchy (H1 → H2 → H3, no skipping)
- ARIA labels where needed
- Focus trap in modals
- Respect `prefers-reduced-motion`

## Client-Specific Adaptations

### Swiss/Corporate (UBS-style)
- Maximum white space
- Minimal color (1-2 brand colors max)
- Strong grid adherence
- Professional typography (sans-serif)
- Subtle animations only

### Playful/Creative
- Bold, vibrant colors
- Asymmetric layouts acceptable
- Experimental typography
- Dynamic animations
- Personality-driven

### Luxury/Premium
- Generous spacing
- Elegant serif typography
- Muted, sophisticated colors
- Refined animations (slow, smooth)
- High-quality imagery

## Quality Checklist

Before shipping any design:
- [ ] Custom, not generic (no default component styles)
- [ ] Responsive at all breakpoints (test on real devices)
- [ ] Accessible (WCAG AA minimum)
- [ ] Performance optimized (Lighthouse score 90+)
- [ ] Typography hierarchy clear
- [ ] Consistent spacing (uses design tokens)
- [ ] Proper contrast (all text readable)
- [ ] Client aesthetic achieved
- [ ] Documented in project docs

## When to Create New SOP

**Create client-specific SOP** when:
- Unique pattern emerges worth documenting
- Client has specific brand guidelines
- Reusable component pattern established
- Team needs reference for consistency

**Example SOPs to create**:
- `[client]-design-system.md` - Full client design system
- `custom-form-patterns.md` - Form styling standards
- `data-visualization-standards.md` - Chart/graph patterns

## References
- [ui-design-architect Agent](../agents/ui-design-architect.md)
- [animation-specialist Agent](../agents/animation-specialist.md)
- [System Design](../docs/architecture/system-design.md)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [shadcn/ui Documentation](https://ui.shadcn.com)

## Change Log

### 2025-10-30
- Initial design standards established
- Swiss minimalism baseline defined
- Spacing and typography scales set
- Responsive breakpoints standardized
