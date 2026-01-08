/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                muted: {
                    DEFAULT: "var(--muted)",
                    foreground: "var(--muted-foreground)",
                },
                card: {
                    DEFAULT: "var(--card)",
                    foreground: "var(--card-foreground)",
                },
                accent: {
                    DEFAULT: "var(--accent)",
                    foreground: "var(--accent-foreground)",
                },
                border: "var(--border)",
                input: "var(--input)",
                ring: "var(--ring)",
                primary: {
                    DEFAULT: "#06b6d4",
                    dark: "#0891b2",
                    neon: "#00f0ff", // Cyberpunk Cyan
                },
                secondary: {
                    DEFAULT: "#8b5cf6",
                    dark: "#7c3aed",
                    neon: "#7000ff", // Deep Neon Violet
                },
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'sans-serif'],
                display: ['var(--font-oswald)', 'sans-serif'],
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                'grid-pattern': "linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)",
            },
            boxShadow: {
                'neon-cyan': '0 0 15px rgba(6, 182, 212, 0.5), 0 0 30px rgba(6, 182, 212, 0.3)',
                'neon-violet': '0 0 15px rgba(139, 92, 246, 0.5), 0 0 30px rgba(139, 92, 246, 0.3)',
            },
            animation: {
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'glitch': 'glitch 1s linear infinite',
                'aurora': 'aurora 10s ease infinite',
                'gradient-x': 'gradient-x 3s ease infinite',
            },
            keyframes: {
                glitch: {
                    '2%, 64%': { transform: 'translate(2px,0) skew(0deg)' },
                    '4%, 60%': { transform: 'translate(-2px,0) skew(0deg)' },
                    '62%': { transform: 'translate(0,0) skew(5deg)' },
                },
                aurora: {
                    '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
                    '50%': { transform: 'translate(20px, -20px) scale(1.1)' },
                },
                'gradient-x': {
                    '0%, 100%': {
                        'background-size': '200% 200%',
                        'background-position': 'left center'
                    },
                    '50%': {
                        'background-size': '200% 200%',
                        'background-position': 'right center'
                    },
                }
            }
        },
    },
    plugins: [],
};
