// Discord Webhook URL encoded in base64, because otherwise it would be scraped by bots and spammed
const base64url = "aHR0cHM6Ly9kaXNjb3JkLmNvbS9hcGkvd2ViaG9va3MvMTM0MzkwNDk5MDkwMDY1MDA0NC9EZjZhcTVvY2twZVFwVXVSdk1SZmxqZ3dVbmQyWHhhVl8tVDFQM3FvS0pvbml2aTNObFY3UGlrWTRvUHZhS3k4eWY0SQ==";

sendMessage("koule");

function sendMessage(message) {
  let url = atob(base64url);
  const body = { content: message };

  fetch(url, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  })
    .then(response => console.log("sent: ", response.status))
    .catch(error => console.error("not sent: ", error));
}
