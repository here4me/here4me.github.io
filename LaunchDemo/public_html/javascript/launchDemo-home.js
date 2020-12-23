/* global here4Me */

let demoAgendaElement = document.getElementById('demoAgenda');
let postLocationOneElement = document.getElementById('postLocationOne');
let postLocationTwoElement = document.getElementById('postLocationTwo');

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
    switch(post.index) {
        case 1:
            postLocationOneElement.style.display = 'block';
            break;
        case 2:
            postLocationTwoElement.style.display = 'block';
            break;
        default:
            demoAgendaElement.style.display = 'block';
            break;
    }

    document.body.style.display = 'block';
    here4Me.resize();
});

here4Me.addEventListener('broadcastMessage', function (message) {

    switch (message) {

        case 'FIRST_POST_CREATED':
            window.location = "./slide3a.html";
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