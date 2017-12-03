/**
 * Login View Model
 * @viewModel 'ViewModel' as in MVVM (Model-View-ViewModel) pattern, handles bidirectional binding
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
    // i18n, bindings, actions and views
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
                    viewModel.getModel().sendLoginRequest();
                }
            },
            clearButton: {
                click: function () {
                    viewModel.clearForm();
                }
            },
            mainButton: {
                click: function () {
                    viewModel.getModel().navigateToMain();
                }
            },
            logoutButton: {
                click: function () {
                    viewModel.getModel().logout();
                }
            }
        };
    };


    //
    // constructor
    //
    (function (self) {

        // extends ViewModel class, 'self' is the constructor parameter of ViewModel, i.e. 'new ViewModel(self)'
        self.extend(ViewModel, self);

    })(this);

}
