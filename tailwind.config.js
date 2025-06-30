module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dream-green': '#10b981',
        'dream-green-dark': '#0d9e6e',
        'dream-blue': '#1e40af',
        'dream-yellow': '#f59e0b',
        'dream-gray': '#1f2937',
      },
      borderRadius: {
        'card': '1.25rem',
      },
      boxShadow: {
        'card': '0 10px 25px -5px rgba(0, 0, 0, 0.15)',
        'auth': '0 20px 25px -5px rgba(16, 185, 129, 0.1)'
      },
      fontFamily: {
        'teko': ['Teko', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}