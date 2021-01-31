/* global here4Me */

const CONTENT_TYPE = 'demo-data';
const SITE_ID = '63f58ae9fcdae20ea8d3743ab806ab2f';
const SITE_OWNER_ID = '8ae1a3cf2fa609656eaa447f8fe99b15';

let currentFormGroup = 0;
let userId = null;
let postFormElement = document.getElementById('postForm');
let titleInputElement = document.getElementById('title');
let postMessageInputElement = document.getElementById('postMessage');
let qrCodeMessageInputElement = document.getElementById('qrCodeMessage');
let fromTimeSelectElement = document.getElementById('fromTime');
let postItButtonElement = document.getElementById('postItButton');
let postProgressElement = document.getElementById('postProgress');
let postProgressMessageElement = document.getElementById('postProgressMessage');
let closeButtonElement = document.getElementById('closeButton');

here4Me.addEventListener('initialize', function (message) {

    userId = message.userId;
    if (!message.siteIsOpen) {

        window.location = "./demoNotOpen.html";
        return;
    }

    document.body.style.display = 'block';
    here4Me.resize();
});

if (postItButtonElement) {

    postItButtonElement.addEventListener('click', function (event) {

        let post = buildPost();
        if (post === null) {

            return;
        }

        here4Me.createPost(post, function (response) {

            if (response.statusCode === 'SUCCESSFUL') {

                showBoundingBoxProgress(100);
                window.location = './slide5.html';
            }
            here4Me.refreshContext();
        });
    });
}

if (closeButtonElement) {

    closeButtonElement.addEventListener('click', function (event) {

        here4Me.close();
    });
}

function checkForValidForm() {

    if (titleInputElement.value.trim() === '' ||
            postMessageInputElement.value.trim() === '' ||
            qrCodeMessageInputElement.value.trim() === '') {

        postItButtonElement.setAttribute('disabled', true);
    } else {

        postItButtonElement.removeAttribute('disabled');
    }
}

if(titleInputElement) {
    
    titleInputElement.onkeyup = checkForValidForm;
}

if(postMessageInputElement) {
    
    postMessageInputElement.onkeyup = checkForValidForm;
}

if(qrCodeMessageInputElement) {
    
    qrCodeMessageInputElement.onkeyup = checkForValidForm;
}

here4Me.addEventListener('calculatingBoundingBox', function (status) {

    showBoundingBoxProgress(status.percentComplete);
});

function showBoundingBoxProgress(percentComplete) {

    postFormElement.style.display = 'none';
    postProgressElement.style.display = 'block';
    postProgressMessageElement.innerHTML = percentComplete + '%';
    here4Me.scrollTo(0, 0);
}

function buildPost() {

    let title = titleInputElement.value;
    let postMessage = postMessageInputElement.value;
    let qrCodeMessage = qrCodeMessageInputElement.value;
    let minutesFromNow = parseInt(fromTimeSelectElement.value);

    let startTime = (new Date()).getTime() + minutesFromNow * 60 * 1000;
    let post = {
        title: title,
        userDisplayName: null,
        contentType: CONTENT_TYPE,
        acceptedSiteIds: [SITE_ID],
        acceptedSiteOwnerIds: [SITE_OWNER_ID],
        isUserProfilePost: false,
        filter: 'return ((new Date()).getTime() >= ' + startTime + ');',
        content: JSON.stringify({
            index: 2,
            postMessage: postMessage,
            qrCodeMessage: qrCodeMessage
        })
    };

    return post;
}