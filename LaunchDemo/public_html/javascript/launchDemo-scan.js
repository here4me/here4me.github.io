/* global here4Me */

let qrCodeLocationMessageTwoElement = document.getElementById('qrCodeLocationMessageTwo');

here4Me.addEventListener('broadcastMessage', function (message) {

    if (message !== 'FIRST_POST_CREATED' &&  message !== 'SECOND_POST_SCAN') {

        qrCodeLocationMessageTwoElement.innerHTML = message;
        document.body.style.display = 'block';
        here4Me.resize();
        here4Me.scrollTo(0, 0);
    }
});

here4Me.broadcastMessage('SECOND_POST_SCAN');