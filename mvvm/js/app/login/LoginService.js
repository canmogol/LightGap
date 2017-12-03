/**
 * See the private default implementation of LoginService
 * @interface
 * @class {LoginService} LoginService
 */
var LoginService = (function () {

    /**
     * default implementation of LoginService
     * @private
     * @default
     * @implements LoginService
     * @class {LoginServiceImpl} LoginServiceImpl
     */
    function LoginServiceImpl() {

        var _loginRequestModel = null;

        this.setLoginRequestModel = function (loginRequestModel) {
            _loginRequestModel = loginRequestModel;
        };

        this.getLoginRequestModel = function () {
            return _loginRequestModel;
        };

    }

    /**
     * instance variable
     * @private LoginService _instance
     */
    var _instance;

    /**
     * @type {LoginService} LoginService
     */
    return {

        /**
         * @param {LoginRequestModel} loginRequestModel
         */
        setLoginRequestModel: function (loginRequestModel) {
            this.getInstance().setLoginRequestModel(loginRequestModel);
        },

        /**
         * @return {LoginRequestModel}
         */
        getLoginRequestModel: function () {
            return this.getInstance().getLoginRequestModel();
        },

        /**
         * singleton LoginService
         * @returns {LoginService} LoginService
         */
        getInstance: function () {
            if (!_instance) {
                _instance = new LoginServiceImpl();
            }
            return _instance;
        }
    };

})();

