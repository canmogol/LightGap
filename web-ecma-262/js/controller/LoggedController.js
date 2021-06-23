'use strict';
// Logged Controller
class LoggedController extends BaseController {

    // private field
    #mainController

    // constructor
    constructor() {
        super();
        // initialize main controller
        this.#mainController = MainController.getInstance();
        console.debug("LoggedController created.")
    }

    // public method
    init() {
        // load page
        this.#mainController.loadPage("loggedPage");

        // show user info
        var userInfoSpan = document.getElementById("userInformation");
        userInfoSpan.innerHTML = Store.getStorage("loginResponseMessage") + " " + Store.getStorage("userInformation");

        // set logout listener
        var logoutButton = document.getElementById("logoutButton");
        logoutButton.onclick = function () {
            alert("Want to logout?", null, function (buttonIndex, buttonText) {
                if (buttonIndex == 1) {
                    console.debug("logout cancelled");
                } else if (buttonText == "ok") {
                    Store.putStorage("userInformation", null);
                    Store.putStorage("loginResponseMessage", null);
                    var userInfoSpan = document.getElementById("userInformation");
                    userInfoSpan.innerHTML = "";
                    MainController.getInstance().goBack();
                }
            }, ["ok", "cancel"], null);
        };

    };

}
