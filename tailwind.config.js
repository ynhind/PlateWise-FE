/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "#e5e7eb",
        background: "#ffffff",
        foreground: "#111827",
        primary: {
          DEFAULT: "#22c55e",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#f0fdf4",
          foreground: "#166534",
        },
        accent: {
          DEFAULT: "#10b981",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#f9fafb",
          foreground: "#6b7280",
        },
        card: {
          DEFAULT: "#ffffff",
          foreground: "#111827",
        },
      },
      boxShadow: {
        card: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        glow: "0 0 20px 0 rgb(34 197 94 / 0.3)",
        soft: "0 2px 8px 0 rgb(0 0 0 / 0.08)",
      },
      backgroundImage: {
        "gradient-hero": "linear-gradient(135deg, #22c55e 0%, #10b981 100%)",
        "gradient-accent": "linear-gradient(135deg, #10b981 0%, #14b8a6 100%)",
        "gradient-subtle":
          "linear-gradient(to bottom right, #f0fdf4 0%, #ffffff 50%, #f0fdf4 100%)",
      },
      keyframes: {
        slideUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        slideUp: "slideUp 0.3s ease-out",
      },
    },
  },
  plugins: [],
};
