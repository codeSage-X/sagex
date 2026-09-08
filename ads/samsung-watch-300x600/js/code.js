// ======================================================================== Build

// dom objects
var o = {};
// img buffers
var b = {};

var ismain = false;
var isseen = false;

// loop control
var master, pulse1, pulse2;

var HOLD_TIME = 4;   // seconds the watches pulse on the end frame before looping

// every element that appears in more than one frame — cleared each cycle
var SHARED = '.logo, .title, .prd_name, .watch9, .bt, .w6, ' +
             '.logo2, .title2, .prd_name2, .ultra2, .bt2, ' +
             '.title3, .product1, .product2';

const settings = {

    w: 0, // replaced from meta
    h: 0, // replaced from meta

    assets: [{
            format: 'png',
            type: 'class',
            src: '.bg, .bg2, .bt, .bt2, .logo, .logo2, .prd_name, .prd_name2, .product1, .product2, ' +
                  '.title, .title2, .title3, .ultra2, .watch9, ' +
                 '.u1, .u2, .u3, .u4, .u5, ' +
                 '.w1, .w2, .w3, .w4, .w5, .w6'
        },

    ],

    cors: false,
    responsive: false
};

// ---------------------------------------------------------------- Frame 1
function frame1() {

    const tl = gsap.timeline({
        defaults: {
            duration: 0.6,
            ease: 'power3.out'
        }
    });

    tl.fromTo('.logo',
            { x: -300, y: 0, opacity: 0 },
            { x: 0, y: 0, opacity: 1, immediateRender: false })

      .fromTo('.title',
            { x: 300, y: 0, opacity: 0 },
            { x: 0, y: 0, opacity: 1, immediateRender: false }, '-=0.4')

      .fromTo('.watch9',
            { x: 0, y: 300, opacity: 0 },
            { x: 0, y: 0, opacity: 1, duration: 1.5, immediateRender: false }, '-=0.4')

      .fromTo('.prd_name',
            { x: -300, y: 0, opacity: 0 },
            { x: 0, y: 0, opacity: 1, duration: 1, immediateRender: false })

      .fromTo('.bt',
            { x: -300, y: 0, opacity: 0 },
            { x: 0, y: 0, opacity: 1, immediateRender: false }, '-=0.4')

      // watch face swaps
    //   .to('.w1', { opacity: 0, duration: 0.35 }, '-=0.35')
    //   .to('.w2', { opacity: 1, duration: 0.35 }, '-=0.35')
    //   .to('.w2', { opacity: 0, duration: 0.35 }, '+=0.15')
    //   .to('.w3', { opacity: 1, duration: 0.35 }, '-=0.35')
    //   .to('.w3', { opacity: 0, duration: 0.35 }, '+=0.15')
    //   .to('.w4', { opacity: 1, duration: 0.35 }, '-=0.35')
    //   .to('.w4', { opacity: 0, duration: 0.35 }, '+=0.15')
    //   .to('.w5', { opacity: 1, duration: 0.35 }, '-=0.35')
    //   .to('.w5', { opacity: 0, duration: 0.35 }, '+=0.15')
    //   .to('.w6', { opacity: 1, duration: 0.35 }, '-=0.35')

      // exit right
      .to('.logo, .title, .prd_name, .watch9, .w6, .bt',
            { x: 300, opacity: 0, duration: 0.4, ease: 'back.out(1.7)', delay: 1 });

    return tl;
}

