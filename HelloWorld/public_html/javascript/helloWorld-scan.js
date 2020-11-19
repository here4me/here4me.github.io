/* global here4Me */

let personalMessageBodyElement = document.getElementById('personalMessageBody');

here4Me.addEventListener('qrCodeScan', function (qrCodeContent) {

    personalMessageBodyElement.innerHTML = qrCodeContent.content;
});

