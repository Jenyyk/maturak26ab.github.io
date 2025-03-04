import keyTrap from "./keytrap.js"

keyTrap.bind("amalka", camelWalk);

const camelEmoji = "🐪";
const pageTitle = document.querySelector("title").innerHTML;
let running = false;

async function camelWalk() {
  if (running) return;
  running = true;
  for (let i = pageTitle.length - 1; i >= 0; i--) {
    let newTitle = pageTitle.slice(0, i) + camelEmoji + pageTitle.slice(i + 1);
    document.querySelector("title").innerHTML = newTitle;
    await sleep(200);
  }
  document.querySelector("title").innerHTML = pageTitle;
  running = false;
}

const sleep = delay => new Promise((resolve) => setTimeout(resolve, delay))
