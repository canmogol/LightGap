function LoginController() {

    this.init = function () {
        mainController.loadPage("loginPage");

        var loginController = this;
        var backButton = document.getElementById("backButtonLogin");
        backButton.onclick = function () {
            mainController.goBack();
        };
        var loginButton = document.getElementById("loginButton");
        loginButton.onclick = function () {
            loginController.validate();
        };
    };

    this.doLogin = function () {
        // first open a loading dialog, this will be removed if the user clicks button
        var handler = {
            url: Statics.SERVER_APP_URL + "login.php",
            method: "GET",
            async: true,
            cancelled: false,
            headers: {"x-http-requester": "X212"},
            data: {"username": "asd", "password": "123"},
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
                        alert("could not login, " + response.message);
                    }
                } catch (e) {
                    alert(e);
                }
            }
        };
        alert("Logging in", "LOADING-CIRCLE", function (buttonIndex, buttonText) {
            handler.cancelled = true;
        }, "cancel", null);
        sendRequest(handler);
    };

    this.validate = function () {
        try {
            var username = document.getElementById('username').value;
            var password = document.getElementById('password').value;
            if (username.trim().length > 0 && password.trim().length > 0) {
                this.doLogin();
            } else {
                alert(tr("username and password cannot be empty"));
            }
        } catch (e) {
            console.debug("exception while executing function, e: " + e);
        }
    };

}
