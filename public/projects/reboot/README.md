# 📷 Reboot — add your photos here

**Put your `.jpg` / `.png` files in THIS folder:**
`portfolio/public/projects/reboot/`

Example:
```
portfolio/public/projects/reboot/
  ├── home.jpg
  └── checkout.png
```

**Then list them in `portfolio/components/sections/projects.tsx`** —
find the Reboot entry and update its `images` array:

```ts
images: [
  "/projects/reboot/home.jpg",
  "/projects/reboot/checkout.png",
],
```

Rules:
- 1 photo listed = static cover. 2+ photos = auto carousel (3s crossfade).
- Landscape ~800×450 fills best. Lowercase names with dashes.
- Paths ALWAYS start with `/projects/...` (no `public` in the path).
