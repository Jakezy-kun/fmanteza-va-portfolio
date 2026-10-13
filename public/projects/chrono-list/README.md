# 📷 Chrono-List — add your photos here

**Put your `.jpg` / `.png` files in THIS folder:**
`portfolio/public/projects/chrono-list/`

Example:
```
portfolio/public/projects/chrono-list/
  ├── tasks.jpg
  └── progress.png
```

**Then list them in `portfolio/components/sections/projects.tsx`** —
find the Chrono-List entry and update its `images` array:

```ts
images: [
  "/projects/chrono-list/tasks.jpg",
  "/projects/chrono-list/progress.png",
],
```

Rules:
- 1 photo listed = static cover. 2+ photos = auto carousel (3s crossfade).
- Landscape ~800×450 fills best. Lowercase names with dashes.
- Paths ALWAYS start with `/projects/...` (no `public` in the path).
