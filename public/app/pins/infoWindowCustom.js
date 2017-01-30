app.directive('infoWindowCustom', [function() {
    return {
        restrict: 'E',
        scope: {
            pin: '=',
            isInformative: '='
        },
        templateUrl: 'app/pins/info-window.html',

        controller: ['$scope', '$location', 'PinResource', 'LikeResource', 'CommentResource',
            function($scope, $location, PinResource, LikeResource, CommentResource) {
                $scope.likes = LikeResource.query({pinId: $scope.pin._id});
                $scope.comments = CommentResource.query({pinId: $scope.pin._id});

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