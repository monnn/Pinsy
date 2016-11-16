app.factory('auth', function($q, $http, identity, UserResource) {
	return {
		signup: function (user) {
			var user = new UserResource(user),
				deferred = $q.defer();
			user.$save().then(function () {
				identity.currentUser = user;
				deferred.resolve();
			}, function (response) {
				deferred.reject(response);
			});
			return deferred.promise;
		},
		login: function(user) {
			var deferred = $q.defer();
			$http.post('/login', user).success(function (response) {
				if (response.success) {
					var user = new UserResource();
					//extend user with response.user
					angular.extend(user, response.user);
					identity.currentUser = user;
					deferred.resolve(true);
				}
				else {
					deferred.resolve(false);
				}
			});

			return deferred.promise;
		},
		logout: function () {
			var deferred = $q.defer();
			$http.post('/logout').success(function () {
				identity.currentUser = undefined;
				deferred.resolve(false);
			});

			return deferred.promise;
		},
		isAuthorizedForRole: function (role) {
			var deferred = $q.defer();
			if (identity.isAuthorizedForRole(role)) {
				return true;
			} else {
				deferred.reject('not-authorized');
			}
			return deferred.promise;
		}
	}
});