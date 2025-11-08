# Mikroanimations Integration
Purpose: Add motion design to website components

Token Budget: <500 tokens

---

## INPUTS [EDIT HERE]

**Animation Style:**
- Type: [subtle/bold/playful/sophisticated]
- Speed: [fast/medium/slow]
- Easing: [ease-in-out/spring/linear]

**Target Sections:**
- Apply to: [all/specific sections list]
- Priority Elements: [buttons/cards/images/text/etc.]

**Performance:**
- Target FPS: [60fps]
- Max Duration: [500ms for interactions]

---

## AGENT WORKFLOW

**Execute with:**
- Agent: `animation-specialist`
- Model: `haiku` (deterministic micro-animations)

**Dependencies:**
- Framer Motion (must be installed)
- Component files in `src/`

**Process:**
1. Analyze components in `src/components/`
2. Add **hover effects** (buttons, cards, links)
3. Add **scroll animations** (fade-in, slide-up)
4. Add **page transitions** (route changes)
5. Add **loading states** (skeletons, spinners)
6. Respect `prefers-reduced-motion` (accessibility)

**Animation Types:**

**Hover Effects:**
```tsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: "spring", stiffness: 400 }}
>
```

**Scroll Animations:**
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
```

**Page Transitions:**
```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.3 }}
>
```

---

## ACCESSIBILITY

**Respect User Preferences:**
```tsx
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches

const animationConfig = prefersReducedMotion
  ? { duration: 0 }
  : { duration: 0.6 }
```

**Guidelines:**
- Never animate longer than 500ms for interactions
- Avoid rapid flashing (seizure risk)
- Provide instant feedback on user actions
- Disable animations if `prefers-reduced-motion: reduce`

---

## SUCCESS CRITERIA

✓ All interactive elements have hover states
✓ Scroll animations added to sections
✓ Page transitions smooth
✓ 60fps performance maintained
✓ Accessibility respected (prefers-reduced-motion)
✓ Components updated with Framer Motion

---

## NEXT STEP

**After this step:**
Proceed to:
- `04-seo.md` - SEO optimization
- `05-midjourney.md` - Custom image prompts
