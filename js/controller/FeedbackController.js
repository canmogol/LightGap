FeedbackController = function () {
    console.log("FeedbackController constructed");

    // parent object
    var parent = new BaseController();

	// inherit from BaseController as parent object
    var feedbackController = Object.create(parent);

	// init method of FeedbackController, overrides the BaseController's init method
	// uncomment below definition to use the BaseController's init method
	feedbackController.init = function () {
		// you may call parent's init method first
		parent.init();
		// log call
	    console.log("FeedbackController init method called");
	};

	// return FeedbackController instance
	return feedbackController;

};
