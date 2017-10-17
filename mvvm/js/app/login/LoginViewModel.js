/**
 * Login View Model
 * @extends ViewModel
 * @class {LoginViewModel} LoginViewModel
 */
function LoginViewModel() {

    //
    //Private and public field declarations
    //

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

    /**
     * selected site
     * @type {string}
     */
    this.name = null;


    //
    // Private and public method declarations
    //

    /**
     * clear form elements
     * @returns {void|undefined}
     */
    this.clearForm = function () {
        this.username = '';
        this.password = '';
        this.site = 'Germany';
        this.name = '';
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
            site: 'siteSelect',
            name: 'nameContainer'
        };
    };

    /**
     * get actions
     * @returns {{}}
     */
    this.getActions = function () {
        // local reference
        var viewModel = this;

        // return mapping
        return {
            loginButton: {
                click: function () {
                    viewModel.getController().sendLoginRequest();
                }
            },
            clearButton: {
                click: function () {
                    viewModel.clearForm();
                }
            }
        };
    };


    //
    // constructor
    //
    (function (self) {

        // extends ViewModel
        self.extend(new ViewModel(self));

    })(this);

}
