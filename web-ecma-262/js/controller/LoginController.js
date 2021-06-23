'use strict';
// Login Controller.
class LoginController extends BaseController {

    // private field
    #mainController;

    // private field
    #loggedController;

    // constructor
    constructor() {
        super();
        this.#mainController = MainController.getInstance();
        this.#loggedController = new LoggedController();
        console.debug("LoginController created.")
    }

    // public method
    init() {
        // load page
        this.#mainController.loadPage("loginPage");
        // set up listeners
        var controller = this;
        var backButton = document.getElementById("backButtonLogin");
        backButton.onclick = function () {
            controller.#mainController.goBack();
        };
        var loginButton = document.getElementById("loginButton");
        loginButton.onclick = function () {
            controller.#validate()
        };
    };

    // private method
    #validate() {
        try {
            var username = document.getElementById('username').value;
            var password = document.getElementById('password').value;
            if (username.trim().length > 0 && password.trim().length > 0) {
                this.#doLogin(username, password);
            } else {
                alert(tr("username and password cannot be empty"));
            }
        } catch (e) {
            console.debug("exception while executing function, e: " + e);
        }
    }

    // private method
    #doLogin(username, password) {
        // create a request handler object
        var requestHandler = this.#createRequestHandler(username, password);
        // open a loading dialog, this will be removed if the user clicks button
        alert("Logging in", Alerts.LOADING_CIRCLE, function (buttonIndex, buttonText) {
            requestHandler.cancelled = true;
        }, "cancel", null);
        // send request
        Request.send(requestHandler);
    }

    // private method
    #createRequestHandler(username, password) {
        // instance to the controller
        var controller = this;
        // create request handler object
        return {
            url: Statics.SERVER_APP_URL + "/login",
            method: "GET",
            async: true,
            cancelled: false,
            headers: { "x-http-requester": "X212" },
            data: { "username": username, "password": password },
            onCancel: function () {
                console.log("Request cancelled!");
            },
            error: function (e) {
                console.log("error: " + e, e)
            },
            requestNotInitialized: function () {
                console.debug("requestNotInitialized")
            },
            serverConnectionEstablished: function () {
                console.debug("serverConnectionEstablished")
            },
            requestReceived: function () {
                console.debug("requestReceived")
            },
            processingRequest: function () {
                console.debug("processingRequest")
            },
            requestFinishedResponseReady: function (request, response) {
                console.debug("requestFinishedResponseReady");
                Alerts.removeAllAlerts();
                try {
                    if (response.isLogged == "true") {
                        Store.putStorage("userInformation", response.user);
                        Store.putStorage("loginResponseMessage", response.message);
                        controller.#loggedController.init();
                    } else {
                        alert("could not login, message: " + response.message);
                    }
                } catch (e) {
                    alert(e);
                }
            }
        };
    }

}