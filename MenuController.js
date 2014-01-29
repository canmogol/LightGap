window.onload = function () {
    var menuController = new MenuController();
    var screenLoginButton = document.getElementById("screenLoginButton");
    screenLoginButton.onclick = function () {
        /*
        alert("loading...", "LOADING", function () {
            alert("loading...", "LOADING-CIRCLE");
        }, "cancel", null);
        alert("first one");
        alert("second one");
        alert("click me", null, function () {
            mainController.loadPage("login.html");
        }, "tamam", "Warning!");
         */
        mainController.loadPage("login.html");
    }
};

function MenuController() {
    putStorage("pageStackString", "menu.html");
    //console.log("getStorage(pageStackString): " + getStorage("pageStackString"));
    
}
