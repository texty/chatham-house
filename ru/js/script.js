/**
 * Created by yevheniia on 31.01.19.
 */
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
    .range([0, 250]);

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




d3.csv("data/data_ru.csv", function(error, data){

    data.forEach(function(d) {
        return d.value = +d.value;
    });

    var myOrder = ["Russian influence", 'State response', 'SCO response'];


    // data = data.sort(function(a, b) {
    //     return myOrder.indexOf(a) - myOrder.indexOf(b);
    // });

    var chartHeight = barHeight * 3 + gapBetweenGroups * 3;

    // var groupHeight = barHeight * data.values.length;



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
        .style("height", "40px")
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
        .attr("height", "100%");





    var barContainer = svg.append("g")
    // .attr("width", chartWidth - m.left - m.right  + "px")
    // .attr("height", "100%")
        .attr("transform", function(d, i) {
            return "translate(" + 0 +"," + 20 + ")";
        });


    var box = barContainer.selectAll("g")
        .data(function(d) {
            return d.values;
        })
        .enter()
        .append("g")
        .attr("class", function(d,i){ return "box"+i })
        .attr("transform", function(d, i) {
            return "translate(" + 0 + ","  + (i * 70) + ")";
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
            if(i === 1){
                return "translate(" + 0 + "," + (i * 13) + ")";
            } else {
                return "translate(" + 0 + "," + (i * 13) + ")";
            }

        })
        .attr("data-tippy-content", function (d){ return d.value + " from 5"})
        .attr("width", 0)
        .attr("height", barHeight);





    box.append("text")
        .html(function(d) {
            return d.key
        })
        .attr("fill", "#597B7C")
        .style("font-size", "14px")
        .attr("y", -4)
    ;

    //
    // box.append("line")
    //     .attr("x1", x(0))
    //     .attr("x2", x(5))
    //     .attr("y1", 14)
    //     .attr("y2", 14)
    //     .attr("stroke", "lightgrey")
    //     .attr("stroke-dasharray", "4 2");





    setTimeout(function(d){
        d3.selectAll("rect.influence").attr("fill", "#b32017");
        d3.selectAll("rect.state").attr("fill", "#005984");
        d3.selectAll("rect.civil").attr("fill", "#00AEEF");
    }, 1000);

    d3.selectAll("rect.influence")
        .classed("anim", true)
        // .transition()
        // .duration(750)
        .attr("width", function (d){ return x(d.value)})
        .attr("fill", "#b32017")
    ;


    setTimeout(function(d){


        var L = d3.select("#en-0 svg");

        var swoopy = d3.swoopyDrag()
            .x(function(d) { return x(d.sepalWidth)})
            .y(function(d) { return y(d.sepalLength)})
            .draggable(false)
            .annotations(annotations);

        var swoopySel = L.append('g').attr("id", "swoo-ru").call(swoopy);

        L.append('marker')
            .attr('id', 'arrow')
            .attr('viewBox', '-10 -10 20 20')
            .attr('markerWidth', 10)
            .attr('markerHeight', 20)
            .attr('orient', 'auto')
            .append('path')
            .attr('d', 'M-6.75,-6.75 L 0,0 L -6.75,6.75')
            .attr("fill", "#597B7C");


        $("#swoo-ru").find("g").attr("transform", "translate(50,30)");

        swoopySel.selectAll("path")
            .attr('marker-end', 'url(#arrow)')
            .each(function() {
                d3.select(this)
                    .style("fill", "none")
                    .style("stroke", "#597B7C")
                    .attr("class", function(d) {
                        return d.theClass
                    });
            });


        swoopySel.selectAll("text")
            .each(function() {
                d3.select(this)
                    .style("font-size", "12px")
                    .style("font-style", "italic")
                    .style("fill", "#597B7C")
                    .attr("class", function(d) {
                        return d.theClass
                    })
                ;
            })


    //
    }, 300);

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


$("#influence").change(function() {
    if(this.checked) {
        d3.selectAll("rect.influence")
            .classed("anim", true)
            .transition()
            .duration(750)
            .attr("width", function (d){ return x(d.value)})
            .attr("fill", "#b32017");

        d3.selectAll(".hoverMe").style("display", "block")



    } else {
        d3.selectAll("rect.influence")
            .classed("anim", false)
            .transition()
            .duration(750)
            .attr("width",0);

        d3.selectAll(".hoverMe").style("display", "none")
    }
});


$("#civil").change(function() {
    if(this.checked) {
        d3.selectAll("rect.civil")
            .transition()
            .duration(750)
            .attr("width", function (d){ return x(d.value)})
    } else {
        d3.selectAll("rect.civil")
            .transition()
            .duration(750)
            .attr("width",0)
    }
});

$("#state").change(function() {
    if(this.checked) {
        d3.selectAll("rect.state")
            .transition()
            .duration(750)
            .attr("width", function (d){ return x(d.value)})

        d3.select("#swoo-ru").style("display", "block")
    } else {
        d3.selectAll("rect.state")
            .transition()
            .duration(750)
            .attr("width",0)

        d3.select("#swoo-ru").style("display", "none")
    }
});





var annotations = [
    {
        "sepalWidth": 2.3,
        "sepalLength": 2,
        "path": "",
        "text": "отсутствие столбика означает 0",
        "theClass":"noBars",
        "textOffset": [
            -48,154
        ]
    }
    , {
        "sepalWidth": 2.3,
        "sepalLength": 2,
        // "path": "M-27,68L6,68",
        "path": "M120,93C130,88,133,71,119,65",
        "text": "наведите мышкой",
        "theClass":"hoverMe",
        "textOffset": [
            19,102
        ]
    }
]



dragElement(document.getElementsByClassName("svgContainer"));

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}


