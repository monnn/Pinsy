app.factory('UserResource', function ($resource) {
    var UserResource = $resource('/api/users/:id', {_id: '@id', uId: '@uId'});
    UserResource.prototype.isAdmin = function () {
        return this.roles && this.roles.indexOf('admin') > -1;
    };
    return UserResource;
});
