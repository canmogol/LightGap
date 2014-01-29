window.onload = function () {
    var backButton = document.getElementById("backButton");
    backButton.onclick = function () {
        mainController.goBack();
    }
    var loginButton = document.getElementById("loginButton");
    loginButton.onclick = function () {
        var loginController = new LoginController();
        loginController.validate();
    }
};

function LoginController() {

    this.doLogin = function () {
        // first open a loading dialog, this will be removed if the user clicks button
        var handler = {
            url: "http://10.10.4.235/lg/login.php",
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
                    /*
                     var response = JSON.parse(req.response);
                     alert(response.ip, null, function () {
                     mainController.loadPage("logged.html");
                     });
                     */
                    if (response.isLogged == "true") {
                        putStorage("userInformation", response.user);
                        putStorage("loginResponseMessage", response.message);
                        mainController.loadPage("logged.html");
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
