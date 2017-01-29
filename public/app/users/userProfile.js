app.directive('userProfile', [function() {
    return {
        restrict: 'E',
        scope: {
            onEditPage: '=',

            onClick: '&'
        },
        templateUrl: 'app/users/user-profile.html',

        controller: ['$scope', '$location', 'identity', 'UserResource', 'CommentResource', 'PinResource',
            function($scope, $location, identity, UserResource, CommentResource, PinResource) {

            var userId = $location.search().userId || identity.currentUser._id;
            $scope.users = UserResource.query({uId: userId});
            $scope.commentsFromUser = CommentResource.query({userId: userId});
            $scope.pins = PinResource.query({userId: userId});

            $scope.changeView = function(view) {
                if (view === 'pins') {
                    $scope.pinsViewOpened = true;
                    $scope.commentsViewOpened = false;
                } else if (view === 'comments') {
                    $scope.commentsViewOpened = true;
                    $scope.pinsViewOpened = false;
                } else {
                    $scope.commentsViewOpened = false;
                    $scope.pinsViewOpened = false;
                }
            }

            $scope.toggleWholePinOpened = function(pin) {
                $scope.pin = pin;
                $scope.pinDataOpened = !$scope.pinDataOpened;
                window.scrollTo(0, 0);
                $('body').toggleClass('disable-scroll', $scope.pinDataOpened);
            };

            $('.splash').click(function() {
                $('body').addClass('leaving');
            });

            $scope.$on('destroy', function() {
            });
        }]
    };
}]);