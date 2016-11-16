app.controller('PinsListController', function ($scope, $sce, PinResource, NgMap) {
    $scope.pins = PinResource.query();

    $('.splash').click(function() {
        $('body').addClass('leaving');
    });

    NgMap.getMap().then(function(map) {
        $scope.map = map;
    });

    $scope.showData = function(event, pin) {
        $scope.currentPin = pin;
        $scope.map.showInfoWindow('pin-iw', this);
    // $sce.trustAsResourceUrl(this.data.video);
    };

    $scope.toggleWholePinOpened = function() {
        $scope.wholePinOpened = !$scope.wholePinOpened;
        $('body').toggleClass('disable-scroll', $scope.wholePinOpened);
    };
});
