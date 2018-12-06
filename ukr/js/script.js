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

var color = d3.scaleOrdinal(d3.schemeCategory20);
var t = d3.transition();

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




d3.csv("data/data_ukr.csv", function(error, data){

    data.forEach(function(d) {
        return d.value = +d.value;
    });

    var myOrder = ["Russian influence", 'State reponse', 'SCO reponse'];


    // data = data.sort(function(a, b) {
    //     return myOrder.indexOf(a) - myOrder.indexOf(b);
    // });

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

    div.append("div")
        .attr("class", "title")
        // .style("background", "red")
        .style("height", "30px")
        .append("h2")
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
            return "translate(" + 0 +"," + 20 + ")";
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
        .attr("class",  function(d){
            return "bar " + d.myClass
        })
        .attr("transform", function(d, i) {
            return "translate(" + 0 + "," + (i * (barHeight + 2)) + ")";
        })
        .attr("data-tippy-content", function (d){ return d.value + " із 5"})
        // .attr("width", function (d){ return x(d.value)})
        .attr("width", 0)
        .transition()
        .delay(function(d,i){ return 200*i; })
        .duration(2000)
        .attr("width", function (d){ return x(d.value)})

        .attr("height", barHeight)

        .attr("fill", "lightgrey")
    // .attr("fill", function(d){
    //     return color(d.measure)}
    // )
    ;

    box.append("text")
        .html(function(d) {
            return d.key
        })
        .attr("fill", "white")
        .attr("y", -3)
        .style("margin-left", "-300")
        .style("font-size", "13px");



    setTimeout(function(d){
        d3.selectAll("rect.orange").attr("fill", "rgb(255, 127, 14)");
        d3.selectAll("span.orange").style("color", "rgb(255, 127, 14)");
    }, 3000);

    setTimeout(function(d){
        d3.selectAll("rect.blue").attr("fill", "rgb(31, 119, 180)");
        d3.selectAll("span.blue").style("color", "rgb(31, 119, 180)");
    }, 4000);

    setTimeout(function(d){
        d3.selectAll("rect.lightblue").attr("fill", "rgb(174, 199, 232)");
        d3.selectAll("span.lightblue").style("color", "rgb(174, 199, 232)");
    }, 5000);


    setTimeout(function(d){


        var L = d3.select("#en-0 svg");

        var swoopy = d3.swoopyDrag()
            .x(function(d) { return x(d.sepalWidth)})
            .y(function(d) { return y(d.sepalLength)})
            .draggable(false)
            .annotations(annotations);

        var swoopySel = L.append('g').attr("id", "swoo").call(swoopy);

        L.append('marker')
            .attr('id', 'arrow')
            .attr('viewBox', '-10 -10 20 20')
            .attr('markerWidth', 10)
            .attr('markerHeight', 20)
            .attr('orient', 'auto')
            .append('path')
            .attr('d', 'M-6.75,-6.75 L 0,0 L -6.75,6.75')
            .attr("fill", "white");


        $("#swoo").find("g").attr("transform", "translate(50,30)");

        swoopySel.selectAll("path")
            .attr('marker-end', 'url(#arrow)')
            .each(function() {
                d3.select(this)
                    .style("fill", "none")
                    .style("stroke", "white");
            });


        swoopySel.selectAll("text")
            .each(function() {
                d3.select(this)
                    .style("font-size", "11px")
                    .style("fill", "white")
                    .attr("class", function(d) {
                        return d.theClass
                    })
                ;
            })



    }, 6000);

    tippy('.bar');


    $(".title").on("click", function(d) {
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
            .duration(1000)
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
        "sepalLength": 2,
        "path": "",
        "text": "0",
        "theClass":"",
        "textOffset": [
            -49,
            133
        ]
    }
    , {
        "sepalWidth": 2.3,
        "sepalLength": 2,
        "path": "M-27,68L6,68",
        // "path": "M39,-6C61,-6,81,-5,93,-6",
        "text": "наведіть мишею",
        "theClass":"rotate",
        "textOffset": [
            10,72
        ]
    }
]





