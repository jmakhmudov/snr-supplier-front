import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		animation: {
  			'pulse-slow': 'pulse 3s infinite',
  			'pulse-fast': 'pulse 0.75s infinite'
  		},
  		colors: {
  			purple: '#4718CD',
  			'purple-hover': '#350CA9',
  			blue: {
  				DEFAULT: '#3A76FF',
  				light: '#E2EAF8',
  				hover: '#2f65e0'
  			},
  			gray: {
  				'light-0': '#F8F8F8',
  				light: '#EBEBEB',
  				normal: '#D5D5D5'
  			},
  			accent: {
  				lime: '#EBFF00'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
