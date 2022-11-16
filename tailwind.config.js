/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'body': '#EEE',
        'primary':'#FFFF00',
        'text': 'black',
        'category-personal':'#3A82EE',
        'category-business':'#EA40A4',
        'item-primary': '#FFFFFF',
        'item-secondary': '#9C528B'
      },
      fontFamily:{
        'sans': ['monserrat', 'sans-serif'],
        'serif': ['ui-serif', 'Georgia'],
        'mono': ['ui-monospace', 'SFMono-Regular'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
