/**
 * default lifecycle implementation, logs the lifecycle step name and class name.
 * @implements LifeCycleAwareListener
 * @class {LifeCycleAware} LifeCycleAware
 */
function LifeCycleAware() {

    //
    // Private and public method declarations
    //

    /**
     * lifecycle method create
     */
    this.onCreate = function () {
        Logger.debug("onCreate " + this.getClass());
    };

    /**
     * lifecycle method start
     * @param {{}} o
     */
    this.onStart = function (o) {
        Logger.debug("onStart " + this.getClass());
    };

    /**
     * lifecycle method stop
     */
    this.onStop = function () {
        Logger.debug("onStop " + this.getClass());
    };

    //
    // constructor
    //
    (function (self) {

        // implements LifeCycleAwareListener
        self.implement(LifeCycleAwareListener);

    })(this);

}
