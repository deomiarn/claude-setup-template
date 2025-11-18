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
1. Read `.claude/planning/[project]/seo-report.md` → Extract keywords, page themes, target audience
2. Read `.claude/planning/[project]/sitemap.md` → Identify sections needing images
3. Read `global.css` → Extract colors/aesthetic
4. Analyze content context from seo-report.md for each page/section
5. Search Unsplash with keywords: `[SEO keywords] + [section context] + [aesthetic]`
6. Select images matching brand colors + aesthetic + content theme
7. Configure `next.config.js` with remotePatterns for images.unsplash.com
8. Integrate into components using Next.js `<Image>` component
9. Add SEO-optimized `alt` text based on seo-report.md keywords

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

**Next.js Image Component:**
```tsx
import Image from 'next/image'

<Image
  src="https://images.unsplash.com/photo-[id]"
  alt="[SEO-optimized alt text]"
  width={1200}
  height={800}
  quality={80}
  loading="lazy"
/>
```

**Responsive Images:**
```tsx
import Image from 'next/image'

<Image
  src="https://images.unsplash.com/photo-[id]"
  alt="[SEO-optimized alt text]"
  width={1200}
  height={800}
  sizes="(max-width: 768px) 100vw, 50vw"
  quality={80}
  style={{ width: '100%', height: 'auto' }}
/>
```

**Fill Container (Hero Backgrounds):**
```tsx
<div style={{ position: 'relative', width: '100%', height: '600px' }}>
  <Image
    src="https://images.unsplash.com/photo-[id]"
    alt="[SEO-optimized alt text]"
    fill
    sizes="100vw"
    quality={85}
    style={{ objectFit: 'cover' }}
    priority
  />
</div>
```

**Next.js Config (next.config.js):**
```js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
}
```

---

## SUCCESS CRITERIA

✓ Images aligned with seo-report.md themes and keywords
✓ Images match brand aesthetic + content context
✓ Colors harmonize with global.css
✓ All images have SEO-optimized alt text from seo-report.md
✓ Photographer attribution included
✓ Components updated with Next.js Image component
✓ next.config.js configured with remotePatterns
✓ Proper width/height dimensions specified
✓ unsplash-selections.md created

---

## NEXT STEP

**After this step:**
Proceed to:
- `03-animation.md` - Add mikroanimations
- `04-seo.md` - SEO optimization
- `05-midjourney.md` - Generate custom image prompts
