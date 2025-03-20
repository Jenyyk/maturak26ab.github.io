const checkbox = document.getElementById("acceptCheckbox");
document.documentElement.style.setProperty("--blur-amount", (checkbox.checked) ? "0px" : "25px");
checkbox.addEventListener("input", () => {
  document.documentElement.style.setProperty("--blur-amount", (checkbox.checked) ? "0px" : "25px");
});
document.getElementById("checkboxText").addEventListener("click", () => {
  checkbox.checked = !checkbox.checked;
  document.documentElement.style.setProperty("--blur-amount", (checkbox.checked) ? "0px" : "25px");
})

import init, { get_qr } from "/js/qrpkg/wasm_qr.js";
updateValues(1);
runWasm();


async function runWasm() {
  await init();
  // create QR on page load
  updateQr(document.getElementById("inputRange"));

  // update QR on input change
  document.querySelectorAll("#inputRange, #inputNumber").forEach((el) => { el.addEventListener("input", () => {
    updateValues(el.value);
    updateQr(el);
  })})

  // function that updates QR code with wasm
  function updateQr(el) {
    const bank_qr =
    "SPD*1.0*" +
    "ACC:" + "CZ63" + "6210" + "670100" + "2222086531" +
    `*AM:${el.value * 400}` +
    "*CC:CZK" +
    "*MSG:prosím zadejte svůj e-mail" +
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
