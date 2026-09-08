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
            src: '.bg, '
        },

    ],

    cors: false,
    responsive: false
};

function init(event) {

    gsap.to('.wrapper', {
        opacity: 1
    });

    wrapper.addEventListener('click', clickThrough);


}

EskimiDef.load().then(() => {

    init();
});