app.directive('infoWindowCustom', [function() {
    return {
        restrict: 'E',
        scope: {
            pin: '=',
            isInformative: '='
        },
        templateUrl: 'app/pins/info-window.html',

        controller: ['$scope', '$location', 'UserResource', 'LikeResource', 'CommentResource',
            function($scope, $location, UserResource, LikeResource, CommentResource) {
                $scope.likes = LikeResource.query({pinId: $scope.pin._id});
                $scope.comments = CommentResource.query({pinId: $scope.pin._id});
                UserResource.query({uId: $scope.pin.creator}).$promise.then(function(user) {
                    $scope.creator = user[0];
                });

                $scope.toggleWholePinOpened = function(pin) {
                    $scope.selectedPin = pin;
                    $scope.pinDataOpened = !$scope.pinDataOpened;
                    window.scrollTo(0, 0);
                    $('body').toggleClass('disable-scroll', $scope.pinDataOpened);
                };

                $scope.openProfile = function(userId) {
                    $('body').removeClass('disable-scroll');
                    $location.path('/user-profile').search({userId: userId});
                }
        }]
    };
}]);