// SCRIPT TO MAGNIFY IMAGE ON-CLICK

// Apply to all images with the .preview class
document.querySelectorAll("img.preview").forEach((imageElement) => {
  // add a click listener to each of them
  imageElement.addEventListener("click", () => {
    // Create an Image pop-up holder
    const popupImage = document.createElement("div");
    popupImage.setAttribute("class", "popupImage");
    // Removes it on second click
    popupImage.addEventListener("click", () => { popupImage.remove(); })

    // Create the pop-up image
    const popupRender = document.createElement("img");
    // Gets source of original image
    popupRender.setAttribute("src", imageElement.getAttribute("src"));
    popupImage.appendChild(popupRender);

    document.body.appendChild(popupImage);
  })
})
