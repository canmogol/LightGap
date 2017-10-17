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


    //
    // Private and public method declarations
    //

    /**
     * @param {Controller} controller
     */
    this.setController = function (c) {
        controller = c;
    };

    /**
     * clear form elements
     * @returns {void|undefined}
     */
    this.clearForm = function () {
        // TODO Clear form
    };

    /**
     * create a new login request model
     * @returns {LoginRequestModel}
     */
    this.createLoginRequestModel = function () {
        return new LoginRequestModel(
            this.username,
            this.password
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
            usernameInput: 'username',
            passwordInput: 'password'
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
     * actions mapping
     * @returns {{}}
     */
    this.getActions = function () {
        return {
            loginButton: {
                click: function () {
                    controller.doLogin();
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

    })(this);

}
