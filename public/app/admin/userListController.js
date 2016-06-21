app.controller('UserListController', function ($scope, UserResource) {
	//query прави апи кол без ид и връща колекция
	console.log('in UserListController')
	$scope.users = UserResource.query();
});