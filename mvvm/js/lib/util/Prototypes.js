//
//
//          OBJECT PROTOTYPES
//
//
/**
 * add extend method to object
 * @param obj
 */
Object.prototype.extend = function (obj) {
    for (var i in obj) {
        if (obj.hasOwnProperty(i) && this[i] === undefined) {
            this[i] = obj[i];
        }
    }
};
/**
 * add getClass method to object
 * @return {*}
 */
Object.prototype.getClass = function getClass() {
    if (typeof this === "undefined") {
        return "undefined";
    }
    if (this === null) {
        return "null";
    }
    if (this.toString() !== "[object Object]") {
        var match = this.toString().match(/^\[object\s(.*)\]$/);
        if (match !== null) {
            return match[1];
        } else {
            return "Object";
        }
    } else {
        return this.constructor.name;
    }
};
/**
 * checks if the property is a function
 * @param propertyName
 * @returns {*|boolean}
 */
Object.prototype.isFunction = function (propertyName) {
    var type = {};
    return propertyName && type.toString.call(propertyName) === '[object Function]';
};

/*
 * object.watch polyfill
 *
 * 2012-04-03
 *
 * By Eli Grey, http://eligrey.com
 * Public Domain.
 * NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
 */
// object.watch
if (!Object.prototype.watch) {
    Object.defineProperty(Object.prototype, "watch", {
        enumerable: false
        , configurable: true
        , writable: false
        , value: function (prop, handler) {
            var
                oldval = this[prop]
                , newval = oldval
                , getter = function () {
                    return newval;
                }
                , setter = function (val) {
                    oldval = newval;
                    return newval = handler.call(this, prop, oldval, val);
                }
                ;

            if (delete this[prop]) { // can't watch constants
                Object.defineProperty(this, prop, {
                    get: getter
                    , set: setter
                    , enumerable: true
                    , configurable: true
                });
            }
        }
    });
}
// object.unwatch
if (!Object.prototype.unwatch) {
    Object.defineProperty(Object.prototype, "unwatch", {
        enumerable: false
        , configurable: true
        , writable: false
        , value: function (prop) {
            var val = this[prop];
            delete this[prop]; // remove accessors
            this[prop] = val;
        }
    });
}

//
//
//          CONSOLE PROTOTYPE
//
//
/**
 * will create and set a console object if there is not any
 * if it does, it means the logging not implement by this platform
 * use TOP_LEVEL_OBJECT (if it is window or document or whatever)
 * TOP_LEVEL_OBJECT.ConsoleLoggingArray array for collecting logs
 */
(function (topLevelObject) {
    try {
        if (!topLevelObject.console.log instanceof Object) {
            throw new Error("not an object!");
        } else {
            try {
                if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
                    window.console = {
                        log: function (str) {
                            window.external.Notify("log: " + str);
                        },
                        debug: function (str) {
                            window.external.Notify("debug: " + str);
                        },
                        error: function (str) {
                            window.external.Notify("error: " + str);
                        },
                        info: function (str) {
                            window.external.Notify("info: " + str);
                        }
                    };

                    window.onerror = function (e) {
                        console.log("ERROR: " + JSON.stringify(e));
                    };
                }
            } catch (e) {
            }
            //topLevelObject.console.debug("platform supports console logging, using console.log()");
        }
    } catch (exception) {
        topLevelObject.ConsoleLoggingArray = [];
        topLevelObject.ConsoleLoggingArray.prototype.add = function (text) {
            try {
                // loggingArray may be used for logging for visually
                // it will always contain the last 10 messages
                // just in case that the logging mechanism implemented by developer cannot attach at time
                if (topLevelObject.ConsoleLoggingArray.length > 10) {
                    // firstLogMessage will die in vain
                    var firstLogMessage = topLevelObject.ConsoleLoggingArray.shift();
                }
                topLevelObject.ConsoleLoggingArray.push(text);
            } catch (exception) {
                // can't do anything :(
                // either an object is not there or it could not do the shifting/pushing
            }
        };
        topLevelObject.console = {
            debug: function (text) {
                topLevelObject.console.log(text);
            },
            error: function (text) {
                topLevelObject.console.log(text);
            },
            info: function (text) {
                topLevelObject.console.log(text);
            },
            log: function (text) {
                topLevelObject.ConsoleLoggingArray.add(text);
            }
        }
    }

    try {
        if (document == null) {
            document = topLevelObject;
        }
    } catch (exception) {
        this.log("no document object found, setting it to empty object, exception: " + exception);
        document = {};
    }
})(this /*this is the global window variable in browser*/);
