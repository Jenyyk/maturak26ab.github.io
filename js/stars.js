// NICE STAR EFFECT
// WELL I HOPE ITS NICE ATLEAST
setInterval(() => { newStar(); }, 200);
// Generate a star
function newStar() {
  let starElement = document.createElement("img");
  starElement.src = "/assets/star.svg";

  // styles for the star
  starElement.style.position = "absolute";
  const size = randRange(20, 60);
  starElement.style.aspectRatio = "1";
  starElement.style.width  = `${size}px`;
  starElement.style.height = `${size}px`;
  starElement.style.top    = `${randRange(100, document.body.scrollHeight - 160)}px`;
  starElement.style.left   = `${randRange(100, document.body.scrollWidth - 160)}px`;
  starElement.style.zIndex = -1;

  document.body.appendChild(starElement);

  // animate the star
  const duration = randRange(2500, 4000);
  const rotation = randRange(-80, 80);
  const xChange = randRange(-50, 50);
  const yChange = randRange(-50, 50);
  starElement.animate([
    { transform: "translate(0, 0) scale(0) rotate(0deg)"},
    { transform: `translate(${xChange}px, ${yChange}px) scale(1) rotate(${rotation}deg)`, opacity: 0.6 },
    { transform: `translate(${xChange * 2}px, ${yChange * 2}px) scale(0.4) rotate(${rotation * 2}deg)`, opacity: 0 }
  ], {
    duration: duration,
    fill: "forwards",
    easing: "ease-in"
  });
  // remove the element after the star fades away
  setTimeout(() => starElement.remove(), duration);
}

// Helper function to generate random numbers in a range
function randRange(min, max) {
  return min + (Math.floor(Math.random() * (max - min)));
}
