window.onload = function () {
    var menuController = new MenuController();
    menuController.init();
};

function MenuController() {

    this.init = function () {
        // check for development and testing modes
        this.manageApplicationMode();

        // clear storage and handle buttons
        Store.putStorage("pageStackString", "menuPage");
        var screenLoginButton = document.getElementById("screenLoginButton");
        screenLoginButton.onclick = function () {
            var loginController = new LoginController();
            loginController.init();
        };
    };

    this.manageApplicationMode = function () {
        if (Statics.APP_MODE == Statics.APP_MODES.DEV) {
            var developmentController = new DevelopmentController();
            developmentController.init();
        } else if (Statics.APP_MODE == Statics.APP_MODES.TEST) {
            var testingController = new TestingController();
            testingController.init();
        }
    };
}
