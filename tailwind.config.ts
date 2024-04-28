import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        'appear': 'appear 0.5s ease-in-out'
      },
      keyframes: {
        appear: {
          '0%': {
            transform: 'scale(0)',
            opacity: '0'
          },
          '100%': {
            transform: 'scale(1)',
            opacity: '1'
          }
        }
      },
      height: {
        'headerless': 'calc(100vh - 80px)',
        'header': '80px'
      },
      minHeight: {
        'headerless': 'calc(100vh - 80px)',
      },
      translate: {
        'center': '-50%'
      },
      inset: {
        'center': '50vw'
      },
      transitionDuration: {
        'md': '.3s'
      },
      gridTemplateColumns: {
        'chat': '4fr 1fr'
      }
      
    },
  }
};
export default config;
