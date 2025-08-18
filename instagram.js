let lastVideoSrc = null;
const DELAY_MS = 10000;

function handleVideo(video) {
    const currentSrc = video.currentSrc;
    if(currentSrc && currentSrc !== lastVideoSrc) {
        lastVideoSrc = currentSrc;
        video.pause();
        console.log(`Paused new IG reel`);
        setTimeout(()=>{
            video.play();
            console.log(`Resumed`);
        },DELAY_MS);
    }
}

function setupObserver () {
    const video = document.querySelector("video");
    if(video) {
        if(!video.dataset.observed) {
            video.dataset.observed = true;
            const io = new IntersectionObserver((entries)=>{
                entries.forEach(entry => {
                    if(entry.isIntersecting) {
                        handleVideo(video);
                    }
                });
            }, {threshold: 0.75});

            io.observe(video);
            console.log("IntersectionObserver set on video");
        }
    }
}

const domObserver = new MutationObserver(()=>{
    setupObserver();
});
domObserver.observe(document.body, {childList:true,subtree:true});
setupObserver();