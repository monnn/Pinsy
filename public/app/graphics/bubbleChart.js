app.directive('bubbleChart', ['$window', '$timeout', function ($window, $timeout) {
    return {
        restrict: 'AE',
        // template: '<svg class="bubble-chart-container"></svg>',
        templateUrl: 'app/graphics/bubble-chart-view.html',
        scope: {
          id: '=',
          bubbleChartData: '='
        },
        link: function(scope, element, attrs) {
            function drawBubbleChart() {
                var data = scope.bubbleChartData;

                var diameter = 500,
                    color = d3.scale.category10(); //color category

                var bubble = d3.layout.pack()
                    .sort(null)
                    .size([diameter, diameter])
                    .padding(1.5);

                var svg = d3.select(function() {
                  return ".bubble-chart-container" + scope.id;
                }())
                    .append("svg")
                    .attr("width", diameter)
                    .attr("height", diameter)
                    .attr("class", "bubble");
                function readData(data) {
                    var nodes = bubble.nodes({children:data}).filter(function(d) { return !d.children; });

                    var bubbles = svg.append("g")
                        .attr("transform", "translate(0, 0)")
                        .selectAll(".bubble")
                        .data(nodes)
                        .enter();

                    bubbles.append("circle")
                        .attr("r", function(d) { return d.r; })
                        .attr("cx", function(d) { return d.x; })
                        .attr("cy", function(d) { return d.y; })
                        .style("fill", function(d) { return color(d.value); });

                    bubbles.append("text")
                        .attr("x", function(d) { return d.x; })
                        .attr("y", function(d) { return d.y + 5; })
                        .attr("text-anchor", "middle")
                        .text(function(d) { return d.id; })
                        .style({
                            "fill": "white",
                            "font-family": "Helvetica Neue, Helvetica, Arial, san-serif",
                            "font-size": "12px"
                        });
                }
                readData(data);
            }
            scope.$watch('bubbleChartData', function() {
                if (scope.bubbleChartData) {
                    $timeout(drawBubbleChart(), 50);
                }
            });
        }
    };
}]);
