import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  safelist: [
    'max-sm:-left-full', 'max-sm:left-0', 'max-sm:transparent', 'max-sm:bg-black', '-mr-96', 'hidden',
    'w-0', '-ml-0', '-z-50', 'z-20', 'mr-0', 'cursor-not-allowed', 'bg-gray-400', 'cursor-pointer',
    'hover:bg-blue-500', 'w-16', '-ml-16', 'opacity-0',
  ],
  plugins: [],
};
export default config;
