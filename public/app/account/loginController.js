app.controller('LoginController', function ($scope, $location, notifier, identity, auth) {
	$scope.identity = identity;

	$scope.login = function (user) {
		auth.login(user).then(function (success) {
			if (success) {
				notifier.success('Successful login');
			}
			else {
				notifier.error('Username/password is incorrect');
			}
		})
	}

	$scope.logout = function () {
		auth.logout().then(function () {
			$scope.user = {};
			notifier.success('Successful logout');
			$location.path('/');
		});
	}
})