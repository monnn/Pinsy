app.directive('barChart', ['$window', '$timeout', function ($window, $timeout) {
    return {
        restrict: 'E',
        templateUrl: 'app/graphics/bar-chart-view.html',
        scope: {
          containerName: '@',
          barChartData: '=',
          onBarClick: '&'
        },
        link: function(scope, element, attrs) {
            function drawBarChart() {
                var data = scope.barChartData;
                var color = d3.scale.category20(); //color category
                var margin = {top: 20, right: 20, bottom: 30, left: 40},
                    width = 960 - margin.left - margin.right,
                    height = 500 - margin.top - margin.bottom;

                var svg = d3.select(function() {
                    return "." + scope.containerName;
                }()).append("svg");

                var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
                    y = d3.scaleLinear().rangeRound([height, 0]);

                var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                function readData(data) {
                    x.domain(data.map(function(d) { return d.date; }));
                    y.domain([0, d3.max(data, function(d) { return d.likes; })]);

                    g.append("g")
                        .attr("class", "axis axis--x")
                        .attr("transform", "translate(0," + height + ")")
                        .call(d3.axisBottom(x));

                    g.append("g")
                        .attr("class", "axis axis--y")
                        .call(d3.axisLeft(y))
                        .append("text")
                        .attr("transform", "rotate(-90)")
                        .attr("y", 6)
                        .attr("dy", "0.71em")
                        .attr("text-anchor", "end")
                        .text("Number of Likes");

                    g.selectAll(".bar")
                        .data(data)
                        .enter().append("rect")
                        .attr("class", "bar")
                        .attr("x", function(d) { return x(d.date); })
                        .attr("y", function(d) { return y(d.likes); })
                        .attr("width", x.bandwidth())
                        .attr("height", function(d) { return height - y(d.likes); })
                        .style("fill", function(d) { return color(d.likes); })
                        .on("click", function (d) {
                            scope.onBarClick({pinId: d.pinId});
                            //open pin
                        });
                };
                readData(data);
            }
            scope.$watch('barChartData', function() {
                if (scope.barChartData) {
                    $timeout(drawBarChart(), 50);
                }
            });
        }
    };
}]);
