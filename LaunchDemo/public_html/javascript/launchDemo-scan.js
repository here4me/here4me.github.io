/* global here4Me */

let qrCodeLocationMessageTwoElement = document.getElementById('qrCodeLocationMessageTwo');
let closeButtonElement = document.getElementById('closeButton');

here4Me.addEventListener('broadcastMessage', function (message) {

    if (message !== 'FIRST_POST_CREATED' &&  message !== 'SECOND_POST_SCAN') {

        qrCodeLocationMessageTwoElement.innerHTML = message;
        document.body.style.display = 'block';
        here4Me.resize();
        here4Me.scrollTo(0, 0);
    }
});

closeButtonElement.onclick = function() {
    here4Me.disableScanner();
    here4Me.disableScanButton();
    here4Me.showSiteHome();
    here4Me.broadcastMessage('CLOSE_AND_DELETE');
};