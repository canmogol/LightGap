// main controller
var MainController = (function () {

    function MyController(){
        this.getPageStack = function () {
            if (Store.getStorage("pageStackString").trim().length > 0) {
                var pageStackString = Store.getStorage("pageStackString");
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
            Store.putStorage("pageStackString", pageStackString);
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
            if (this.getPageStack().length > 1) {
                var currentPage = this.popFromPageStack();
                document.getElementById(currentPage).style.display = "none";
                var pageToLoad = this.popFromPageStack();
                document.getElementById(pageToLoad).style.display = "block";
                this.loadPage(pageToLoad);
            } else {
                console.debug("trying to go back but this is the last page! will do nothing.");
            }
        };

        this.loadPage = function (page) {
            try {
                var pages = this.getPageStack();
                if (pages.length > 0) {
                    var pageId = pages[pages.length - 1];
                    var pageContainer = document.getElementById(pageId);
                    pageContainer.style.display = "none";
                }
                document.getElementById(page).style.display = "block";
                this.addToPageStack(page);
            } catch (e) {
                console.debug("exception occured while displaying new page, e: " + e);
            }
        };
    }

    var instance;
    return {
        getInstance: function () {
            if (!instance) {
                instance = new MyController();
            }
            return instance;
        }
    };
})();