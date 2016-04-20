/*
 * Controller for feedback action
 */
fbControllers.controller('EditCtrl',  ['$scope', '$log', 'Model', function($scope, $log, Model) {

	var ctrl = this;

	ctrl.questions = [];
	ctrl.currentFeedbackList = [];
	ctrl.feedbackHistoryList = [];

	// get the pending actions
	Model.getQuestionSet().then(function(response) {
		ctrl.questions = response;
	});

	ctrl.save = function(feedbackId) {
		//todo
	};

	ctrl.cancel = function(feedbackId) {
		// $location.path = "/edit";
	}
}]);