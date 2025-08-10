
import type { Config } from 'tailwindcss'

export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      borderRadius: {
        '2xl': '1rem'
      },
      colors: {
        brand: {
          DEFAULT: '#5B8DEF',
          50: '#eef3ff',
          100: '#dbe6ff',
          200: '#b7cdff',
          300: '#93b3ff',
          400: '#6f9aff',
          500: '#5B8DEF',
          600: '#3d73e6',
          700: '#305cb8',
          800: '#24448a',
          900: '#182c5c'
        }
      }
    }
  },
  plugins: []
} satisfies Config
