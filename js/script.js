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

    div.append("h2")
        .attr("class", "title")
            .style("background", "red")
            .style("height", "50px")
            .html(function(d) {
                return d.key
            });

    var svg = div.append("svg")
        .attr("width", chartWidth - m.left - m.right  + "px")
        .attr("class", "shit")
        .attr("height", 0)
       ;


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
        });


    $(".title").on("click", function(d) {

      svg
            // .transition()
            // .duration(2000)
            .attr("height", 200 + "px");

    });





});

var t = d3.transition()
    .duration(500);

d3.select("body")
    .transition(t)
    .style("background-color", "black");




