/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['JetBrains Mono Variable', 'JetBrains Mono', 'ui-monospace', 'monospace'],
        display: ['Space Grotesk Variable', 'Space Grotesk', 'system-ui', 'sans-serif'],
      },
    },
  },
};
