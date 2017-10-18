/**
 * @class {Application} Application
 */
function Application() {

    //
    //Private and public field declarations
    //

    //
    // Private and public method declarations
    //

    //
    // constructor
    //
    (function (self) {

        // create navigation handler
        var navigationHandler = new NavigationHandler(NavigationMap, ConfigurationMap);

        // register to page changes
        window.onhashchange = function () {
            navigationHandler.handlePageChange();
        };

        // call for the first time
        navigationHandler.handlePageChange();

    })(this);

}

/**
 * application entry point
 * @type {Application}
 */
var application = new Application();
