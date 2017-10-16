/**
 * Login View Model
 * @class {LoginViewModel} LoginViewModel
 */
function LoginViewModel() {

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
     * craete a new login request model
     * @returns {LoginRequestModel}
     */
    this.createLoginRequestModel = function () {
        return new LoginRequestModel(
            this.username,
            this.password
        );
    }
}
