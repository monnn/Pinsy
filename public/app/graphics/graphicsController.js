app.controller('GraphicsController', function ($scope, $timeout, PinResource) {
    $scope.pins = PinResource.query();

    initializewordCloudData = function() {
        var arrayWithTags = [],
            arrayWithTagsAndSize = [],
            initialSize = 10;

        increaseSize = function(tag) {
            arrayWithTagsAndSize.find(function(tagObject) {
                if (tagObject.text === tag) {
                    tagObject.size += 5;
                }
            });
        };

        $scope.pins.map(function(pin) {
            pin.tags.map(function(tag) {
                arrayWithTags.push(tag);
            })
        });

        arrayWithTags.map(function(tag) {
            var isTagExisting = arrayWithTagsAndSize.find(function(tagObject) {
                return tagObject.text === tag;
            });

            isTagExisting ? increaseSize(tag) : arrayWithTagsAndSize.push({text: tag, size: initialSize});
        });
        $scope.wordData = arrayWithTagsAndSize;
    };

    $timeout(initializewordCloudData, 500);

    $scope.wordDataExample = [{text: "study",size: 40}, {text: "motion","size": 15}, {text: "forces", size: 10},
            {text: "electricity",size: 15}, {text: "movement", size: 10}, {text: "relation", size: 5},
            {text: "things", size:10}, {text: "force","size": 5}, {text: "ad", size: 5},
            {text: "energy", size:85}, {text: "living","size": 5}, {text: "nonliving", size: 5},
            {text: "laws", size:15}, {text: "speed","size": 45}, {text: "velocity", size: 30},
            {text: "define", size:5}, {text: "constraints", size: 5}, {text: "universe", size: 10},
            {text: "physics", size:120}, {text: "describing", size: 5}, {text: "matter", size: 90},
            {text: "physics-the", size:5}, {text: "world", size: 10}, {text: "works", size: 10},
            {text: "science", size:70}, {text: "interactions", size: 30}, {text: "studies", size: 5},
            {text: "properties", size:45}, {text: "nature", size: 40}, {text: "branch", size: 30},
            {text: "concerned", size:25}, {text: "source", size: 40}, {text: "google", size: 10},
            {text: "defintions", size:5}, {text: "two", size: 15}, {text: "grouped", size: 15},
            {text: "traditional", size:15}, {text: "fields", size: 15}, {text: "acoustics", size: 15},
            {text: "optics", size: 15}, {text: "mechanics", size: 20}, {text: "thermodynamics", size: 15},
            {text: "electromagnetism", size:15}, {text: "modern", size: 15}, {text: "extensions", size: 15},
            {text: "thefreedictionary", size:15}, {text: "interaction", size: 15}, {text: "org", size: 25},
            {text: "answers", size: 5}, {text: "natural", size: 15}, {text: "objects", size: 5},
            {text: "treats", size: 10}, {text: "acting", size: 5}, {text: "department", size: 5},
            {text: "collinsdictionary", size: 5}, {text: "english", size: 5}, {text: "time", size: 35}];

    $scope.pieDataExample = [{age: "Below 6 years", population: 511},
            {age: "6 yrs & Above – Below 12 yrs", population: 394},
            {age: "12 yrs & Above –Below 16 yrs", population: 429},
            {age: "16 yrs & Above – Below 18 yrs", population: 568},
            {age: "18 yrs & Above – Below 30 yrs", population: 13117},
            {age: "30 yrs & Above – Below 40 yrs", population: 13094},
            {age: "40 yrs & Above – Below 45 yrs", population: 10094},
            {age: "45 yrs & Above – Below 60 yrs", population: 5225},
            {age: "60 yrs & Above", population: 1116}];

    $scope.bubbleChartExample = [{id: "ISchedulable", value: 1041},
            {id: "Parallel", value: 5176},
            {id: "Pause", value: 449},
            {id: "Scheduler", value: 5593},
            {id: "Sequence", value: 5534},
            {id: "Transition", value: 9201},
            {id: "Transitioner", value: 19975},
            {id: "TransitionEvent", value: 1116},
            {id: "Tween", value: 6006}];

    $scope.onTagClick = function(tag) {
        $scope.selectedTag = tag;
        $scope.pinsWithTag = PinResource.query({tag: tag});
        $scope.pinsWithTag.$promise.then(function(pins) {
            console.log(pins);
        });
    };

    $('.splash').click(function() {
        $('body').addClass('leaving');
    });
});
