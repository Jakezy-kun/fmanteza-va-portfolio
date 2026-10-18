# 📷 PrimeraAI — add your photos here

**Put your `.jpg` / `.png` files in THIS folder:**
`portfolio/public/projects/primera-ai/`

Example:
```
portfolio/public/projects/primera-ai/
  ├── dashboard.jpg
  ├── lessons.png
  └── quiz-builder.jpg
```

**Then list them in `portfolio/components/sections/projects.tsx`** —
find the PrimeraAI entry and update its `images` array:

```ts
images: [
  "/projects/primera-ai/dashboard.jpg",
  "/projects/primera-ai/lessons.png",
  "/projects/primera-ai/quiz-builder.jpg",
],
```

Rules:
- 1 photo listed = static cover. 2+ photos = auto carousel (3s crossfade).
- Landscape ~800×450 fills best. Lowercase names with dashes.
- Paths ALWAYS start with `/projects/...` (no `public` in the path).
