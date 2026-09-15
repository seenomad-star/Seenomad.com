/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            animation: {
                'glow': 'glow 2s ease-in-out infinite',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                glow: {
                    '0%, 100%': { boxShadow: '0 0 5px rgba(59, 130, 246, 0.5)' },
                    '50%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.8)' },
                }
            }
        },
    },
    plugins: [],
}
