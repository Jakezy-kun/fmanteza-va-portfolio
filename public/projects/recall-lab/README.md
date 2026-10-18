# 📷 RecallLab — add your photos here

**Put your `.jpg` / `.png` files in THIS folder:**
`portfolio/public/projects/recall-lab/`

Example:
```
portfolio/public/projects/recall-lab/
  ├── dashboard.jpg
  ├── timer.png
  └── flashcards.jpg
```

**Then list them in `portfolio/components/sections/projects.tsx`** —
find the RecallLab entry and update its `images` array:

```ts
images: [
  "/projects/recall-lab/dashboard.jpg",
  "/projects/recall-lab/timer.png",
  "/projects/recall-lab/flashcards.jpg",
],
```

Rules:
- 1 photo listed = static cover. 2+ photos = auto carousel (3s crossfade).
- Landscape ~800×450 fills best. Lowercase names with dashes.
- Paths ALWAYS start with `/projects/...` (no `public` in the path).
