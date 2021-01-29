/* global here4Me */

function getMetaData() {

    let metaData = {
        applicationName: null,
        author: null
    };

    let metaElements = document.getElementsByTagName('meta');
    for (let i = 0; i < metaElements.length; i++) {

        let name = getAttribute('name', metaElements[i]);
        name = (name) ? name.toLowerCase() : name;
        let content = getAttribute('content', metaElements[i]);
        switch (name) {

            case 'application-name':
                metaData.applicationName = content;
                break;
            case 'author':
                metaData.author = content;
                break;
            default:
                continue;
        }

        if (metaData.applicationName !== null && metaData.author !== null) {

            return metaData;
        }
    }

    return metaData;
}

function getLinks() {

    let links = [];
    let linkElements = document.getElementsByTagName('link');
    for (let i = 0; i < linkElements.length; i++) {

        let rel = getAttribute('rel', linkElements[i]);
        rel = (rel) ? rel.toLowerCase() : rel;
        let title = getAttribute('title', linkElements[i]);
        let href = getAttribute('href', linkElements[i]);
        if (rel === 'stylesheet' || rel === 'slide' || rel === 'section') {

            links.push({
                rel: rel,
                title: title,
                href: href
            });
        }
    }

    return links;
}

function getAttribute(name, element) {

    let attribute = element.getAttribute(name);
    return (attribute) ? attribute.trim() : attribute;
}

window.addEventListener('load', function () {

    let metaData = getMetaData();
    let links = getLinks();
    let type = (metaData.applicationName === null && metaData.author === null) ? 'slide' : 'post';
    let parentMessage = {
        type: type,
        metaData: metaData,
        links: links
    };

    if (type === 'post') {

        return;
    }

    if (type === 'slide') {

        return;
    }
});

here4Me.addEventListener('initialize', function (message) {

    let mySwipe = Swipe(document.getElementById('slider'), {
        callback: function (index, elem) {},
        transitionEnd: function (index, elem) {
            here4Me.scrollTo(0, 0);
            here4Me.resize();
        }
    });
});