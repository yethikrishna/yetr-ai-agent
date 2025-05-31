/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // YETR Brand Colors
        brand: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        
        // Extended Gray Palette
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712',
        },
        
        // Status Colors
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        
        // Chat Interface Colors
        chat: {
          user: '#0ea5e9',
          assistant: '#6b7280',
          system: '#8b5cf6',
          background: '#f9fafb',
          bubble: {
            user: '#0ea5e9',
            assistant: '#ffffff',
            system: '#f3f4f6',
          },
        },
      },
      
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'Monaco', 'monospace'],
      },
      
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      
      borderRadius: {
        '4xl': '2rem',
      },
      
      boxShadow: {
        'inner-lg': 'inset 0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        'glow': '0 0 20px rgba(14, 165, 233, 0.5)',
        'chat': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      },
      
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 3s linear infinite',
        'bounce-gentle': 'bounceGentle 2s infinite',
        'typing': 'typing 1.5s steps(3, end) infinite',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(-5%)' },
          '50%': { transform: 'translateY(0)' },
        },
        typing: {
          '0%': { opacity: '0.2' },
          '20%': { opacity: '1' },
          '100%': { opacity: '0.2' },
        },
      },
      
      backdropBlur: {
        xs: '2px',
      },
      
      screens: {
        'xs': '475px',
        '3xl': '1680px',
      },
      
      // Custom utilities for chat interface
      chatBubble: {
        maxWidth: '75%',
        wordBreak: 'break-word',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    
    // Custom plugin for chat interface
    function({ addUtilities, theme }) {
      const newUtilities = {
        '.chat-bubble': {
          maxWidth: '75%',
          wordBreak: 'break-word',
          padding: theme('spacing.3'),
          borderRadius: theme('borderRadius.xl'),
          marginBottom: theme('spacing.2'),
        },
        '.chat-bubble-user': {
          backgroundColor: theme('colors.chat.bubble.user'),
          color: theme('colors.white'),
          marginLeft: 'auto',
          borderBottomRightRadius: theme('borderRadius.md'),
        },
        '.chat-bubble-assistant': {
          backgroundColor: theme('colors.chat.bubble.assistant'),
          color: theme('colors.gray.900'),
          marginRight: 'auto',
          borderBottomLeftRadius: theme('borderRadius.md'),
          boxShadow: theme('boxShadow.chat'),
        },
        '.chat-bubble-system': {
          backgroundColor: theme('colors.chat.bubble.system'),
          color: theme('colors.gray.700'),
          margin: '0 auto',
          textAlign: 'center',
          fontSize: theme('fontSize.sm[0]'),
          fontStyle: 'italic',
        },
        '.scrollbar-thin': {
          scrollbarWidth: 'thin',
          scrollbarColor: `${theme('colors.gray.400')} ${theme('colors.gray.100')}`,
        },
        '.scrollbar-thin::-webkit-scrollbar': {
          width: '6px',
        },
        '.scrollbar-thin::-webkit-scrollbar-track': {
          backgroundColor: theme('colors.gray.100'),
        },
        '.scrollbar-thin::-webkit-scrollbar-thumb': {
          backgroundColor: theme('colors.gray.400'),
          borderRadius: theme('borderRadius.full'),
        },
        '.scrollbar-thin::-webkit-scrollbar-thumb:hover': {
          backgroundColor: theme('colors.gray.500'),
        },
      };
      
      addUtilities(newUtilities);
    },
  ],
  
  // Dark mode configuration
  darkMode: 'class',
};
