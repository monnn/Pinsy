app.controller('PinsListController', function ($scope, $sce, PinResource, NgMap, identity, pinService, LikeResource, CommentResource) {
    $scope.pins = PinResource.query();
    $scope.currentUser = identity.currentUser;

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
        $scope.comments = CommentResource.query({pinId: pin._id});
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
        pinService.likePin($scope.currentPin, hasLiked).then(function(like) {
            if (hasLiked) {
                $scope.likes.pop(like);
            } else {
                $scope.likes.push(like);
            }
        });
    };

    $scope.addComment = function(comment) {
        pinService.commentPin($scope.currentPin, comment).then(function(newComment) {
            $scope.comments.unshift(newComment);
        });
    }
});
