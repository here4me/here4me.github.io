/* global here4Me */

let qrCodeLocationMessageTwoElement = document.getElementById('qrCodeLocationMessageTwo');
let closeButtonElement = document.getElementById('closeButton');

here4Me.addEventListener('broadcastMessage', function (message) {

    if (message !== 'FIRST_POST_CREATED' &&  message !== 'SECOND_POST_SCAN') {

        qrCodeLocationMessageTwoElement.innerHTML = message;
        document.body.style.display = 'block';
        here4Me.resize();
    }
});

closeButtonElement.onclick = function() {
    here4Me.broadcastMessage('CLOSE_AND_DELETE');
};