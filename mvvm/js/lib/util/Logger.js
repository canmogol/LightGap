/**
 * @instance {Logger} Logger
 */
var Logger = (function () {

    /**
     * default implementation of Logger interface, using global console
     * @constructor
     */
    function LoggerImpl() {
        this.log = function (log) {
            console.log(log);
        };
        this.debug = function (log) {
            console.debug(log);
        };
        this.error = function (log) {
            console.error(log);
        };
        this.info = function (log) {
            console.info(log);
        };
    }

    /**
     * instance variable
     * @private
     */
    var _instance;

    /**
     * @type {Logger} Logger
     */
    return {

        /**
         * default log method
         * @param {string} log
         */
        log: function (log) {
            this.getInstance().log(log);
        },

        /**
         * debug logging
         * @param {string} log
         */
        debug: function (log) {
            this.getInstance().debug(log);
        },

        /**
         * error logging
         * @param {string} log
         */
        error: function (log) {
            this.getInstance().error(log);
        },

        /**
         * info logging
         * @param {string} log
         */
        info: function (log) {
            this.getInstance().info(log);
        },

        /**
         * singleton Logger
         * @returns {Logger} Logger
         */
        getInstance: function () {
            if (!_instance) {
                _instance = new LoggerImpl();
            }
            return _instance;
        }
    };

})();
