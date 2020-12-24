/* global here4Me */

let postIndexValue;
let qrCodeMessage;
let demoAgendaElement = document.getElementById('demoAgenda');
let postLocationOneElement = document.getElementById('postLocationOne');
let postLocationMessageOneElement = document.getElementById('postLocationMessageOne');
let qrCodeLocationMessageOneElement = document.getElementById('qrCodeLocationMessageOne');
let postLocationTwoElement = document.getElementById('postLocationTwo');
let postLocationMessageTwoElement = document.getElementById('postLocationMessageTwo');

here4Me.scrollTo(0, 0);

here4Me.addEventListener('initialize', function (message) {

    if (message.userIsAnonymous) {

        window.location = "./notAnonymous.html";
        return;
    }
});

here4Me.addEventListener('openPost', function (post) {

    if (post === null) {

        window.location = "./notFromQRCode.html";
        return;
    }

    var post = JSON.parse(post.content);
    switch (post.index) {
        case 1:
            postIndexValue = 1;
            here4Me.enableScanButton();
            here4Me.enableScanner();
            postLocationOneElement.style.display = 'block';
            postLocationMessageOneElement.innerHTML = post.postMessage;
            qrCodeLocationMessageOneElement.innerHTML = post.qrCodeMessage;
            break;
        case 2:
            postIndexValue = 2;
            here4Me.enableScanButton();
            here4Me.enableScanner();
            postLocationTwoElement.style.display = 'block';
            postLocationMessageTwoElement.innerHTML = post.postMessage;
            break;
        default:
            postIndexValue = null;
            demoAgendaElement.style.display = 'block';
            break;
    }
    qrCodeMessage = post.qrCodeMessage;

    document.body.style.display = 'block';
    here4Me.resize();
});

here4Me.qrCodeScanEventListeners.push(function (message) {

    switch (postIndexValue) {
        case 1:
            postLocationOneElement.style.display = 'none';
            qrCodeLocationMessageOneElement.style.display = 'block';
            here4Me.showSiteHome();
            break;
        case 2:
            here4Me.broadcastMessage(message.content);
            break;
    }
});

here4Me.addEventListener('broadcastMessage', function (message) {

    switch (message) {

        case 'FIRST_POST_CREATED':
            window.location = "./slide3a.html";
            break;
        default:
            break;
    }
});

let slide3BackButtonElement = document.getElementById('slide3BackButton');
if (slide3BackButtonElement) {

    slide3BackButtonElement.onclick = function () {
        enablePostButtonElement.style.display = 'block';
        here4Me.disablePostButton();
    };
}

let enablePostButtonElement = document.getElementById('enablePostButton');
if (enablePostButtonElement) {

    enablePostButtonElement.onclick = function () {
        enablePostButtonElement.style.display = 'none';
        here4Me.enablePostButton();
    };
}