let here4Me = {
    viewType: null,
    userId: null,
    homeId: null,
    siteId: null,
    currentRefId: 0,
    initializeEventListeners: [],
    qrCodeScanEventListeners: [],
    qrCodeScanLocationEventListeners: [],
    userQRCodeContentIdEventListeners: [],
    openPostEventListeners: [],
    closePostEventListeners: [],
    broadcastMessageEventListeners: [],
    calculatingBoundingBoxEventListeners: [],
    callbackFunctions: [],
    addEventListener: function (eventType, handler) {

        let eventListeners;
        switch (eventType) {
            case 'initialize':
                eventListeners = here4Me.initializeEventListeners;
                break;
            case 'qrCodeScan':
                eventListeners = here4Me.qrCodeScanEventListeners;
                break;
            case 'userQRCodeContentId':
                eventListeners = here4Me.userQRCodeContentIdEventListeners;
                break;
            case 'openPost':
                eventListeners = here4Me.openPostEventListeners;
                break;
            case 'closePost':
                eventListeners = here4Me.closePostEventListeners;
                break;
            case 'broadcastMessage':
                eventListeners = here4Me.broadcastMessageEventListeners;
                break;
            case 'calculatingBoundingBox':
                eventListeners = here4Me.calculatingBoundingBoxEventListeners;
                break;
            default:
                return;
        }
        eventListeners.push(handler);
    },
    enableScanner: function () {

        parent.postMessage({
            viewType: here4Me.viewType,
            homeId: here4Me.homeId,
            messageType: 'enableScanner'
        }, '*');
    },
    disableScanner: function () {

        parent.postMessage({
            viewType: here4Me.viewType,
            homeId: here4Me.homeId,
            messageType: 'disableScanner'
        }, '*');
    },
    enablePostButton: function () {

        parent.postMessage({
            viewType: here4Me.viewType,
            homeId: here4Me.homeId,
            messageType: 'enablePostButton'
        }, '*');
    },
    disablePostButton: function () {

        parent.postMessage({
            viewType: here4Me.viewType,
            homeId: here4Me.homeId,
            messageType: 'disablePostButton'
        }, '*');
    },
    enableScanButton: function () {

        parent.postMessage({
            viewType: here4Me.viewType,
            homeId: here4Me.homeId,
            messageType: 'enableScanButton'
        }, '*');
    },
    disableScanButton: function () {

        parent.postMessage({
            viewType: here4Me.viewType,
            homeId: here4Me.homeId,
            messageType: 'disableScanButton'
        }, '*');
    },
    enableConfigurationButton: function () {

        parent.postMessage({
            viewType: here4Me.viewType,
            homeId: here4Me.homeId,
            messageType: 'enableConfigurationButton'
        }, '*');
    },
    disableConfigurationButton: function () {

        parent.postMessage({
            viewType: here4Me.viewType,
            homeId: here4Me.homeId,
            messageType: 'disableConfigurationButton'
        }, '*');
    },
    showHereForMe: function () {

        parent.postMessage({
            viewType: here4Me.viewType,
            homeId: here4Me.homeId,
            messageType: 'showHereForMe'
        }, '*');
    },
    showHereForMeWithMenu: function () {

        parent.postMessage({
            viewType: here4Me.viewType,
            homeId: here4Me.homeId,
            messageType: 'showHereForMeWithMenu'
        }, '*');
    },
    showSiteHome: function () {

        parent.postMessage({
            viewType: here4Me.viewType,
            homeId: here4Me.homeId,
            messageType: 'showSiteHome'
        }, '*');
    },
    showSiteHomeWithMenu: function () {

        parent.postMessage({
            viewType: here4Me.viewType,
            homeId: here4Me.homeId,
            messageType: 'showSiteHomeWithMenu'
        }, '*');
    },
    showHereForMePost: function () {

        parent.postMessage({
            viewType: here4Me.viewType,
            homeId: here4Me.homeId,
            messageType: 'showHereForMePost'
        }, '*');
    },
    showSitePost: function () {

        parent.postMessage({
            viewType: here4Me.viewType,
            homeId: here4Me.homeId,
            messageType: 'showSitePost'
        }, '*');
    },
    showHereForMeScan: function () {

        parent.postMessage({
            viewType: here4Me.viewType,
            homeId: here4Me.homeId,
            messageType: 'showHereForMeScan'
        }, '*');
    },
    showSiteScan: function () {

        parent.postMessage({
            viewType: here4Me.viewType,
            homeId: here4Me.homeId,
            messageType: 'showSiteScan'
        }, '*');
    },
    showHereForMeConfiguration: function () {

        parent.postMessage({
            viewType: here4Me.viewType,
            homeId: here4Me.homeId,
            messageType: 'showHereForMeConfiguration'
        }, '*');
    },
    showSiteConfiguration: function () {

        parent.postMessage({
            viewType: here4Me.viewType,
            homeId: here4Me.homeId,
            messageType: 'showSiteConfiguration'
        }, '*');
    },
    close: function () {

        parent.postMessage({
            viewType: here4Me.viewType,
            homeId: here4Me.homeId,
            messageType: 'closeHome'
        }, '*');
    },
    setUserQRCodeContentId: function (qrCodeContentId, callback) {

        if (qrCodeContentId === null ||
                qrCodeContentId === undefined ||
                typeof qrCodeContentId !== 'string' ||
                qrCodeContentId.length !== 32) {

            return;
        }

        if (typeof callback !== 'function') {
            callback = null;
        }

        parent.postMessage({
            viewType: here4Me.viewType,
            homeId: here4Me.homeId,
            messageType: 'setUserQRCodeContentId',
            refId: here4Me.currentRefId,
            qrCodeContentId: qrCodeContentId
        }, '*');
        here4Me.callbackFunctions.push({
            refId: here4Me.currentRefId,
            callback: callback,
            timestamp: Date.now()
        });
        here4Me.currentRefId++;
    },
    getUserQRCodeContentId: function (callback) {

        if (typeof callback !== 'function') {
            callback = null;
        }

        parent.postMessage({
            viewType: here4Me.viewType,
            homeId: here4Me.homeId,
            messageType: 'getUserQRCodeContentId',
            refId: here4Me.currentRefId
        }, '*');
        here4Me.callbackFunctions.push({
            refId: here4Me.currentRefId,
            callback: callback,
            timestamp: Date.now()
        });
        here4Me.currentRefId++;
    },
    clearUserQRCodeContentId: function (callback) {

        if (typeof callback !== 'function') {
            callback = null;
        }

        parent.postMessage({
            viewType: here4Me.viewType,
            homeId: here4Me.homeId,
            messageType: 'clearUserQRCodeContentId',
            refId: here4Me.currentRefId
        }, '*');
        here4Me.callbackFunctions.push({
            refId: here4Me.currentRefId,
            callback: callback,
            timestamp: Date.now()
        });
        here4Me.currentRefId++;
    },
    createQRCodeContent: function (content, callback) {

        if (content === null || content === undefined || typeof content !== 'object') {

            return;
        }

        if (typeof callback !== 'function') {
            callback = null;
        }

        parent.postMessage({
            viewType: here4Me.viewType,
            homeId: here4Me.homeId,
            messageType: 'createQRCodeContent',
            refId: here4Me.currentRefId,
            content: content
        }, '*');
        here4Me.callbackFunctions.push({
            refId: here4Me.currentRefId,
            callback: callback,
            timestamp: Date.now()
        });
        here4Me.currentRefId++;
    },
    readQRCodeContent: function (id, callback) {

        if (typeof callback !== 'function') {
            callback = null;
        }

        parent.postMessage({
            viewType: here4Me.viewType,
            homeId: here4Me.homeId,
            messageType: 'readQRCodeContent',
            refId: here4Me.currentRefId,
            id: id}, '*');
        here4Me.callbackFunctions.push({
            refId: here4Me.currentRefId,
            callback: callback,
            timestamp: Date.now()
        });
        here4Me.currentRefId++;
    },
    readAllQRCodeContent: function (callback) {

        if (typeof callback !== 'function') {
            callback = null;
        }

        parent.postMessage({
            viewType: here4Me.viewType,
            homeId: here4Me.homeId,
            messageType: 'readAllQRCodeContent',
            refId: here4Me.currentRefId}, '*');
        here4Me.callbackFunctions.push({
            refId: here4Me.currentRefId,
            callback: callback,
            timestamp: Date.now()
        });
        here4Me.currentRefId++;
    },
    updateQRCodeContent: function (content, callback) {

        if (content === null || content === undefined || typeof content !== 'object') {

            return;
        }

        if (typeof callback !== 'function') {
            callback = null;
        }

        parent.postMessage({
            viewType: here4Me.viewType,
            homeId: here4Me.homeId,
            messageType: 'updateQRCodeContent',
            refId: here4Me.currentRefId,
            content: content
        }, '*');
        here4Me.callbackFunctions.push({
            refId: here4Me.currentRefId,
            callback: callback,
            timestamp: Date.now()
        });
        here4Me.currentRefId++;
    },
    deleteQRCodeContent: function (content, callback) {

        if (content === null || content === undefined || typeof content !== 'object') {

            return;
        }

        if (typeof callback !== 'function') {
            callback = null;
        }

        parent.postMessage({
            viewType: here4Me.viewType,
            homeId: here4Me.homeId,
            messageType: 'deleteQRCodeContent',
            refId: here4Me.currentRefId,
            content: content
        }, '*');
        here4Me.callbackFunctions.push({
            refId: here4Me.currentRefId,
            callback: callback,
            timestamp: Date.now()
        });
        here4Me.currentRefId++;
    },
    createPost: function (post, callback) {

        if ((post === null ||
                post === undefined ||
                typeof post !== 'object') &&
                (callback === null ||
                        callback === undefined ||
                        typeof callback !== 'function')) {

            return;
        }

        parent.postMessage({
            viewType: here4Me.viewType,
            homeId: here4Me.homeId,
            siteId: here4Me.siteId,
            messageType: 'createPost',
            refId: here4Me.currentRefId,
            post: post
        }, '*');
        here4Me.callbackFunctions.push({
            refId: here4Me.currentRefId,
            callback: callback,
            timestamp: Date.now()
        });
        here4Me.currentRefId++;
    },
    readPost: function (id, callback) {

        if (typeof callback !== 'function') {
            callback = null;
        }

        parent.postMessage({
            viewType: here4Me.viewType,
            homeId: here4Me.homeId,
            messageType: 'readPost',
            refId: here4Me.currentRefId,
            id: id
        }, '*');
        here4Me.callbackFunctions.push({
            refId: here4Me.currentRefId,
            callback: callback,
            timestamp: Date.now()
        });
        here4Me.currentRefId++;
    },
    readAllPosts: function (callback) {

        if (typeof callback !== 'function') {
            callback = null;
        }

        parent.postMessage({
            viewType: here4Me.viewType,
            homeId: here4Me.homeId,
            messageType: 'readAllPosts',
            refId: here4Me.currentRefId
        }, '*');
        here4Me.callbackFunctions.push({
            refId: here4Me.currentRefId,
            callback: callback,
            timestamp: Date.now()
        });
        here4Me.currentRefId++;
    },
    updatePost: function (post, service, callback) {

        if (post === null || post === undefined || typeof post !== 'object') {

            return;
        }

        if (typeof callback !== 'function') {
            callback = null;
        }

        parent.postMessage({
            viewType: here4Me.viewType,
            homeId: here4Me.homeId,
            messageType: 'updatePost',
            refId: here4Me.currentRefId,
            post: post,
            service: service
        }, '*');
        here4Me.callbackFunctions.push({
            refId: here4Me.currentRefId,
            callback: callback,
            timestamp: Date.now()
        });
        here4Me.currentRefId++;
    },
    deletePost: function (post, callback) {

        if (post === null || post === undefined || typeof post !== 'object') {

            return;
        }

        if (typeof callback !== 'function') {
            callback = null;
        }

        parent.postMessage({
            viewType: here4Me.viewType,
            homeId: here4Me.homeId,
            messageType: 'deletePost',
            refId: here4Me.currentRefId,
            post: post
        }, '*');
        here4Me.callbackFunctions.push({
            refId: here4Me.currentRefId,
            callback: callback,
            timestamp: Date.now()
        });
        here4Me.currentRefId++;
    },
    createRecord: function (record, callback) {

        if (record === null || record === undefined || typeof record !== 'object') {

            return;
        }

        if (typeof callback !== 'function') {
            callback = null;
        }

        parent.postMessage({
            viewType: here4Me.viewType,
            homeId: here4Me.homeId,
            messageType: 'createRecord',
            refId: here4Me.currentRefId,
            record: record
        }, '*');
        here4Me.callbackFunctions.push({
            refId: here4Me.currentRefId,
            callback: callback,
            timestamp: Date.now()
        });
        here4Me.currentRefId++;
    },
    readRecord: function (id, callback) {

        if (typeof callback !== 'function') {
            callback = null;
        }

        parent.postMessage({
            viewType: here4Me.viewType,
            homeId: here4Me.homeId,
            messageType: 'readRecord',
            refId: here4Me.currentRefId,
            id: id
        }, '*');
        here4Me.callbackFunctions.push({
            refId: here4Me.currentRefId,
            callback: callback,
            timestamp: Date.now()
        });
        here4Me.currentRefId++;
    },
    readAllRecords: function (entityId, callback) {

        if (typeof callback !== 'function') {
            callback = null;
        }

        parent.postMessage({
            viewType: here4Me.viewType,
            homeId: here4Me.homeId,
            messageType: 'readAllRecords',
            refId: here4Me.currentRefId,
            entityId: entityId
        }, '*');
        here4Me.callbackFunctions.push({
            refId: here4Me.currentRefId,
            callback: callback,
            timestamp: Date.now()
        });
        here4Me.currentRefId++;
    },
    updateRecord: function (record, callback) {

        if (record === null || record === undefined || typeof record !== 'object') {

            return;
        }

        if (typeof callback !== 'function') {
            callback = null;
        }

        parent.postMessage({
            viewType: here4Me.viewType,
            homeId: here4Me.homeId,
            messageType: 'updateRecord',
            refId: here4Me.currentRefId,
            record: record
        }, '*');
        here4Me.callbackFunctions.push({
            refId: here4Me.currentRefId,
            callback: callback,
            timestamp: Date.now()
        });
        here4Me.currentRefId++;
    },
    deleteRecord: function (record, callback) {

        if (record === null || record === undefined || typeof record !== 'object') {

            return;
        }

        if (typeof callback !== 'function') {
            callback = null;
        }

        parent.postMessage({
            viewType: here4Me.viewType,
            homeId: here4Me.homeId,
            messageType: 'deleteRecord',
            refId: here4Me.currentRefId,
            record: record
        }, '*');
        here4Me.callbackFunctions.push({
            refId: here4Me.currentRefId,
            callback: callback,
            timestamp: Date.now()
        });
        here4Me.currentRefId++;
    },
    broadcastMessage: function (message) {

        parent.postMessage({
            homeId: here4Me.homeId,
            messageType: 'broadcastMessage',
            message: message
        }, '*');
    },
    postServiceMessage: function (message, callback) {

        if (message === null || message === undefined) {
            return;
        }

        if (typeof callback !== 'function') {
            callback = null;
        }

        parent.postMessage({
            viewType: here4Me.viewType,
            homeId: here4Me.homeId,
            messageType: 'serviceMessage',
            refId: here4Me.currentRefId,
            destination: 'POST',
            message: message
        }, '*');

        here4Me.callbackFunctions.push({
            refId: here4Me.currentRefId,
            callback: callback,
            timestamp: Date.now()
        });
        here4Me.currentRefId++;
    },
    qrCodeServiceMessage: function (message, callback) {

        if (message === null || message === undefined) {
            return;
        }

        if (typeof callback !== 'function') {
            callback = null;
        }

        parent.postMessage({
            viewType: here4Me.viewType,
            homeId: here4Me.homeId,
            messageType: 'serviceMessage',
            refId: here4Me.currentRefId,
            destination: 'QR_CODE',
            message: message
        }, '*');

        here4Me.callbackFunctions.push({
            refId: here4Me.currentRefId,
            callback: callback,
            timestamp: Date.now()
        });
        here4Me.currentRefId++;
    },
    removeTimedoutCallbackFunctions: function () {

        let now = Date.now();
        for (var i = 0; i < here4Me.callbackFunctions.length; i++) {

            let callbackFunction = here4Me.callbackFunctions[i];
            if (callbackFunction !== null &&
                    callbackFunction !== undefined &&
                    (now - callbackFunction.timestamp) >= 300000) {

                here4Me.callbackFunctions.splice(i, 1);
            }
        }
    }
};

