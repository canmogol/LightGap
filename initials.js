// add fast click for IE
var _fastClickAttached = true;
var _fastClickException = null;
try {
    if (window) {
        window.addEventListener('load', function () {
            try {
                FastClick.attach(document.body);
                _fastClickAttached = true
            } catch (e) {
                console.debug("exception occured at load for FastClick.attach(document.body), e:" + e);
            }
        }, false);
    }
} catch (e) {
    _fastClickAttached = false;
    _fastClickException = "exception occured while adding fastclick to event listener load, e:" + e;
}
// add fast click for rest of the browsers
try {
    FastClick.attach(document.body);
    _fastClickAttached = true
} catch (e) {
    _fastClickException = "exception occured while attaching fastclick, e:" + e;
}
if (!_fastClickAttached) {
    console.debug(_fastClickException);
}

    // define storage funtions
try {
    function putStorage(key, value) {
        localStorage.setItem(key, value);
    };

    function getStorage(key) {
        return localStorage.getItem(key);
    };
} catch (e) {
    console.debug("exception occured while setting storage functions, e:" + e);
}

// ajax request
function sendRequest(handler/*handler object with example signature below*/) {
    /*
     {
     url: "http://ip.jsontest.com",
     method: "GET",
     cancelled: false,
     async: true,
     headers: {"x-http-requester":"X212"},
     data: {"username":"asd", "password":"123"},
     error : function(e){console.log("error: "+e)},
     requestNotInitialized : function(){console.log("requestNotInitialized")},
     serverConnectionEstablished : function(){console.log("serverConnectionEstablished")},
     requestReceived : function(){console.log("requestReceived")},
     processingRequest : function(){console.log("processingRequest")},
     requestFinishedResponseReady : function(req){console.log("CALL CALLBACK! requestFinishedResponseReady, req: "+JSON.stringify(req))}
     }
     */

    /*
     onreadystatechange
     Stores a function (or the name of a function) to be called automatically each time the readyState property changes

     readyState
     Holds the status of the XMLHttpRequest. Changes from 0 to 4:
     0: request not initialized
     1: server connection established
     2: request received
     3: processing request
     4: request finished and response is ready

     status
     200: "OK"
     404: Page not found
     ...
     */
    var req = createXMLHTTPObject();
    if (!req) {
        handler.error("could not create request object for this browser");
    }
    // DOMString method, DOMString url, optional boolean async, optional DOMString? user, optional DOMString? password
    req.open(handler.method, handler.url, handler.async);

    try {
        // default headers
        //req.setRequestHeader('User-Agent', 'XMLHTTP/1.0');
    } catch (e) {
    }

    // user added headers
    for (var key in handler.headers) {
        try {
            var value = handler.headers[key];
            if (!(value instanceof Object)) {
                req.setRequestHeader(key, handler.headers[key]);
            }
        } catch (e) {
        }
    }
    //
    if (handler.method == "POST") {
        req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    }

    // for each state change, this method will be called
    req.onreadystatechange = function () {
        if (handler.cancelled == true) {
            try {
                if (req.abort != null) {
                    req.abort();
                }
            } catch (e) {
                console.debug("exception while aborting the request, e: " + e);
            }
            if (!handler.onCancelled) {
                handler.onCancelled = true;
                handler.onCancel();
            }
        } else {
            if (req.readyState == 0) {
                handler.requestNotInitialized();
            } else if (req.readyState == 1) {
                handler.serverConnectionEstablished();
            } else if (req.readyState == 2) {
                handler.requestReceived();
            } else if (req.readyState == 3) {
                handler.processingRequest();
            } else if (req.readyState == 4) {
                var response = req.response;
                if (req != null && req != undefined && req.response != null && req.response != undefined) {
                    if (!(req.response instanceof Object)) {
                        response = JSON.parse(req.response);
                    }
                }
                handler.requestFinishedResponseReady(req, response);
            }
        }
    };
    // request is finished already and response is ready, so do not call send() method again
    if (req.readyState != 4) {
        try {
            req.send(handler.data);
        } catch (e) {
            handler.error(e);
        }
    }
}

function createXMLHTTPObject() {
    var XMLHttpFactories = [
        function () {
            return new XMLHttpRequest()
        },
        function () {
            return new ActiveXObject("Msxml2.XMLHTTP")
        },
        function () {
            return new ActiveXObject("Msxml3.XMLHTTP")
        },
        function () {
            return new ActiveXObject("Microsoft.XMLHTTP")
        }
    ];
    var req = false;
    for (var i = 0; i < XMLHttpFactories.length; i++) {
        try {
            req = XMLHttpFactories[i]();
        } catch (e) {
            continue;
        }
        break;
    }
    return req;
}
