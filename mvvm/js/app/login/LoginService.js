/**
 * @instance {LoginService} LoginService
 */
var LoginService = (function () {

    /**
     * implementation of LoginService
     * @constructor
     */
    function LoginServiceImpl() {

        /**
         * @type {LoginRequestModel}
         */
        var _loginRequestModel = null;

        /**
         * @param loginRequestModel
         */
        this.setLoginRequestModel = function (loginRequestModel) {
            _loginRequestModel = loginRequestModel;
        };

        this.getLoginRequestModel = function () {
            return _loginRequestModel;
        };

    }

    /**
     * instance variable
     * @private
     */
    var _instance;

    /**
     * @type {LoginService} LoginService
     */
    return {
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

