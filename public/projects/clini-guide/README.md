# 📷 CLINI-GUIDE — add your photos here

**Put your `.jpg` / `.png` files in THIS folder:**
`portfolio/public/projects/clini-guide/`

Example:
```
portfolio/public/projects/clini-guide/
  ├── results.jpg
  ├── clinics.png
  └── appointments.jpg
```

**Then list them in `portfolio/components/sections/projects.tsx`** —
find the CLINI-GUIDE entry and update its `images` array:

```ts
images: [
  "/projects/clini-guide/results.jpg",
  "/projects/clini-guide/clinics.png",
  "/projects/clini-guide/appointments.jpg",
],
```

Rules:
- 1 photo listed = static cover. 2+ photos = auto carousel (3s crossfade).
- Landscape ~800×450 fills best. Lowercase names with dashes.
- Paths ALWAYS start with `/projects/...` (no `public` in the path).
