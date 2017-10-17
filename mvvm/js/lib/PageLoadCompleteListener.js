/**
 * PageLoad Request Listener
 * @interface {PageLoadCompleteListener} PageLoadCompleteListener
 */
function PageLoadCompleteListener() {

    /**
     * will be notified after page load
     * @param {string} mapping
     */
    this.pageLoaded = function (mapping) {
        throw new Error('unimplemented method');
    };

}
