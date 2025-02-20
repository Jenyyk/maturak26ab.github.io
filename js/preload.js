// THIS SCRIPT PRELOADS LINKS WHEN THEY ARE HOVERED
// THIS WILL SPEED UP PAGE LOADING

// Only to be called once the navbar is initialized and inserted into the DOM
function initPreload() {
  // Gets all <a> tags
  document.querySelectorAll("a").forEach((link) => {
    // Add a listener for hovering
    link.addEventListener("mouseover", () => {
      // Search for present prefetch link in the head to avoid duplicates
      if (!document.head.querySelector(`link[href="${link.getAttribute("href")}"]`)) {
        // Prefetch its target on hover
        const preloadLink = document.createElement("link");

        preloadLink.setAttribute("rel", "prefetch");
        preloadLink.setAttribute("href", link.getAttribute("href"));

        document.head.appendChild(preloadLink);
      }
    })
  })
}

