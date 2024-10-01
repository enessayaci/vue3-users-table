function generateSafelist() {
  const colors = [
    "slate",
    "gray",
    "rose",
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
      safelist.push(`hover:bg-${color}-${shade}`);
      safelist.push(`hover:ring-${color}-${shade}`);
    });
  });
  
  return safelist;
}

module.exports = {
  darkMode: "selector",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  safelist: generateSafelist(),
  theme: {
    extend: {},
  },
  plugins: [],
};
