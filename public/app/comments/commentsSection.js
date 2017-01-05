app.directive('commentsSection', [function() {
    return {
        restrict: 'E',
        scope: {
            pin: '='
        },
        templateUrl: 'app/comments/comments-section.html',

        controller: ['$scope', 'identity', 'CommentResource', 'pinService', 'UserResource',
        function($scope, identity, CommentResource, pinService, UserResource) {
            $scope.currentUser = identity.currentUser;

            loadComments = function() {
                $scope.comments = CommentResource.query({pinId: $scope.pin._id});
                $scope.comments.$promise.then(function(comments) {
                    //for each comment from comments create a query for the username of the creator
                    comments.map(function(comment) {
                        comment.relativeDate = moment(comment.date).fromNow();
                        console.log(comment.relativeDate);
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