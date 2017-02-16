app.directive('pie', ['$window', '$timeout', function ($window, $timeout) {
    return {
        restrict: 'AE',
        template: '<div class="pie-container"></div>',
        scope: {
          pieData: '='
        },
        link: function(scope, element, attrs) {
            function drawPie() {
                var data = scope.pieData;

                var margin = {top:40,left:40,right:40,bottom:40},
                    width = 300,
                    height = 300,
                    radius = Math.min(width - 100, height - 100) / 2,
                    color = d3.scale.category10(),
                    arc = d3.svg.arc()
                         .outerRadius(radius -230)
                         .innerRadius(radius - 50)
                         .cornerRadius(20);

                var arcOver = d3.svg.arc()
                                .outerRadius(radius +50)
                                .innerRadius(0);

                var a = (width / 2) - 20,
                    b = (height / 2) - 90;
                var svg = d3.select(".pie-container").append("svg")
                            .attr("viewBox", "0 0 " + width + " " + height / 2)
                            .attr("preserveAspectRatio", "xMidYMid meet")
                            .append("g")
                            .attr("transform","translate("+a+","+b+")");

                div = d3.select("body")
                        .append("div")
                        .attr("class", "tooltip");

                var pie = d3.layout.pie()
                            .sort(null)
                            .value(function(d) {
                                return d.population;
                            })
                            .padAngle(.02);

                var g = svg.selectAll(".arc")
                        .data(pie(data))
                        .enter()
                        .append("g")
                        .attr("class","arc")
                        .on("mousemove", function(d) {
                            var mouseVal = d3.mouse(this);
                            div.style("display","none");
                            div
                            .html("Age:"+d.data.age+"</br>"+"No. of population:"+d.data.population)
                            .style("left", (d3.event.pageX+12) + "px")
                            .style("top", (d3.event.pageY-10) + "px")
                            .style("opacity", 1)
                            .style("display","block");
                        })
                        .on("mouseout",function() {
                            div.html(" ").style("display","none");
                        });
                        
                g.append("path")
                .attr("d",arc)
                .style("fill",function(d) {
                    return color(d.data.age);
                })
                .attr("d", arc);
            }

            scope.$watch('pieData', function() {
                if (scope.pieData) {
                    $timeout(drawPie(), 50);
                }
            });
        }
    }
}]);
