import keyTrap from "./mousetrap.js";

// Scroll button
// Generic design, can change later @Dopple24
const scrollArrow = document.createElement("a");
Object.assign(scrollArrow.style, {
  position: "fixed",
  display: "none",
  right: "20px",
  bottom: "20px",
  borderBottom: "34px solid var(--accent-color-light)",
  borderRight: "18px solid transparent",
  borderLeft: "18px solid transparent",
  borderRadius: "12px",
  zIndex: "3"
});
scrollArrow.href = "#topAnchor";

// topAnchor element positioned at the top of each site
const topAnchor = document.createElement("div");
topAnchor.style.position = "absolute";
topAnchor.style.top = "0";
topAnchor.id = "topAnchor";

document.body.prepend(topAnchor);
document.body.appendChild(scrollArrow);

window.onscroll = () => {
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    scrollArrow.style.display = "block";
  } else {
    scrollArrow.style.display = "none";
  }
}

keyTrap.bind("ww", () => location.href = "./#topAnchor");
