// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  // 라이트/다크를 버튼으로 토글하려면 class 전략이 필수
  darkMode: 'class',
  content: [
    './src/app/**/*.{ts,tsx,mdx}',
    './src/components/**/*.{ts,tsx,mdx}',
    './src/pages/**/*.{ts,tsx,mdx}',
  ],
  theme: { extend: {} },
  plugins: [],
};

export default config;
