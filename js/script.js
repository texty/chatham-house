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





    box.selectAll("rect")
        .data(function(d) {
            return d.values;
        })
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("transform", function(d, i) {
            return "translate(" + 0 + "," + (i * (barHeight + 2)) + ")";
        })
        .attr("width", function (d){ return x(d.value)})
        .attr("data-tippy-content", function (d){ return d.value + " from 5"})
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

    tippy('.bar');


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


    var L = d3.select("#en-0 svg");



    var swoopy = d3.swoopyDrag()
        .x(function(d) { return x(d.sepalWidth)})
        .y(function(d) { return y(d.sepalLength)})
        .draggable(false)
        .annotations(annotations);

    var swoopySel = L.append('g').attr("id", "swoo").call(swoopy);

    // L.append('marker')
    //     .attr('id', 'arrow')
    //     .attr('viewBox', '-10 -10 20 20')
    //     .attr('markerWidth', 20)
    //     .attr('markerHeight', 20)
    //     .attr('orient', 'auto')
    //     .append('path')
    //     .attr('d', 'M-6.75,-6.75 L 0,0 L -6.75,6.75')
    //     .attr("fill", "white");


    $("#swoo").find("g").attr("transform", "translate(50,30)");

    swoopySel.selectAll("path")
        .attr('marker-end', 'url(#arrow)')
        .each(function() {
            d3.select(this)
                .style("fill", "none")
                .style("stroke", "white");
        })


    swoopySel.selectAll("text")
        .each(function() {
            d3.select(this)
                .style("font-size", "12px")
                .style("fill", "white")
                ;
        })

});



var annotations = [
    {
        "sepalWidth": 2.3,
        "sepalLength": 2,
        "path": "",
        "text": "non-existent - 0",
        "textOffset": [
            -50,
            126
        ]
    }, {
        "sepalWidth": 2.3,
        "sepalLength": 2,
        "path": "",
        "text": "non-existent - 0",
        "textOffset": [
            -50,
            117
        ]
    }
    , {
        "sepalWidth": 2.3,
        "sepalLength": 2,
        "path": "M131,34C141,15,138,-2,128,-16",
        "text": "4 (max. 5)",
        "textOffset": [
            86,
            46
        ]
    }
]





