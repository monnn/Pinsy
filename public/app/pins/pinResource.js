app.factory('PinResource', function ($resource) {
    var PinResource = $resource('/api/pins/:id', {_id: '@id', pinId: '@pinId', userId: '@userId', tag: '@tag'});
    return PinResource;
});
