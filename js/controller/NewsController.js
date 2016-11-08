NewsController = function () {
    console.log("news controller constructed");
};
// extends BaseController
NewsController.prototype = new BaseController();
// below init method will override BaseController's init method
NewsController.prototype.init = function () {
    console.log("NewsController init method called");
};
