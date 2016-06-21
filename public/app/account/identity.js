app.factory('identity', function ($window, UserResource) {

	var user;

	if ($window.bootstrappedUserObject) {
		user = new UserResource();
		angular.extend(user, $window.bootstrappedUserObject);
		//extend user with bootstrappedUserObject
	}
	return {
		currentUser: user, //undefined ?!
		isAuthenticated: function () {
			return !!this.currentUser;
		},
		isAuthorizedForRole: function (role) {
			return !!this.currentUser && this.currentUser.roles.indexOf(role) > -1;
		}
	}
})