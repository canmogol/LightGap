//
//
//          OBJECT PROTOTYPES
//
//
/**
 * add protos object to javascript Object type, protos will hold the necessary prototype methods like extend
 * @type {{}}
 */
Object.prototype.protos = {};
/**
 * add extend method to object
 * @param obj
 */
Object.prototype.protos.extend = function (obj) {
    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            this[i] = obj[i];
        }
    }
};
/**
 * add getClass method to object
 * @return {*}
 */
Object.prototype.protos.getClass = function getClass() {
    if (typeof this === "undefined")
        return "undefined";
    if (this === null)
        return "null";
    return Object.prototype.toString.call(this).match(/^\[object\s(.*)\]$/)[1];
};


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
            throw "not an object!";
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
                this.log(text);
            },
            error: function (text) {
                this.log(text);
            },
            info: function (text) {
                this.log(text);
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
})(this);
