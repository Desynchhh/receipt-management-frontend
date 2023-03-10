/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // Allows for breakpoints
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px'
    },
    extend: {
      // Custom colors (as css)
      colors: {
        lightGray: '#313641',
        lightBlack: '#1C1E23',
        gray: '#CCCDCF'
      },
      maxWidth : {
        "1/2": "50%",
        "1/3": "33%",
        "2/3": "66%",
        "1/10": "10%",
        "2/10": "20%",
        "3/10": "30%",
        "4/10": "40%",
        "5/10": "50%",
        "6/10": "60%",
        "7/10": "70%",
        "8/10": "80%",
        "9/10": "90%",
        "10/10": "100%",
      }
    },
  },
  plugins: [],
}
