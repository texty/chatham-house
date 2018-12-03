/**
 * Created by yevheniia on 01.12.18.
 */


    var w = window.innerWidth * 0.9,
        h = window.innerHeight * 0.9,
        m = {top: 10, left: 20, bottom: 20, right: 20 },
        aspect = w / h;


var chartWidth  = 250,
    chartHeight  =  300,
    barHeight  = 10,
    gapBetweenGroups = 20,
    spaceForLabels   = 150,
    spaceForLegend   = 150;

// var color = d3.scale.category20();
var color = d3.scaleOrdinal(d3.schemeCategory20);

// var color = d3.scale.ordinal()
// //this assumes you have 3 groups of data//﻿each of the domains corresponds to a color set
//     .domain(["SCO reponse", "State reponse", "Russian influence"])
//     .range(["#d80bd3", "#ffed00", "#be1639"]);




var x = d3.scaleLinear()
    .domain([0, 6])
    .range([0, chartWidth]);

var y = d3.scaleLinear()
    .range([chartHeight + gapBetweenGroups, 0]);

var yAxis = d3.axisLeft(x)
    .scale(y)
    .tickFormat('')
    .tickSize(0);
    // .orient("left");

var xAxis = d3.axisBottom(y)
    .scale(x)
    .ticks(5)
    .tickFormat('')
    .tickSize(-180);
    // .orient("bottom");




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
        .attr("height", "300px")
        .attr("class", "svgContainer")

        ;

    div.append("h2")
        .attr("class", "title")
            // .style("background", "red")
            .style("height", "50px")
            .html(function(d) {
                return d.key
            });

    var childDIV =  div.append("div")
        .attr("class", "childDIV")
        .attr("value", "true")
        .style("width", chartWidth - m.left - m.right + "px")
        .attr("id", function(d, i) {
            return "en-" + i
        });

    var svg = childDIV.append("svg")
        .attr("width", chartWidth - m.left - m.right  + "px")
        .attr("class", "shit")
        .attr("height", 180)
       ;

    //
    // var swoopy = d3.swoopyDrag()
    //     .x(function(d) { return x(d.sepalWidth)})
    //     .y(function(d) { return y(d.sepalLength)})
    //     .draggable(true)
    //     .annotations(annotations);



    var barContainer = svg.append("g")
    .attr("transform", function(d, i) {
        return "translate(" + 0 +"," + 15 + ")";
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

    // var swoopySel = box.append('g').call(swoopy);




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
        .attr("fill", "white")
        .attr("y", -2)
        .html(function(d) {
            return d.key
        });


    // box.append("g")
    //     .attr("class", "x axis")
    //     // .attr("transform", "translate(0, 180)")
    //     .attr("stroke", "white")
    //     .attr("opacity", 1)
    //     .call(xAxis);


    $(".title").on("click", function(d) {

        var t = d3.transition()
            .duration(750);

        var targetID = $(this)
            .parent()
            .find(".childDIV")
            .attr("id");

        var check = $(this)
            .parent()
            .find(".childDIV")
            .attr("value");

        var test;
        if(check === "true") {
            test = "false";
        } else {
            test = "true";
        }

         d3.select("#"+targetID)
            .attr("value", test)
            .transition(t)
            .style("height", function() {
               if(check === "false") {
                   return "210px";
               } else {
                   return "0px";
               }
            });

    });





});



var annotations = [
    {
        "sepalWidth": 2.3,
        "sepalLength": 5,
        "path": "M1,86C-47,82,-55,18,-9,4",
        "text": "Versicolor",        
        "textOffset": [
            -2,
            92
        ]
    }
]


