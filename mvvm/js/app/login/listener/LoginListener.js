/**
 * Login Request Listener
 * @extends XhrListener
 * @param {LoginResponseListener} loginResponseListener
 * @class {LoginListener} LoginListener
 */
LoginListener = function (loginResponseListener) {
    this.loginResponseListener = loginResponseListener;
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
    // create response model
    var loginResponseModel = new LoginResponseModel(response.name);
    // notify response listener
    this.loginResponseListener.loginResponse(loginResponseModel);
};

