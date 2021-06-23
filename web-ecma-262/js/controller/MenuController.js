'use strict';
// Menu Controller
class MenuController extends BaseController {

    #loginController;

    // constructor
    constructor() {
        super();
        this.#loginController = new LoginController();
        console.debug("MenuController created.")
    }

    // public method
    init() {
        // clear storage and handle buttons
        Store.putStorage("pageStackString", "menuPage");
        var controller = this;
        // set listener for login button
        var screenLoginButton = document.getElementById("screenLoginButton");
        screenLoginButton.onclick = function () {
            controller.#loginController.init();
        };
    };

}

// INIT MENU CONTROLLER
window.onload = function () {
    var menuController = new MenuController();
    menuController.init();
};
