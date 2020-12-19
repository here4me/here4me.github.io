/* global here4Me */

here4Me.scrollTo(0, 0);

let enablePostButtonElement = document.getElementById('enablePostButton');
if (enablePostButtonElement) {
    
    enablePostButtonElement.onclick = function () {
        enablePostButtonElement.style.display = 'none';
        here4Me.enablePostButton();
    };
}