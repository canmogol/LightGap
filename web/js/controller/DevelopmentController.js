function DevelopmentController() {

    this.init = function () {
        // do development related stuff
        this.setReloadButtonActive();
    };

    this.setReloadButtonActive = function () {
        var reloadButton = document.getElementById("reloadButton");
        reloadButton.style.display = "block";
        reloadButton.onclick = function () {
            document.location.href = "index.html?" + Math.random();
        }
    };

}