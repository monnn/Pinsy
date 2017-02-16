app.controller('WordCloudController', function ($scope, $timeout, PinResource) {
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

    $scope.onTagClick = function(tag) {
        $scope.selectedTag = tag;
        $scope.pinsWithTag = PinResource.query({tag: tag});
        $scope.pinsWithTag.$promise.then(function(pins) {
            console.log(pins);
        });
    };

    $scope.closePinsView = function() {
        $scope.selectedTag = false;
    }

    $('.splash').click(function() {
        $('body').addClass('leaving');
    });
});
