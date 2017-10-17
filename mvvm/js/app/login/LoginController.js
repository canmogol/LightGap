/**
 * @implements Controller
 * @implements LoginResponseListener
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
     * will be notified at login response
     * @param {LoginResponseModel} loginResponseModel
     */
    this.loginResponse = function (loginResponseModel) {
        this.loginViewModel.name = loginResponseModel.name;
    };

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
        var model = new XhrModel('/LightGap/mvvm/example/login-response.json');
        model.method = 'POST';
        model.data = this.loginViewModel.createLoginRequestModel();

        console.log(model.data);

        // create handler
        var listener = new LoginListener(this);

        // create XHR
        var xhr = new XHR();

        // send request
        xhr.send(model, listener);
    };

    //
    // constructor
    //
    (function (self) {

        // extends controller
        self.extend(new Controller());
        // implement login response listener
        self.extend(new LoginResponseListener());

    })(this);

}
