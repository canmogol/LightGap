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
    // constructor
    //
    (function (self) {

        // create page loader
        self.pageLoader = new PageLoader(NavigationMap, ConfigurationMap);

        // register to page changes
        window.onhashchange = function () {
            new PageLoader(NavigationMap, ConfigurationMap).handlePageChange();
        };

        // call for the first time
        self.pageLoader.handlePageChange();

    })(this);

}

/**
 * application entry point
 * @type {Application}
 */
var application = new Application();
