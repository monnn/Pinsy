app.controller('PinsListController', function ($scope, $sce, $location, PinResource, NgMap, identity, pinService, LikeResource, CommentResource) {
    $scope.pins = PinResource.query();
    $scope.currentUser = identity.currentUser;

    $('.splash').click(function() {
        $('body').addClass('leaving');
    });

    NgMap.getMap().then(function(map) {
        $scope.map = map;
    });

    $scope.showData = function(event, pin) {
        $scope.pin = pin;
        $scope.map.showInfoWindow('pin-iw', this);
        $scope.likes = LikeResource.query({pinId: pin._id});
        $scope.comments = CommentResource.query({pinId: pin._id});
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
        pinService.likePin($scope.pin, hasLiked).then(function(like) {
            if (hasLiked) {
                $scope.likes.pop(like);
            } else {
                $scope.likes.push(like);
            }
        });
    };

    $scope.openProfile = function(userId) {
        $('body').removeClass('disable-scroll');
        $location.path('/user-profile').search({userId: userId});
    }
});
