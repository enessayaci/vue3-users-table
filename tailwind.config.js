const { log } = require("console");
const colors = require("tailwindcss/colors");

function generateSafelist() {
  const colors = [
    "primary",
    "neutral",
    "red",
    "secondary",
    "yellow",
    "orange",
    "blue",
    "green",
  ];
  const shades = [100, 200, 300, 400, 500, 600, 700, 800, 900];

  const safelist = [];

  colors.forEach((color) => {
    safelist.push(`bg-${color}`);
    safelist.push(`ring-${color}`);
    safelist.push(`hover:bg-${color}`);
    safelist.push(`hover:ring-${color}`);
    shades.forEach((shade) => {
      safelist.push(`bg-${color}-${shade}`);
      safelist.push(`ring-${color}-${shade}`);
      safelist.push(`hover:bg-${color}-${shade}`); // Hover sınıflarını ekle
      safelist.push(`hover:ring-${color}-${shade}`); // Hover sınıflarını ekle
    });
  });
  
  return safelist;
}

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  safelist: generateSafelist(), // Dinamik olarak oluşturulan safelist
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1E293B", // 500
          100: "#F0F4F8", // Çok açık ton
          200: "#D1D9E0", // Açık ton
          300: "#A0B2C0", // Orta açık ton
          400: "#5C738D", // Orta ton
          500: "#1E293B", // Varsayılan ton
          600: "#0F172A", // Koyu ton
          700: "#0A1017", // Daha koyu ton
          800: "#050B0C", // Çok koyu ton
          900: "#020617", // En koyu ton
        },
        neutral: {
          DEFAULT: "#6B7280", // 500
          100: "#F1F5F9", // Çok açık gri
          200: "#E5E7EB", // Açık ton
          300: "#CBD5E1", // Orta açık ton (varsa)
          400: "#9CA3AF", // Orta ton
          500: "#6B7280", // Varsayılan ton
          600: "#4B5563", // Koyu ton
          700: "#374151", // Daha koyu ton
          800: "#1F2937", // Çok koyu ton
          900: "#111827", // En koyu ton
        },
        red: colors.red, // Tailwind'in varsayılan kırmızı tonları
        green: colors.green, // Tailwind'in varsayılan yeşil tonları
        blue: colors.blue, // Tailwind'in varsayılan mavi tonları
        yellow: colors.yellow, // Tailwind'in varsayılan sarı tonları
      },
      boxShadow: {
        outline: "0px 0px 0px 1px",
      },
    },
  },
  plugins: [],
};
