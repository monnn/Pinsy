app.factory('PinResource', function ($resource) {
    var PinResource = $resource('/api/pins/:id', {_id: '@id', userId: '@userId'});
    return PinResource;
});
