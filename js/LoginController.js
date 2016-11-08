function LoginController() {

    // extend BaseController
    this.prototype = new BaseController();

    // private field
    var mainController = MainController.getInstance();

    // public method
    this.publicMethod = function () {
        console.log("public method called");
    };

    // public method
    this.otherPublicMethod = function () {
        console.log("another public method called");
    };

    // private method
    function doLogin(username, password) {
        // create a request handler object
        var requestHandler = {
            url: Statics.SERVER_APP_URL + "login",
            method: "GET",
            async: true,
            cancelled: false,
            headers: {"x-http-requester": "X212"},
            data: {"username": username, "password": password},
            onCancel: function () {
                console.log("Request cancelled!");
            },
            error: function (e) {
                console.log("error: " + e)
            },
            requestNotInitialized: function () {
                //console.log("requestNotInitialized")
            },
            serverConnectionEstablished: function () {
                //console.log("serverConnectionEstablished")
            },
            requestReceived: function () {
                //console.log("requestReceived")
            },
            processingRequest: function () {
                //console.log("processingRequest")
            },
            requestFinishedResponseReady: function (request, response) {
                //console.log("CALL CALLBACK! requestFinishedResponseReady, cancelled: " + handler.cancelled);
                Alerts.removeAllAlerts();
                try {
                    if (response.isLogged == "true") {
                        Store.putStorage("userInformation", response.user);
                        Store.putStorage("loginResponseMessage", response.message);
                        var loggedController = new LoggedController();
                        loggedController.init();
                    } else {
                        alert("could not login, message: " + response.message);
                    }
                } catch (e) {
                    alert(e);
                }
            }
        };
        // open a loading dialog, this will be removed if the user clicks button
        alert("Logging in", Alerts.LOADING_CIRCLE, function (buttonIndex, buttonText) {
            requestHandler.cancelled = true;
        }, "cancel", null);
        
        // send request
        Request.send(requestHandler);
    }

    // private method
    function validate() {
        try {
            var username = document.getElementById('username').value;
            var password = document.getElementById('password').value;
            if (username.trim().length > 0 && password.trim().length > 0) {
                doLogin(username, password);
            } else {
                alert(tr("username and password cannot be empty"));
            }
        } catch (e) {
            console.debug("exception while executing function, e: " + e);
        }
    }

    // constructor
    (function (controller) {
        controller.publicMethod();
        mainController.loadPage("loginPage");

        var backButton = document.getElementById("backButtonLogin");
        backButton.onclick = function () {
            mainController.goBack();
        };
        var loginButton = document.getElementById("loginButton");
        loginButton.onclick = function () {
            validate();
        };
    })(this);

}
