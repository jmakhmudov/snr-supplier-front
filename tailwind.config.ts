import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: '#4718CD',
        'purple-hover': '#350CA9',
        blue: {
          DEFAULT: '#3A76FF',
          light: '#E2EAF8',
          hover: '#2f65e0',
        },
        gray: {
          'light-0': '#F8F8F8',
          light: '#EBEBEB',
          normal: '#767676'
        },
        accent: {
          lime: '#EBFF00'
        }
      }
    },
  },
  plugins: [],
};
export default config;
