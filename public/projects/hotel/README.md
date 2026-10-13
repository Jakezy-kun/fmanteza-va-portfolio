# 📷 Hotel Management — add your photos here

**Put your `.jpg` / `.png` files in THIS folder:**
`portfolio/public/projects/hotel/`

Example:
```
portfolio/public/projects/hotel/
  ├── reservations.jpg
  └── billing.png
```

**Then list them in `portfolio/components/sections/projects.tsx`** —
find the Hotel Management entry and update its `images` array:

```ts
images: [
  "/projects/hotel/reservations.jpg",
  "/projects/hotel/billing.png",
],
```

Rules:
- 1 photo listed = static cover. 2+ photos = auto carousel (3s crossfade).
- Landscape ~800×450 fills best. Lowercase names with dashes.
- Paths ALWAYS start with `/projects/...` (no `public` in the path).
