/**
 * Created by yevheniia on 01.12.18.
 */


// var viewBox = $("#chartContainer")[0].getAttribute("viewBox").split(" "),
//     size = viewBox.slice(2),
    var w = window.innerWidth * 0.9,
        h = window.innerHeight * 0.9,
        m = {top: 20, left: 20, bottom: 20, right: 20 },
        aspect = w / h;


var chartWidth  = 250,
    chartHeight  =  250,
    barHeight  = 10,
    gapBetweenGroups = 20,
    spaceForLabels   = 150,
    spaceForLegend   = 150;

var color = d3.scale.category20();

var x = d3.scale.linear()
    .domain([0, 5])
    .range([0, chartWidth]);

var y = d3.scale.linear()
    .range([chartHeight + gapBetweenGroups, 0]);

var yAxis = d3.svg.axis()
    .scale(y)
    .tickFormat('')
    .tickSize(0)
    .orient("left");



d3.csv("data/data_eng.csv", function(error, data){

    data.forEach(function(d) {
        return d.value = +d.value;
    });

    var chartHeight = barHeight * 3 + gapBetweenGroups * 3;

    var groupHeight = barHeight * data.values.length;


    var dataset = d3.nest()
        .key(function (d) {
            return d.driver
        })
        .key(function (d) {
            return d.country
        })
        .entries(data);


    var div = d3.select("#chartContainer")
        .selectAll("div")
        .data(dataset)
        .enter()
        .append("div")
        .style("width", chartWidth - m.left - m.right + "px")
        .attr("height", 0)
        .attr("class", "svgContainer");


    var title = div.append("h2")
            .style("background", "red")
            .style("height", "50px")
            .html(function(d) {
                return d.key
            });

    var svg = div.append("svg")
        .attr("width", chartWidth - m.left - m.right  + "px")
        .attr("class", "shit")
        .attr("height", 0);


    d3.selectAll(".shit").transition
        .duration(100)
        .attr("height", 350 + "px");


    var barContainer = svg.append("g")
    .attr("transform", function(d, i) {
        return "translate(" + 0 +"," + 10 + ")";
    });


    var box = barContainer.selectAll("g")
        .data(function(d) {
            return d.values;
        })
        .enter()
        .append("g")
        .attr("transform", function(d, i) {
        return "translate(" + 0 + ","  + (i * 60) + ")";
    });

    box.selectAll("rect")
        .data(function(d) {
            return d.values;
        })
        .enter()
        .append("rect")
        .attr("transform", function(d, i) {
            return "translate(" + 0 + "," + (i * (barHeight + 2)) + ")";
        })
        .attr("width", function (d){ return x(d.value)})
        .attr("height", barHeight)
        .attr("fill", function(d){
            return color(d.measure)}
        );

    box.append("text")
        .html(function(d) {
            return d.key
        })




});










// var zippedData = [];
// for (var i=0; i<data.labels.length; i++) {
//     for (var j=0; j<data.series.length; j++) {
//         zippedData.push(data.series[j].values[i]);
//     }
// }
//
// var color = d3.scale.category20();
// var chartHeight = barHeight * zippedData.length + gapBetweenGroups * data.labels.length;
//
// var x = d3.scale.linear()
//     .domain([0, d3.max(zippedData)])
//     .range([0, chartWidth]);
//
// var y = d3.scale.linear()
//     .range([chartHeight + gapBetweenGroups, 0]);
//
// var yAxis = d3.svg.axis()
//     .scale(y)
//     .tickFormat('')
//     .tickSize(0)
//     .orient("left");
//
// // Specify the chart area and dimensions
// var chart = d3.select("#chart")
//     .attr("width", spaceForLabels + chartWidth + spaceForLegend)
//     .attr("height", chartHeight);
//
// // Create bars
// var bar = chart.selectAll("g")
//     .data(zippedData)
//     .enter().append("g")
//     .attr("transform", function(d, i) {
//         return "translate(" + spaceForLabels + "," + (i * barHeight + gapBetweenGroups * (0.5 + Math.floor(i/data.series.length))) + ")";
//     });
//
// // Create rectangles of the correct width
// bar.append("rect")
//     .attr("fill", function(d,i) { return color(i % data.series.length); })
//     .attr("class", "bar")
//     .attr("width", x)
//     .attr("height", barHeight - 1);
//
// // Add text label in bar
// bar.append("text")
//     .attr("x", function(d) { return x(d) - 3; })
//     .attr("y", barHeight / 2)
//     .attr("fill", "red")
//     .attr("dy", ".35em")
//     .text(function(d) { return d; });
//
// // Draw labels
// bar.append("text")
//     .attr("class", "label")
//     .attr("x", function(d) { return - 10; })
//     .attr("y", groupHeight / 2)
//     .attr("dy", ".35em")
//     .text(function(d,i) {
//         if (i % data.series.length === 0)
//             return data.labels[Math.floor(i/data.series.length)];
//         else
//             return ""});
//
// chart.append("g")
//     .attr("class", "y axis")
//     .attr("transform", "translate(" + spaceForLabels + ", " + -gapBetweenGroups/2 + ")")
//     .call(yAxis);
//
// // Draw legend
// var legendRectSize = 18,
//     legendSpacing  = 4;
//
// var legend = chart.selectAll('.legend')
//     .data(data.series)
//     .enter()
//     .append('g')
//     .attr('transform', function (d, i) {
//         var height = legendRectSize + legendSpacing;
//         var offset = -gapBetweenGroups/2;
//         var horz = spaceForLabels + chartWidth + 40 - legendRectSize;
//         var vert = i * height - offset;
//         return 'translate(' + horz + ',' + vert + ')';
//     });
//
// legend.append('rect')
//     .attr('width', legendRectSize)
//     .attr('height', legendRectSize)
//     .style('fill', function (d, i) { return color(i); })
//     .style('stroke', function (d, i) { return color(i); });
//
// legend.append('text')
//     .attr('class', 'legend')
//     .attr('x', legendRectSize + legendSpacing)
//     .attr('y', legendRectSize - legendSpacing)
//     .text(function (d) { return d.label; });

