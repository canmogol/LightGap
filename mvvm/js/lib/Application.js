/**
 * Application entry point, IIFE (immediately-invoked function expression)
 */
(/**
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

        // try to create application model and view model
        var applicationModel = null;
        if (ConfigurationMap['applicationModel'] !== undefined) {
            applicationModel = new ConfigurationMap['applicationModel']();
            applicationModel.onCreate();
        }
        var applicationViewModel = null;
        if (ConfigurationMap['applicationViewModel'] !== undefined) {
            applicationViewModel = new ConfigurationMap['applicationViewModel']();
            applicationViewModel.onCreate();
        }

        // wire model and view model
        if (applicationViewModel !== null) {
            applicationViewModel.onStart(applicationModel);
        }
        if (applicationModel !== null) {
            applicationModel.onStart(applicationViewModel);
        }

        // create navigation handler
        var navigationHandler = new NavigationHandler(NavigationMap, ConfigurationMap);

        // register to page changes
        window.onhashchange = function () {
            navigationHandler.handlePageChange();
        };

        // call for the first time
        navigationHandler.handlePageChange();

    })(this);

})();