// ---------------------------------------------------------------- Frame 2
function frame2() {

    const tl = gsap.timeline({
        defaults: {
            duration: 0.6,
            ease: 'power3.out'
        }
    });

    tl.fromTo('.bg2',
            { x: 0, opacity: 0 },
            { x: 0, opacity: 1, immediateRender: false })

      .fromTo('.prd_name2',
            { x: -300, y: 0, opacity: 0 },
            { x: 0, y: 0, opacity: 1, duration: 1.5, immediateRender: false }, '-=0.4')

      .fromTo('.title2',
            { x: 300, y: 0, opacity: 0 },
            { x: 0, y: 0, opacity: 1, duration: 0.5, immediateRender: false }, '-=0.2')

      .fromTo('.logo2',
            { x: -300, y: 0, opacity: 0 },
            { x: 0, y: 0, opacity: 1, duration: 0.5, immediateRender: false }, '-=0.2')

      .fromTo('.ultra2, .u1',
            { x: 0, y: 300, opacity: 0 },
            { x: 0, y: 0, opacity: 1, duration: 0.6, immediateRender: false }, '-=0.2')

      .fromTo('.bt2',
            { x: -300, y: 0, opacity: 0 },
            { x: 0, y: 0, opacity: 1, duration: 0.5, immediateRender: false }, '-=0.2')

    //   watch face swaps
      .to('.u1', { opacity: 0, duration: 0.35 }, '-=0.35')
      .to('.u2', { opacity: 1, duration: 0.35 }, '-=0.35')
      .to('.u2', { opacity: 0, duration: 0.35 }, '+=0.15')
      .to('.u3', { opacity: 1, duration: 0.35 }, '-=0.35')
      .to('.u3', { opacity: 0, duration: 0.35 }, '+=0.15')
      .to('.u4', { opacity: 1, duration: 0.35 }, '-=0.35')
      .to('.u4', { opacity: 0, duration: 0.35 }, '+=0.15')
      .to('.u5', { opacity: 1, duration: 0.35 }, '-=0.35')

      // exit right
      .to('.logo2, .title2, .prd_name2, .ultra2, .u5, .bt2', {
            duration: 0.6,
            stagger: 0.01,
            x: 300,
            opacity: 0
        }, '+=0.1')

      // background crossfade back to frame 1 bg
      .to('.bg2', { opacity: 0, duration: 0.4 }, '-=0.3')
      .to('.bg',  { opacity: 1, duration: 0.4 }, '<');

    return tl;
}

// ---------------------------------------------------------------- Frame 3
function frame3() {

    const tl = gsap.timeline({
        defaults: {
            duration: 0.7,
            ease: 'power3.out'
        }
    });

    tl.fromTo('.logo',
            { x: -50, y: 0, opacity: 0, rotation: 0 },
            { x: 0, y: 0, opacity: 1, rotation: 0, immediateRender: false })

      .fromTo('.title3',
            { x: 0, y: 0, opacity: 0, rotation: 0 },
            {
                keyframes: {
                    opacity:  [0, 1,  1,   1,  1],
                    rotation: [0, -9, 6,  -3,  0],
                    easeEach: 'power1.inOut'
                },
                transformOrigin: '50% 50%',
                duration: 0.8,
                immediateRender: false
            })

      .fromTo('.product1, .product2',
            { x: 0, y: 300, opacity: 0 },
            { x: 0, y: 0, opacity: 1, stagger: 0.3, immediateRender: false }, '-=0.6')

      // .bt kept separate — frame 1 moves it on x, frame 3 on y
      .fromTo('.bt',
            { x: 0, y: 300, opacity: 0 },
            { x: 0, y: 0, opacity: 1, immediateRender: false }, '-=0.3');

    return tl;
}

// ------------------------------------------------- End frame pulse (standalone)
function startPulse() {

    killPulse();

    pulse1 = gsap.to('.product1', {
        scale: 1.04,
        duration: 1.2,
        ease: 'sine.inOut',
        transformOrigin: '50% 50%',
        repeat: -1,
        yoyo: true
    });

    pulse2 = gsap.to('.product2', {
        scale: 1.04,
        duration: 1.2,
        ease: 'sine.inOut',
        transformOrigin: '50% 50%',
        repeat: -1,
        yoyo: true,
        delay: 0.6
    });
}

function killPulse() {

    if (pulse1) { pulse1.kill(); pulse1 = null; }
    if (pulse2) { pulse2.kill(); pulse2 = null; }

    gsap.set('.product1, .product2', { scale: 1 });
}

// ---------------------------------------------------------------- Master loop
function buildMaster() {

    const tl = gsap.timeline({
        repeat: -1,
        onRepeat: killPulse
    });

    // hard reset — runs at the top of every cycle
    tl.call(killPulse)
      .set(SHARED, { clearProps: 'transform' })
      .set(SHARED, { opacity: 0 })
      .set('.w2, .w3, .w4, .w5, .w6, .u2, .u3, .u4, .u5', { opacity: 0 })
      .set('.bg',  { opacity: 1 })
      .set('.bg2', { opacity: 0 })

      .add(frame1())
      .add(frame2())
      .add(frame3())

      .call(startPulse)
      .to({}, { duration: HOLD_TIME });   // hold on end frame, then loop

    return tl;
}

function init(event) {

    gsap.to('.wrapper', {
        opacity: 1
    });

    master = buildMaster();

    wrapper.addEventListener('click', clickThrough);
}

EskimiDef.load().then(() => {

    init();
});