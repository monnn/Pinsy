app.controller('UserListController', function ($scope, UserResource) {
	$scope.users = UserResource.query();
});