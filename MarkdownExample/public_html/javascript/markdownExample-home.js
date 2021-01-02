/* global here4Me */

here4Me.addEventListener('initialize', function (message) {

    let mySwipe = Swipe(document.getElementById('slider'), {
        startSlide: 1,
        speed: 400,
        auto: 3000,
        continuous: true,
        disableScroll: false,
        stopPropagation: false,
        callback: function (index, elem) {},
        transitionEnd: function (index, elem) {
            here4Me.scrollTo(0, 0);
            here4Me.resize();
        }
    });
});