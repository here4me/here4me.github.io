/* global here4Me */

let welcomeElement = document.getElementById('welcome');
let messageElement = document.getElementById('message');
let messageBodyElement = document.getElementById('messageBody');
let closeButtonElement = document.getElementById("closeButton");

here4Me.addEventListener('openPost', function (post) {

    enableSiteFunctionality();
    if (post === null) {

        showWelcome();
        return;
    }
    showHelloWorldContent(post.content);
});

here4Me.addEventListener('closePost', function (post) {

    here4Me.close();
});

closeButtonElement.addEventListener('click', function (event) {

    here4Me.close();
});

function enableSiteFunctionality() {

    here4Me.enableScanner();
    here4Me.enablePostButton();
    here4Me.enableScanButton();
    here4Me.enableConfigurationButton();
}

function showWelcome() {

    welcomeElement.style.display = 'block';
    messageElement.style.display = 'none';
    messageBodyElement.innerHTML = '';
}

function showHelloWorldContent(content) {

    welcomeElement.style.display = 'none';
    messageElement.style.display = 'block';
    messageBodyElement.innerHTML = content;
}