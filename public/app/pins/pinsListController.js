app.controller('PinsListController', function ($scope, $sce, PinResource, NgMap, _) {
	$scope.pins = PinResource.query();

	$('.splash').click(function() {
		$('body').addClass('leaving');
	});

	$scope.showData = function(map) {
		console.log($scope.currentPin);
		$scope.currentPin = this.data;
		$sce.trustAsResourceUrl(this.data.video);
		var infowindow = new google.maps.InfoWindow({
			content: '<table class="content-info-window"><tr><td class="title-on-map">' + this.data.title + '</td></tr><tr><td class="description-on-map">' + this.data.description + '</td><td class="image-cell-on-map"><img src=' + this.data.image + ' class="image-on-map"></tr><tr><td class="creator-on-map">' + 'by ' + this.data.creator.username + '</td><td class="see-more"><a class="see-more-link" onclick="showWholePinData()">' + 'see more' + '</td></tr></table>'
		});
		infowindow.open(map, this);
	

	    var inner = $('.content-info-window');
	    var outer = inner.parent().parent().parent().parent();
	    var wholeInfoWindow = outer.children(':nth-child(1)').children(':nth-child(4)');
	    wholeInfoWindow.addClass("whole-info-window");

	    // var closeButton = inner.parent().parent().parent().parent().children(':nth-child(3)');
	    // closeButton.addClass("close-button");

	    // $('.close-button').click(function() {
	    // 	$scope.currentPin = null;
	    // 	console.log($scope.currentPin);
	    // })
	}

	showWholePinData = function() {
		$sce.trustAsResourceUrl($scope.currentPin.video);
		$scope.wholePinDataOpened = true;
		console.log($scope.wholePinDataOpened);
	}

	$scope.closeWholePinData = function() {
		$scope.wholePinDataOpened = false;
	}

});