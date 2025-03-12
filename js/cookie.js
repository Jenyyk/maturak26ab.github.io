import keyTrap from "./keytrap.js";

keyTrap.bind("cookies", () => {
  const popup = document.createElement("div");
  popup.innerHTML = "Tento web nepoužívá cookies (sušenky) jelikož jsme je všechny snědli (eated)";
  Object.assign(popup.style, {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: "99",

    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    fontSize: "3em",
    textAlign: "center",

    color: "var(--constrast-color)",
    backgroundColor: "var(--main-color)",
    padding: "40px",
    border: "2px solid var(--accent-color)",
    borderRadius: "12px",
  })

  const button = document.createElement("button");
  Object.assign(button.style, {
    fontSize: "3em",
    color: "var(--contrast-color-firm)",
    border: "2px solid var(--accent-color)",
    borderRadius: "12px",
    margin: "20px",
  })
  button.innerHTML = "Budiž";

  button.addEventListener("click", () => {
    // Exit animation
    popup.animate([
      { transform: "rotate(0deg) scale(1) translate(-50%, -50%)", opacity: 1 },
      { transform: "rotate(720deg) scale(0) translate(-50%, -50%)", opacity: 0 },
    ], {
      duration: 3000,
      iteration: 1,
      easing: "ease-in"
    })
    setInterval(() => popup.remove(), 2900);
  })
  popup.appendChild(document.createElement("br"));
  popup.appendChild(button);
  document.body.prepend(popup);

  // Entrance animation
  popup.animate([
    { transform: "rotate(720deg) scale(0) translate(-50%, -50%)", opacity: 0 },
    { transform: "rotate(0deg) scale(1) translate(-50%, -50%)", opacity: 1 },
  ], {
    duration: 3000,
    iteration: 1,
    easing: "ease-out"
  })
})
