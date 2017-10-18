/**
 * @extends Controller
 * @extends LoginResponseListener
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

    /**
     * @property {LoginService} loginService
     */
    this.loginService = null;

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
     * navigates to main
     */
    this.navigateToMain = function () {
        NavigationMap.navigate('main');
    };

    /**
     * @param {ViewModel} viewModel
     */
    this.onStart = function (viewModel) {
        // set view model
        this.loginViewModel = viewModel;

        // get login request model
        var loginRequestModel = this.loginService.getLoginRequestModel();
        // if any stored at service
        if (loginRequestModel !== null) {
            this.loginViewModel.username = loginRequestModel.username;
            this.loginViewModel.site = loginRequestModel.site;
        }
    };

    /**
     * lifecycle method stop
     */
    this.onStop = function () {
        // create a login request model
        var loginRequestModel = this.loginViewModel.createLoginRequestModel();

        // store current login request model at service
        // we might use this model at re-visiting
        this.loginService.setLoginRequestModel(loginRequestModel);
    };


    /**
     * send request to server
     */
    this.sendLoginRequest = function () {

        // create a login request model
        var loginRequestModel = this.loginViewModel.createLoginRequestModel();

        // create model
        var model = new XhrModel('/LightGap/mvvm/example/login-response.json');
        model.method = 'POST';
        model.data = loginRequestModel;

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

        // set the login service instance
        self.loginService = LoginService.getInstance();

    })(this);

}
