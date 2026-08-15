/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Ocean Breathe Color System from User Palette
        brand: {
          50: '#F7F8F9',   // Soft Clean Canvas (#F7F8F9)
          100: '#DDEAF0',  // Pale Ice Breeze (#DDEAF0)
          200: '#A8CFC6',  // Soft Aqua Mint (#A8CFC6)
          300: '#8CBEC0',  // Smooth Aqua Bridge
          400: '#6FA8B3',  // Medium Ocean Mist (#6FA8B3)
          500: '#4B8196',  // Balanced Ocean Blue
          600: '#2D5D7A',  // Deep Ocean Teal (#2D5D7A - Primary brand tone)
          700: '#22485F',  // Deeper Ocean Slate
          800: '#193647',  // Deep Navy Slate
          900: '#102430',  // Midnight Ocean
          950: '#0A161E',  // Deepest Navy
        },
        ocean: {
          deep: '#2D5D7A',
          mist: '#6FA8B3',
          aqua: '#A8CFC6',
          breeze: '#DDEAF0',
          sand: '#E8DCC6',
          canvas: '#F7F8F9',
        },
        sand: {
          50: '#FAF7F2',
          100: '#F5EFE5',
          200: '#EEE4D4',
          300: '#E8DCC6',  // Exact Warm Sand Swatch (#E8DCC6)
          400: '#D2C0A4',
          500: '#B59E7E',
          600: '#8F7B5F',
          700: '#6B5B44',
        },
        emergency: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          500: '#EF4444',
          600: '#DC2626',
          700: '#B91C1C',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
