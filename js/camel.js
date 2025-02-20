// Constants
const camelSpeed = 100 / 1000;
const sizeModifier = 3;
// Sprite frame coordinates in sprite sheet
const spriteSets = {
  stand: [[0, 0]],
  walk: [
    [0, 1],
    [0, 0],
    [1, 1],
    [0, 0]
  ],
  sleep: [
    [0, 2],
    [0, 2],
    [0, 2],
    [1, 2],
    [1, 2],
    [1, 2]
  ]
}

// Variables
let camelPosX = 50,
  camelPosY = 50,
  mousePosX = 50,
  mousePosY = 50,
  lastFrameTime = +Date.now(),
  frame = 0,
  walking = false,
  sleep = false,
  camelExists = false;

// Camel is an easter egg, and only spawns when certain conditions are met
document.getElementById("navIconDiv").addEventListener("dblclick", (e) => {
  if (e.altKey && e.ctrlKey && !camelExists) { newCamel(); }
})

// debugging purposes
// newCamel()

// creates a new Camel
function newCamel() {
  camelExists = true;
  const camelElement = document.createElement("div");
  // Set all attributes of the camel element
  camelElement.id = "camel";
  camelElement.style.width = `${32 * sizeModifier}px`;
  camelElement.style.height = `${32 * sizeModifier}px`;
  camelElement.style.backgroundSize = "200%";
  camelElement.style.position = "fixed";
  camelElement.style.backgroundImage = "url('/assets/camelSpriteSheet.png')";
  camelElement.style.imageRendering = "pixelated";
  camelElement.style.left = `${camelPosX - 16}px`;
  camelElement.style.top = `${camelPosY - 16}px`;
  camelElement.style.zIndex = 99;

  document.body.appendChild(camelElement)

  // Capture mouse position whenever possible
  window.addEventListener("mousemove", (e) => {
    // Dont capture if sleeping
    if (sleep) { return; }

    mousePosX = e.clientX;
    mousePosY = e.clientY;
  });

  // Sleep on double click
  camelElement.addEventListener("dblclick", () => {
    camelElement.style.transform = "scaleX(1)";
    sleep = !sleep;
  });

  // Frame advancing loop
  // For animations
  setInterval(() => { frame++; }, 320);


  // Walking loop
  lastFrameTime = +Date.now();
  setInterval(() => {
    // Dont walk if sleeping
    if (sleep) { return; }
    // Face towards mouse when walking
    if (camelPosX < mousePosX) { camelElement.style.transform = "scaleX(1)";  }
                          else { camelElement.style.transform = "scaleX(-1)"; }
    // Gets delta time
    let deltaMillis = +Date.now() - lastFrameTime;
    let moveDistance = deltaMillis * camelSpeed;

    // Calculate how much to move
    let totalDistance = Math.sqrt((camelPosX - mousePosX)**2 + (camelPosY - mousePosY)**2);
    // Stop moving if close enough
    if (totalDistance < 100) {
      lastFrameTime = +Date.now();
      walking = false;
      return;
    }
    walking = true;
    let percentage = moveDistance / totalDistance;
    camelPosX -= (camelPosX - mousePosX) * percentage;
    camelPosY -= (camelPosY - mousePosY) * percentage;

    // Move
    camelElement.style.left = `${camelPosX - (16 * sizeModifier)}px`;
    camelElement.style.top = `${camelPosY - (16 * sizeModifier)}px`;

    lastFrameTime = +Date.now();
  }, 50);
  //AnimationLoop
  setInterval(() => {
    if (sleep)     { setSprite("sleep"); }
    else if (walking) { setSprite("walk");  }
    else              { setSprite("stand"); }
  }, 50);

  function setSprite(name) {
    let spriteLen = spriteSets[name].length;
    let sprite = spriteSets[name][frame % spriteLen];

    camelElement.style.backgroundPosition = `${-32 * sizeModifier * sprite[0]}px ${-32 * sizeModifier * sprite[1]}px`;
  }
}
