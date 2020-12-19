/* global here4Me */

let currentFormGroup = 0;

let postFormElement = document.getElementById("postForm");
let titleFormGroupElement = document.getElementById("titleFormGroup");
let titleInputElement = document.getElementById("title");
let postMessageFormGroupElement = document.getElementById("postMessageFormGroup");
let postMessageInputElement = document.getElementById("postMessage");
let qrCodeMessageFormGroupElement = document.getElementById("qrCodeMessageFormGroup");
let qrCodeMessageInputElement = document.getElementById("qrCodeMessage");
let nextButtonElement = document.getElementById("nextButton");
let submitFormElement = document.getElementById("submitForm");

here4Me.addEventListener('initialize', function (userId) {

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
        acceptedSiteIds: ['63f58ae9fcdae20ea8d3743ab806ab2f'],
        acceptedSiteOwnerIds: ['8ae1a3cf2fa609656eaa447f8fe99b15'],
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
        acceptedSiteIds: ['63f58ae9fcdae20ea8d3743ab806ab2f'],
        acceptedSiteOwnerIds: ['8ae1a3cf2fa609656eaa447f8fe99b15'],
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

titleInputElement.onchange = function () {
    
    if(titleInputElement.value.trim() === '') {
        
        nextButtonElement.classList.add('disabled');
    }else {
        
        nextButtonElement.classList.remove('disabled');
    }
};

postMessageInputElement.onchange = function () {
    
    if(postMessageInputElement.value.trim() === '') {
        
        nextButtonElement.classList.add('disabled');
    }else {
        
        nextButtonElement.classList.remove('disabled');
    }
};

qrCodeMessageInputElement.onchange = function () {
    
    if(qrCodeMessageInputElement.value.trim() === '') {
        
        nextButtonElement.classList.add('disabled');
    }else {
        
        nextButtonElement.classList.remove('disabled');
    }
};

nextButtonElement.onclick = function () {

    switch (currentFormGroup) {
        case 0:
            titleFormGroupElement.style.display = 'none';
            postMessageFormGroupElement.style.display = 'block';
            currentFormGroup++;
            break;
        case 1:
            postMessageFormGroupElement.style.display = 'none';
            qrCodeMessageFormGroupElement.style.display = 'block';
            currentFormGroup++;
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