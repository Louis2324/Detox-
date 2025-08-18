// youtube.js
let lastVideoSrc = null;
const DELAY_MS = 10000;

function handleVideo(video) {
    const currentSrc = video.currentSrc;
    if (currentSrc && currentSrc !== lastVideoSrc) {
        lastVideoSrc = currentSrc;

        // Pause video first
        video.pause();
        console.log(`Paused new YouTube Shorts video`);

        // Resume after DELAY_MS
        setTimeout(() => {
            video.play();
            console.log("Resumed video");
        }, DELAY_MS);

        // Increment persistent counter
        chrome.storage.local.get({ videoCount: 0 }, ({ videoCount }) => {
            videoCount++;
            if (videoCount >= 15) {
                videoCount = 0; // reset counter
                const target = encodeURIComponent(location.href);
                chrome.storage.local.set({ shortsAllowedOnce: true }, () => {
                    window.location.href = chrome.runtime.getURL(`delay.html?target=${target}`);
                });
            }
            chrome.storage.local.set({ videoCount });
        });
    }
}

function setupObserver() {
    const video = document.querySelector("video");
    if (video && !video.dataset.observed) {
        video.dataset.observed = true;

        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    handleVideo(video);
                }
            });
        }, { threshold: 0.75 });

        io.observe(video);
        console.log("IntersectionObserver set on video");
    }
}

const domObserver = new MutationObserver(() => {
    setupObserver();
});
domObserver.observe(document.body, { childList: true, subtree: true });
setupObserver();
