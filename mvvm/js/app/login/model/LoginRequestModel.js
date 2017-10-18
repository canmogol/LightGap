/**
 * Login Request
 * @param {string} username
 * @param {string} password
 * @param {string} site
 * @class {LoginRequestModel} LoginRequestModel
 */
function LoginRequestModel(username, password, site) {

    /**
     * username
     * @type {string}
     */
    this.username = username;

    /**
     * password
     * @type {string}
     */
    this.password = password;

    /**
     * site
     * @type {string}
     */
    this.site = site;

}
