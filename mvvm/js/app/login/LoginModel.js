/**
 * LoginModel (or LoginController),
 * you may consider this class as a Controller for 'Login Use Case'
 * or an external 'Service' of a DDD bounded context or Anemic Domain Model application.
 *
 * @model 'Model' as in MVVM (Model-View-ViewModel) pattern, sometimes referred as 'Controller'
 * @extends Model
 * @implements LoginResponseListener
 * @class {LoginModel} LoginModel
 */
function LoginModel() {

    //
    // Private and public field declarations
    //

    /**
     * @property {LoginViewModel} loginViewModel
     */
    this.loginViewModel = null;

    /**
     * @property {LoginService} loginService
     */
    this.loginService = null;

    /**
     * @property {Storage} Storage
     */
    this.storage = null;

    //
    // Private and public method declarations
    //

    /**
     * will be notified at login response
     * @param {LoginResponseModel} loginResponseModel
     */
    this.loginResponse = function (loginResponseModel) {
        this.loginViewModel.name = loginResponseModel.name;
        this.storage.put('LoginResponseModel', JSON.stringify(loginResponseModel));
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

        // get the stored model
        var loginResponseModelStored = this.storage.get('LoginResponseModel');
        if (loginResponseModelStored !== null) {
            /**
             * @type {LoginResponseModel}
             */
            var loginResponseModel = JSON.parse(loginResponseModelStored);
            // set stored name to view model
            this.loginViewModel.name = loginResponseModel.name;
        }

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

        // create handler
        var listener = new LoginListener(this);

        // create XHR
        var xhr = new XHR();

        // send request
        xhr.send(model, listener);
    };

    /**
     * logout user
     */
    this.logout = function () {

        // clear login form
        this.loginViewModel.clearForm();

        // remove login model from storage
        this.storage.remove('LoginResponseModel');

    };

    //
    // constructor
    //
    (function (self) {

        // extends model
        self.extend(Model);

        // implement login response listener
        self.implement(LoginResponseListener);

        // set the login service instance
        self.loginService = LoginService.getInstance();

        // set the storage instance
        self.storage = Storage.getInstance();

    })(this);

}
