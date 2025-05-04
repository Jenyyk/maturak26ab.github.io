let imageElement = document.getElementById("presentationImage");
const imageParent = document.getElementById("presentation");
const slideAmount = 5;
let imageIndex = 0

const left = document.querySelector(".left");
left.addEventListener("click", handlePrev);
const right = document.querySelector(".right");
right.addEventListener("click", handleNext);

function handleNext() {
  if (imageIndex === slideAmount - 2) { right.style.opacity = "0.4"; }
  left.style.opacity = "1";
  if (imageIndex === slideAmount - 1) { return; }
  ++imageIndex;
  imageElement.remove();
  imageElement = document.createElement("img");
  presentationDiv.prepend(imageElement);
  imageElement.setAttribute("src", `/assets/presentation/${imageIndex}.webp`);
}

function handlePrev() {
  if (imageIndex === 1) { left.style.opacity = "0.4"; }
  right.style.opacity = "1";
  if (imageIndex === 0) { return; }
  --imageIndex;
  imageElement.remove();
  imageElement = document.createElement("img");
  presentationDiv.prepend(imageElement);
  imageElement.setAttribute("src", `/assets/presentation/${imageIndex}.webp`);
}
