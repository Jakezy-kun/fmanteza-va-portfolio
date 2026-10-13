import type { Config } from 'tailwindcss'

// Tailwind v4: dark strategy + theme tokens live in app/globals.css
// (@custom-variant dark + @theme). This file is kept for tooling only.
const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
}

export default config
