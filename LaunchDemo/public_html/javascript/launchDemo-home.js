/* global here4Me */

let postEntity;
let postIndexValue;
let qrCodeMessage;
let demoAgendaElement = document.getElementById('demoAgenda');
let postLocationOneElement = document.getElementById('postLocationOne');
let postLocationMessageOneElement = document.getElementById('postLocationMessageOne');
let qrCodeLocationMessageOneElement = document.getElementById('qrCodeLocationMessageOne');
let postLocationTwoElement = document.getElementById('postLocationTwo');
let qrCodeLocationOneElement = document.getElementById('qrCodeLocationOne');
let postLocationMessageTwoElement = document.getElementById('postLocationMessageTwo');
let closeButtonTwoMessageElement = document.getElementById('closeButtonTwoMessage');

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

    postEntity = post;
    var postContent = JSON.parse(post.content);
    switch (postContent.index) {
        case 1:
            postIndexValue = 1;
            here4Me.enableScanButton();
            here4Me.enableScanner();
            postLocationOneElement.style.display = 'block';
            postLocationMessageOneElement.innerHTML = postContent.postMessage;
            qrCodeLocationMessageOneElement.innerHTML = postContent.qrCodeMessage;
            break;
        case 2:
            postIndexValue = 2;
            here4Me.enableScanButton();
            here4Me.enableScanner();
            postLocationTwoElement.style.display = 'block';
            postLocationMessageTwoElement.innerHTML = postContent.postMessage;
            break;
        default:
            postIndexValue = null;
            demoAgendaElement.style.display = 'block';
            break;
    }
    qrCodeMessage = postContent.qrCodeMessage;

    document.body.style.display = 'block';
    here4Me.resize();
});

here4Me.qrCodeScanEventListeners.push(function (message) {

    switch (postIndexValue) {
        case 1:
            here4Me.showSiteHome();
            here4Me.disableScanButton();
            here4Me.disableScanner();
            postLocationOneElement.style.display = 'none';
            qrCodeLocationOneElement.style.display = 'block';
            here4Me.resize();
            break;
        case 2:
            here4Me.broadcastMessage(qrCodeMessage);
            break;
    }
});

here4Me.addEventListener('broadcastMessage', function (message) {

    switch (message) {

        case 'FIRST_POST_CREATED':
            window.location = "./slide3a.html";
            break;
        case 'SECOND_POST_SCAN':
            closeButtonTwoMessageElement.style.display = 'block';
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

let closeButtonOneElement = document.getElementById('closeButtonOne');
if (closeButtonOneElement) {
    closeButtonOneElement.onclick = closeLocationPost;
}

let closeButtonTwoElement = document.getElementById('closeButtonTwo');
if (closeButtonTwoElement) {
    closeButtonTwoElement.onclick = closeLocationPost;
}

function closeLocationPost() {

    here4Me.deletePost(postEntity);
    here4Me.refreshContext();
    here4Me.close();
}