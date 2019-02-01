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




d3.csv(data, function(error, data){

    data.forEach(function(d) {
        return d.value = +d.value;
    });

    var chartHeight = barHeight * 3 + gapBetweenGroups * 3;


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
            .style("height", titleHeight)
            .append("h2")
            .text(function(d) {
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

    box
        .append("rect")
        .attr("class", "fullbars")
        .attr("transform", function(d, i) {
                return "translate(" + 0 + "," + 0 + ")";


        })
        .attr("width", function (){ return x(5)})
        .attr("fill", "#597B7C")
        .style("opacity", "0.1")
        .attr("height", barHeight);

    box
        .append("rect")
        .attr("class", "fullbars")
        .attr("transform", function(d, i) {
            if(i === 1){
                return "translate(" + 0 + "," + 13 + ")";
            } else {
                return "translate(" + 0 + "," + 13 + ")";
            }

        })
        .attr("width", function (){ return x(5)})
        .attr("fill", "#597B7C")
        .style("opacity", "0.1")
        .attr("height", barHeight);

    box
        .append("rect")
        .attr("class", "fullbars")
        .attr("transform", function(d, i) {
            if(i === 1){
                return "translate(" + 0 + "," + 26 + ")";
            } else {
                return "translate(" + 0 + "," + 26 + ")";
            }

        })
        .attr("width", function (){ return x(5)})
        .attr("fill", "#597B7C")
        .style("opacity", "0.1")
        .attr("height", barHeight);





    box.selectAll("text")
        .data(function(d) {
            return d.values;
        })
        .enter()
        .append("text")
        .attr("transform", function(d, i) {
            if(i === 1){
                return "translate(" + 0 + "," + (i * 13) + ")";
            } else {
                return "translate(" + 0 + "," + (i * 13) + ")";
            }

        })
        .attr("class",  function(d){
            return "text " + d.myClass
        })
        .attr("x", function (d){
            if(d.value > 0){
                return x(d.value) - 8
            } else {
                return x(0) + 2
            }
            })
        .attr("y", 8)
        .attr("fill", function (d){
            if(d.value > 0){
                return "white"
            } else {
                return "grey"
            }
        })
        .style("font-size", "10px")
        .text(function (d){
            return d.value
        });
    

    


    box.append("text")
        .text(function(d) {
            return d.key
        })
        .attr("fill", "#597B7C")
        .style("font-size", "14px")
        .attr("y", -4)
        .attr("x", 0)
        ;

    setTimeout(function(d){
        d3.selectAll("rect.influence").attr("fill", "#b32017");
        d3.selectAll("rect.state").attr("fill", "#005984");
        d3.selectAll("rect.civil").attr("fill", "#00AEEF");
    }, 1000);


    if($('input#influence').is(":checked")){
        setTimeout(function(){
            d3.selectAll("rect.influence")
                .attr("width", function (d) {  return x(d.value)   })
                .attr("fill", function (d) { return d.fill   })
        },100)
    }

    // d3.selectAll("rect.influence")
    //     .classed("anim", true)
    //     // .transition()
    //     // .duration(750)
    //     .attr("width", function (d){ return x(d.value)})
    //     .attr("fill", "#b32017")
    // ;



// $(document).ready(function() {
//     if ($('input#state:checked')) {
//         alert("State is checked");
//     // d3.selectAll("rect.state")
//     //     .transition()
//     //     .duration(750)
//     //     .attr("width", function (d) { console.log(d); return x(d.value)   })
//     //     .attr("fill", "#005984");
//     } else {
//         alert("State is NOT");
//     }
// });

    // setTimeout(function(d){
    //
    //
    //     var L = d3.select("#en-0 svg");
    //
    //     var swoopy = d3.swoopyDrag()
    //         .x(function(d) { return x(d.sepalWidth)})
    //         .y(function(d) { return y(d.sepalLength)})
    //         .draggable(false)
    //         .annotations(annotations);
    //
    //     var swoopySel = L.append('g').attr("id", "swoo-en").call(swoopy);
    //
    //     L.append('marker')
    //         .attr('id', 'arrow')
    //         .attr('viewBox', '-10 -10 20 20')
    //         .attr('markerWidth', 10)
    //         .attr('markerHeight', 20)
    //         .attr('orient', 'auto')
    //         .append('path')
    //         .attr('d', 'M-6.75,-6.75 L 0,0 L -6.75,6.75')
    //         .attr("fill", "#597B7C");
    //
    //
    //     $("#swoo-en").find("g").attr("transform", "translate(50,30)");
    //
    //     swoopySel.selectAll("path")
    //         .attr('marker-end', 'url(#arrow)')
    //         .each(function() {
    //             d3.select(this)
    //                 .style("fill", "none")
    //                 .style("stroke", "#597B7C")
    //                 .attr("class", function(d) {
    //                     return d.theClass
    //                 });
    //         });
    //
    //
    //     swoopySel.selectAll("text")
    //         .each(function() {
    //             d3.select(this)
    //                 .style("font-size", "12px")
    //                 .style("font-style", "italic")
    //                 .style("fill", "#597B7C")
    //                 .attr("class", function(d) {
    //                     return d.theClass
    //                 })
    //             ;
    //         })
    //
    //
    //
    // }, 600);

    tippy('.bar');


   // $(".title").on("click", function(d) {
   //      var targetID = $(this)
   //          .parent()
   //          .find(".childDIV")
   //          .attr("id");
   //
   //      var check = $(this)
   //          .parent()
   //          .find(".childDIV")
   //          .attr("value");
   //
   //      var test;
   //      if(check === "true") {
   //          test = "false";
   //      } else {
   //          test = "true";
   //      }
   //
   //       d3.select("#"+targetID)
   //          .attr("value", test)
   //           .transition(t)
   //           .duration(1000)
   //          .style("height", function() {
   //             if(check === "false") {
   //                 return "210px";
   //             } else {
   //                 return "0px";
   //             }
   //          });
   //
   //  });
});


$("#influence").change(function() {
    if(this.checked) {
        d3.selectAll("rect.influence")
            .classed("anim", true)
            .transition()
            .duration(750)
            .attr("width", function (d){ return x(d.value)})
            .attr("fill", "#b32017");

        // d3.selectAll(".hoverMe").style("display", "block")
        setTimeout(function() {
        d3.selectAll("text.influence").style("display", "block")
        }, 750)

    } else {
        d3.selectAll("rect.influence")
            .classed("anim", false)
            .transition()
            .duration(750)
            .attr("width",0);

        // d3.selectAll(".hoverMe").style("display", "none")
        d3.selectAll("text.influence").style("display", "none")




    }
});


$("#civil").change(function() {
    if(this.checked) {
        d3.selectAll("rect.civil")
            .transition()
            .duration(750)
            .attr("width", function (d){ return x(d.value)});
        setTimeout(function() {
            d3.selectAll("text.civil").style("display", "block")
        },750)
    } else {
        d3.selectAll("rect.civil")
            .transition()
            .duration(750)
            .attr("width",0);

        d3.selectAll("text.civil").style("display", "none")
    }
});



$("#state").change(function() {
    if(this.checked) {
        // sessionStorage.checked = true;
        d3.selectAll("rect.state")
            .transition()
            .duration(750)
            .attr("width", function (d){ return x(d.value)});

        // d3.select("#swoo-en").style("display", "block")
        setTimeout(function() {
            d3.selectAll("text.state").style("display", "block")
        },750)

    } else {
        // sessionStorage.checked = false;
        d3.selectAll("rect.state")
            .transition()
            .duration(750)
            .attr("width",0);

        // d3.select("#swoo-en").style("display", "none")
        d3.selectAll("text.state").style("display", "none")
    }
});


// var annotations = [
//     {
//         "sepalWidth": 2.3,
//         "sepalLength": 2,
//         "path": "",
//         "text": "no color bar means 0",
//         "theClass":"noBars",
//         "textOffset": [
//             -51,152
//         ]
//     }
//     , {
//         "sepalWidth": 2.3,
//         "sepalLength": 2,
//         // "path": "M-27,68L6,68",
//         "path": "M120,93C130,88,133,71,119,65",
//         "text": "hover bars for details",
//         "theClass":"hoverMe",
//         "textOffset": [
//             13,104
//         ]
//     }
// ]




//
// $('input#state').change(function() {
//      if(this.checked) {
//          // alert("now i'm true")
//          sessionStorage.checked = true;
//     } else {
//          // alert("now i'm false")
//         sessionStorage.checked = false;
//     }
// });
// //
// $( document ).ready(function() {
//     if(sessionStorage.checked === "true"){
//         setTimeout(function(){
//             d3.selectAll("rect.state")
//                 // .transition()
//                 // .duration(750)
//                 .attr("width", function (d) { console.log(d);
//                     // debugger;
//                     return x(d.value)   })
//                 .attr("fill", "#005984");
//         }, 100);
//         document.querySelector('input#state').checked = true;
//
//
//
//     } else {
//         document.querySelector('input#state').checked = false;
//         d3.selectAll("rect.state")
//             .transition()
//             .duration(750)
//             .attr("width", function (d) { console.log(d); return x(d.value)   })
//             .attr("fill", "#005984");
//     }
//
// });



function onClickBox() {
    var arr = $('input').map(function() {
        return this.checked;
    }).get();
    sessionStorage.setItem("checked", JSON.stringify(arr));
}

$(document).ready(function() {
    var arr = JSON.parse(sessionStorage.getItem('checked')) || [];
    arr.forEach(function(checked, i) {
        $('input').eq(i).prop('checked', checked);
        if($('input').eq(i).is(":checked")){
            setTimeout(function(){
            var currentID = $('input').eq(i)[0].id;
            d3.selectAll("rect." + currentID)
            // .transition()
            // .duration(750)
                .attr("width", function (d) { return x(d.value)   })
                .attr("fill", function (d) { return d.fill   })

                d3.selectAll("text." + currentID).style("display", "block")
        },100)
        }

     });

    $("input").click(onClickBox);
});

