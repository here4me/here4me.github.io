/* global here4Me */

here4Me.addEventListener('initialize', function () {

    if (!qrCodePostExists()) {
        
        createDemoPost();
    }
});

function qrCodePostExists() {

    here4Me.readAllPosts(function (response) {

        if (response.statusCode !== 'SUCCESSFUL') {
            
            return false;
        }

        let posts = response.message;
        for (var i = 0; i < posts.length; i++) {

            if (posts[i].content === 'LAUNCH_DEMO_STEP_ONE') {
                
                return true;
            }
        }

        return false;
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