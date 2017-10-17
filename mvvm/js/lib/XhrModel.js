/**
 * XHR Request Model
 * @param {string} url
 * @class {XhrListener} XhrListener
 */
function XhrModel(url) {

    /**
     * request url
     * @example "http://ip.jsontest.com"
     * @type {string}
     */
    this.url = url;

    /**
     * request method default GET
     * @type {string}
     */
    this.method = "GET";

    /**
     * cancel flag indicates that the current request should be
     * cancelled, will cancel the request at next lifecycle step
     * @type {boolean}
     */
    this.cancelled = false;

    /**
     * sets if this request is asynchronous or not, default is true/async
     * @type {boolean}
     */
    this.async = true;

    /**
     * Headers as key value map
     * @example {"x-http-requester": "X212"};
     * @type Object
     */
    this.headers = {};

    /**
     * request data as JSON object
     * @type Object
     */
    this.data = {};

}






