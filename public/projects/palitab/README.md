# 📷 Palitab — add your photos here

**Put your `.jpg` / `.png` files in THIS folder:**
`portfolio/public/projects/palitab/`

Example:
```
portfolio/public/projects/palitab/
  ├── login-screen.jpg
  ├── story-mode.png
  └── xp-rewards.jpg
```

**Then list them in `portfolio/components/sections/projects.tsx`** —
find the Palitab entry and update its `images` array:

```ts
images: [
  "/projects/palitab/login-screen.jpg",
  "/projects/palitab/story-mode.png",
  "/projects/palitab/xp-rewards.jpg",
],
```

Rules:
- 1 photo listed = static cover. 2+ photos = auto carousel (3s crossfade).
- Landscape ~800×450 fills best. Lowercase names with dashes.
- Paths ALWAYS start with `/projects/...` (no `public` in the path).
