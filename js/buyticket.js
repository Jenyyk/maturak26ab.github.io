const checkbox = document.getElementById("acceptCheckbox");
const checkbox2 = document.getElementById("acceptCheckbox2");
const amountSpan = document.getElementById("amountSpan");
const emailInput = document.getElementById("emailInput");

document.documentElement.style.setProperty("--blur-amount", (checkbox.checked) ? "0px" : "25px");
checkbox.addEventListener("input", () => {
  document.documentElement.style.setProperty("--blur-amount", (checkbox.checked && checkbox2.checked && isEmailValid(emailInput.value)) ? "0px" : "25px");
});
emailInput.addEventListener("input", () => {
  document.documentElement.style.setProperty("--blur-amount", (checkbox.checked && checkbox2.checked && isEmailValid(emailInput.value)) ? "0px" : "25px");
})
checkbox2.addEventListener("input", () => {
  document.documentElement.style.setProperty("--blur-amount", (checkbox.checked && checkbox2.checked && isEmailValid(emailInput.value)) ? "0px" : "25px");
});

import init, { get_qr } from "/js/qrpkg/wasm_qr.js";
updateValues(1);
runWasm();

async function runWasm() {
  await init();
  // create QR on page load
  const numInput = document.getElementById("inputNumber");
  const rangeInput = document.getElementById("inputRange");

  updateQr(1, "");

  // update QR on input change
  document.querySelectorAll("#inputRange, #inputNumber").forEach((el) => {
    el.addEventListener("input", () => {
      updateValues(el.value);
      amountSpan.innerHTML = `${el.value * 400},- Kč`;

      if (isEmailValid(emailInput.value)) {
        updateQr(el.value, emailInput.value.replace("@", ":"))
      }
    })
  });

  emailInput.addEventListener("input", () => {
    if (isEmailValid(emailInput.value)) {
      emailInput.setCustomValidity("");
      updateQr(numInput.value, emailInput.value.replace("@", ":"));
      document.getElementById("emailSpan").innerHTML = emailInput.value.replace("@", ":");
    } else {
      emailInput.setCustomValidity("Invalid field.");
    }
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

    const qrDataUrl = get_qr(bank_qr);
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
  });
})
