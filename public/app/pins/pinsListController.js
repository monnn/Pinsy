app.controller('PinsListController', function ($scope, $sce, PinResource, NgMap, identity, pinService, LikeResource) {
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
        $scope.likes = LikeResource.query({pinId: pin._id});
    // $sce.trustAsResourceUrl(this.data.video);
    };

    $scope.toggleWholePinOpened = function() {
        $scope.wholePinOpened = !$scope.wholePinOpened;
        $('body').toggleClass('disable-scroll', $scope.wholePinOpened);
    };

    $scope.hasLiked = function() {
        var currentUserLike = $scope.likes.filter(function(like) {
            return like.user === identity.currentUser._id;
        });
        return currentUserLike.length > 0;
    };

    $scope.like = function() {
        return $scope.toggleLike($scope.hasLiked());
    };

    $scope.toggleLike = function(hasLiked) {
        pinService.likePin($scope.currentPin, hasLiked).then(function(pin) {
            if (hasLiked) {
                $scope.likes.pop(pin);
            } else {
                $scope.likes.push(pin);
            }
        });
    }
});
