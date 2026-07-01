/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: 'var(--accent)',
          soft: 'var(--accent-soft)',
        },
        ink: {
          950: '#05060a',
          900: '#0a0b10',
          800: '#101118',
          700: '#16171f',
          600: '#1f2029',
        },
      },
      fontFamily: {
        sans: ['"Inter var"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Clash Display"', '"Inter var"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      backgroundImage: {
        'aurora-1': 'radial-gradient(circle at 20% 20%, var(--accent-soft), transparent 50%)',
        'aurora-2': 'radial-gradient(circle at 80% 30%, rgba(99,102,241,0.25), transparent 50%)',
        'aurora-3': 'radial-gradient(circle at 50% 80%, rgba(56,189,248,0.2), transparent 50%)',
        'grid': 'linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '40px 40px',
      },
      animation: {
        'aurora': 'aurora 18s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'gradient-x': 'gradient-x 8s ease infinite',
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        aurora: {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(5%, -5%) scale(1.1)' },
          '66%': { transform: 'translate(-5%, 5%) scale(0.95)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: 0.6 },
          '50%': { opacity: 1 },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      boxShadow: {
        glow: '0 0 40px var(--accent-soft)',
        'glow-sm': '0 0 20px var(--accent-soft)',
      },
    },
  },
  plugins: [],
}
