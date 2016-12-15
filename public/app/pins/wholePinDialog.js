app.directive('wholePinDialog', [function() {
    return {
        restrict: 'E',
        scope: {
            pin: '=',
            openProfile: '&',
            onClose: '&'
        },
        templateUrl: 'app/pins/whole-pin-dialog.html'
    };
}]);