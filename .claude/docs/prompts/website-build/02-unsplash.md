# Unsplash Image Integration
Purpose: Search + integrate stock photography

Token Budget: <500 tokens

---

## INPUTS [EDIT HERE]

**Project:**
- Name: [Project name]
- Brand Colors: [Hex values from global.css]
- Aesthetic: [minimalist/modern/bold/organic/etc.]

**Image Requirements:**
- Sections Needing Images: [hero, features, team, testimonials, etc.]
- Image Style: [photography/illustration/abstract]
- Preferred Orientations: [landscape/portrait/square]

---

## AGENT WORKFLOW

**Execute with:**
- Agent: `unsplash-image-integrator`
- Model: `haiku` (deterministic search + integration)

**MCPs Required:**
- `context7` (Unsplash API access)

**Process:**
1. Read `.claude/planning/[project]/sitemap.md` → Identify sections
2. Read `global.css` → Extract colors/aesthetic
3. Read SEO keywords → Inform search queries
4. Search Unsplash with keywords: `[brand] + [section] + [aesthetic]`
5. Select images matching brand colors + aesthetic
6. Integrate into components (`src` attribute)
7. Add SEO-optimized `alt` text

**Output:**
- Updated components with images
- `.claude/planning/[project]/unsplash-selections.md`

**Selection Format:**
```markdown
# Unsplash Image Selections

## [Section Name]
- Image URL: https://unsplash.com/photos/[id]
- Photographer: [name]
- Alt Text: [SEO-optimized description]
- Search Query: [keywords used]
- Component: src/components/[path]
```

---

## INTEGRATION GUIDELINES

**Image Attributes:**
```tsx
<img
  src="https://images.unsplash.com/photo-[id]?w=1200&q=80"
  alt="[SEO-optimized alt text]"
  loading="lazy"
/>
```

**Responsive Images:**
```tsx
<img
  srcSet="
    https://images.unsplash.com/photo-[id]?w=400 400w,
    https://images.unsplash.com/photo-[id]?w=800 800w,
    https://images.unsplash.com/photo-[id]?w=1200 1200w
  "
  sizes="(max-width: 768px) 100vw, 50vw"
  alt="[alt text]"
/>
```

---

## SUCCESS CRITERIA

✓ Images match brand aesthetic
✓ Colors harmonize with global.css
✓ All images have SEO-optimized alt text
✓ Photographer attribution included
✓ Components updated with `src` attributes
✓ unsplash-selections.md created

---

## NEXT STEP

**After this step:**
Proceed to:
- `03-animation.md` - Add mikroanimations
- `04-seo.md` - SEO optimization
- `05-midjourney.md` - Generate custom image prompts
