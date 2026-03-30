export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['Plus Jakarta Sans', 'sans-serif'],
      },
      colors: {
        brand: {
          orange: '#FF5C00',
          yellow: '#FFD600',
          green: '#00C896',
          purple: '#7B2FFF',
          dark: '#0F0F0F',
        },
      },
    },
  },
  plugins: [],
}
