app.controller('PinController', function ($scope, $location, $timeout, pinService, notifier, NgMap) {
    $scope.createPin = function (pin) {
        $("html, body").animate({ scrollTop: 0 }, "fast");
        $timeout(function() {
            $scope.isLoading = true;
        }, 200);
        pin.tags = pin.tags.split(', ');
        pin.location = $scope.location;
        pin.markerPosition = [pin.location.lat(), pin.location.lng()];
        pinService.createPin(pin).then(function (success) {
            $scope.isLoading = false;
            notifier.success('Pin successfully created');
            $location.path('/');
        });
    };

    $('.splash').click(function() {
        $('body').addClass('leaving');
    });

    NgMap.getMap().then(function(map) {
        console.log(map.getCenter());
    });

    $scope.placeMarker = function(event, map) {
        var location = event.latLng,
            marker = new google.maps.Marker({
                position: location,
                map: map
            });
        $scope.location = location;
        map.panTo(location);
    };
});
