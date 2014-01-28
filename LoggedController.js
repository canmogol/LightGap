window.onload = function () {
    var ipAddressSpan = document.getElementById("userInformation");
    ipAddressSpan.innerHTML = "welcome " + getStorage("userInformation");
    var listExampleButton = document.getElementById("listExampleButton");
    listExampleButton.onclick = function () {
        // first open a loading dialog, this will be removed if the user clicks button
        var handler = {
            url: "http://voyager.innova.com.tr/unity.mobile.gateway/ServerFlowServlet?OP_NAME=doGetAdliyeler&TakipDosyaNo=2010&TakipId=20101&SO_USER_NAME=app-innova&SO_PASS_WORD=q5F1sZlVT&lat=0&long=0#",
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
                    var adliyeler = response.response.sehirler[0].adliyeler;
                    var adliyelerString = JSON.stringify(adliyeler);
                    putStorage("adliyeler", adliyelerString);
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
