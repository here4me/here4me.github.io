/* global here4Me */

let postButtonElement = document.getElementById("postButton");
if (postButtonElement !== null) {

    document.getElementById("postButton").addEventListener('click', function (event) {

        let title = document.getElementById("title").value;
        title = (title === null || title.trim() === '') ? null : title;

        let post = {
            title: title,
            userDisplayName: null,
            contentType: 'note-data',
            acceptedSiteIds: ['fa464dc37c12f40b6fa61ae204202921'],
            acceptedSiteOwnerIds: ['0b9d9a9ad5f2169a5bdf393e5002a938'],
            isUserProfilePost: true,
            filterSource: 'return true;',
            content: document.getElementById("message").value
        };
        here4Me.createPost(post, function (response) {
            
            here4Me.showHereForMe();
        });
    });
}