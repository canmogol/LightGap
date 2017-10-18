/**
 * application entry point, IIFE (immediately-invoked function expression)
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

        // try to create application controller and view model
        var applicationController = null;
        if (ConfigurationMap['applicationController'] !== undefined) {
            applicationController = new ConfigurationMap['applicationController']();
            applicationController.onCreate();
        }
        var applicationViewModel = null;
        if (ConfigurationMap['applicationViewModel'] !== undefined) {
            applicationViewModel = new ConfigurationMap['applicationViewModel']();
            applicationViewModel.onCreate();
        }

        // wire controller and view model
        if (applicationViewModel !== null) {
            applicationViewModel.onStart(applicationController);
        }
        if (applicationController !== null) {
            applicationController.onStart(applicationViewModel);
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

