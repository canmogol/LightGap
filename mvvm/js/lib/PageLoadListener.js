/**
 * PageLoad Request Listener
 * @class {PageLoadListener} PageLoadListener
 */
function PageLoadListener(internalLoadElementId) {

    /**
     * @type {string}
     */
    this.internalLoadElementId = null;

    /**
     * error handler
     */
    this.error = function (e) {
        console.log("PageLoad listener, error: " + JSON.stringify(e));
    };

    /**
     * handle
     * @param {Object} request
     * @param {Object} response
     */
    this.requestFinishedResponseReady = function (request, response) {
        var container = document.getElementById(this.internalLoadElementId);
        container.innerHTML = response;
    };

    //
    // constructor
    //
    (function (self, internalLoadElementId) {

        // set initial load element id
        self.internalLoadElementId = internalLoadElementId;

    })(this, internalLoadElementId);
}


/**
 * @extends {XhrListener}
 * @type {XhrListener}
 */
PageLoadListener.prototype = new XhrListener();


