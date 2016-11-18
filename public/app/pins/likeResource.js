app.factory('LikeResource', function ($resource) {
    var LikeResource = $resource('/pin/likes/:id', {_id: '@id', pinId: '@pinId'});
    return LikeResource;
});
