import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class', '.light'],
  content: [
    './src/app/**/*.{ts,tsx,mdx}',
    './src/components/**/*.{ts,tsx,mdx}',
    './src/pages/**/*.{ts,tsx,mdx}',
  ],
  theme: { extend: {} },
  plugins: [],
};

export default config;
