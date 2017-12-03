/**
 * @interface
 * @class {Storage} Storage
 */
var Storage = (function () {

    /**
     * default implementation of Storage, using browser's localStorage
     * @private
     * @default
     * @implements Storage
     * @class {StorageImpl} StorageImpl
     */
    function StorageImpl() {

        this.put = function (key, value) {
            try {
                localStorage.setItem(key, value);
            } catch (e) {
                Logger.debug("exception occurred while local storage setItem, e:" + e);
            }
        };

        this.get = function (key) {
            try {
                return localStorage.getItem(key);
            } catch (e) {
                Logger.debug("exception occurred while local storage getItem, e:" + e);
                return null;
            }
        };

        this.clear = function () {
            try {
                localStorage.clear();
            } catch (e) {
                Logger.debug("exception occurred while local storage clear, e:" + e);
            }
        };

        this.remove = function (key) {
            try {
                localStorage.removeItem(key);
            } catch (e) {
                Logger.debug("exception occurred while local storage clear, e:" + e);
            }
        };

        this.keyAt = function (index) {
            try {
                localStorage.key(index);
            } catch (e) {
                Logger.debug("exception occurred while local storage clear, e:" + e);
            }
        };
    }

    /**
     * instance variable
     * @private Storage _instance
     */
    var _instance;

    /**
     * @type {Storage} Storage
     */
    return {

        /**
         * @param {string} key
         * @param {string} value
         */
        put: function (key, value) {
            this.getInstance().put(key, value);
        },

        /**
         * returns value for this key
         * @param key
         */
        get: function (key) {
            return this.getInstance().get(key);
        },

        /**
         * clears storage
         */
        clear: function () {
            this.getInstance().clear();
        },

        /**
         * remove value for this key
         * @param key
         */
        remove: function (key) {
            this.getInstance().remove(key);
        },

        /**
         * get the key at the index
         * @param index
         */
        keyAt: function (index) {
            this.getInstance().keyAt(index);
        },

        /**
         * singleton Storage
         * @returns {Storage} Storage
         */
        getInstance: function () {
            if (!_instance) {
                _instance = new StorageImpl();
            }
            return _instance;
        }
    };

})();
