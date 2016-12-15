app.directive('userProfile', [function() {
    return {
        restrict: 'E',
        scope: {
            onEditPage: '=',

            onClick: '&'
        },
        templateUrl: 'app/users/user-profile.html',

        controller: ['$scope', '$location', 'identity', 'UserResource', function($scope, $location, identity, UserResource) {

            var selectedUserId = $location.search().userId;

            //display info of user with given id:
            if (selectedUserId) {
                $scope.result = UserResource.query({uId: selectedUserId});
            } else {
                $scope.result = UserResource.query({uId: identity.currentUser._id});
            }

            $('.splash').click(function() {
                $('body').addClass('leaving');
            });

            $scope.$on('destroy', function() {
            });
        }],
        link: function(scope, element) {
            function getLinks() {
                return true;
            }
        }
    };
}]);