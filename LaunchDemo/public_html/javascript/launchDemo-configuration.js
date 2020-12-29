/* global here4Me */

const CONTENT_TYPE = 'demo-data';
const SITE_ID = '63f58ae9fcdae20ea8d3743ab806ab2f';
const SITE_OWNER_ID = '8ae1a3cf2fa609656eaa447f8fe99b15';

let userSiteQRCodeFormElement = document.getElementById('userSiteQRCodeForm');
let siteQRCodeMessageElement = document.getElementById('siteQRCodeMessage');
let setQRCodeButtonElement = document.getElementById('setQRCodeButton');

here4Me.addEventListener('initialize', function (message) {

    document.body.style.display = 'block';
    here4Me.resize();
});

if (siteQRCodeMessageElement) {

    siteQRCodeMessageElement.onkeyup = function () {

        if (siteQRCodeMessageElement.value.trim() === '') {

            setQRCodeButtonElement.classList.add('disabled');
        } else {

            setQRCodeButtonElement.classList.remove('disabled');
        }
    };
}

if (setQRCodeButtonElement) {

    setQRCodeButtonElement.onclick = function () {

        if (siteQRCodeMessageElement.value.trim() === '') {

            return;
        }

        getUserQRCodeContent(function (qrCodeContent) {

            if (qrCodeContent !== null) {

                here4Me.deleteQRCodeContent(qrCodeContent, function (response) {});
            }
            setUserQRCodeContent();
            userSiteQRCodeFormElement.style.display = 'none';
        });
    };
}

function getUserQRCodeContent(callback) {

    here4Me.getUserQRCodeContentId(function (response) {

        let qrCodeContentId = response.message;
        if (response.statusCode === 'SUCCESSFUL' && qrCodeContentId !== null) {

            here4Me.readQRCodeContent(response.message, function (response) {

                let qrCodeContent = response.message;
                if (response.statusCode === 'SUCCESSFUL') {

                    callback(qrCodeContent);
                    return;
                }
                callback(null);
            });
            return;
        }
        callback(null);
    });
}

function setUserQRCodeContent() {

    createQRCodeContent(buildQRCodeContent(), function (qrCodeContentId) {

        if (qrCodeContentId !== null) {

            here4Me.setUserQRCodeContentId(qrCodeContentId, function (response) {

                here4Me.readPost('9a864efd451ecaf23d20f38e21d5bc84', function (post) {

                    post.context.qrCodes.push(qrCodeContentId);
                    here4Me.updatePost(post, null, function () {

                        here4Me.disableConfigurationButton();
                        here4Me.enableScanButton();
                        here4Me.broadcastMessage('USER_SITE_QR_CODE_CONTENT_SET');
                    });
                });
            });
        }
    });
}

function createQRCodeContent(qrCodeContent, callback) {

    here4Me.createQRCodeContent(qrCodeContent, function (response) {

        let qrCodeContentId = response.message.id;
        if (response.statusCode === 'SUCCESSFUL') {

            callback(qrCodeContentId);
        }
        callback(null);
    });
}

function buildQRCodeContent() {

    let qrCodeContent = {
        id: null,
        acceptedSiteIds: [SITE_ID],
        acceptedSiteOwnerIds: [SITE_OWNER_ID],
        contentType: CONTENT_TYPE,
        filter: null,
        content: siteQRCodeMessageElement.value,
        service: null,
        context: null,
        version: null
    };

    return qrCodeContent;
}