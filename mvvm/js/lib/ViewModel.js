/**
 * @interface {ViewModel} ViewModel
 */
function ViewModel() {

    /**
     * @param {Controller} controller
     */
    this.setController = function (controller) {
        throw new Error('unimplemented method');
    };


    //
    // i18n, bindings, actions and templates
    //

    /**
     * bindings mapping
     * @returns {{}}
     */
    this.getBindings = function () {
        throw new Error('unimplemented method');
    };

    /**
     * i18n mapping
     * @returns {{}}
     */
    this.getI18n = function () {
        throw new Error('unimplemented method');
    };

    /**
     * get actions
     * @returns {{}}
     */
    this.getActions = function () {
        throw new Error('unimplemented method');
    };

    /**
     * templates
     * @returns {{}}
     */
    this.getTemplates = function () {
        throw new Error('unimplemented method');
    };


}
