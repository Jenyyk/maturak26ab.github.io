// THIS SCRIPT PRELOADS LINKS WHEN THEY ARE HOVERED
// THIS WILL SPEED UP PAGE LOADING

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
