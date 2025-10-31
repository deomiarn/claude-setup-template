# SOP: Animation Patterns

**Created**: 2025-10-30
**Agent**: Parent Orchestrator
**Discovered During**: Initial setup
**Type**: Baseline patterns (will evolve with projects)

## Overview
Reusable animation patterns for premium websites. Baseline patterns apply to all projects with client-specific timing/style adaptations.

## When to Animate

### Do Animate ✅
- **User feedback**: Button clicks, form submissions, loading states
- **Attention guidance**: New content appearing, important CTAs
- **State changes**: Modal open/close, menu expand/collapse
- **Delight moments**: Subtle micro-interactions, scroll reveals

### Don't Animate ❌
- **Critical content**: Above-fold hero content (fade in quickly, don't delay)
- **Every interaction**: Overwhelming, distracting
- **Long durations**: >1 second (except special hero animations)
- **Layout properties**: Width/height changes (use transforms)

## Timing Standards

### Duration Guidelines
```javascript
const durations = {
  instant: 100,      // Icon changes, immediate feedback
  fast: 200,         // Micro-interactions, hover states
  normal: 300,       // Most transitions (default)
  slow: 400,         // Emphasis, important changes
  slower: 600,       // Page transitions, modals
  slowest: 800,      // Hero animations (max, use sparingly)
}
```

### Easing Standards
```javascript
const easings = {
  // Use for most animations
  default: [0.0, 0.0, 0.2, 1], // easeOut - natural entrances

  // Specific use cases
  entrance: [0.0, 0.0, 0.2, 1],      // Elements entering
  exit: [0.4, 0.0, 1, 1],             // Elements exiting
  emphasized: [0.4, 0.0, 0.2, 1],     // Important moments
  spring: { type: "spring", stiffness: 300, damping: 20 }, // Playful

  // Client-specific
  corporate: [0.0, 0.0, 0.2, 1],     // Smooth, professional
  playful: { type: "spring" },        // Bouncy, energetic
  luxury: [0.4, 0.0, 0.2, 1],        // Slow, elegant
}
```

## Baseline Animation Patterns

### 1. Fade In (Entry Animation)
**When**: Elements entering view (scroll, page load)

```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3, ease: [0, 0, 0.2, 1] }}
>
  Content
</motion.div>
```

**Variations**:
- Subtle: `y: 10` (corporate)
- Bold: `y: 40` + `scale: 0.95` (playful)
- Luxury: duration `0.6`, slow ease

### 2. Button Hover/Tap
**When**: Interactive elements (buttons, cards, links)

```typescript
<motion.button
  whileHover={{ y: -2, scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ type: "spring", stiffness: 400, damping: 17 }}
>
  Button
</motion.button>
```

**Variations**:
- Corporate: Minimal (`y: -1`, no scale)
- Playful: Exaggerated (`y: -4`, `scale: 1.05`)
- Luxury: Smooth (`y: -2`, longer duration)

### 3. Stagger Children
**When**: Lists, grids appearing together

```typescript
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

<motion.ul
  variants={container}
  initial="hidden"
  animate="show"
>
  {items.map(item => (
    <motion.li key={item.id} variants={item}>
      {item.content}
    </motion.li>
  ))}
</motion.ul>
```

**Stagger timing**:
- Fast: `0.05s` (many items, quick reveal)
- Normal: `0.1s` (default)
- Slow: `0.15s` (dramatic, luxury)

### 4. Modal/Dialog Entry
**When**: Overlays, modals, dropdowns

```typescript
<motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.95 }}
  transition={{ duration: 0.2 }}
>
  Modal content
</motion.div>

{/* Backdrop */}
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.15 }}
  className="fixed inset-0 bg-black/50"
/>
```

### 5. Scroll-Triggered Fade In
**When**: Content appears as user scrolls

```typescript
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
>
  Scroll content
</motion.div>
```

**Viewport settings**:
- `once: true` - Animate only first time (default)
- `once: false` - Reanimate on scroll up (use for sticky elements)
- `margin: "-100px"` - Trigger before element enters viewport

### 6. Loading States
**When**: Data loading, form submission

```typescript
// Skeleton pulse
<motion.div
  animate={{ opacity: [0.5, 1, 0.5] }}
  transition={{
    duration: 1.5,
    repeat: Infinity,
    ease: "easeInOut"
  }}
  className="h-8 bg-neutral-200 rounded"
/>

// Spinner
<motion.div
  animate={{ rotate: 360 }}
  transition={{
    duration: 1,
    repeat: Infinity,
    ease: "linear"
  }}
>
  {/* Spinner SVG */}
</motion.div>
```

### 7. Page Transitions
**When**: Route changes in Next.js

```typescript
// In layout or page component
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.3 }}
>
  {children}
</motion.div>
```

### 8. Hover Card Lift
**When**: Interactive cards in grids

```typescript
<motion.div
  whileHover={{ y: -8, scale: 1.02 }}
  transition={{ type: "spring", stiffness: 300, damping: 20 }}
  className="card"
>
  Card content
</motion.div>
```

### 9. Input Focus
**When**: Form inputs receive focus

```typescript
<motion.input
  whileFocus={{
    scale: 1.01,
    borderColor: "#primary-color"
  }}
  transition={{ duration: 0.2 }}
/>
```

### 10. Accordion/Collapse
**When**: Expandable content sections

```typescript
<motion.div
  initial={false}
  animate={{ height: isOpen ? "auto" : 0 }}
  transition={{ duration: 0.3, ease: [0, 0, 0.2, 1] }}
  style={{ overflow: "hidden" }}
>
  Expandable content
</motion.div>
```

## Client-Specific Adaptations

### Swiss/Corporate (UBS-style)
**Principle**: Subtle, professional, never distracting

```javascript
const corporateConfig = {
  durations: {
    default: 250,    // Slightly faster than normal
    emphasis: 350,   // Still quick
  },
  easings: {
    default: [0, 0, 0.2, 1], // Smooth easeOut only
  },
  transforms: {
    y: 10,           // Minimal movement
    scale: 1.01,     // Almost imperceptible
  }
}
```

**Examples**:
- Fade in: `opacity only`, no y-translation
- Buttons: `y: -1` on hover, no scale
- No spring animations (too playful)

### Playful/Creative Agency
**Principle**: Energetic, surprising, personality-driven

```javascript
const playfulConfig = {
  durations: {
    default: 300,
    emphasis: 500,
  },
  easings: {
    default: { type: "spring", stiffness: 300, damping: 20 },
  },
  transforms: {
    y: 30,           // Exaggerated movement
    scale: 1.05,     // Noticeable scale
    rotate: 3,       // Slight rotation acceptable
  }
}
```

**Examples**:
- Spring animations on hover
- Stagger with longer delays (0.15s)
- Bold entrance animations
- Playful loading states (bouncing, wiggling)

### Luxury/Premium
**Principle**: Elegant, refined, slow and smooth

```javascript
const luxuryConfig = {
  durations: {
    default: 600,    // Slow, elegant
    emphasis: 800,   // Very slow
  },
  easings: {
    default: [0.4, 0, 0.2, 1], // Emphasized ease
  },
  transforms: {
    y: 40,           // Generous movement
    scale: 1.02,     // Subtle scale
  }
}
```

**Examples**:
- Slow fade-ins (600ms)
- Smooth, gradual reveals
- Parallax effects
- Elegant page transitions

## Accessibility

### Respect User Preferences
**Always implement**:

```typescript
import { useReducedMotion } from "framer-motion"

function Component() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5 }}
    >
      Content
    </motion.div>
  )
}
```

**Alternative approach** (global config):

```typescript
// lib/motion.ts
import { MotionConfig } from "framer-motion"

export function MotionProvider({ children }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <MotionConfig reducedMotion={shouldReduceMotion ? "always" : "never"}>
      {children}
    </MotionConfig>
  )
}
```

### Keyboard Navigation
- Don't trap focus during animations
- Ensure focus indicators visible during animations
- Allow keyboard to interrupt/skip animations

## Performance

### GPU-Accelerated Properties
**Always use** (60fps):
- `transform` (translate, scale, rotate)
- `opacity`

**Avoid** (laggy):
- `width`, `height`
- `top`, `left`, `right`, `bottom`
- `margin`, `padding`

### Optimization Checklist
- [ ] Only animate transform/opacity
- [ ] Use `will-change` sparingly (performance cost)
- [ ] Test on mid-range mobile device
- [ ] Monitor frame rate (Chrome DevTools Performance)
- [ ] Lazy load Framer Motion if not needed above fold

## Common Mistakes

### ❌ Don't Do
```typescript
// Animating layout properties
<motion.div animate={{ width: "100%" }} />

// Too long duration
<motion.div transition={{ duration: 2 }} />

// Ignoring reduced motion
<motion.div animate={{ y: 0 }} /> // Always animates

// Animating on every scroll
<motion.div whileInView={{ y: 0 }} viewport={{ once: false }} />
```

### ✅ Do Instead
```typescript
// Use transforms
<motion.div animate={{ scaleX: 1 }} />

// Reasonable duration
<motion.div transition={{ duration: 0.3 }} />

// Respect preferences
const shouldAnimate = !useReducedMotion()
<motion.div animate={shouldAnimate ? { y: 0 } : {}} />

// Animate once
<motion.div whileInView={{ y: 0 }} viewport={{ once: true }} />
```

## Documentation Protocol

When implementing animations:
1. Document timing choices in code comments
2. Note client-specific adaptations
3. Record performance benchmarks
4. Update this SOP if new pattern emerges

## Testing Checklist

Before shipping animations:
- [ ] Works on mobile (test real device)
- [ ] 60fps frame rate (Chrome DevTools)
- [ ] Respects `prefers-reduced-motion`
- [ ] Keyboard navigation unaffected
- [ ] No layout shift during animation
- [ ] Timing feels natural (not too fast/slow)
- [ ] Client aesthetic achieved

## References
- [animation-specialist Agent](../agents/animation-specialist.md)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Web Animation Best Practices](https://web.dev/animations/)
- [WCAG Animation Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions)

## Change Log

### 2025-10-30
- Initial animation patterns established
- Timing and easing standards set
- Client-specific adaptations defined
- Accessibility guidelines documented
