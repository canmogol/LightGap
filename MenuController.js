window.onload = function () {
    var menuController = new MenuController();
    menuController.init();
};

function MenuController() {
    this.init = function () {
        putStorage("pageStackString", "menuPage");
        var screenLoginButton = document.getElementById("screenLoginButton");
        screenLoginButton.onclick = function () {
            var loginController = new LoginController();
            loginController.init();
        };
        var newsButton = document.getElementById("newsButton");
        newsButton.onclick = function () {
            document.location.href = "http://10.10.4.235/lg/index.html?" + Math.random();
        }
    };
}
