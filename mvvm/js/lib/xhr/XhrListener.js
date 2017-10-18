/**
 * XHR Request Listener
 * @class {XhrListener} XhrListener
 */
function XhrListener() {

    //
    // Private and public method declarations
    //

    /**
     * error listener
     * @param {Object} e
     */
    this.error = function (e) {
    };

    /**
     * lifecycle method only on cancelled requests after cancellation (aborted)
     */
    this.cancelled = function () {
    };

    /**
     * lifecycle method at request not initialized step
     */
    this.requestNotInitialized = function () {
    };

    /**
     * lifecycle method at server connection established step
     */
    this.serverConnectionEstablished = function () {
    };

    /**
     * lifecycle method at request received step
     */
    this.requestReceived = function () {
    };

    /**
     * lifecycle method at processing request step
     */
    this.processingRequest = function () {
    };

    /**
     * lifecycle method at request finished response ready step
     * @param {Object} request
     * @param {Object} response
     */
    this.requestFinishedResponseReady = function (request, response) {
    };
}






