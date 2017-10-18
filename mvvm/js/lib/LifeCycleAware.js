/**
 * @class  {LifeCycleAware} LifeCycleAware
 */
function LifeCycleAware() {

    /**
     * lifecycle method create
     */
    this.onCreate = function () {
        console.log('onCreate ' + this.getClass());
    };

    /**
     * lifecycle method start
     * @param {{}} o
     */
    this.onStart = function (o) {
        console.log('onStart ' + this.getClass());
    };

    /**
     * lifecycle method stop
     */
    this.onStop = function () {
        console.log('onStop ' + this.getClass());
    };

}
