import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts.jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#070709',
          subtle: '#0b0c10',
          elevated: '#10121a',
        },
        surface: {
          DEFAULT: 'rgba(16, 18, 25, 0.72)',
          solid: '#11131b',
          subtle: 'rgba(255, 255, 255, 0.03)',
          hover: 'rgba(255, 255, 255, 0.06)',
          active: 'rgba(255, 255, 255, 0.09)',
          border: 'rgba(255, 255, 255, 0.08)',
          'border-highlight': 'rgba(0, 229, 255, 0.35)',
        },
        accent: {
          DEFAULT: '#00E5FF',
          hover: '#33EBFF',
          subtle: 'rgba(0, 229, 255, 0.12)',
          glow: 'rgba(0, 229, 255, 0.25)',
          electric: '#0070F3',
        },
        foreground: {
          DEFAULT: '#F3F4F6',
          muted: '#9CA3AF',
          dim: '#6B7280',
          inverted: '#070709',
        },
        status: {
          success: '#10B981',
          warning: '#F59E0B',
          error: '#EF4444',
          info: '#00E5FF',
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
        'panel-subtle': '0 4px 20px -2px rgba(0, 0, 0, 0.7)',
        'accent-subtle': '0 0 20px -5px rgba(0, 229, 255, 0.25)',
        'border-glow': '0 0 0 1px rgba(0, 229, 255, 0.4)',
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
