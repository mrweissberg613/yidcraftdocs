const launchDate = 1781553600 * 1000;

function updateCountdown() {
    const countdown = document.getElementById("countdown");
    if (!countdown) return;

    const distance = launchDate - Date.now();

    if (distance <= 0) {
        countdown.textContent = "NOW LIVE!";
        return;
    }

    const totalSeconds = Math.floor(distance / 1000);

    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    let parts = [];

    if (days > 0) parts.push(`${days}d`);
    if (days > 0 || hours > 0) parts.push(`${hours}h`);
    if (days > 0 || hours > 0 || minutes > 0) parts.push(`${minutes}m`);

    parts.push(`${seconds}s`);

    countdown.textContent = parts.join(" ");
}

updateCountdown();
setInterval(updateCountdown, 1000);