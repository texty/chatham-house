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
        .attr("data-tippy-content", function (d){
            if(window.innerWidth < 800 && currentLanguage === "eng"){
                if(d.measure === "Russian influence"){
                    if(d.value === 1){
                        return "Minimal level of influence: <br>"+ d.value + " from 5 <br>based on interviews with experts"
                    } else if(d.value === 2){
                        return "Moderate level of influence: <br>"+ d.value + " from 5 <br>based on interviews with experts"
                    } else if(d.value === 3){
                        return "Substantial level of influence: <br>"+ d.value + " from 5 <br>based on interviews with experts"
                    } else if(d.value === 4){
                        return "Critical level of influence: <br>"+ d.value + " from 5 <br>based on interviews with experts"
                    } else if(d.value === 5){
                        return "Most prevalent level of influence: <br>"+ d.value + " from 5 <br>based on interviews with experts"
                    }

                } else {
                    if(d.value === 1){
                        return "Minimal response: <br>"+ d.value + " from 5 <br>based on interviews with experts"
                    } else if(d.value === 2){
                        return "Mild response: <br>"+ d.value + " from 5 <br>based on interviews with experts"
                    } else if(d.value === 3){
                        return "Moderate effort: <br>"+ d.value + " from 5 <br>based on interviews with experts"
                    } else if(d.value === 4){
                        return "Substantial effort: <br>"+ d.value + " from 5 <br>based on interviews with experts"
                    } else if(d.value === 5){
                        return "High-level effective effort: <br>"+ d.value + " from 5 <br>based on interviews with experts"
                    }
                    else if(d.value === 0){
                        return "no response: <br>"+ d.value + " from 5 <br>based on interviews with experts"
                    }
                }

            }  else if(window.innerWidth < 800 && currentLanguage === "ru"){
                if(d.measure === "Russian influence"){
                    if(d.value === 1){
                        return "Минимальный уровень влияния: <br>"+ d.value + " из 5 <br>на основе интервью с экспертами"
                    } else if(d.value === 2){
                        return "Умеренный уровень влияния: <br>"+ d.value + " из 5 <br>на основе интервью с экспертами"
                    } else if(d.value === 3){
                        return "Существенный уровень влияния: <br>"+ d.value + " из 5 <br>на основе интервью с экспертами"
                    } else if(d.value === 4){
                        return "Критический уровень влияния: <br>"+ d.value + " из 5 <br>на основе интервью с экспертами"
                    } else if(d.value === 5){
                        return "Доминирующий уровень влияния: <br>"+ d.value + " из 5 <br>на основе интервью с экспертами"
                    }

                } else {
                    if(d.value === 1){
                        return "Минимальное реагирование: <br>"+ d.value + " из 5 <br>на основе интервью с экспертами"
                    } else if(d.value === 2){
                        return "Мягкое реагирование: <br>"+ d.value + "  из 5 <br>на основе интервью с экспертами"
                    } else if(d.value === 3){
                        return "Умеренные усилия: <br>"+ d.value + " из 5 <br>на основе интервью с экспертами"
                    } else if(d.value === 4){
                        return "Cущественные усилия: <br>"+ d.value + " из 5 <br>на основе интервью с экспертами"
                    } else if(d.value === 5){
                        return "Действенные усилия на высоком уровне: <br>"+ d.value + " из 5 <br>на основе интервью с экспертами"
                    }
                    else if(d.value === 0){
                        return "реагирование отсутствует: <br>"+ d.value + " из 5 <br>на основе интервью с экспертами"
                    }
                }
            }

            else {
                return d.value + " " + prefix + " 5"
            }
        })
        .attr("width", 0)
        .attr("height", barHeight)
        .attr("fill", function (d) {
            if (d.value != 0){
                return d.fill
            } else {
                return "#597B7C"
            }
        })
        .style("opacity", function (d) {
            if (d.value != 0){
                return 0.8
            } else {
                return 0
            }
        });

    box
        .insert("rect", ".bar")
        .attr("class", "fullbars")
        .attr("transform", function(d, i) {
                return "translate(" + 0 + "," + 0 + ")";
        })
        .attr("width", function (d){ return x(5)})
        .attr("fill", "#597B7C")
        .style("opacity", "0.1")
        .attr("height", barHeight);


    box
        .insert("rect", ".bar")
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
        .insert("rect", ".bar")
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
            if(d.value > 0){
                return d.value
            } else {
                return zeroValue
            }

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


    if($('input#influence').is(":checked")){
        setTimeout(function(){
            d3.selectAll("rect.influence")
                .attr("width", function (d) {  return x(d.value)   })
        },100);
        d3.selectAll("text.influence").style("display", "block")

    }



    tippy('.bar', {
        theme: 'tomato'
    })


    tippy(".hover-over", {
        theme: 'info',
        placement: "right-end"
    })

});


$("#influence").change(function() {
    if(this.checked) {
        d3.selectAll("rect.influence")
            .classed("anim", true)
            .transition()
            .duration(750)
            .attr("width", function (d) {  return x(d.value) });



        setTimeout(function() {
        d3.selectAll("text.influence").style("display", "block")
        }, 750)

    } else {
        d3.selectAll("rect.influence")
            .classed("anim", false)
            .transition()
            .duration(750)
            .attr("width",0);
        d3.selectAll("text.influence").style("display", "none")




    }
});


$("#civil").change(function() {
    if(this.checked) {
        d3.selectAll("rect.civil")
            .transition()
            .duration(750)
            .attr("width", function (d) {
                if (d.value != 0){
                    return x(d.value)
                } else {
                    return x(5)
                }
            });

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
            .attr("width", function (d) {
                if (d.value != 0){
                    return x(d.value)
                } else {
                    return x(5)
                }
            });

        setTimeout(function() {
            d3.selectAll("text.state").style("display", "block")
        },750)

    } else {
        // sessionStorage.checked = false;
        d3.selectAll("rect.state")
            .transition()
            .duration(750)
            .attr("width",0);

        d3.selectAll("text.state").style("display", "none")
    }
});




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
                .attr("width", function (d) {
                    if (d.value != 0){
                        return x(d.value)
                    } else {
                        return x(5)
                    }
                });
                d3.selectAll("text." + currentID).style("display", "block")
        },100)
        } 

     });

    $("input").click(onClickBox);
});

$("#influence-hover-over").on("click", function() {
    alert("hi")
});