function initializeHere4me() {

    let homeContent = document.getElementById('here4me');
    let currentDocumentWidth = homeContent.scrollWidth;
    let currentDocumentHeight = homeContent.scrollHeight;
    let currentWindoWidth = Number.MIN_VALUE;
    let currentWindowHeight = Number.MIN_VALUE;

    window.setInterval(here4Me.removeTimedoutCallbackFunctions, 15000);

    let eventMethod = (window.addEventListener) ? 'addEventListener' : 'attachEvent';
    let messageEvent = (eventMethod === 'attachEvent') ? 'onmessage' : 'message';
    window[eventMethod](messageEvent, function (e) {

        let data = e.data;
        if (typeof data === 'object') {

            if (data.type === 'windowResize') {

                let message = data.message;
                homeContent.style.width = message.width + 'px';
                homeContent.style.height = message.height + 'px';
                if ((homeContent.scrollWidth > 0
                        && homeContent.scrollHeight > 0)
                        && (currentDocumentWidth !== homeContent.scrollWidth ||
                                currentDocumentHeight !== homeContent.scrollHeight ||
                                currentWindoWidth !== message.width ||
                                currentWindowHeight !== message.height)) {

                    currentWindoWidth = message.width;
                    currentWindowHeight = message.height;
                    currentDocumentWidth = homeContent.scrollWidth;
                    currentDocumentHeight = homeContent.scrollHeight;
                    sendResizeMessage(currentDocumentHeight, currentDocumentWidth);
                    return;
                }
            }

            if (data.type === 'userQRCodeContentResponse' ||
                    data.type === 'qrCodeContentResponse' ||
                    data.type === 'postResponse' ||
                    data.type === 'recordResponse' ||
                    data.type === 'serviceMessageResponse') {

                for (var i = 0; i < here4Me.callbackFunctions.length; i++) {

                    let callbackFunction = here4Me.callbackFunctions[i];
                    if (callbackFunction !== null &&
                            callbackFunction !== undefined &&
                            callbackFunction.refId === data.message.refId) {

                        here4Me.callbackFunctions.splice(i, 1);
                        callbackFunction.callback(data.message.response);
                        break;
                    }
                }
            }

            if (data.type === 'qrCodeScan') {

                for (var i = 0; i < here4Me.qrCodeScanEventListeners.length; i++) {

                    here4Me.qrCodeScanEventListeners[i](data.message);
                }
                return;
            }

            if (data.type === 'qrCodeScanLocation') {

                for (var i = 0; i < here4Me.qrCodeScanLocationEventListeners.length; i++) {

                    here4Me.qrCodeScanLocationEventListeners[i](data.message);
                }
                return;
            }

            if (data.type === 'userQRCodeContentId') {

                for (var i = 0; i < here4Me.userQRCodeContentIdEventListeners.length; i++) {

                    here4Me.userQRCodeContentIdEventListeners[i](data.message);
                }
                return;
            }

            if (data.type === 'openPost') {

                for (var i = 0; i < here4Me.openPostEventListeners.length; i++) {

                    here4Me.openPostEventListeners[i](data.message);
                }
                return;
            }

            if (data.type === 'closePost') {

                for (var i = 0; i < here4Me.closePostEventListeners.length; i++) {

                    here4Me.closePostEventListeners[i](data.message);
                }
                return;
            }

            if (data.type === 'calculatingBoundingBox') {

                for (var i = 0; i < here4Me.calculatingBoundingBoxEventListeners.length; i++) {

                    here4Me.calculatingBoundingBoxEventListeners[i](data.message);
                }
                return;
            }

            if (data.type === 'initializeHomeView' ||
                    data.type === 'initializePostView' ||
                    data.type === 'initializeScanView' ||
                    data.type === 'initializeConfigurationView') {

                if (here4Me.homeId === null && data.homeId !== null) {

                    here4Me.homeId = data.homeId;
                }

                if (here4Me.siteId === null && data.siteId !== null) {

                    here4Me.siteId = data.siteId;
                }

                if (here4Me.userId === null && data.userId !== null) {

                    here4Me.userId = data.userId;
                }

                if (here4Me.viewType === null && data.viewType !== null) {

                    here4Me.viewType = data.viewType;
                }

                for (var i = 0; i < here4Me.initializeEventListeners.length; i++) {

                    here4Me.initializeEventListeners[i](data.userId);
                }

                return;
            }

            if (data.type === 'broadcastMessage') {

                for (var i = 0; i < here4Me.broadcastMessageEventListeners.length; i++) {

                    here4Me.broadcastMessageEventListeners[i](data.message);
                }
                return;
            }
        }
    });

    window.addEventListener('load', function () {

        let scaleCount = 0;
        let intervalId = window.setInterval(function () {

            document.getElementById('here4me').style.webkitTransform = 'scale(1)';
            if (++scaleCount === 10) {

                window.clearInterval(intervalId);
            }
        }, 100);
        sendResizeMessage(currentDocumentHeight, currentDocumentWidth);
    });

    window.addEventListener('resize', function () {

        let newHeight = homeContent.scrollHeight;
        var newWidth = homeContent.scrollWidth;
        if (Math.abs(currentDocumentHeight - newHeight) > 5 || Math.abs(currentDocumentWidth - newWidth) > 5) {

            currentDocumentHeight = newHeight;
            currentDocumentWidth = newWidth;
            sendResizeMessage(newHeight, newWidth);
        }
    });

    window.addEventListener('click', function () {

        let message = {
            messageType: 'documentClick'
        };

        parent.postMessage(message, '*');
    });

    document.addEventListener("touchstart", function () {

        let message = {
            messageType: 'documentClick'
        };

        parent.postMessage(message, '*');
    });
}

function sendResizeMessage(height, width) {

    let message = {
        viewType: here4Me.viewType,
        homeId: here4Me.homeId,
        siteId: here4Me.siteId,
        messageType: 'documentResize',
        height: height,
        width: width
    };
    console.log(message);
    parent.postMessage(message, '*');
}

initializeHere4me();
