/**
 * @param {LoginViewModel} loginViewModel
 * @class {LoginController} LoginController
 */
function LoginController() {

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
     * @param {ViewModel} viewModel
     */
    this.setViewModel = function (viewModel) {
        this.loginViewModel = viewModel;
    };

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
    // constructor
    //
    (function (self) {

        // implement controller interface
        self.protos.extend(new Controller());

    })(this);

}
