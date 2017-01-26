app.controller('RecentController', function ($scope, $timeout, PinResource, CommentResource, LikeResource, _) {
    
    $scope.pins = PinResource.query();
    $scope.allComments = CommentResource.query();

    //from all comments take last 10, ordered by date
    $scope.allComments.$promise.then(function(comments) {
    	$scope.recentComments = comments.slice(0, 10);
    	$scope.comments = $scope.recentComments;
    })

    //from all pins take last 10, ordered by date
	$scope.pins.$promise.then(function(pins) {
		$scope.recentPins = pins.reverse().slice(0, 10);
		$scope.recentPins.map(function(pin) {
			pin.relativeDate = moment(pin.date).fromNow();
		});
	})

    var getPopularTodayPins = function() {
    	var currentDate = new Date(),
    		day = currentDate.getDate(),
    		month = currentDate.getMonth() + 1,
    		year = currentDate.getFullYear();

		if(day < 10) {
		    day = '0' + day;
		} 

		if(month < 10) {
		    month = '0' + month;
		}

		var today = year + '-' + month + '-' + day;
		$scope.todayLikes = LikeResource.query({date: today});
		$scope.todayLikes.$promise.then(function(likes) {
           console.log(likes);
        });
    	//get likes where date = today
    	//put likes into hashmap, where key = pin, which is liked, value = number of likes on pin
    	//take first ten with highest value
    	// $scope.popularTodayPins = $scope.pins.take(10);
    }
    getPopularTodayPins();

    $scope.isInformative = true;

    $('.splash').click(function() {
        $('body').addClass('leaving');
    });

    $('.carousel').carousel({
        interval: 3000
    })

    $('.first-carousel-indicator').addClass('active');
});
