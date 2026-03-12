import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#102A43",
        emerald: "#118C6A",
        slatebg: "#F5F7FA"
      }
    }
  },
  plugins: []
} satisfies Config;
