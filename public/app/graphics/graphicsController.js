app.controller('GraphicsController', function ($scope, $timeout, $q, PinResource, LikeResource, CommentResource, UserResource) {

    function getLikes() {
        var days = 10,
            allLikes = [],
            likesWithDate = [],
            pinsWithCountAndDate = [],
            mostLikedToday,
            mostLikedByDays = [],
            likesDeferred;

        function addLikeToDate(like) {
            likesWithDate.find(function(likeObject) {
                if (likeObject.date === like.date) {
                    likeObject.likes.push(like);
                }
            });
        }

        likesDeferred = LikeResource.query({date: moment().subtract(days, 'd').format('YYYY-MM-DD')});
        likesDeferred.$promise.then(function(likes) {
            likes.map(function(like) {
                like.date = like.date.substring(0, 10);
                allLikes.push(like);
            });

            allLikes.map(function(like) {
                var isDateExisting = likesWithDate.find(function(likeObject) {
                    return likeObject.date === like.date;
                });
                isDateExisting ? addLikeToDate(like) : likesWithDate.push({likes: [like], date: like.date})
            });

            likesWithDate.map(function(day) {
                pinsWithCountAndDate = [];
                day.likes.map(function(like) {
                    var isPinExisting = pinsWithCountAndDate.find(function(pinObject) {
                        return pinObject.pin === like.pin;
                    });

                    isPinExisting ? increaseSize(pinsWithCountAndDate, like.pin, 'pin', 'count') : pinsWithCountAndDate.push({pin: like.pin, count: 1, date: like.date});
                });
                day.mostLiked = pinsWithCountAndDate;
            });

            likesWithDate.map(function(day) {
                var max = Math.max.apply(Math, day.mostLiked.map(function(like) {
                    return like.count;
                }));
                mostLikedToday = {};
                mostLikedToday.date = day.date;
                day.mostLiked.find(function(like) {
                    if(like.count === max) {
                        mostLikedToday.like = like;
                    }
                });
                mostLikedByDays.push(mostLikedToday);
            });

            function getMostLikedPins() {
                var mostLiked = [],
                    deferred = $q.defer();

                mostLikedByDays.map(function(pinObject) {
                    PinResource.query({pinId: pinObject.like.pin}).$promise.then(function(pin) {
                        mostLiked.push({pinId: pin[0]._id, date: pinObject.date, likes: pinObject.like.count});
                        if (mostLiked.length == mostLikedByDays.length) {
                            deferred.resolve(mostLiked);
                        }
                    });
                });
                return deferred.promise;
            }
            getMostLikedPins().then(function(mostLiked) {
                $scope.mostLikedPins = mostLiked;
            });
        });
    }
    $timeout(getLikes, 500);
    $timeout(getUsers, 500);

    function getUsers() {
        var mostActiveDeferred = getMostActiveUsersWithUsernames();
        mostActiveDeferred.then(function(mostActive) {
            $scope.mostActiveUsers = mostActive;
        });
    }

    function getMostActiveUsersWithUsernames() {
        var mostActiveDeferred = getMostActiveUsers(),
            deferred = $q.defer(),
            iteration = 0;
        mostActiveDeferred.then(function(mostActive) {
            mostActive.map(function(userObject) {
                UserResource.query({uId: userObject.user}).$promise.then(function(user) {
                    userObject.username = user[0].username;
                    iteration++;
                    if (iteration === mostActive.length) {
                        deferred.resolve(mostActive);
                    }
                });
            });
        });
        return deferred.promise;
    }

    function getMostActiveUsers() {
        var comments = CommentResource.query(),
            usersWithCount = [],
            deferred = $q.defer();

        comments.$promise.then(function(comments) {
            comments.map(function(comment) {
                var isUserAdded = usersWithCount.find(function(commentObject) {
                    return commentObject.user === comment.user;
                });
                isUserAdded ? increaseSize(usersWithCount, comment.user, 'user', 'value') : usersWithCount.push({user: comment.user, value: 1});
            });
            deferred.resolve(usersWithCount);
        });
        return deferred.promise;
    }

    function increaseSize(collection, element, typeOfElement, typeToIncrement) {
        collection.find(function(object) {
            if (object[typeOfElement] === element) {
                object[typeToIncrement] += 1;
            }
        });
    }

    function getUsersMostLiked() {
        
    }

    $scope.pieDataExample = [{age: "Below 6 years", population: 511},
            {age: "6 yrs & Above – Below 12 yrs", population: 394},
            {age: "12 yrs & Above –Below 16 yrs", population: 429},
            {age: "16 yrs & Above – Below 18 yrs", population: 568},
            {age: "18 yrs & Above – Below 30 yrs", population: 13117},
            {age: "30 yrs & Above – Below 40 yrs", population: 13094},
            {age: "40 yrs & Above – Below 45 yrs", population: 10094},
            {age: "45 yrs & Above – Below 60 yrs", population: 5225},
            {age: "60 yrs & Above", population: 1116}];

    $scope.bubbleChartExample = [{id: "ISchedulable", value: 11},
            {id: "Parallel", value: 76},
            {id: "Pause", value: 49},
            {id: "Scheduler", value: 59},
            {id: "Sequence", value: 34},
            {id: "Transition", value: 21},
            {id: "Transitioner", value: 1},
            {id: "TransitionEvent", value: 16},
            {id: "Tween", value: 6}];

    $scope.barChartExample = [{date: '2013-01-02', likes: 43},
            {date: '2013-01-03', likes: 12},
            {date: '2013-01-04', likes: 192},
            {date: '2013-01-05', likes: 78},
            {date: '2013-01-06', likes: 53},
            {date: '2013-01-01', likes: 153},
            {date: '2013-01-07', likes: 30}];

    $scope.onBarChartClick = function(pinId) {
        //call wholeinfowindow with pinId
        debugger
    };

    $scope.onBubbleClick = function(userId) {
        debugger
        //display comments of user with given userId
    };

    $('.splash').click(function() {
        $('body').addClass('leaving');
    });
});
