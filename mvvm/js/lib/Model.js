/**
 * @model 'Model' as in MVVM (Model-View-ViewModel) pattern, sometimes referred as 'Controller'
 * @extends {LifeCycleAware}
 * @class  {Model} Model
 */
function Model() {

    //
    // Private and public field declarations
    //

    /**
     * viewModel
     * @type {ViewModel}
     */
    var viewModel = null;

    //
    // Private and public method declarations
    //

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
        self.extend(LifeCycleAware);

    })(this);

}