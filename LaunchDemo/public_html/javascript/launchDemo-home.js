/* global here4Me */

let userId;
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
let siteQRCodeElement = document.getElementById('siteQRCode');
let siteQRCodeMessageElement = document.getElementById('siteQRCodeMessage');

here4Me.scrollTo(0, 0);

here4Me.addEventListener('initialize', function (message) {

    if (message.userIsAnonymous) {

        window.location = "./notAnonymous.html";
        return;
    }
    userId = message.userId;

    document.body.style.display = 'block';
    here4Me.resize();
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
            here4Me.readAllRecords(userId, function (response) {

                if (response.message.length > 0 && response.message[0].content === 'B' && !window.location.href.includes("slide6")) {

                    here4Me.enableConfigurationButton();
                    window.location = "./slide6.html";
                } else if (response.message.length > 0 && response.message[0].content === 'C' && !window.location.href.includes("slide7")) {

                    here4Me.disablePostButton();
                    here4Me.disableScanButton();
                    here4Me.disableConfigurationButton();
                    window.location = "./slide7.html";
                } else if (demoAgendaElement) {

                    demoAgendaElement.style.display = 'block';
                    here4Me.resize();
                }
            });
            break;
    }
    qrCodeMessage = postContent.qrCodeMessage;
});

here4Me.qrCodeScanEventListeners.push(function (message) {

    if (postIndexValue === 1) {

        if (message.isCached) {

            return;
        }

        here4Me.showSiteHome();
        here4Me.disableScanButton();
        here4Me.disableScanner();
        postLocationOneElement.style.display = 'none';
        qrCodeLocationOneElement.style.display = 'block';
        here4Me.resize();
        return;
    }

    if (message.content !== 'LAUNCH_DEMO_QR_CODE') {
        if (siteQRCodeMessageElement) {
            siteQRCodeMessageElement.innerHTML = message.content;
        }

        if (siteQRCodeElement) {
            siteQRCodeElement.style.display = 'block';
        }
        here4Me.resize();
    }
});

here4Me.addEventListener('broadcastMessage', function (message) {

    switch (message) {

        case 'FIRST_POST_CREATED':
            window.location = "./slide3a.html";
            break;
        case 'WHAT_IS_SECOND_QR_CODE_MESSAGE':
            here4Me.broadcastMessage(qrCodeMessage);
            break;
        case 'USER_SITE_QR_CODE_CONTENT_SET':
            userSiteQRCodeSet();
            break;
        case 'CLOSE_AND_DELETE':
            closeLocationPost();
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

function closeLocationPost() {

    here4Me.deletePost(postEntity, function () {

        here4Me.readAllPosts(function (response) {

            if (response.message.length === 0) {

                here4Me.readAllRecords(userId, function (response) {

                    let record = response.message[0];
                    record.content = 'B';
                    here4Me.updateRecord(record, function () {

                        here4Me.refreshContext();
                        here4Me.close();
                    });
                });
            } else {

                here4Me.refreshContext();
                here4Me.close();
            }
        });
    });
}

function userSiteQRCodeSet() {

    here4Me.readAllRecords(userId, function (response) {

        let record = response.message[0];
        record.content = 'C';
        here4Me.updateRecord(record, function () {

            window.location = "./slide7.html";
        });
    });
}