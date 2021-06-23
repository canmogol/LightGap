'use strict';
// main controller
class MainController extends BaseController {

    // private static field
    static __MAIN_CONTROLLER_INSTANCE;

    // constructor
    constructor() {
        super();
        console.debug("MainController created.");
    }

    // public static method
    static getInstance() {
        if (!MainController.__MAIN_CONTROLLER_INSTANCE) {
            MainController.__MAIN_CONTROLLER_INSTANCE = new MainController();
        }
        return MainController.__MAIN_CONTROLLER_INSTANCE;
    }

    // public method
    goBack() {
        if (this.__getPageStack().length > 1) {
            // remove current page
            var currentPage = this.__popFromPageStack();
            document.getElementById(currentPage).style.display = "none";
            // display previous page
            var previousPage = this.__popFromPageStack();
            document.getElementById(previousPage).style.display = "block";
            // load previous page
            this.loadPage(previousPage);
        } else {
            console.debug("trying to go back but this is the last page! will do nothing.");
        }
    }

    // public method
    loadPage(page) {
        try {
            var pages = this.__getPageStack();
            if (pages.length > 0) {
                var pageId = pages[pages.length - 1];
                var pageContainer = document.getElementById(pageId);
                pageContainer.style.display = "none";
            }
            document.getElementById(page).style.display = "block";
            this.__addToPageStack(page);
        } catch (e) {
            console.debug("exception occured while displaying new page, e: " + e, e);
        }
    }

    // private method
    __getPageStack() {
        if (Store.getStorage("pageStackString").trim().length > 0) {
            var pageStackString = Store.getStorage("pageStackString");
            return pageStackString.split(",")
        } else {
            return [];
        }
    }

    // private method
    __setPageStack(pageStack) {
        var pageStackString = "";
        for (var i = 0; i < pageStack.length; i++) {
            pageStackString += pageStack[i] + ",";
        }
        if (pageStackString.length > 0 && pageStackString.substring(pageStackString.length - 1) == ",") {
            pageStackString = pageStackString.substring(0, pageStackString.length - 1)
        }
        Store.putStorage("pageStackString", pageStackString);
    }

    // private method
    __addToPageStack(page) {
        if (page != null && page != undefined && page.trim().length > 0) {
            var pageStack = this.__getPageStack();
            if (pageStack.length > 0) {
                if (pageStack[pageStack.length - 1] != page) {
                    pageStack.push(page);
                } else {
                    //console.debug("try to push same page to top, will do nothing.");
                }
            } else {
                pageStack.push(page);
            }
            this.__setPageStack(pageStack);
        }
    }

    // private method
    __popFromPageStack() {
        var pageStack = this.__getPageStack();
        var poppedPage = pageStack.pop();
        this.__setPageStack(pageStack);
        return poppedPage;
    }


}