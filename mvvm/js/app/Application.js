/**
 * @class {Application} Application
 */
function Application() {

    //
    //Private and public field declarations
    //

    /**
     * @type {PageLoader}
     */
    this.pageLoader = null;

    //
    // Private and public method declarations
    //

    //
    // constructor of controller
    //
    (function (self) {
        // create page loader
        self.pageLoader = new PageLoader(Navigation);

        // load initial page
        self.pageLoader.loadInitialPage();

    })(this);

}
