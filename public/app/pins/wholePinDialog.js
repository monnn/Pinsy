app.directive('wholePinDialog', [function() {
    return {
        restrict: 'E',
        scope: {
            pin: '=',
            creator: '=',
            openProfile: '&',
            onClose: '&'
        },
        templateUrl: 'app/pins/whole-pin-dialog.html'
    };
}]);