const checkbox = document.getElementById("acceptCheckbox");
const checkbox2 = document.getElementById("acceptCheckbox2");
const amountSpan = document.getElementById("amountSpan");
const emailInput = document.getElementById("emailInput");
let ticketsLeft = 200;

// Fetch the ticket count asynchronously and update the DOM when ready
(async () => {
  try {
    const response = await fetch("https://jenyyk.duckdns.org/ticketcount");
    ticketsLeft = +(await response.text());
    document.getElementById("ticketsLeft").innerHTML = ticketsLeft;
    if (ticketsLeft <= 0) {
      document.getElementById("ticketsLeftParent").innerHTML = "Lístky jsou vyprodány!";
    }
  } catch (error) {
    console.error("Failed to fetch ticket count:", error);
  }
})();


document.documentElement.style.setProperty("--blur-amount", (shouldUnblur()) ? "0px" : "25px");
emailInput.addEventListener("input", () => {
  document.documentElement.style.setProperty("--blur-amount", (shouldUnblur()) ? "0px" : "25px");
})
checkbox.addEventListener("input", () => {
  document.documentElement.style.setProperty("--blur-amount", (shouldUnblur()) ? "0px" : "25px");
});
checkbox2.addEventListener("input", () => {
  document.documentElement.style.setProperty("--blur-amount", (shouldUnblur()) ? "0px" : "25px");
});

function shouldUnblur() {
  return checkbox.checked && checkbox2.checked && isEmailValid(emailInput.value) && ticketsLeft > 0;
}

import init, { get_qr } from "/js/qrpkg/wasm_qr.js";
updateValues(1);
runWasm();

async function runWasm() {
  await init();
  // create QR on page load
  const numInput = document.getElementById("inputNumber");
  const rangeInput = document.getElementById("inputRange");

  // cheeky
  setQr("QR kód z mnoha možných důvodů nemůžeme odhalit");

  // update QR on input change
  document.querySelectorAll("#inputRange, #inputNumber").forEach((el) => {
    el.addEventListener("input", () => {
      updateValues(el.value);
      amountSpan.innerHTML = `${el.value * 400},- Kč`;

      if (shouldUnblur()) {
        updateQr(el.value * 400, emailInput.value.replace(/a/g, "aa").replace("@", "at"))
      }
    })
  });

  emailInput.addEventListener("input", () => {
    if (!isEmailValid(emailInput.value)) {
      emailInput.setCustomValidity("Invalid field.");
      return;
    }
    emailInput.setCustomValidity("");
    document.getElementById("emailSpan").innerHTML = emailInput.value.replace(/a/g, "aa").replace("@", "at");
    updateQr(numInput.value * 400, emailInput.value.replace(/a/g, "aa").replace("@", "at"));
  })


  // function that updates QR code with wasm
  function updateQr(amount, email) {
    const bank_qr =
    "SPD*1.0*" +
    "ACC:CZ2520100000002903183740" +
    `*AM:${amount}` +
    "*CC:CZK" +
    "*PT:IP" +
    "*RN:Maturitní ples Gypce 2026" +
    `*MSG:${email}` +
    `*X-VS:${Math.floor(Math.random() * 50000)}` +
    "*";

    const placeholder = "online lístky zatim neprodáváme :)";

    setQr(bank_qr);
  }

  function setQr(qr) {
    const qrDataUrl = get_qr(qr);
    document.getElementById("qrImage").src = qrDataUrl;
  }
}

function updateValues(input) {
  document.getElementById("inputRange").value = input;
  document.getElementById("inputNumber").value = input;
}

function isEmailValid(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// tohle je nějaká forma accesibility
// jsem si jistej
// -Jeník
document.querySelectorAll(".checkboxWrapper").forEach((wrapper) => {
  let checkbox = wrapper.querySelector("input");
  let text = wrapper.querySelector("p");

  text.addEventListener("click", () => {
    checkbox.checked = !checkbox.checked;
    document.documentElement.style.setProperty("--blur-amount", (shouldUnblur()) ? "0px" : "25px");
  });
})

if (ticketsLeft <= 0) {
  document.getElementById("ticketsLeftParent").innerHTML = "Lístky jsou vyprodány!";
}
