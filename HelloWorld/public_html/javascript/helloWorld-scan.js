/* global here4Me */

let personalMessageBodyElement = document.getElementById('personalMessageBody');

here4Me.addEventListener('scannedQRCodeContent', function (qrCodeContent) {

    personalMessageBodyElement.innerHTML = qrCodeContent.content;
});

