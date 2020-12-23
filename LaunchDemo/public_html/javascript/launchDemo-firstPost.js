/* global here4Me */

const CONTENT_TYPE = 'demo-data';
const SITE_ID = '63f58ae9fcdae20ea8d3743ab806ab2f';
const SITE_OWNER_ID = '8ae1a3cf2fa609656eaa447f8fe99b15';

let currentFormGroup = 0;
let userId = null;
let postFormElement = document.getElementById('postForm');
let titleFormGroupElement = document.getElementById('titleFormGroup');
let titleInputElement = document.getElementById('title');
let postMessageFormGroupElement = document.getElementById('postMessageFormGroup');
let postMessageInputElement = document.getElementById('postMessage');
let qrCodeMessageFormGroupElement = document.getElementById('qrCodeMessageFormGroup');
let qrCodeMessageInputElement = document.getElementById('qrCodeMessage');
let postFormBackButtonElement = document.getElementById('postFormBackButton');
let nextButtonElement = document.getElementById('nextButton');
let submitFormElement = document.getElementById('submitForm');
let submitFormBackButtonElement = document.getElementById('submitFormBackButton');
let createFirstPostButtonElement = document.getElementById('createFirstPostButton');
let postProgressElement = document.getElementById('postProgress');
let postProgressMessageElement = document.getElementById('postProgressMessage');
let createSecondButtonElement = document.getElementById('createSecondButton');

here4Me.addEventListener('initialize', function (message) {

    userId = message.userId;
    if (!message.siteIsOpen) {

        window.location = "./demoNotOpen.html";
        return;
    }

    document.body.style.display = 'block';
    here4Me.resize();

    if (userId === '8ae1a3cf2fa609656eaa447f8fe99b15') {

        checkIfStepOnePostExists(function (exists) {

            if (!exists) {

                createDemoPost();
            }
        });
    }
});

function checkIfStepOnePostExists(callback) {

    here4Me.readAllPosts(function (response) {

        if (response.statusCode !== 'SUCCESSFUL') {

            callback(false);
            return;
        }

        let posts = response.message;
        for (var i = 0; i < posts.length; i++) {

            if (posts[i].content === 'LAUNCH_DEMO_STEP_ONE') {

                callback(true);
                return;
            }
        }
        callback(false);
    });
}

function createDemoPost() {

    createQRCodeContent('LAUNCH_DEMO_QR_CODE', function (qrCode) {

        createQRCodePost(qrCode);
    });
}

function createQRCodeContent(content, callback) {

    let qrCodeContent = {
        id: null,
        acceptedSiteIds: [SITE_ID],
        acceptedSiteOwnerIds: [SITE_OWNER_ID],
        contentType: 'string',
        filter: null,
        content: content,
        service: null,
        context: null,
        version: null
    };

    here4Me.createQRCodeContent(qrCodeContent, function (response) {

        if (response.statusCode === 'SUCCESSFUL') {

            qrCodeContent = response.message;
            callback(qrCodeContent.id);
        }
    });
}

function createQRCodePost(qrCode) {

    let post = {
        id: null,
        title: null,
        userDisplayName: 'Here For Me',
        acceptedSiteIds: [SITE_ID],
        acceptedSiteOwnerIds: [SITE_OWNER_ID],
        contentType: 'string',
        filter: null,
        content: 'LAUNCH_DEMO_STEP_ONE',
        context: {
            boundingBox: null,
            qrCodes: [qrCode],
            isUserProfile: false,
            promptLocation: false
        },
        version: null
    };

    here4Me.createPost(post, function () {});
}

titleInputElement.onkeyup = function () {

    if (titleInputElement.value.trim() === '') {

        nextButtonElement.setAttribute('disabled', true);
    } else {

        nextButtonElement.removeAttribute('disabled');
    }
};

postMessageInputElement.onkeyup = function () {

    if (postMessageInputElement.value.trim() === '') {

        nextButtonElement.setAttribute('disabled', true);
    } else {

        nextButtonElement.removeAttribute('disabled');
    }
};

