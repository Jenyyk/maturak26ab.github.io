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
// Initialize dark mode
updateColorScheme();

// Body will transition between colors
// Must be put here to prevent random transitions on startup
setTimeout(() => document.body.style.transition = "background-color 800ms ease-in-out", 200);

// Bind darkmode to a shortcut
keyTrap.bind("nm", () => {
  changeModes();
  switchButton();
});

// Add darkmode button
const buttonDiv = document.createElement("div");
const buttonImage = document.createElement("img");
buttonImage.setAttribute("id", "darkModeImage");
// Assigns src based on dark-light mode
buttonImage.setAttribute("src", `/assets/darkMode${localStorage.getItem("darkMode") == "true"}.svg`);
// Styles the image container
Object.assign(buttonDiv.style, {
  position: "fixed",
  bottom: "8px",
  left: "8px",
  borderRadius: "50%",
  height: "clamp(0px, 10vw, 80px)",
  width: "clamp(0px, 10vw, 80px)",
  backgroundColor: "var(--secondary-color)",
  overflow: "hidden",
  border: "2px solid var(--accent-color)",
  transition: "all 800ms ease-in-out",
  zIndex: "1",
  cursor: "pointer"
});
// Styles the image
Object.assign(buttonImage.style, {
  width: "80%",
  height: "80%",
  position: "absolute",
  left: "10%",
  top: "10%"
});
buttonDiv.appendChild(buttonImage);
document.body.appendChild(buttonDiv);
buttonDiv.addEventListener("click", () => {
  changeModes();
  switchButton();
})
// Extra function needed to animate the switching of the button
function switchButton() {
  let buttonImage = document.getElementById("darkModeImage");
  buttonImage.animate([
    { transform: "rotate(0deg)" },
    { filter: "blur(8px)"},
    { transform: "rotate(360deg)" }
  ], {
    duration: 800,
    iteration: 1,
    easing: "ease-in-out"
  });
  // Change the image in the middle of the animation
  setTimeout(() => {
    buttonImage.setAttribute("src", `/assets/darkMode${localStorage.getItem("darkMode") == "true"}.svg`);
  }, 400);
}

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
