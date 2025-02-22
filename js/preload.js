// THIS SCRIPT PRELOADS LINKS WHEN THEY ARE HOVERED
// THIS WILL SPEED UP PAGE LOADING

// Only to be called once the navbar is initialized and inserted into the DOM
export function initPreload() {
  // Gets all <a> tags
  document.querySelectorAll("a").forEach((link) => {
    // Add a listener for hovering
    link.addEventListener("mouseover", () => {
      // Cancel creating link element if one already exists
      if (link.dataset.fetched === "true") { return; }
      // Prefetch its target on hover
      const preloadLink = document.createElement("link");

      preloadLink.setAttribute("rel", "prefetch");
      preloadLink.setAttribute("href", link.getAttribute("href"));

      document.head.appendChild(preloadLink);

      link.dataset.fetched = "true";
    })
  })
}
