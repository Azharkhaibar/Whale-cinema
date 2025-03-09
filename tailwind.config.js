/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./resources/**/*.vue",
        "./src/**/*.{js,jsx,ts,tsx}", // Tambahkan jika di React
    ],
    theme: {
        extend: {
            fontFamily: {
                geologica: ["Geologica", "sans-serif"],
                inter: ["Inter", "sans-serif"],
                poppins: ["Poppins", "sans-serif"],
            },
        },
    },
    plugins: [],
};
