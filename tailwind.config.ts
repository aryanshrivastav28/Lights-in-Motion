import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#F4F1EA',
          secondary: '#ECE9E1',
          subtle: '#ECE9E1',
          elevated: '#FAF9F6',
        },
        surface: {
          DEFAULT: '#FAF9F6',
          solid: '#FAF9F6',
          subtle: 'rgba(17, 18, 20, 0.03)',
          hover: 'rgba(17, 18, 20, 0.05)',
          active: 'rgba(17, 18, 20, 0.08)',
          border: 'rgba(17, 18, 20, 0.10)',
          'border-strong': 'rgba(17, 18, 20, 0.16)',
          'border-highlight': 'rgba(22, 135, 255, 0.40)',
          inverted: '#111214',
        },
        accent: {
          DEFAULT: '#1687FF',
          hover: '#0757B8',
          subtle: 'rgba(22, 135, 255, 0.10)',
          glow: 'rgba(22, 135, 255, 0.20)',
          electric: '#1687FF',
          deep: '#0757B8',
        },
        foreground: {
          DEFAULT: '#111214',
          secondary: '#55575A',
          muted: '#6B6D70',
          dim: '#6B6D70',
          inverted: '#F4F1EA',
        },
        border: {
          DEFAULT: 'rgba(17, 18, 20, 0.10)',
          strong: 'rgba(17, 18, 20, 0.16)',
          subtle: 'rgba(17, 18, 20, 0.06)',
        },
        status: {
          success: '#10B981',
          warning: '#F59E0B',
          error: '#EF4444',
          info: '#1687FF',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
        mono: [
          '"SFMono-Regular"',
          'Consolas',
          '"Liberation Mono"',
          'Menlo',
          'monospace',
        ],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
        normal: '0em',
        wide: '0.04em',
        wider: '0.08em',
        widest: '0.15em',
        technical: '0.2em',
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '16px',
        xl: '24px',
      },
      boxShadow: {
        'panel-subtle': '0 4px 20px -2px rgba(17, 18, 20, 0.06)',
        'accent-subtle': '0 0 20px -5px rgba(22, 135, 255, 0.25)',
        'border-glow': '0 0 0 1px rgba(22, 135, 255, 0.35)',
      },
      transitionTimingFunction: {
        cinematic: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      transitionDuration: {
        cinematic: '400ms',
      },
      keyframes: {
        'marquee-left': {
          '0%': { transform: 'translate3d(0, 0, 0)' },
          '100%': { transform: 'translate3d(-50%, 0, 0)' },
        },
        'marquee-right': {
          '0%': { transform: 'translate3d(-50%, 0, 0)' },
          '100%': { transform: 'translate3d(0, 0, 0)' },
        },
      },
      animation: {
        'marquee-left': 'marquee-left 44s linear infinite',
        'marquee-right': 'marquee-right 38s linear infinite',
      },
    },
  },
  plugins: [],
};
export default config;
