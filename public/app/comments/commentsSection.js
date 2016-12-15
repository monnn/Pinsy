app.directive('commentsSection', [function() {
    return {
        restrict: 'E',
        scope: {
            pin: '='
        },
        templateUrl: 'app/comments/comments-section.html',

        controller: ['$scope', 'identity', 'CommentResource', 'pinService', function($scope, identity, CommentResource, pinService) {
            $scope.comments = CommentResource.query({pinId: $scope.pin._id});
            $scope.currentUser = identity.currentUser;

            //for each comment from comments create a query for the username of the creator

            $scope.addComment = function(comment) {
                pinService.commentPin($scope.pin, comment).then(function(newComment) {
                    $scope.comments.unshift(newComment);
                });
            }
        }]
    };
}]);