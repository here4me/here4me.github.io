/* global here4Me */

here4Me.addEventListener('openPost', function (message) {
    
    here4Me.enableScanner();
    here4Me.enablePostButton();
    here4Me.enableScanButton();
    here4Me.enableConfigurationButton();

    if (message === null) {

        document.getElementById("welcome").style.display = 'block';
        document.getElementById("message").style.display = 'none';
        document.getElementById("messageBody").innerHTML = '';
        return;
    }

    document.getElementById("welcome").style.display = 'none';
    document.getElementById("message").style.display = 'block';
    document.getElementById("messageBody").innerHTML = message.content;
});