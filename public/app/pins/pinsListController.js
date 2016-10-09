app.controller('PinsListController', function ($scope, $sce, PinResource, NgMap, _) {
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

	    // var inner = $('.content-info-window:eq( 2 )');
	    // console.log(inner);
	    // var outer = inner.parent().parent().parent().parent();
	    // var wholeInfoWindow = outer.children(':nth-child(1)').children(':nth-child(4)');
	    // console.log(wholeInfoWindow);
	    // wholeInfoWindow.addClass("whole-info-window");
	}

	$scope.toggleWholePinOpened = function() {
		$scope.wholePinOpened = !$scope.wholePinOpened;
		$('body').toggleClass('disable-scroll', $scope.wholePinOpened);
	}
});