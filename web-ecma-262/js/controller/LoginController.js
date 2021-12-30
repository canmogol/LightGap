'use strict';
// Login Controller.
class LoginController extends BaseController {

    // private field
    __mainController;

    // private field
    __loggedController;

    // constructor
    constructor() {
        super();
        this.__mainController = MainController.getInstance();
        this.__loggedController = new LoggedController();
        console.debug("LoginController created.")
    }

    // public method
    init() {
        // load page
        this.__mainController.loadPage("loginPage");
        // set up listeners
        var controller = this;
        var backButton = document.getElementById("backButtonLogin");
        backButton.onclick = function () {
            controller.__mainController.goBack();
        };
        var loginButton = document.getElementById("loginButton");
        loginButton.onclick = function () {
            controller.__validate()
        };
    };

    // private method
    __validate() {
        try {
            var username = document.getElementById('username').value;
            var password = document.getElementById('password').value;
            if (username.trim().length > 0 && password.trim().length > 0) {
                this.__doLogin(username, password);
            } else {
                alert(tr("username and password cannot be empty"));
            }
        } catch (e) {
            console.debug("exception while executing function, e: " + e);
        }
    }

    // private method
    __doLogin(username, password) {
        // create a request handler object
        var requestHandler = this.__createRequestHandler(username, password);
        // open a loading dialog, this will be removed if the user clicks button
        alert("Logging in", Alerts.LOADING_CIRCLE, function (buttonIndex, buttonText) {
            requestHandler.cancel = true;
        }, "cancel", null);
        // send request
        Request.send(requestHandler);
    }

    // private method
    __createRequestHandler(username, password) {
        // instance to the controller
        var controller = this;
        // create request handler object
        return {
            url: Statics.SERVER_APP_URL + "/login",
            method: "GET",
            async: true,
            cancel: false,
            headers: { "x-http-requester": "X212" },
            data: { "username": username, "password": password },
            onCancel: function (request) {
                console.log("Request cancelled!", request);
            },
            onError: function (e) {
                console.log("error: " + e, e)
            },
            requestNotInitialized: function (request) {
                console.debug("requestNotInitialized")
            },
            serverConnectionEstablished: function (request) {
                console.debug("serverConnectionEstablished")
            },
            requestReceived: function (request) {
                console.debug("requestReceived")
            },
            processingRequest: function (request) {
                console.debug("processingRequest")
            },
            requestFinishedResponseReady: function (request, response) {
                console.debug("requestFinishedResponseReady");
                response = JSON.parse(response);
                Alerts.removeAllAlerts();
                try {
                    if (response.isLogged == "true") {
                        Store.putStorage("userInformation", response.user);
                        Store.putStorage("loginResponseMessage", response.message);
                        controller.__loggedController.init();
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
