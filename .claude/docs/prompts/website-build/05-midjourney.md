# Midjourney Prompt Generation
Purpose: AI image prompts for custom brand photography

Token Budget: <500 tokens

---

## INPUTS [EDIT HERE]

**Brand Identity:**
- Name: [Brand name]
- Industry: [Industry/niche]
- Visual Style: [cinematic/editorial/minimal/bold/organic/futuristic/etc.]

**Design System:**
- Color Palette: [Hex values from global.css]
- Typography: [Font family from global.css]
- Overall Aesthetic: [modern/classic/playful/sophisticated]

**Image Requirements:**
- Sections Needing Images: [hero/features/team/testimonials/etc.]
- Aspect Ratios: [51:91 vertical, 16:9 hero, 1:1 square]
- Quantity per Section: [1-3 variants]

---

## AGENT WORKFLOW

**Execute with:**
- Agent: `midjourney-prompt-generator`
- Model: `haiku` (deterministic prompt generation)

**Process:**
1. Read `.claude/planning/[project]/seo-report.md` → Extract keywords, page themes, content context
2. Read `.claude/planning/[project]/sitemap.md` → Identify sections needing images
3. Read `global.css` → Extract colors, fonts, aesthetic
4. Analyze seo-report.md content themes for each page/section
5. Analyze brand visual style
6. Generate Midjourney v7 prompts with consistent art direction based on SEO themes

**Output Location:**
`.claude/planning/[project]/midjourney-prompts.md`

---

## MIDJOURNEY V7 PROMPT STRUCTURE

**Formula:**
```
[Ultra-detailed scene description] + [Cinematische Referenzen] + [Lighting specifics] + [Technical specs] + [Mood/Atmosphere] + [Flags]
```

**Example Breakdown:**

1. **Scene Description** (2-3 sentences)
   - What's happening, who's in frame, environment details
   - Specific wardrobe, props, gestures
   - Compositional elements

2. **Cinematische Referenzen**
   - Camera: Hasselblad H6D, ARRI Alexa, 35mm film
   - Lens: 100mm f/2.8, 150mm telephoto, macro lens
   - Focus: shallow depth of field, focus stacking

3. **Lighting**
   - golden hour, studio lighting, soft directional
   - god rays, high-key, low-key, backlit silhouette
   - bright and directional, warm afternoon

4. **Technical Specs**
   - ultra-photorealistic, ultra-realistic, 8K
   - high-resolution photography, HDR
   - shot on ARRI/Hasselblad/35mm

5. **Mood/Atmosphere**
   - serene, dramatic, minimalistic, powerful
   - cinematic composition, poetic atmosphere
   - luxury aesthetic, editorial photography

6. **Flags**
   - `--ar 51:91` (vertical), `--ar 16:9` (hero), `--ar 1:1` (square)
   - `--video 1` (enable video generation)
   - `--motion low/high` (motion intensity)
   - `--raw` (less processing)
   - `--bs 1/2` (stylization balance)

---

## OUTPUT FORMAT

```markdown
# Midjourney Prompts: [Project Name]

## Homepage

### Hero Section
**Variant 1:** [51:91 vertical]
[Complete prompt with all elements + flags]

**Variant 2:** [16:9 landscape]
[Complete prompt with all elements + flags]

### Features Section
**Variant 1:** [1:1 square]
[Complete prompt with all elements + flags]

## About Page

### Team Section
**Variant 1:** [51:91 vertical]
[Complete prompt with all elements + flags]
```

---

## CONSISTENCY GUIDELINES

**Art Direction:**
- Maintain consistent visual style across all prompts
- Use brand colors in lighting/wardrobe descriptions
- Reference same camera/lens family
- Keep mood/atmosphere aligned with brand

**Technical Consistency:**
- Same aspect ratio for similar sections
- Consistent motion flags (low/high)
- Same stylization level (--bs value)

---

## SUCCESS CRITERIA

✓ Prompts aligned with seo-report.md content themes and keywords
✓ 2-3 prompt variants per section
✓ Consistent art direction (colors, style, mood) + SEO context
✓ Proper Midjourney v7 syntax
✓ Multiple aspect ratios provided
✓ All flags included (--ar, --video, --motion, etc.)
✓ midjourney-prompts.md created

---

## IMAGE INTEGRATION (After Generation)

**Save downloaded images to:**
```
/public/images/[page-name]/[section-name].jpg
```

**Next.js Image Component (Local Images):**
```tsx
import Image from 'next/image'
import heroImage from '@/public/images/home/hero.jpg'

<Image
  src={heroImage}
  alt="[SEO-optimized alt text from seo-report.md]"
  quality={85}
  priority
  style={{ width: '100%', height: 'auto' }}
/>
```

**Fill Container (Hero Backgrounds):**
```tsx
import Image from 'next/image'
import heroImage from '@/public/images/home/hero.jpg'

<div style={{ position: 'relative', width: '100%', height: '600px' }}>
  <Image
    src={heroImage}
    alt="[SEO-optimized alt text]"
    fill
    sizes="100vw"
    quality={90}
    style={{ objectFit: 'cover' }}
    priority
  />
</div>
```

**Note:** Next.js automatically optimizes local images and determines dimensions.

---

## NEXT STEP

**After this step:**
1. Copy prompts to Midjourney
2. Generate images
3. Download high-res versions to `/public/images/`
4. Integrate into components using Next.js Image component (see examples above)
5. Run final build + Lighthouse audit
