// Tailwind CSS v4 requires @tailwindcss/postcss as PostCSS plugin.
// Without this config, `@import "tailwindcss"` in globals.css is not processed
// and the build fails with unknown at-rule errors.
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
}

export default config
