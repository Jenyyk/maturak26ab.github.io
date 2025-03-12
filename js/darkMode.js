import keyTrap from "./keytrap.js";

const mainLight = "#fffcf1";
const secondLight = "#e9f5fe";
const accentLight = "#f3b700";
const contrastLight = "#0f1e3d";

const mainDark = "#242424";
const secondDark = "#505050";
const accentDark = "#308280";
const contrastDark = "#ffffff";

// Initialize localStorage
if (localStorage.getItem("darkMode") === null) {
  localStorage.setItem("darkMode", false);
}
updateColorScheme();

// Bind darkmode to a shortcut
keyTrap.bind("nm", () => changeModes());

// Update CSS root values to let CSS handle our hard work
function updateColorScheme() {
  const useDarkMode = localStorage.getItem("darkMode") == "true";
  const root = document.querySelector(":root");
  root.style.setProperty("--main-color", (useDarkMode) ? mainDark : mainLight);
  root.style.setProperty("--secondary-color", (useDarkMode) ? secondDark : secondLight);
  root.style.setProperty("--accent-color", (useDarkMode) ? accentDark : accentLight);
  root.style.setProperty("--contrast-color", (useDarkMode) ? contrastDark : contrastLight);
}

// Switch between true and false
function changeModes() {
  let useDarkMode = localStorage.getItem("darkMode") == "true";
  useDarkMode = !useDarkMode;
  localStorage.setItem("darkMode", useDarkMode);
  updateColorScheme();
}

// Debug
// setInterval(() => console.log(localStorage.getItem("darkMode")), 500);
