# 📷 Effici-admin / OSAD Hub — add your photos here

**Put your `.jpg` / `.png` files in THIS folder:**
`portfolio/public/projects/effici-admin/`

Example:
```
portfolio/public/projects/effici-admin/
  ├── dashboard.jpg
  └── equipment-logistics.png
```

**Then list them in `portfolio/components/sections/projects.tsx`** —
find the Effici-admin entry and update its `images` array:

```ts
images: [
  "/projects/effici-admin/dashboard.jpg",
  "/projects/effici-admin/equipment-logistics.png",
],
```

Rules:
- 1 photo listed = static cover. 2+ photos = auto carousel (3s crossfade).
- Landscape ~800×450 fills best. Lowercase names with dashes.
- Paths ALWAYS start with `/projects/...` (no `public` in the path).
