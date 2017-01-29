app.controller('RecentController', function ($scope, $timeout, PinResource, LikeResource, _) {
    
    $scope.pins = PinResource.query();

    $scope.pins.$promise.then(function(pins) {
        $scope.recentPins = pins.reverse().slice(0, 5);
        $scope.recentPins.map(function(pin) {
            pin.relativeDate = moment(pin.date).fromNow();
        });
    })

    function getPopularTodayPins() {
        var currentDate = new Date(),
            day = currentDate.getDate(),
            month = currentDate.getMonth() + 1,
            year = currentDate.getFullYear(),
            arrayWithLikes = [],
            arrayWithPinsAndCount = [];

        increaseSize = function(pin) {
            arrayWithPinsAndCount.find(function(pinObject) {
                if (pinObject.pin === pin) {
                    pinObject.count += 1;
                }
            });
        };

        if(day < 10) {
            day = '0' + day;
        } 

        if(month < 10) {
            month = '0' + month;
        }

        var today = year + '-' + month + '-' + day;
        $scope.todayLikes = LikeResource.query({date: today});
        $scope.todayLikes.$promise.then(function(likes) {
            likes.map(function(like) {
                arrayWithLikes.push(like);
            });

            arrayWithLikes.map(function(like) {
                var isPinExisting = arrayWithPinsAndCount.find(function(pinObject) {
                    return pinObject.pin === like.pin;
                });

                isPinExisting ? increaseSize(like.pin) : arrayWithPinsAndCount.push({pin: like.pin, count: 1});
            });

            $scope.popularTodayPins = [];
            arrayWithPinsAndCount.slice(0, 5).map(function(pinObject) {
                PinResource.query({pinId: pinObject.pin}).$promise.then(function(pin) {
                    $scope.popularTodayPins.push(pin[0]);
                })
            });
        });
    }
    getPopularTodayPins();

    $('.splash').click(function() {
        $('body').addClass('leaving');
    });
});
