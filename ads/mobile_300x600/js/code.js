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
            src: '.bg, .bg2, .bg3, .bg4, .bg5'
        },

    ],

    cors: false,
    responsive: false
};

// ======================================================================== Timing
// Whole loop = ~12.7s. Nudge these four and everything re-tunes together.

const WIPE = 0.90; // panel reveal
const IN   = 0.85; // text entrance
const HOLD = 1.20; // dwell on a finished frame
const OUT  = 0.45; // text exit

// -1 = loop forever. Set to 2 if the network caps you at 3 plays.
const LOOPS = -1;

var master = null;

// ======================================================================== Text prep

// Wraps every word in an overflow:hidden mask so it can slide up from
// behind its own baseline. If a .t div is empty (still a PNG), we skip
// splitting and animate the div itself instead.
function buildText(root) {

    var lines = root.querySelectorAll('.eyebrow, .headline, .sub');

    if (!lines.length) {

        return { targets: [root], isImage: true };
    }

    lines.forEach((line) => {

        var words = line.textContent.trim().split(/\s+/);
        line.textContent = '';

        words.forEach((w, i) => {

            var mask = document.createElement('span');
            mask.className = 'word-mask';

            var inner = document.createElement('span');
            inner.className = 'word';
            inner.textContent = w;

            mask.appendChild(inner);
            line.appendChild(mask);

            if (i < words.length - 1) line.appendChild(document.createTextNode(' '));
        });
    });

    return { targets: root.querySelectorAll('.word'), isImage: false };
}

// ======================================================================== Sequence

function buildSequence() {

    o.panels = gsap.utils.toArray(['.bg', '.bg2', '.bg3', '.bg4', '.bg5']);
    o.texts  = gsap.utils.toArray(['.t1', '.t2', '.t3', '.t4', '.t5']);
    o.copy   = o.texts.map(buildText);

    // Reset state
    gsap.set(o.panels, { clipPath: 'inset(100% 0% 0% 0%)', autoAlpha: 0, zIndex: 1 });

    o.copy.forEach((c) => {

        gsap.set(c.targets, c.isImage ? { autoAlpha: 0, y: 18 } : { yPercent: 118 });
    });

    // Panels never exit. Each incoming one gets a higher z-index and wipes
    // over the last, so there is no flash of empty frame and the loop seam
    // is invisible. onRepeat renormalises so z never runs away.
    var z = 1;

    function frame(i) {

        var c  = o.copy[i];
        var tl = gsap.timeline();

        tl.set(o.panels[i], { zIndex: ++z, autoAlpha: 1 })

            .to(o.panels[i], {
                clipPath: 'inset(0% 0% 0% 0%)',
                duration: WIPE,
                ease: 'expo.inOut'
            })

            .to(c.targets, c.isImage ? {

                autoAlpha: 1,
                y: 0,
                duration: IN,
                ease: 'expo.out'

            } : {

                yPercent: 0,
                duration: IN,
                ease: 'expo.out',
                stagger: { each: 0.04, from: 'start' }

            }, '-=' + (WIPE * 0.55))

            .to({}, { duration: HOLD })

            .to(c.targets, c.isImage ? {

                autoAlpha: 0,
                y: -18,
                duration: OUT,
                ease: 'power3.in'

            } : {

                yPercent: -118,
                duration: OUT,
                ease: 'power3.in',
                stagger: { each: 0.025, from: 'start' }

            })

            // park off-screen ready for the next loop
            .set(c.targets, c.isImage ? { y: 18 } : { yPercent: 118 });

        return tl;
    }

    master = gsap.timeline({

        repeat: LOOPS,
        onRepeat: () => {

            gsap.set(o.panels, { zIndex: 1 });
            gsap.set(o.panels[o.panels.length - 1], { zIndex: 2 });
            z = 2;
        }
    });

    o.panels.forEach((p, i) => {

        // overlap each frame slightly into the previous exit
        master.add(frame(i), i === 0 ? 0 : '-=0.20');
    });
}

// ======================================================================== Init

function init(event) {

    gsap.to('.wrapper', {
        opacity: 1
    });

    wrapper.addEventListener('click', clickThrough);

    buildSequence();
}

EskimiDef.load().then(() => {

    init();
});