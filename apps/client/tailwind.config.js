/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        DEFAULT: 'hsl(var(--kotakodelab-bg))',
        emphasis: 'hsl(var(--kotakodelab-bg-emphasis))',
        muted: 'hsl(var(--kotakodelab-bg-muted))',
        inverted: 'hsl(var(--kotakodelab-bg-inverted))',
        info: 'hsl(var(--kotakodelab-bg-info))',
        success: 'hsl(var(--kotakodelab-bg-success))',
        error: 'hsl(var(--kotakodelab-bg-error))',
        'dark-error': 'hsl(var(--kotakodelab-bg-dark-error))',
      },
      textColor: {
        DEFAULT: 'hsl(var(--kotakodelab-text))',
        emphasis: 'hsl(var(--kotakodelab-text-emphasis))',
        subtle: 'hsl(var(--kotakodelab-text-subtle))',
        muted: 'hsl(var(--kotakodelab-text-muted))',
        inverted: 'hsl(var(--kotakodelab-text-inverted))',
        info: 'hsl(var(--kotakodelab-text-info))',
        success: 'hsl(var(--kotakodelab-text-success))',
        error: 'hsl(var(--kotakodelab-text-error))',
      },
      borderColor: {
        DEFAULT: 'hsl(var(--kotakodelab-border))',
        emphasis: 'hsl(var(--kotakodelab-border-emphasis))',
        subtle: 'hsl(var(--kotakodelab-border-subtle))',
        muted: 'hsl(var(--kotakodelab-border-muted))',
        inverted: 'hsl(var(--kotakodelab-border-inverted))',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      keyframes: {
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
            opacity: 0.99,
            filter:
              'drop-shadow(0 0 1px rgba(252, 211, 77)) drop-shadow(0 0 15px rgba(245, 158, 11)) drop-shadow(0 0 1px rgba(252, 211, 77))',
          },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
            opacity: 0.4,
            filter: 'none',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-700px 0',
          },
          '100%': {
            backgroundPosition: '700px 0',
          },
        },
      },
      animation: {
        flicker: 'flicker 3s linear infinite',
        shimmer: 'shimmer 1.3s linear infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
