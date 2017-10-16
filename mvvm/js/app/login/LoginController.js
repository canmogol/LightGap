/**
 * @param {LoginViewModel} loginViewModel
 * @class {LoginController} LoginController
 */
function LoginController(loginViewModel) {

    //
    //Private and public field declarations
    //

    /**
     * @property {LoginViewModel} loginViewModel
     */
    this.loginViewModel = null;

    //
    // Private and public method declarations
    //

    /**
     * send request to server
     */
    this.sendLoginRequest = function () {
        // create model
        var model = new XhrModel('/login');
        model.method = 'POST';
        model.data = this.loginViewModel.createLoginRequestModel();

        // create handler
        var listener = new LoginListener();

        // create XHR
        var xhr = new XHR();

        // send request
        xhr.send(model, listener);
    };

    //
    // constructor of controller
    //
    (function (self, loginViewModel) {

        // set view model
        self.loginViewModel = loginViewModel;

    })(this, loginViewModel);

}
