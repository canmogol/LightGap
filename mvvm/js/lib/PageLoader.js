/**
 * @param {Navigation} navigation
 * @class {PageLoader} PageLoader
 */
function PageLoader(navigation) {

    //
    //Private and public field declarations
    //

    /**
     * @private
     * @type {string}
     */
    var internalLoadElementId = 'PageLoader-Container';

    /**
     * @type {Navigation}
     */
    this.navigation = null;

    //
    // Private and public method declarations
    //

    /**
     * @private
     * @param fileName
     * @returns {string} file content
     */
    function getFileContent(fileName) {
        return null;
    }

    /**
     * loads initial page set in the navigation
     */
    this.loadInitialPage = function () {
        var container = document.getElementById(internalLoadElementId);
        var content = getFileContent(this.navigation.initial);
        container.innerHTML = content;
    };

    //
    // constructor of controller
    //
    (function (self, navigation) {
        self.navigation = navigation;
    })(this, navigation);

}
