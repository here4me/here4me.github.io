/* global here4Me */

here4Me.addEventListener('scannedQRCodeContent', function (message) {

    document.getElementById("personalMessageBody").innerHTML = message.content;
});