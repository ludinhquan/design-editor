/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'main': '0px 7px 14px rgba(0,0,0,.05),0px 0px 3.12708px rgba(0,0,0,.08),0px 0px 0.931014px rgba(0,0,0,.17);',
      }
    }
  }
}
