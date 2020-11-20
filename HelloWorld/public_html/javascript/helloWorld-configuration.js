/* global here4Me */

const CONTENT_TYPE = 'hello-world-data';
const SITE_ID = '9bdd7936d8a3a39c97e4e152795c68f4';
const SITE_OWNER_ID = '8ae1a3cf2fa609656eaa447f8fe99b15';

let personalMessageElement = document.getElementById("personalMessage");
let postsElement = document.getElementById("posts");
let reef = new Reef('#posts', {data: {posts: []}, template: renderSites, allowHTML: true});

document.addEventListener('render', function (event) {

    if (!event.target.matches('#posts')) {
        return;
    }

    let posts = event.detail.posts;
    let buttons = postsElement.getElementsByClassName('deletePostButton');
    for (var i = 0; i < buttons.length; i++) {

        let button = buttons[i];
        let buttonIndex = button.dataset.index;
        let post = posts[buttonIndex];
        button.onclick = function () {

            deletePost(post, function () {

                let posts = reef.data.posts;
                posts.splice(button.dataset.index, 1);
                for (var j = 0; j < posts.length; j++) {

                    posts[j].index = j;
                }
            });
        };
    }
});

personalMessageElement.addEventListener('change', function (event) {

    getUserQRCodeContent(function (qrCodeContent) {

        if (qrCodeContent !== null) {

            here4Me.deleteQRCodeContent(qrCodeContent, function (response) {});
        }
        setUserQRCodeContent();
    });
});

here4Me.addEventListener('initialize', function () {

    reef.render();
    setPersonalMessageSelect();
    displayAllPosts();
});

here4Me.addEventListener('broadcastMessage', function (message) {

    switch (message) {

        case 'POST_CREATED':
            displayAllPosts();
            break;
    }
});

function setPersonalMessageSelect() {

    getUserQRCodeContent(function (qrCodeContent) {

        if (qrCodeContent !== null) {

            for (var i = 0; i < personalMessageElement.length; i++) {

                if (personalMessageElement.options[i].value === qrCodeContent.content) {

                    personalMessageElement.options[i].selected = true;
                }
            }
        }
    });
}

function displayAllPosts() {

    here4Me.readAllPosts(function (response) {

        if (response.statusCode === 'SUCCESSFUL') {

            let posts = response.message;
            for (var i = 0; i < posts.length; i++) {

                posts[i].index = i;
            }
            reef.data.posts = posts;
        }
    });
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

    let personalMessageValue = personalMessageElement.value;
    if (personalMessageValue.trim() === 'None') {

        here4Me.clearUserQRCodeContentId(function (response) {});
    } else {

        createQRCodeContent(buildQRCodeContent(), function (qrCodeContentId) {

            if (qrCodeContentId !== null) {

                here4Me.setUserQRCodeContentId(qrCodeContentId, function (response) {});
            }
        });
    }
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

function deletePost(post, callback) {

    here4Me.deletePost(post, function (response) {

        if (response.statusCode === 'SUCCESSFUL') {

            callback();
        }
    });
}

function buildQRCodeContent() {

    let qrCodeContent = {
        id: null,
        contentType: CONTENT_TYPE,
        acceptedSiteIds: [SITE_ID],
        acceptedSiteOwnerIds: [SITE_OWNER_ID],
        filter: null,
        content: personalMessageElement.value,
        service: null,
        context: null,
        version: null
    };

    return qrCodeContent;
}

function renderSites(props) {
    return `${props.posts.map(renderPost).join('')}`;
}

function renderPost(post) {
    return `<div>
                <button class="deletePostButton" data-index="${post.index}">Delete</button>
                <span>${post.title}</span>
            </div>`;
}
