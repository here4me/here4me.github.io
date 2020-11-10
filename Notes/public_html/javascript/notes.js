/* global here4Me */

here4Me.openPostEventListeners.push(function (message) {
    
    if(message === null) {
        
        return;
    }
    document.getElementById("stickyNote").innerHTML = message.content;
    here4Me.enablePostButton();
});

let buttonElement = document.getElementById("closeButton");
buttonElement.addEventListener('click', function (event) {

    here4Me.close();
});