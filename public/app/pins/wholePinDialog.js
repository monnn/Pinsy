app.directive('wholePinDialog', [function() {
    return {
        restrict: 'E',
        scope: {
            pin: '=',
            onClose: '&'
        },
        templateUrl: 'app/pins/whole-pin-dialog.html'
    };
}]);