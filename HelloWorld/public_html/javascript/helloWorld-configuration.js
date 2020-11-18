/* global here4Me */

let reef = new Reef('#posts', {data: {posts: []}, template: renderSites, allowHTML: true});
reef.render();

here4Me.addEventListener('initialize', function (message) {

    here4Me.getUserQRCodeContentId(function (response) {

        if (response.statusCode === 'SUCCESSFUL' && response.message !== null) {

            here4Me.readQRCodeContent(response.message, function (response) {

                if (response.statusCode === 'SUCCESSFUL' && response.message !== null) {

                    let personalMessageElement = document.getElementById("personalMessage");
                    for (var i = 0; i < personalMessageElement.length; i++) {

                        if (personalMessageElement.options[i].value === response.message.content) {

                            personalMessageElement.options[i].selected = true;
                        }
                    }
                }
            });
        }
    });

    here4Me.readAllPosts(function (response) {

        if (response.statusCode === 'SUCCESSFUL') {

            let posts = response.message;
            for (var i = 0; i < posts.length; i++) {

                posts[i].index = i;
            }
            reef.data.posts = posts;
        }
    });
});

here4Me.addEventListener('broadcastMessage', function (message) {

    here4Me.readAllPosts(function (response) {

        if (response.statusCode === 'SUCCESSFUL') {

            let posts = response.message;
            for (var i = 0; i < posts.length; i++) {

                posts[i].index = i;
            }
            reef.data.posts = posts;
        }
    });
});

let saveButtonElement = document.getElementById("saveButton");
saveButtonElement.addEventListener('click', function (event) {

    let personalMessageValue = document.getElementById("personalMessage").value;
    here4Me.getUserQRCodeContentId(function (response) {

        if (response.statusCode === 'SUCCESSFUL' && response.message !== null) {

            here4Me.readQRCodeContent(response.message, function (response) {

                if (response.statusCode === 'SUCCESSFUL' && response.message !== null) {

                    here4Me.deleteQRCodeContent(response.message, function (response) {

                        if (response.statusCode === 'SUCCESSFUL') {

                            if (personalMessageValue.trim() === 'None') {

                                here4Me.clearUserQRCodeContentId(function (response) {});
                            }
                        }
                    });
                }
            });
        }
    });
    
    if (personalMessageValue.trim() !== 'None') {

        let qrCodeContent = {
            id: null,
            acceptedSiteIds: ['37a462e5cf0d9c8996eb7fa24cf327d0'],
            acceptedSiteOwnerIds: ['0b9d9a9ad5f2169a5bdf393e5002a938'],
            contentType: 'hello-world-data',
            filter: null,
            content: document.getElementById('personalMessage').value,
            service: null,
            context: null,
            version: null
        };

        here4Me.createQRCodeContent(qrCodeContent, function (response) {

            if (response.statusCode === 'SUCCESSFUL') {

                here4Me.setUserQRCodeContentId(response.message.id, function (response) {});
            }
        });
    }
});

function renderSites(props) {
    return `${props.posts.map(renderPost).join('')}`;
}

function renderPost(post) {
    return `<div>
                <button class="deletePostButton" data-index="${post.index}">Delete</button>
                <span>${post.title}</span>
            </div>`;
}

document.addEventListener('render', function (event) {

    if (!event.target.matches('#posts')) {
        return;
    }

    let buttons = document.getElementById("posts").getElementsByClassName('deletePostButton');
    for (var i = 0; i < buttons.length; i++) {

        let button = buttons[i];
        button.onclick = function () {

            here4Me.readPost(event.detail.posts[button.dataset.index].id, function (response) {

                if (response.statusCode === 'SUCCESSFUL') {

                    here4Me.deletePost(response.message, function (response) {

                        if (response.statusCode === 'SUCCESSFUL') {

                            let posts = reef.data.posts;
                            posts.splice(button.dataset.index, 1);
                            for (var j = 0; j < posts.length; j++) {

                                posts[j].index = j;
                            }
                        }
                    });
                }
            });
        };
    }
}, false);