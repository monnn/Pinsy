app.controller('PinsListController', function ($scope, $sce, PinResource, NgMap, identity, pinService) {
    $scope.pins = PinResource.query();

    $('.splash').click(function() {
        $('body').addClass('leaving');
    });

    NgMap.getMap().then(function(map) {
        $scope.map = map;
    });

    $scope.showData = function(event, pin) {
        $scope.currentPin = pin;
        $scope.map.showInfoWindow('pin-iw', this);
    // $sce.trustAsResourceUrl(this.data.video);
    };

    $scope.toggleWholePinOpened = function() {
        $scope.wholePinOpened = !$scope.wholePinOpened;
        $('body').toggleClass('disable-scroll', $scope.wholePinOpened);
    };

    $scope.hasLiked = function() {
        return $.inArray(identity.currentUser._id, $scope.currentPin.likes) > -1;
    };

    $scope.like = function() {
        return $scope.toggleLike($scope.hasLiked());
    };

    $scope.toggleLike = function(hasLiked) {
        pinService.likePin($scope.currentPin, hasLiked).then(function(success) {
            $scope.currentPin = success;
            console.log('liked!')
        });
    }
});
