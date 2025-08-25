
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(240 80% 50%)',
        accent: 'hsl(40 90% 55%)',
        bg: 'hsl(230 15% 95%)',
        surface: 'hsl(0 0% 100%)',
        text: 'hsl(220 13% 18%)',
        muted: 'hsl(220 13% 60%)',
        border: 'hsl(220 13% 91%)',
        success: 'hsl(142 71% 45%)',
        warning: 'hsl(38 92% 50%)',
        error: 'hsl(0 84% 60%)',
      },
      spacing: {
        xs: '4px',
        sm: '8px', 
        md: '16px',
        lg: '24px',
        xl: '32px',
      },
      borderRadius: {
        sm: '4px',
        md: '8px', 
        lg: '12px',
        xl: '16px',
      },
      boxShadow: {
        card: '0 2px 4px hsla(0,0%,0%,0.05)',
        modal: '0 10px 30px hsla(0,0%,0%,0.1)',
        glow: '0 0 20px hsla(240, 80%, 50%, 0.3)',
      },
      fontSize: {
        'display': ['3rem', { lineHeight: '1.1', fontWeight: '700' }],
        'heading': ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }],
        'body': ['1rem', { lineHeight: '1.75' }],
      },
      animation: {
        'fade-in': 'fadeIn 200ms ease-in-out',
        'slide-up': 'slideUp 200ms ease-in-out',
        'scale-in': 'scaleIn 100ms ease-in-out',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { transform: 'translateY(10px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          from: { transform: 'scale(0.95)', opacity: '0' },
          to: { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
