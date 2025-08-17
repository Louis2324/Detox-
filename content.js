function redirectIfShorts(url) {
  if (/^https?:\/\/(www\.)?youtube\.com\/shorts\/.+/i.test(url)) {
    if (sessionStorage.getItem("shortsAllowedOnce") === "true") {
      sessionStorage.removeItem("shortsAllowedOnce"); // clear so it's only once
      return;
    }
    const target = encodeURIComponent(url);
    window.location.href = chrome.runtime.getURL(`delay.html?target=${target}`);
  }
}
