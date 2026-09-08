// ======================================================================== Build

// dom objects
var o = {};
// img buffers
var b = {};

var ismain = false;
var isseen = false;

const settings = {

    w: 0, // replaced from meta
    h: 0, // replaced from meta

    assets: [{
            format: 'png',
            type: 'class',
            src: '.bg, .f1, .f2, .f3, .t1, .t2'
        },

    ],

    cors: false,
    responsive: false
};

// ------------------------------------------------------------------ config
const VIDEO_START = 2;     // seek point, in seconds
const VIDEO_SPEED = 1.25;  // 1 = normal, >1 faster, <1 slower
const BLEND_LEAD  = 1;     // start the blend this early (0 = wait for 'ended')
const HOLD        = 1.4;   // how long each frame sits on screen

const FRAMES = ['.f1', '.f2', '.f3'];
const TEXTS  = ['.t1', '.t2'];

let video;
let frameTL;
let blending = false;

function init(event) {

    video = document.querySelector('.video');

    gsap.set('.video', { scale: 1.1 });
    gsap.set([...FRAMES, ...TEXTS], { opacity: 0 });

    gsap.to('.wrapper', {
        opacity: 1
    });

    wrapper.addEventListener('click', clickThrough);

    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('ended', onEnded);

    playVideo(true);
}

// ------------------------------------------------------------------ video
function restartVideo() {
    const seek = () => {
        try { video.currentTime = VIDEO_START; } catch (e) {}
        video.playbackRate = VIDEO_SPEED;
        video.play();
    };
    // currentTime only sticks once metadata is there
    if (video.readyState >= 1) seek();
    else video.addEventListener('loadedmetadata', seek, { once: true });
}

function playVideo(showNow) {
    blending = false;
    if (showNow) gsap.set(video, { opacity: 1 });
    restartVideo();
}

function onTimeUpdate() {
    if (blending || !video.duration) return;
    if (BLEND_LEAD > 0 && video.duration - video.currentTime <= BLEND_LEAD * VIDEO_SPEED) runFrames();
}

function onEnded() {
    if (!blending) runFrames();
}

// ------------------------------------------------------------------ frames
function runFrames() {
    blending = true;
    if (frameTL) frameTL.kill();

    gsap.set([...FRAMES, ...TEXTS], { opacity: 0 });

    frameTL = gsap.timeline();

    frameTL
        // video out, f1 + t1 in
        .fromTo(video, { opacity: 1 }, { opacity: 0, duration: 0.4, ease: 'power2.inOut' }, 0)
        .fromTo('.f1', { opacity: 0, scale: 0, x: 0 }, { opacity: 1, scale: 1, x: 0, duration: 0.9, ease: 'elastic.out(1, 0.6)' }, 0.05)
        .fromTo('.t1', { opacity: 0, x: 100 }, { opacity: 1, x: 0, duration: 0.6, delay: 0.5, ease: 'power3.out' }, 0.15)

        // f1 + t1 out, f2 + t2 in
        .to(['.f1', '.t1'], { opacity: 0, duration: 0.5, ease: 'power2.in' }, `+=${HOLD}`)
        .fromTo('.f2', { opacity: 0, x: 0 }, { opacity: 1, x: 0, duration: 1, ease: 'power2.out', immediateRender: false }, '<0.1')
        .fromTo('.t2', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.5, ease: 'power3.out', immediateRender: false }, '<0.1')

        // f2 + t2 out, f3 in
        .to(['.f2', '.t2'], { opacity: 0, x: -300, duration: 0.4, ease: 'power2.in' }, `+=${HOLD}`)
        .fromTo('.f3', { opacity: 0, x: 300, scale: 1 }, { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out', immediateRender: false }, '<0.1')

        // start the video again behind f3, then cross-fade back
        .call(restartVideo, null, `+=${HOLD}`)
        .fromTo(video, { opacity: 0 }, { opacity: 1, duration: 0.45, ease: 'power2.inOut', immediateRender: false }, '+=0.01')
        .to('.f3', { scale: 3, opacity: 0, duration: 0.45, ease: 'power2.inOut' }, '<')
        .call(() => { blending = false; });
}

EskimiDef.load().then(() => {

    init();
});