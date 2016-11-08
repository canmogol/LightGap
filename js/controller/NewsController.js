NewsController = function () {
    console.log("news controller constructed");
};
NewsController.prototype = new BaseController();
NewsController.prototype.init = function () {
    console.log("init method called");
    this.sayHi("Hi There!");
};
