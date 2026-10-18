# 📷 PawPedia — add your photos here

**Put your `.jpg` / `.png` files in THIS folder:**
`portfolio/public/projects/pawpedia/`

Example:
```
portfolio/public/projects/pawpedia/
  ├── home.jpg
  ├── breed-detail.png
  └── favourites.jpg
```

**Then list them in `portfolio/components/sections/projects.tsx`** —
find the PawPedia entry and update its `images` array:

```ts
images: [
  "/projects/pawpedia/home.jpg",
  "/projects/pawpedia/breed-detail.png",
  "/projects/pawpedia/favourites.jpg",
],
```

Rules:
- 1 photo listed = static cover. 2+ photos = auto carousel (3s crossfade).
- Landscape ~800×450 fills best. Lowercase names with dashes.
- Paths ALWAYS start with `/projects/...` (no `public` in the path).
