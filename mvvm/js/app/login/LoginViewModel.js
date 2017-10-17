/**
 * Login View Model
 * @implement ViewModel
 * @class {LoginViewModel} LoginViewModel
 */
function LoginViewModel() {

    //
    //Private and public field declarations
    //

    /**
     * view model reference
     * @type {LoginViewModel}
     */
    var viewModel = this;

    /**
     * Login controller
     * @type {LoginController}
     */
    var controller = null;

    /**
     * username
     * @type {string}
     */
    this.username = null;

    /**
     * password
     * @type {string}
     */
    this.password = null;

    /**
     * selected site
     * @type {string}
     */
    this.site = null;


    //
    // Private and public method declarations
    //

    /**
     * @param {Controller} c
     */
    this.setController = function (c) {
        controller = c;
    };

    /**
     * bidirectionally binds property and element's value
     * @param {string} property
     * @param {Object} element
     */
    this.addBindings = function (property, element) {
        // assign property to element's value if different
        if (viewModel[property] !== null) {
            element.value = viewModel[property];
        } else {
            viewModel[property] = element.value;
        }

        // add watch for changes on this property
        this.watch(property, function (property, oldValue, newValue) {
            // if this property has any mappings, ex: 'username' -> 'usernameInput' element id
            // set UI element's value to new value of the property
            element.value = newValue;
            // return new value, we won't change the value
            return newValue;
        });

        if (element.getClass() === 'HTMLInputElement') {
            // add key-up event listeners to UI element since it is an input
            element.addEventListener('keyup', function () {
                viewModel[property] = element.value;
            });
        } else {
            // otherwise add value change listeners to UI element
            element.addEventListener('change', function () {
                viewModel[property] = element.value;
            });
        }
    };

    /**
     * clear form elements
     * @returns {void|undefined}
     */
    this.clearForm = function () {
        this.username = '';
        this.password = '';
        this.site = '';
    };

    /**
     * create a new login request model
     * @returns {LoginRequestModel}
     */
    this.createLoginRequestModel = function () {
        return new LoginRequestModel(
            this.username,
            this.password,
            this.site
        );
    };


    //
    // i18n, bindings, actions and templates
    //

    /**
     * bindings mapping
     * @returns {{}}
     */
    this.getBindings = function () {
        return {
            username: 'usernameInput',
            password: 'passwordInput',
            site: 'siteSelect'
        };
    };

    /**
     * i18n mapping
     * @returns {{}}
     */
    this.getI18n = function () {
        return {};
    };

    /**
     * get actions
     * @returns {{}}
     */
    this.getActions = function () {
        return {
            loginButton: {
                click: function () {
                    controller.sendLoginRequest();
                }
            },
            clearButton: {
                click: function () {
                    viewModel.clearForm();
                }
            }
        };
    };

    /**
     * templates
     * @returns {{}}
     */
    this.getTemplates = function () {
        return {};
    };


    //
    // constructor
    //
    (function (self) {

        // implement ViewModel interface
        self.protos.extend(new ViewModel());

        // for each property
        for (var property in self) {
            // check if property is not inherited but defined in this class / created at this object
            // and if the property is not a function
            // and property has a binding
            // and the bound UI element exists
            if (self.hasOwnProperty(property)
                && self.protos.isFunction(property) === false
                && self.getBindings()[property] !== undefined
                && document.getElementById(self.getBindings()[property]) !== null) {

                // find the UI element
                var elementId = self.getBindings()[property];
                var element = document.getElementById(elementId);

                self.addBindings(property, element);
            }
        }


    })(this);

}
