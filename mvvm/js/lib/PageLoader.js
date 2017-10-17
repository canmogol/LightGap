/**
 * @param {this.navigation} navigation
 * @class {PageLoader} PageLoader
 */
function PageLoader(navigation, configuration) {

    //
    //Private and public field declarations
    //

    /**
     * @type {this.navigation}
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
        }

        // try to load pages only defined in mapping
        if (mapping != null) {

            if ((this.navigation[mapping] !== null || this.navigation[mapping] !== undefined)) {
                // load current mapping
                this.loadMapping(this.navigation[mapping]);
            } else {
                // load current mapping
                this.loadMapping(this.navigation['initial']);
            }
        }
    };

    /**
     * loads mapping
     * @param {string} mapping
     */
    this.loadMapping = function (mapping) {
        // create model
        var model = new XhrModel(mapping);

        // create handler
        var listener = new PageLoadListener(configuration.internalLoadElementId);

        // create XHR
        var xhr = new XHR();

        // send request
        xhr.send(model, listener);
    };

    //
    // constructor
    //
    (function (self, navigation, configuration) {
        // set navigation
        self.navigation = navigation;

        // set configuration
        self.configuration = configuration;

    })(this, navigation, configuration);

}
