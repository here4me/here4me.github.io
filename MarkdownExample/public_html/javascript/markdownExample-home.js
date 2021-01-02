/* global here4Me */

here4Me.addEventListener('initialize', function (message) {

    let mySwipe = Swipe(document.getElementById('slider'), {
        callback: function (index, elem) {},
        transitionEnd: function (index, elem) {
            here4Me.scrollTo(0, 0);
            here4Me.resize();
        }
    });
});