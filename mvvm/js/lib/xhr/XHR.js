/**
 * @class {XHR} XHR
 */
function XHR() {

    //
    // Private and public method declarations
    //

    /**
     * @param {XhrModel} model
     * @param {XhrListener} listener
     */
    this.send = function (model, listener) {
        // create a request object
        var req = createXMLHTTPObject();
        if (!req) {
            listener.error("could not create request object for this browser");
        }

        // open method signature:
        //       DOMString method, DOMString url, optional boolean async,
        //              optional DOMString? user, optional DOMString? password
        req.open(model.method, model.url, model.async);

        // user added headers
        for (var key in model.headers) {
            try {
                var value = model.headers[key];
                if (!(value instanceof Object)) {
                    req.setRequestHeader(key, model.headers[key]);
                }
            } catch (e) {
            }
        }


        // for each state change, this method will be called
        /*
         onreadystatechange
         Stores a function (or the name of a function)
         to be called automatically each time the readyState property changes

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
        req.onreadystatechange = function () {

            // cancel flag indicates that this request should be cancelled
            if (model.cancelled == true) {
                try {
                    if (req.abort != null) {
                        req.abort();
                    }
                    // notify listener that the request is cancelled
                    listener.cancelled()
                } catch (e) {
                    Logger.debug("exception while aborting the request, e: " + e);
                    // notify listener about error
                    listener.error(e);
                }
            } else {
                // handle states from 1 to 4
                if (req.readyState == 0) {
                    //0	UNSENT	open() has not been called yet.
                    listener.requestNotInitialized();
                } else if (req.readyState == 1) {
                    //1	OPENED	send() has not been called yet.
                    listener.serverConnectionEstablished();
                } else if (req.readyState == 2) {
                    //2	HEADERS_RECEIVED	send() has been called, and headers and status are available.
                    listener.requestReceived();
                } else if (req.readyState == 3) {
                    //3	LOADING	Downloading; responseText holds partial data.
                    listener.processingRequest();
                } else if (req.readyState == 4) {
                    // 4	DONE	The operation is complete.
                    if (req != null && req != undefined) {
                        // create a response reference
                        var response = null;
                        if (req.response != null && req.response != undefined) {
                            // if the response object under request is available set it to response reference
                            response = req.response;
                        } else if (req.responseText != null && req.responseText != undefined) {
                            // or the reponseText should be set
                            response = req.responseText;
                        } else {
                            listener.error("response and responseText empty!");
                        }
                        // response reference should point to a JSON Object
                        // if it is not an JSON Object, call JSON.parse to convert it to an Object
                        if (response != null) {
                            try {
                                if (!(req.response instanceof Object)) {
                                    response = JSON.parse(response);
                                }
                            } catch (e) {
                                // we can safely ignore this exception since
                                // response does not need to be a JSON
                            }
                            // call the last lifecycle method
                            listener.requestFinishedResponseReady(req, response);
                        }
                    } else {
                        listener.error("req is not defined!");
                    }
                }
            }
        };

        // request is finished already and response is ready,
        // so do not call send() method again, readyState should be less then 4
        if (req.readyState != 4) {
            try {
                req.send(model.data);
            } catch (e) {
                listener.error(e);
            }
        }

        /**
         * factory that returns an XHR object implemented by the underlying platform
         * @returns {Object} XHRObject
         */
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

}