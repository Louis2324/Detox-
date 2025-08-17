(function () {
  const DEFAULT_DELAY_SECONDS = 15;

  const params = new URLSearchParams(location.search);
  const originalUrl = decodeURIComponent(params.get("target") || "");

  const originEl = document.getElementById("origin");
  const countEl = document.getElementById("count");
  const btn = document.getElementById("go");
  const openAny = document.getElementById("openAnyway");

  originEl.textContent = originalUrl || "(unknown)";

  function enableGo() {
    btn.classList.add("ready");
    btn.disabled = false;
    openAny.style.pointerEvents = "auto";
    openAny.style.opacity = "1";
  }

  function navigate() {
    if (originalUrl) {
      location.replace(originalUrl);
    } else {
      location.replace("https://www.youtube.com/");
    }
  }

  btn.disabled = true;
  openAny.style.pointerEvents = "none";
  openAny.style.opacity = ".5";

  btn.addEventListener("click", (e) => {
    if (!btn.disabled) navigate();
    e.preventDefault();
  });

  openAny.addEventListener("click", (e) => {
    if (!btn.disabled) navigate();
    e.preventDefault();
  });

  chrome.storage.sync.get({ delaySeconds: DEFAULT_DELAY_SECONDS }, ({ delaySeconds }) => {
    let remaining = Math.max(0, Number(delaySeconds) || DEFAULT_DELAY_SECONDS);
    countEl.textContent = `${remaining}s`;
    const timer = setInterval(() => {
      remaining -= 1;
      countEl.textContent = `${remaining}s`;
      if (remaining <= 0) {
        clearInterval(timer);
        enableGo();
      }
    }, 1000);
  });
})();
