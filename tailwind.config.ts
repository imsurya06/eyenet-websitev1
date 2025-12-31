import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
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
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground)",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground)",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        heading: ['Cormorant Garamond', 'serif'],
        body: ['Source Sans 3', 'sans-serif'],
      },
      fontSize: {
        // Desktop Headings (Adjusted)
        'h1-desktop': ['4rem', { lineHeight: '120%' }], // Reduced from 5.5rem
        'h2-desktop': ['2.5rem', { lineHeight: '120%' }], // Reduced from 3.25rem
        'h3-desktop': ['2.25rem', { lineHeight: '120%' }], // Reduced from 2.75rem
        'h4-desktop': ['1.875rem', { lineHeight: '140%' }], // Reduced from 2.25rem
        'h5-desktop': ['1.75rem', { lineHeight: '140%' }], // Kept same
        'h6-desktop': ['1.375rem', { lineHeight: '140%' }], // Kept same

        // Mobile Headings (Kept same)
        'h1-mobile': ['3.25rem', { lineHeight: '120%' }],
        'h2-mobile': ['2.5rem', { lineHeight: '120%' }],
        'h3-mobile': ['2rem', { lineHeight: '120%' }],
        'h4-mobile': ['1.5rem', { lineHeight: '140%' }],
        'h5-mobile': ['1.25rem', { lineHeight: '140%' }],
        'h6-mobile': ['1.125rem', { lineHeight: '140%' }],

        // Body Text Sizes (Kept same)
        'text-large': ['1.5rem', { lineHeight: '160%' }],
        'text-medium': ['1.25rem', { lineHeight: '160%' }],
        'text-regular': ['1.125rem', { lineHeight: '160%' }],
        'text-small': ['1rem', { lineHeight: '160%' }],
        'text-tiny': ['0.875rem', { lineHeight: '160%' }],
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        shake: { // Defined the shake keyframes here
          "0%, 100%": { transform: "translateX(0) rotate(0deg)" },
          "10%": { transform: "translateX(-5px) rotate(-4deg)" },
          "20%": { transform: "translateX(5px) rotate(4deg)" },
          "30%": { transform: "translateX(-5px) rotate(-4deg)" },
          "40%": { transform: "translateX(5px) rotate(4deg)" },
          "50%": { transform: "translateX(-5px) rotate(-4deg)" },
          "60%": { transform: "translateX(5px) rotate(4deg)" },
          "70%": { transform: "translateX(-5px) rotate(-4deg)" },
          "80%": { transform: "translateX(5px) rotate(4deg)" },
          "90%": { transform: "translateX(-5px) rotate(-4deg)" },
        },
        float: { // New float keyframes
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
          '100%': { transform: 'translateY(0px)' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shake: "shake 0.8s infinite", // Registered the shake animation with a duration and infinite loop
        float: 'float 3s ease-in-out infinite', // Registered the float animation
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;