/* global here4Me */

const CONTENT_TYPE = 'hello-world-data';
const SITE_ID = '9bdd7936d8a3a39c97e4e152795c68f4';
const SITE_OWNER_ID = '8ae1a3cf2fa609656eaa447f8fe99b15';

let postFormElement = document.getElementById('postForm');
let postTitleElement = document.getElementById('postTitle');
let postMessageElement = document.getElementById('postMessage');
let daysOfTheWeekElement = document.getElementById('daysOfTheWeek');
let fromTimeElement = document.getElementById('fromTime');
let thruTimeElement = document.getElementById('thruTime');
let postButtonElement = document.getElementById('postbutton');
let postProgressElement = document.getElementById('postProgress');
let postProgressMessageElement = document.getElementById('postProgressMessage');
let isPostInProgress = false;

postButtonElement.addEventListener('click', function (event) {

    let post = buildPost();
    if (post === null) {

        return;
    }

    isPostInProgress = true;
    here4Me.createPost(post, function (response) {

        if (response.statusCode === 'SUCCESSFUL') {

            here4Me.broadcastMessage('POST_CREATED');
        }
        clearPostForm();
        showPostForm();
        isPostInProgress = false;
    });
});

here4Me.addEventListener('calculatingBoundingBox', function (status) {

    let percentComplete = status.percentComplete;
    if(isPostInProgress) {
        
        showBoundingBoxProgress(percentComplete);
    }
});

function showBoundingBoxProgress(percentComplete) {

    postFormElement.style.display = 'none';
    postProgressElement.style.display = 'block';
    postProgressMessageElement.innerHTML = percentComplete + '%';
}

function showPostForm() {

    postFormElement.style.display = 'block';
    postProgressElement.style.display = 'none';
    postProgressMessageElement.innerHTML = '&nbsp;';
}

function buildPost() {

    let title = postTitleElement.value;
    let postMessage = document.getElementById('postMessage').value;
    if (isEmpty(title) || isEmpty(postMessage)) {

        return null;
    }

    let post = {
        title: title,
        userDisplayName: null,
        contentType: CONTENT_TYPE,
        acceptedSiteIds: [SITE_ID],
        acceptedSiteOwnerIds: [SITE_OWNER_ID],
        isUserProfilePost: false,
        filter: buildDateTimeFilter(),
        content: postMessage
    };

    return post;
}

function buildDateTimeFilter() {

    let filter = 'let returnValue = true;\n';
    filter += 'let now = new Date();\n';
    filter = appendDayOfWeekFilter(filter);
    filter = appendFromTimeFilter(filter);
    filter = appendThruTimeFilter(filter);
    filter += 'return returnValue;';

    return filter;
}

function appendDayOfWeekFilter(filter) {

    if (daysOfTheWeekElement.length > 0) {

        let matchCount = 0;
        for (var i = 0; i < daysOfTheWeekElement.length; i++) {

            if (daysOfTheWeekElement.options[i].selected) {

                if (matchCount === 0) {

                    filter += 'returnValue = returnValue && (';
                } else {

                    filter += ' || ';
                }
                filter += '(now.getDay() === ' + parseInt(daysOfTheWeekElement.options[i].value) + ')';
                matchCount++;
            }
        }

        if (matchCount > 0) {

            filter += ');\n';
        }
    }

    return filter;
}

function appendFromTimeFilter(filter) {

    let fromTimeValue = fromTimeElement.value;
    if (!isEmpty(fromTimeValue)) {

        filter += 'returnValue = returnValue && (now.getHours() >= ' + parseInt(fromTimeValue) + ');\n';
    }

    return filter;
}

function appendThruTimeFilter(filter) {

    let thruTimeValue = thruTimeElement.value;
    if (!isEmpty(thruTimeValue)) {

        filter += 'returnValue = returnValue && (now.getHours() <= ' + parseInt(thruTimeValue) + ');\n';
    }

    return filter;
}

function clearPostForm() {

    postTitleElement.value = null;
    clearSelectElement(postMessageElement);
    clearSelectElement(daysOfTheWeekElement);
    clearSelectElement(fromTimeElement);
    clearSelectElement(thruTimeElement);
}

function clearSelectElement(selectElement) {

    for (var i = 0; i < selectElement.length; i++) {

        let option = selectElement.options[i];
        if (i === 0 && option.value === '') {
            option.selected = true;
        }
        option.selected = false;
    }
}

function isEmpty(value) {

    value = (value === null || value.trim() === '') ? null : value;
    if (value === null || value.trim() === '') {

        return true;
    }

    return false;
}