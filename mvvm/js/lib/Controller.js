/**
 * @extends {LifeCycleAware}
 * @class  {Controller} Controller
 */
function Controller() {

    /**
     * viewModel
     * @type {ViewModel}
     */
    var viewModel = null;

    /**
     * lifecycle method start
     * @param {ViewModel} vm
     */
    this.onStart = function (vm) {
        viewModel = vm
    };

    /**
     * @return {ViewModel}
     */
    this.getViewModel = function () {
        return viewModel;
    };


    //
    // constructor
    //
    (function (self) {

        // extends LifeCycleAware
        self.extend(new LifeCycleAware());

    })(this);

}