qrCodeMessageInputElement.onkeyup = function () {

    if (qrCodeMessageInputElement.value.trim() === '') {

        nextButtonElement.setAttribute('disabled', true);
    } else {

        nextButtonElement.removeAttribute('disabled');
    }
};

postFormBackButtonElement.onclick = function () {

    switch (currentFormGroup) {
        case 0:
            here4Me.showSiteHome();
            break;
        case 1:
            titleFormGroupElement.style.display = 'block';
            postMessageFormGroupElement.style.display = 'none';
            currentFormGroup--;
            titleInputElement.onkeyup();
            break;
        case 2:
            postMessageFormGroupElement.style.display = 'block';
            qrCodeMessageFormGroupElement.style.display = 'none';
            currentFormGroup--;
            postMessageInputElement.onkeyup();
            break;
        case 3:
            postFormElement.style.display = 'block';
            qrCodeMessageFormGroupElement.style.display = 'block';
            submitFormElement.style.display = 'none';
            currentFormGroup--;
            qrCodeMessageInputElement.onkeyup();
            break;
    }
    here4Me.resize();
};

nextButtonElement.onclick = function () {

    if (nextButtonElement.getAttribute('disabled')) {
        return;
    }

    switch (currentFormGroup) {
        case 0:
            titleFormGroupElement.style.display = 'none';
            postMessageFormGroupElement.style.display = 'block';
            currentFormGroup++;
            postMessageInputElement.onkeyup();
            break;
        case 1:
            postMessageFormGroupElement.style.display = 'none';
            qrCodeMessageFormGroupElement.style.display = 'block';
            currentFormGroup++;
            qrCodeMessageInputElement.onkeyup();
            break;
        case 2:
            postFormElement.style.display = 'none';
            qrCodeMessageFormGroupElement.style.display = 'none';
            submitFormElement.style.display = 'block';
            currentFormGroup++;
            break;
    }
    here4Me.resize();
};

submitFormBackButtonElement.onclick = function () {

    postFormElement.style.display = 'block';
    qrCodeMessageFormGroupElement.style.display = 'block';
    submitFormElement.style.display = 'none';
    currentFormGroup--;
    here4Me.resize();
};

createFirstPostButtonElement.addEventListener('click', function (event) {

    let post = buildPost();
    if (post === null) {

        return;
    }

    here4Me.createPost(post, function (response) {

        if (response.statusCode === 'SUCCESSFUL') {

            showBoundingBoxProgress(100);
            createSecondButtonElement.classList.remove('disabled');
            record = {
                id: null,
                entityId: userId,
                content: 'A',
                version: null
            };
            here4Me.createRecord(record, function (response) {});
        }
        clearPostForm();
        here4Me.refreshContext();
    });
});

here4Me.addEventListener('calculatingBoundingBox', function (status) {

    showBoundingBoxProgress(status.percentComplete);
});

function showBoundingBoxProgress(percentComplete) {

    submitFormElement.style.display = 'none';
    postProgressElement.style.display = 'block';
    postProgressMessageElement.innerHTML = percentComplete + '%';
    here4Me.scrollTo(0, 0);
}

function buildPost() {

    let title = titleInputElement.value;
    let postMessage = postMessageInputElement.value;
    let qrCodeMessage = qrCodeMessageInputElement.value;

    let post = {
        title: title,
        userDisplayName: null,
        contentType: CONTENT_TYPE,
        acceptedSiteIds: [SITE_ID],
        acceptedSiteOwnerIds: [SITE_OWNER_ID],
        isUserProfilePost: false,
        filter: null,
        content: JSON.stringify({
            postMessage: postMessage,
            qrCodeMessage: qrCodeMessage
        })
    };

    return post;
}

function clearPostForm() {

    titleInputElement.value = null;
    postMessageInputElement.value = null;
    qrCodeMessageInputElement.value = null;
}