/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      before: ["hover"],
      height: {
        "chat-list-item-scroll": "32rem",
        "messages-area-scroll": "30rem",
      },
    },
  },
  plugins: [],
};

