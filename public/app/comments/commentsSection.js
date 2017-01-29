app.directive('commentsSection', [function() {
    return {
        restrict: 'E',
        scope: {
            pin: '=',
            isInformative: '=',
            limit: '='
        },
        templateUrl: 'app/comments/comments-section.html',

        controller: ['$scope', 'identity', 'CommentResource', 'pinService', 'UserResource',
        function($scope, identity, CommentResource, pinService, UserResource) {
            $scope.currentUser = identity.currentUser;

            loadComments = function() {
                if ($scope.pin) {
                    $scope.comments = CommentResource.query({pinId: $scope.pin._id});
                } else if ($scope.isInformative) {
                    $scope.comments = CommentResource.query({});
                }
                $scope.comments.$promise.then(function(comments) {
                    if ($scope.limit) {
                        comments = comments.slice(0, $scope.limit);
                    }
                    comments.map(function(comment) {
                        comment.relativeDate = moment(comment.date).fromNow();
                        //for each comment from comments create a query for the username of the creator
                        comment.creator = UserResource.query({uId: comment.user});
                    })
                    $scope.comments = comments;
                });
            }
            loadComments();

            $scope.addComment = function(comment) {
                pinService.commentPin($scope.pin, comment).then(function(newComment) {
                    // loadComments();
                    newComment.relativeDate = moment(newComment.date).fromNow();
                    newComment.creator = [$scope.currentUser];
                    $scope.comments.unshift(newComment);
                });
            }
        }]
    };
}]);