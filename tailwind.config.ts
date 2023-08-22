import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      dropShadow: {
        card: [
          "0 0 4px rgba(150 ,150, 150, 0.08)",
          "0 8px 16px rgba(141 ,141, 141, 0.12)",
        ],
      },
    },
  },
  plugins: [],
} satisfies Config;
