// angular.module('app').directive('wordCloud', ['$window', '$timeout', function ($window, $timeout) {
app.directive('wordCloud', ['$window', '$timeout', function ($window, $timeout) {
	return {
		restrict: 'AE',
		template: '<div class="word-cloud-container"></div>',
		scope: {
			wordData: '='
		},
		link: function(scope, element, attrs) {
			function drawWordCloud() {

				var width = Math.floor($window.innerWidth * 0.95),
					height = Math.floor($window.innerHeight) - 80;

				var svg = d3.select(".word-cloud-container")
					.insert("svg:svg", "h2")
					.attr("viewBox", "0 0 " + width / 2 + " " + height / 2)
					.attr("class", "word-cloud")
					.attr("preserveAspectRatio", "xMidYMid meet");

				var color = d3.scale.category20();
				var layout = d3.layout.cloud()
					.size([width / 2, height / 2])
					.words(scope.wordData)
					.rotate(0)
					.font("Impact")
					.fontSize((d) => {
						return d.size;
					})
					.on("end", draw);

				var vis = svg.append("g")
					.attr("transform", "translate(" + [width >> 1, height >> 1] + ")");

				update();

				window.onresize = (event) => {
					update();
				};

				function draw(data, bounds) {
					function getTranslatedX(x) {
						return x - width / 4;
					}

					function getTranslatedY(y) {
						return y - height / 4;
					}

					svg
						.attr("width", width)
						.attr("height", height);

					var scale = bounds ? Math.min(
						width / Math.abs(bounds[1].x - width / 2),
						width / Math.abs(bounds[0].x - width / 2),
						height / Math.abs(bounds[1].y - height / 2),
						height / Math.abs(bounds[0].y - height / 2)) / 2 : 1;

					var text = vis.selectAll("text")
						.data(data, function (d) {
							return d.text.toLowerCase();
						});

					text
						.transition()
						.duration(1000)
						.attr("transform", function (d) {
							return "translate(" + [getTranslatedX(d.x), getTranslatedY(d.y)] + ")rotate(" + d.rotate + ")";
						})
						.style("font-size", function (d) {
							return d.size + "px";
						});


					text
						.enter().append("text")
						.attr("text-anchor", "middle")
						.attr("transform", function (d) {
							return "translate(" + [getTranslatedX(d.x), getTranslatedY(d.y)] + ")rotate(" + d.rotate + ")";
						})
						.style("font-size", function (d) {
							return d.size + "px";
						})
						.on("click", function (d) {
							
						})
						.style("opacity", 1e-6)
						.transition()
						.duration(200)
						.style("opacity", 1)
						.style("font-family", function (d) {
							return d.font;
						})
						.style("fill", function (d) {
							return color(d.text.toLowerCase());
						})
						.text(function (d) {
							return d.text;
						});

					vis
						.transition()
						.attr("transform", "translate(" + [width >> 1, height >> 1] + ")scale(" + scale + ")");
				}

				function update() {
					if (scope.wordData.length) {
						var wordData = scope.wordData;
						layout.font('impact').spiral('rectangular');
						var fontSize = d3.scale['sqrt']().range([10, 100]);
						fontSize.domain([+wordData[wordData.length - 1].value || 1, +wordData[0].value]);
					}
					layout.stop().words(wordData).start();
				}
			}
			scope.$watch('wordData', function() {
				if (scope.wordData) {
					$timeout(drawWordCloud(), 50);
				}
			});
		}
	}
}]);