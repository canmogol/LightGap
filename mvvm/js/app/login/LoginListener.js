/**
 * Login Request Listener
 * @class {LoginListener} LoginListener
 */
LoginListener = function () {
};


/**
 * @extends {XhrListener}
 * @type {XhrListener}
 */
LoginListener.prototype = new XhrListener();

/**
 * error handler
 */
LoginListener.prototype.error = function (e) {
    console.log("Login listener, error: " + JSON.stringify(e));
};

/**
 * handle
 * @param {Object} request
 * @param {Object} response
 */
LoginListener.prototype.requestFinishedResponseReady = function (request, response) {
    console.log("Login listener, response: " + JSON.stringify(response));
};

