/* global here4Me */

here4Me.scrollTo(0, 0);

here4Me.addEventListener('initialize', function (message) {
    
    if(!message.userIsAnonymous) {
        
        window.location = "./notAnonymous.html";
        return;
    }
    
    document.body.style.display = 'block';
});

here4Me.addEventListener('openPost', function (post) {

    if (post === null) {

        window.location = "./notFromQRCode.html";
        return;
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