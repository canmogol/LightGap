// add fast click for IE
var _fastClickAttached = true;
var _fastClickException = null;
try {
    if (window) {
        window.addEventListener('load', function () {
            try {
                FastClick.attach(document.body);
                _fastClickAttached = true
            } catch (e) {
                console.debug("exception occured at load for FastClick.attach(document.body), e:" + e);
            }
        }, false);
    }
} catch (e) {
    _fastClickAttached = false;
    _fastClickException = "exception occured while adding fastclick to event listener load, e:" + e;
}
// add fast click for rest of the browsers
try {
    FastClick.attach(document.body);
    _fastClickAttached = true
} catch (e) {
    _fastClickException = "exception occured while attaching fastclick, e:" + e;
}
if (!_fastClickAttached) {
    console.debug(_fastClickException);
}

