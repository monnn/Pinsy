app.factory('CommentResource', function ($resource) {
    var CommentResource = $resource('/pin/comments/:id', {_id: '@id', pinId: '@pinId', userId: '@userId'});
    return CommentResource;
});
