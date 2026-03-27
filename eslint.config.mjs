import coreWebVitals from "eslint-config-next/core-web-vitals"

// @next/next/no-page-custom-font targets Pages Router (_document.js).
// App Router loads fonts via <link> in root layout — disable the false positive.
const config = [
  ...coreWebVitals,
  {
    rules: {
      "@next/next/no-page-custom-font": "off",
    },
  },
]
export default config
