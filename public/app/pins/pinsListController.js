app.controller('PinsListController', function ($scope, PinResource, NgMap, _) {
	$scope.pins = PinResource.query();

	$('.splash').click(function() {
		$('body').addClass('leaving');
	});

	$scope.showData = function(map) {
		console.log(this.data);
		var infowindow = new google.maps.InfoWindow({
			content: '<table class="content-info-window"><tr><td class="title-on-map">' + this.data.title + '</td></tr><tr><td class="description-on-map">' + this.data.description + '</td><td class="image-cell-on-map"><img src=' + this.data.attachment + ' class="image-on-map"></tr><tr><td class="creator-on-map">' + 'by ' + this.data.creator.username + '</td><td class="see-more"><a class=see-more-link href="/">' + 'see more' + '</tr></table>'
		});
		infowindow.open(map, this);

		// google.maps.event.addListener(infowindow, 'domready', function() {
		    var inner = $('.content-info-window');
		    var outer = inner.parent().parent().parent().parent();
		    var wantedClass = outer.children(':nth-child(1)').children(':nth-child(4)');
		    wantedClass.addClass("whole-info-window");
		// });
	}

});