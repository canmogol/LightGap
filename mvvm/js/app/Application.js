/**
 * @class {Application} Application
 */
function Application() {

    //
    //Private and public field declarations
    //

    /**
     * @type {NavigationHandler}
     */
    this.navigationHandler = null;

    //
    // Private and public method declarations
    //

    //
    // constructor
    //
    (function (self) {

        // create navigation handler
        self.navigationHandler = new NavigationHandler(NavigationMap, ConfigurationMap);

        // register to page changes
        window.onhashchange = function () {
            new NavigationHandler(NavigationMap, ConfigurationMap).handlePageChange();
        };

        // call for the first time
        self.navigationHandler.handlePageChange();

    })(this);

}

/**
 * application entry point
 * @type {Application}
 */
var application = new Application();
