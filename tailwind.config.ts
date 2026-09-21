import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/stories/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Design tokens (from design.md)
        "title-lm": "#3a3a3a",
        "gris-fonce-lm": "#5b5b5b",
        "gris-clair-lm": "#717171",
        "separateurs-lm": "#e8e8e8",
        "blanc-lm": "#ffffff",
        orange: "#ea8c3c",
        "noir-1": "#212121",
        "noir-2": "#303030",
        "stroke-dm": "#e8e8e8",
        // shadcn/ui CSS variable mappings
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        inter: ["var(--font-inter)", "sans-serif"],
        onest: ["var(--font-onest)", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        // Design tokens
        "r-sm": "8px",
        "r-md": "12px",
        "r-lg": "16px",
        "r-xl": "20px",
      },
      fontSize: {
        "display-desktop": ["52px", { lineHeight: "1.1" }],
        "display-mobile": ["28px", { lineHeight: "1.2" }],
        "page-title": ["40px", { lineHeight: "1.15" }],
        h4: ["24px", { lineHeight: "1.3" }],
        body: ["16px", { lineHeight: "1.5" }],
        "caption-desktop": ["14px", { lineHeight: "1.4" }],
        "caption-mobile": ["12px", { lineHeight: "1.4" }],
      },
      boxShadow: {
        card: "0px 5px 25px 0px rgba(0,0,0,0.05)",
      },
      backdropBlur: {
        card: "8px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [animate],
};

export default config;
