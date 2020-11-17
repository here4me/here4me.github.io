/* global here4Me */

here4Me.addEventListener('calculatingBoundingBox', function (message) {

    document.getElementById("postForm").style.display = 'none';
    document.getElementById("postProgress").style.display = 'block';
    document.getElementById("messageBody").innerHTML = message.percentComplete + '%';
});

let postButtonElement = document.getElementById("postbutton");
postButtonElement.addEventListener('click', function (event) {

    let title = document.getElementById("postMessageTitle").value;
    title = (title === null || title.trim() === '') ? null : title;
    if (title === null || title.trim() === '') {

        return;
    }

    let postMessageValue = document.getElementById("postMessage").value;
    if (postMessageValue === null || postMessageValue.trim() === '') {

        return;
    }

    let filterSrc = "let returnValue = true;\n";
    filterSrc += "let now = new Date();\n";
    let daysOfTheWeekElement = document.getElementById("daysOfTheWeek");

    if (daysOfTheWeekElement.length > 0) {

        let matchCount = 0;
        for (var i = 0; i < daysOfTheWeekElement.length; i++) {

            if (daysOfTheWeekElement.options[i].selected) {

                if (matchCount === 0) {

                    filterSrc += 'returnValue = returnValue && (';
                } else {

                    filterSrc += ' || ';
                }
                filterSrc += '(now.getDay() === ' + parseInt(daysOfTheWeekElement.options[i].value) + ')';
                matchCount++;
            }
        }

        if (matchCount > 0) {

            filterSrc += ');\n';
        }
    }

    let fromTimeValue = document.getElementById("fromTime").value;
    if (fromTimeValue !== null && fromTimeValue.trim() !== '') {

        filterSrc += 'returnValue = returnValue && (now.getHours() >= ' + parseInt(fromTimeValue) + ');\n';
    }

    let thruTimeValue = document.getElementById("thruTime").value;
    if (thruTimeValue !== null && thruTimeValue.trim() !== '') {

        filterSrc += 'returnValue = returnValue && (now.getHours() <= ' + parseInt(thruTimeValue) + ');\n';
    }
    filterSrc += 'return returnValue;';

    let post = {
        title: title,
        userDisplayName: null,
        contentType: 'hello-world-data',
        acceptedSiteIds: ['SITE-ID'],
        acceptedSiteOwnerIds: ['0b9d9a9ad5f2169a5bdf393e5002a938'],
        isUserProfilePost: false,
        filterSource: filterSrc,
        content: postMessageValue
    };

    here4Me.createPost(post, function (response) {

        document.getElementById("postForm").style.display = 'block';
        document.getElementById("postProgress").style.display = 'none';
        document.getElementById("messageBody").innerHTML = '&nbsp;';
    });
});