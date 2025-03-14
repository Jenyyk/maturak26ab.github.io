// SCRIPT TO MAGNIFY IMAGE ON-CLICK AND NAVIGATE WITH ARROW KEYS

document.querySelectorAll("img.preview").forEach((imageElement) => {
  imageElement.addEventListener("click", () => {
    // Create an Image pop-up holder
    const popupImage = document.createElement("div");
    popupImage.setAttribute("class", "popupImage");

    // Create the pop-up image
    const popupRender = document.createElement("img");
    popupRender.setAttribute("src", imageElement.getAttribute("src"));
    popupImage.appendChild(popupRender);

    document.body.appendChild(popupImage);

    let images = Array.from(document.querySelectorAll("img.preview")); // Get all images
    let currentIndex = images.indexOf(imageElement); // Track the current image index

    // Close on click
    popupImage.addEventListener("click", closePopup);
    // Listen for key events
    document.addEventListener("keydown", keyHandler);

    // Create arrow buttons
    const leftArrow = document.createElement("div");
    const rightArrow = document.createElement("div");

    Object.assign(leftArrow.style, {
      borderRight: "60px solid var(--accent-color)",
      borderTop: "40px solid transparent",
      borderBottom: "40px solid transparent",
      position: "fixed",
      bottom: "20px",
      left: "20px",
      zIndex: "6",
      cursor: "pointer",
      borderRadius: "12px"
    });
    Object.assign(rightArrow.style, {
      borderLeft: "60px solid var(--accent-color)",
      borderTop: "40px solid transparent",
      borderBottom: "40px solid transparent",
      position: "fixed",
      bottom: "20px",
      right: "20px",
      zIndex: "6",
      cursor: "pointer",
      borderRadius: "12px"
    });

    leftArrow.addEventListener("click", () => updateImage(currentIndex - 1));
    rightArrow.addEventListener("click", () => updateImage(currentIndex + 1));

    document.body.appendChild(leftArrow);
    document.body.appendChild(rightArrow);


    function keyHandler(event) {
      if (event.key === "ArrowRight") {
        updateImage(currentIndex + 1);
      } else if (event.key === "ArrowLeft") {
        updateImage(currentIndex - 1);
      } else if (event.key === "Escape") {
        closePopup();
      }
    }

    function updateImage(newIndex) {
      if (newIndex >= 0 && newIndex < images.length) {
        currentIndex = newIndex;
        popupRender.setAttribute("src", images[currentIndex].getAttribute("src"));
      }
    }

    function closePopup() {
      popupImage.remove();
      leftArrow.remove();
      rightArrow.remove();
      document.removeEventListener("keydown", keyHandler);
    }
  });
});
