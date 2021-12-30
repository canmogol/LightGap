// ajax request
Request = {

    send: function (handler) {
        /*
         onreadystatechange
         Stores a function (or the name of a function) to be called automatically each time the readyState property changes.

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
        if (req === false) {
            handler.onError("could not create request object for this browser");
        } else {
            registerListener(req, handler);
            openConnection(req, handler);
        }

        // add headers
        function addHeaders(req, handler) {
            // add headers to request 
            for (var key in handler.headers) {
                try {
                    var value = handler.headers[key];
                    if (!(value instanceof Object)) {
                        req.setRequestHeader(key, handler.headers[key]);
                    }
                } catch (e) {
                    console.warn("Could not add header to request, error: " + e, e);
                }
            }
        }

        // register the state change listener
        function registerListener(req, handler) {
            // for each state change, this method will be called
            req.onreadystatechange = function (event) {
                if (handler.cancel === true) {
                    try {
                        if (req.abort != null) {
                            req.abort();
                        }
                        if (handler.aborted === undefined || handler.aborted === false) {
                            handler.aborted = true;
                            handler.onCancel(req);
                        }
                    } catch (e) {
                        console.debug("exception while aborting the request, e: " + e);
                        handler.onError(e);
                    }
                } else {
                    if (req.readyState == 0) {
                        handler.requestNotInitialized(req); //0	UNSENT	open() has not been called yet.
                    } else if (req.readyState == 1) {
                        addHeaders(req, handler);
                        handler.serverConnectionEstablished(req); //1	OPENED	send() has not been called yet.
                    } else if (req.readyState == 2) {
                        handler.requestReceived(req); //2	HEADERS_RECEIVED	send() has been called, and headers and status are available.
                    } else if (req.readyState == 3) {
                        handler.processingRequest(req); //3	LOADING	Downloading; responseText holds partial data.
                    } else if (req.readyState == 4) {
                        // 4	DONE	The operation is complete.
                        if (req != null && req != undefined) {
                            var response = null;
                            if (req.response != null && req.response != undefined) {
                                response = req.response;
                            } else if (req.responseText != null && req.responseText != undefined) {
                                response = req.responseText;
                            } else if (req.responseXML != null && req.responseXML != undefined) {
                                response = req.responseXML;
                            } else {
                                handler.onError("response and responseText are empty!");
                            }
                            if (response != null) {
                                handler.requestFinishedResponseReady(req, response);
                            } else {
                                handler.onError("response is NULL");
                            }
                        } else {
                            handler.onError("'req' object is not defined!");
                        }
                    }
                }
            };
        }

        // open a connection
        function openConnection(req, handler) {
            // DOMString method, DOMString url, optional boolean async, optional DOMString? user, optional DOMString? password
            req.open(handler.method, handler.url, handler.async);

            // request is finished already and response is ready, so do not call send() method again
            if (req.readyState != 4) {
                try {
                    req.send(handler.data);
                } catch (e) {
                    handler.onError(e);
                }
            } else {
                handler.onError("could not send the request, it's already finished");
            }
        }

        // create a request object
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
    }

};
