/**
 * PageLoad Request Listener
 * @param {string} internalLoadElementId
 * @param {string} mapping
 * @param {PageLoadCompleteListener} pageLoadCompleteListener
 * @class {PageLoadListener} PageLoadListener
 */
function PageLoadListener(internalLoadElementId, mapping, pageLoadCompleteListener) {

    //
    // Private and public field declarations
    //

    /**
     * @type {string}
     */
    this.internalLoadElementId = null;

    /**
     * @type {string}
     */
    this.mapping = null;

    /**
     * @type {PageLoadCompleteListener}
     */
    this.pageLoadCompleteListener = null;

    //
    // Private and public method declarations
    //

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
        // get container object
        var container = document.getElementById(this.internalLoadElementId);

        // set container's content to response
        container.innerHTML = response;

        // notify listener if avilable
        if (this.pageLoadCompleteListener !== null) {
            this.pageLoadCompleteListener.pageLoaded(this.mapping);
        }
    };

    //
    // constructor
    //
    (function (self, internalLoadElementId, mapping, pageLoadCompleteListener) {

        // set initial load element id
        self.internalLoadElementId = internalLoadElementId;

        // set mapping
        self.mapping = mapping;

        // set parent listener
        self.pageLoadCompleteListener = pageLoadCompleteListener;

    })(this, internalLoadElementId, mapping, pageLoadCompleteListener);
}


/**
 * @extends {XhrListener}
 * @type {XhrListener}
 */
PageLoadListener.prototype = new XhrListener();


