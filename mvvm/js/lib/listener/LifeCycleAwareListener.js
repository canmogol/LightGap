/**
 * LifeCycle Aware Listener interface
 * @interface
 * @class {LifeCycleAwareListener} LifeCycleAwareListener
 */
function LifeCycleAwareListener() {

    //
    // Private and public field declarations
    //

    //
    // Private and public method declarations
    //

    /**
     * lifecycle method create
     */
    this.onCreate = function () {
        throw new Error('unimplemented method');
    };

    /**
     * lifecycle method start
     * @param {{}} o
     */
    this.onStart = function (o) {
        throw new Error('unimplemented method');
    };

    /**
     * lifecycle method stop
     */
    this.onStop = function () {
        throw new Error('unimplemented method');
    };

}


