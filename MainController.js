// main controller
function MainController() {

    this.getPageStack = function () {
        if (getStorage("pageStackString").trim().length > 0) {

            var pageStackString = getStorage("pageStackString");
            return pageStackString.split(",")
        } else {
            return [];
        }
    };

    this.setPageStack = function (pageStack) {
        var pageStackString = "";
        for (var i = 0; i < pageStack.length; i++) {
            pageStackString += pageStack[i] + ",";
        }
        if (pageStackString.length > 0 && pageStackString.substring(pageStackString.length - 1) == ",") {
            pageStackString = pageStackString.substring(0, pageStackString.length - 1)
        }
        putStorage("pageStackString", pageStackString);
    };

    this.addToPageStack = function (page) {
        if (page != null && page != undefined && page.trim().length > 0) {
            var pageStack = this.getPageStack();
            if (pageStack.length > 0) {
                if (pageStack[pageStack.length - 1] != page) {
                    pageStack.push(page);
                } else {
                    //console.debug("try to push same page to top, will do nothing.");
                }
            } else {
                pageStack.push(page);
            }
            this.setPageStack(pageStack);
        }
    };

    this.popFromPageStack = function () {
        var pageStack = this.getPageStack();
        var poppedPage = pageStack.pop();
        this.setPageStack(pageStack);
        return poppedPage;
    };

    this.goBack = function () {
        // current page, something like "login.html"
        if (this.getPageStack().length > 1) {
            var currentPage = this.popFromPageStack();
            var pageToLoad = this.popFromPageStack();
            this.loadPage(pageToLoad);
        } else {
            //console.debug("trying to go back but this is the last page! will do nothing.");
        }
    };

    this.logout = function () {
        putStorage("pageStackString", "menu.html");
        this.loadPage("menu.html");
    };

    this.loadPage = function (page) {
        this.addToPageStack(page);
        //console.log("loadPage getPageStack: " + this.getPageStack());
        try {
            window.location.href = page;
        } catch (e) {
            document.location = "file:///android_asset/" + page;
        }
    };
}
if (!mainController) {
    var mainController = new MainController();
}
