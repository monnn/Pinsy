app.controller('SignupController', function ($scope, $location, auth, notifier) {
	$scope.signup = function (user) {
		auth.signup(user).then(function (success) {
			notifier.success('Successful registration');
			$location.path('/');
		});
	}

	$('.splash').click(function() {
		$('body').addClass('leaving');
	});
});