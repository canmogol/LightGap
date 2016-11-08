function LoggedController() {

    var mainController = MainController.getInstance();

    this.init = function () {
        mainController.loadPage("loggedPage");

        var ipAddressSpan = document.getElementById("userInformation");
        ipAddressSpan.innerHTML = Store.getStorage("loginResponseMessage") + " " + Store.getStorage("userInformation");

        var listExampleButton = document.getElementById("listExampleButton");
        listExampleButton.onclick = function () {
            // first open a loading dialog, this will be removed if the user clicks button
            var handler = {
                url: Statics.SERVER_APP_URL + "/list",
                method: "GET",
                async: true,
                cancelled: false,
                headers: {},
                data: {},
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
                        Store.putStorage("items", JSON.stringify(response));
                        var listController = new ListController();
                        listController.init();
                    } catch (e) {
                        alert(e);
                    }
                }
            };
            alert("Getting List", Alerts.LOADING_CIRCLE, function (buttonIndex, buttonText) {
                handler.cancelled = true;
            }, "cancel", null);
            Request.send(handler);

        };

        var logoutButton = document.getElementById("logoutButton");
        logoutButton.onclick = function () {
            alert("Want to logout?", null, function (buttonIndex, buttonText) {
                if (buttonIndex == 1) {
                    //console.log("logout cancelled");
                } else if (buttonText == "ok") {
                    Store.clearStorage();
                    Store.putStorage("pageStackString", "menuPage");
                    document.getElementById("loggedPage").style.display = "none";
                    document.getElementById("menuPage").style.display = "block";
                    document.getElementById("userInformation").innerHTML = "";
                }
            }, ["ok", "cancel"], null);
        };

    };
}
