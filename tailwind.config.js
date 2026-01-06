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
                background: "#020617", // Deep Space Blue
                foreground: "#f8fafc",
                primary: {
                    DEFAULT: "#06b6d4", // Cyan
                    dark: "#0891b2",
                },
                secondary: {
                    DEFAULT: "#8b5cf6", // Violet
                    dark: "#7c3aed",
                },
                accent: "#22d3ee",
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
            },
            boxShadow: {
                'neon-cyan': '0 0 15px rgba(6, 182, 212, 0.5)',
                'neon-violet': '0 0 15px rgba(139, 92, 246, 0.5)',
            }
        },
    },
    plugins: [],
};
