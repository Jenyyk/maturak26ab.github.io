// Countdown part
const timer = document.getElementById("countdownTimer");

const midnight = new Date(2026, 0, 25, 0, 0, 0);

updateCountdown();
setInterval(updateCountdown, 100);

function updateCountdown() {
  let remainingTime = +midnight - +Date.now();
  remainingTime = Math.floor(remainingTime / 1000);

  let seconds = remainingTime % 60;
  seconds = (seconds < 10) ? "0" + seconds : seconds;
  remainingTime = Math.floor(remainingTime / 60);

  let minutes = remainingTime % 60;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  remainingTime = Math.floor(remainingTime / 60)

  let formatted_time = `${remainingTime}h ${minutes}m ${seconds}s`;
  timer.innerHTML = formatted_time + "<br>";
}

// Add button part
const input = document.getElementById("songInput");
const songAddButton = document.getElementById("songAddButton");
const spotifyUrlPattern = /^(https?:\/\/)?(open\.)?spotify\.com\/(track)\/[a-zA-Z0-9]+/;
const isValidUrl = url => spotifyUrlPattern.test(url);
songAddButton.addEventListener("click", async () => {
  if (!isValidUrl(input.value)) {
    input.value = "invalidní url";
    return;
  }
  const res = await addSong(input.value);
  if (res === 409) {
    input.value = "písnička už existuje";
    return;
  }
  input.value = "písnička přidána";
  updateList();
})
const passInput = document.getElementById("adminPasswordInput");
passInput.addEventListener("change", () => {
  savedPassword = passInput.value;
  updateList();
})

// API part
const url = "https://maturak-music-api-production.up.railway.app/music";
// const url = "http://jenyyk.duckdns.org:3030/music";
// const url = "http://192.168.0.186:3030/music";
// const url = "http://localhost:3030/music";
const queue = document.getElementById("queueParent");
let savedPassword = "";

updateList();

async function updateList() {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch songs");
  json = await res.json()
  // clear out current DOM
  queue.innerHTML = null;
  // append an element for each song in queue
  json.forEach((song) => {
    let songElement = document.createElement("div");
    let songLeft = document.createElement("div");
    let songImage = document.createElement("img");
    let songTitle = document.createElement("a");
    let songDelete = document.createElement("button");

    songElement.setAttribute("class", "song");
    songImage.setAttribute("src", song.image_link);
    songTitle.innerHTML = song.name;
    songTitle.setAttribute("href", song.song_link);
    songTitle.setAttribute("target", "_blank");
    songDelete.innerHTML = "X";
    songDelete.addEventListener("click", () => {
      deleteSong(song.uuid);
    })

    songLeft.appendChild(songImage);
    songLeft.appendChild(songTitle);
    songElement.appendChild(songLeft);
    if (savedPassword !== "") {
      songElement.appendChild(songDelete);
    }

    queue.appendChild(songElement);
  })
}

async function addSong(songLink) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(songLink)
  });
  updateList();
  return await res.status;
}

async function deleteSong(songId) {
  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id: songId,
      password: savedPassword,
    })
  });
  updateList();
  return await res.status
}
