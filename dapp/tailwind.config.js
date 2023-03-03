/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "crowdfunding": "url('https://www.pexels.com/photo/person-putting-coin-in-a-piggy-bank-3943716/')"
      }
    },
  },
  plugins: [],
}