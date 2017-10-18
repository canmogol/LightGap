TransportController = function () {
    console.log("TransportController constructed");
};
// init method of TransportController
TransportController.prototype.init = function () {
    console.log("TransportController init method called");
};
// BaseController will override TransportController's init method
TransportController.prototype = new BaseController();
