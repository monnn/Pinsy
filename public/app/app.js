var app = angular.module('app', ['ngResource', 'ngRoute', 'ngFileUpload', 'ngMap', 'underscore']).value('toastr', toastr);

app.config(function ($routeProvider, $locationProvider) {
  // $locationProvider.html5Mode(true);

    var routeRoleChecks = {
        admin: {
            auth: function (auth) {
                return auth.isAuthorizedForRole('admin');
            }
        }
    };

    $routeProvider
        .when('/', {
            templateUrl: '/partials/main/home',
            controller: 'MainController'
        })
        .when('/word-cloud', {
            templateUrl: '/partials/main/word-cloud-view',
            controller: 'MainController'
        })
        .when('/signup', {
            templateUrl: '/partials/account/signup',
            controller: 'SignupController'
        })
        .when('/new-pin', {
            templateUrl: '/partials/pins/new-pin',
            controller: 'PinController'
        })
        .when('/all-pins', {
            templateUrl: '/partials/pins/all-pins',
            controller: 'PinsListController'
        })
        .when('/admin/users', {
            templateUrl: '/partials/admin/users-list',
            controller: 'UserListController',
            resolve: routeRoleChecks.admin
    });
});

app.run(function ($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function (event, current, previous, rejection) {
        if (rejection === 'not-authorized') {
            $location.path('/');
        }
    })
});
