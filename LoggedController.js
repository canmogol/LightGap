window.onload = function () {
    var ipAddressSpan = document.getElementById("userInformation");
    ipAddressSpan.innerHTML = getStorage("loginResponseMessage") + " " + getStorage("userInformation");
    var listExampleButton = document.getElementById("listExampleButton");
    listExampleButton.onclick = function () {
        // first open a loading dialog, this will be removed if the user clicks button
        var handler = {
            url: "http://10.10.4.235/lg/list.php",
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
                    var items = response;
                    console.log(items);
                    putStorage("items", JSON.stringify(items));
                    mainController.loadPage("list.html");
                } catch (e) {
                    alert(e);
                }
            }
        };
        alert("loading...", "LOADING", function () {
            handler.cancelled = true;
        }, "cancel", null);
        sendRequest(handler);

    };

    var logoutButton = document.getElementById("logoutButton");
    logoutButton.onclick = function () {
        //alert("see you later :)");
        /*
         , null, function () {
         mainController.logout();
         });
         */
        mainController.logout();
    };
};

function LoggedController() {
}
