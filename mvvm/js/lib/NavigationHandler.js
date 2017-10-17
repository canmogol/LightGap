/**
 * @implements PageLoadCompleteListener
 * @param {NavigationMap} navigation
 * @param {ConfigurationMap} configuration
 * @class {NavigationHandler} NavigationHandler
 */
function NavigationHandler(navigation, configuration) {

    //
    //Private and public field declarations
    //

    /**
     * @type {NavigationMap}
     */
    this.navigation = null;

    /**
     * @type {ConfigurationMap}
     */
    this.configuration = null;

    //
    // Private and public method declarations
    //

    /**
     * handles page changes
     */
    this.handlePageChange = function () {
        // define mapping to be
        var mapping = null;

        // if url starts with a '#' remove the '#'
        if (window.location.hash.substring(0, 1) === '#') {
            // get mapping
            mapping = window.location.hash.substring(1);
        } else {
            // load initial mapping
            mapping = 'initial';
        }

        // load current mapping's url
        this.loadMapping(mapping);

    };

    /**
     * loads mapping url
     * @param {string} mapping
     */
    this.loadMapping = function (mapping) {

        // get url from mapping
        var url = this.navigation[mapping]['template'];

        // create model
        var model = new XhrModel(url);

        // create handler
        var listener = new PageLoadListener(
            this.configuration.internalLoadElementId,
            mapping,
            this
        );

        // create XHR
        var xhr = new XHR();

        // send request
        xhr.send(model, listener);
    };

    /**
     * will be notified after page load
     * @param {string} mapping
     */
    this.pageLoaded = function (mapping) {

        // create view model
        var viewModel = new this.navigation[mapping]['viewModel']();

        // create controller
        var controller = new this.navigation[mapping]['controller']();

        // wire them up
        viewModel.setController(controller);
        controller.setViewModel(viewModel);

    };


    //
    // constructor
    //
    (function (self, navigation, configuration) {

        // implement PageLoadCompleteListener interface
        self.protos.extend(new PageLoadCompleteListener());

        // set navigation
        self.navigation = navigation;

        // set configuration
        self.configuration = configuration;

    })(this, navigation, configuration);

}
