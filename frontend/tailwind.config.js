/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Mint & Sage Color System from User Palette
        brand: {
          50: '#FAFBFA',   // Pale Canvas
          100: '#E6F2EC',  // Soft Mint Tint
          200: '#CDE6D8',  // Light Sage / Mint
          300: '#B2D4C2',  // Smooth Bridge
          400: '#8FAE9D',  // Medium Sage
          500: '#678E7A',  // Balanced Sage
          600: '#4E6F5E',  // Deep Forest Sage (Primary brand tone)
          700: '#3E5A4C',  // Darker Sage
          800: '#2E4338',  // Deep Slate Sage
          900: '#1D2D25',  // Dark Forest
          950: '#101A15',
        },
        sage: {
          dark: '#4E6F5E',
          medium: '#8FAE9D',
          light: '#CDE6D8',
          pale: '#E6F2EC',
          sand: '#DCCFBE',
          canvas: '#FAFBFA',
        },
        sand: {
          50: '#FAF8F5',
          100: '#F4EFE8',
          200: '#EAE1D5',
          300: '#DCCFBE',  // Exact Warm Sand / Oat Swatch
          400: '#C4B4A0',
          500: '#A4927E',
          600: '#82715F',
          700: '#615344',
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
