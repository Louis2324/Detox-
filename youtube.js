let lastVideoSrc = null;
const DELAY_MS = 10000;

function slowDownIfNewVideo () {
    const video = document.querySelector("video");
    if(video) {
        const currentSrc = video.currentSrc;
        if(currentSrc && currentSrc != lastVideoSrc) {
            lastVideoSrc = currentSrc;
            video.pause();
            console.log(`Slow down and Paused New Video`);

            setTimeout(()=>{
                video.play();
                console.log("Resumed video.");
            },DELAY_MS);
        }
    }
}

const observer =  new MutationObserver(()=>{
    slowDownIfNewVideo();
});

observer.observe(document.body, {
    childList:true,
    subtree:true,
});

slowDownIfNewVideo()