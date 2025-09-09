/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: ['./index.html', './src/**/*.{ts,tsx}'],
    theme: {
        extend: {
            container: { center: true, padding: '1rem' },
            boxShadow: { soft: '0 10px 30px rgba(0,0,0,0.06)' },
            borderRadius: { '2xl': '1rem' },
        },
    },
    plugins: [],
};