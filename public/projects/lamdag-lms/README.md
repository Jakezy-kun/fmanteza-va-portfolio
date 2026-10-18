# 📷 Lamdag LMS — add your photos here

**Put your `.jpg` / `.png` files in THIS folder:**
`portfolio/public/projects/lamdag-lms/`

Example:
```
portfolio/public/projects/lamdag-lms/
  ├── courses.jpg
  ├── quiz-review.png
  └── analytics.jpg
```

**Then list them in `portfolio/components/sections/projects.tsx`** —
find the Lamdag LMS entry and update its `images` array:

```ts
images: [
  "/projects/lamdag-lms/courses.jpg",
  "/projects/lamdag-lms/quiz-review.png",
  "/projects/lamdag-lms/analytics.jpg",
],
```

Rules:
- 1 photo listed = static cover. 2+ photos = auto carousel (3s crossfade).
- Landscape ~800×450 fills best. Lowercase names with dashes.
- Paths ALWAYS start with `/projects/...` (no `public` in the path).
