app.directive('infoWindowCustom', [function() {
    return {
        restrict: 'E',
        scope: {
            pin: '=',
            isInformative: '='
        },
        templateUrl: 'app/pins/info-window.html',

        controller: ['$scope', '$location', 'PinResource',
            function($scope, $location, PinResource) {

            $('.splash').click(function() {
                $('body').addClass('leaving');
            });
        }]
    };
}]);