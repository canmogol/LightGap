/**
 * @implements PageLoadCompleteListener
 * @param {NavigationMap} navigation
 * @param {ConfigurationMap} configuration
 * @class {NavigationHandler} NavigationHandler
 */
function NavigationHandler(navigation, configuration) {

    //
    // Private and public field declarations
    //

    /**
     * @type {ViewModel}
     */
    var viewModel = null;

    /**
     * @type {Controller}
     */
    var controller = null;

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

        // mapping reference
        var mappingValue = this.navigation[mapping];
        // if mapping is undefined
        if (mappingValue === undefined) {
            mapping = 'initial';
        }
        // if mapping is not an object, it might be pointing to other mapping
        else if (!(mappingValue instanceof Object)) {
            mapping = mappingValue;
        }

        // set mapping to pointing map
        if (mapping === 'initial') {
            mapping = this.navigation['initial']
        }

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

        // call stop lifecycle method and remove previous object
        if (viewModel !== null) {
            viewModel.onStop();
            viewModel = null;
        }

        // create view model
        if (this.navigation[mapping]['viewModel'] !== null) {
            viewModel = new this.navigation[mapping]['viewModel']();
            viewModel.onCreate();
        }

        // call stop lifecycle method and remove previous object
        if (controller !== null) {
            controller.onStop();
            controller = null;
        }

        // create controller
        if (this.navigation[mapping]['controller'] !== null) {
            controller = new this.navigation[mapping]['controller']();
            controller.onCreate();
        }

        // init and start view model
        if (viewModel !== null) {
            // set listeners
            var actions = viewModel.getActions();

            // for each id, ex: loginButton, clearButton
            for (var elementId in actions) {
                if (actions.hasOwnProperty(elementId)) {

                    // for each mapping, an action for a function should be added
                    // ex: click: function(){}
                    for (var actionType in actions[elementId]) {
                        if (actions[elementId].hasOwnProperty(actionType)) {
                            var actionFunction = actions[elementId][actionType];
                            // add function to type
                            var element = document.getElementById(elementId);
                            if (element !== null) {
                                element.addEventListener(actionType, actionFunction);
                            }
                        }
                    }

                }
            }

            // start view model
            viewModel.onStart(controller);
        }

        // start controller
        if (controller !== null) {
            controller.onStart(viewModel);
        }

    };


    //
    // constructor
    //
    (function (self, navigation, configuration) {

        // extends PageLoadCompleteListener
        self.extend(new PageLoadCompleteListener());

        // set navigation
        self.navigation = navigation;

        // set configuration
        self.configuration = configuration;

    })(this, navigation, configuration);

}
