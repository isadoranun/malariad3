// SVG drawing area

var margin = {top: 40, right: 100, bottom: 60, left: 60};

var width = 500 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var svg2 = d3.select("#line-chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var formatDate = d3.time.format("%Y");

var x = d3.time.scale()
    .range([0, width])
    .domain([formatDate.parse("2005"),formatDate.parse("2013")]);

var y = d3.scale.linear()
    .range([height, 0])
    .domain([0,2600])


var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

xAxisGroup = svg2.append("g")
    .attr("class", "x-axis axis")
    .attr("transform", "translate(100, 0)");

yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

yAxisGroup = svg2.append("g")
    .attr("class", "y-axis axis");



svg2.select(".y-axis")
    .transition()
    .duration(800)
    .call(yAxis);



var button_selection = "Global Fund";
var line;
var data_original;
var maxY;
var selected = [button_selection];
var color_index = 0;

loadData()
//// Load CSV file
function loadData() {
    d3.csv("data/global-funding2.csv", function (error, data) {

        //console.log(csv)


        data.forEach(function(d){
            // Convert string to 'date object'
            d.Year = formatDate.parse(d.Year);

            // Convert numeric values to 'numbers'
            d["Global Fund"] = +d["Global Fund"];
            d["United States"] = +d["United States"];
            d["Domestic Resources"] = +d["Domestic Resources"];
            d["United Kingdom"] = +d["United Kingdom"];
            d["World Bank"] = +d["World Bank"];
            d["All Other Sources"] = +d["All Other Sources"];
            d["Total"] = +d["Total"];

        });

        //console.log(data)

        data_original = data;

        line = d3.svg.line()
            .defined(function(d) { return !isNaN(d[button_selection]); })
            .x(function(d) { return x(d.Year); })
        //.y(function(d) { return y(d[button_selection]); });


        svg2.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        svg2.append("g")
            .attr("class", "y axis")
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Funding (millions USD)");

        //yAxis = d3.svg.axis()
        //    .scale(y)
        //    .orient("left");
        //
        //yAxisGroup = svg2.append("g")
        //    .attr("class", "y-axis axis");

        maxY = d3.max(data, function(d) { return d[button_selection] })


        //path2 = svg2.append("path")
        //    .attr("class","line")
        //    //.attr("d", line(data))



        UpdateLineChart(data)
    });



}

function UpdateLineChart(data){



    //selected.forEach(function(s,i){

        //maxY =  d3.max(data, function(d) { return Math.max(maxY, d[button_selection]); })
        //
        //y.domain([0,maxY])

        yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");

        yAxisGroup = svg2.append("g")
            .attr("class", "y-axis axis");


        svg2.select(".y-axis")
            .transition()
            .duration(800)
            .call(yAxis);


        var valueline1 = d3.svg.line()
            .defined(function(d) { return !isNaN(d[button_selection]); })

            .x(function (d) {
                return x(d.Year);
            })
            .y(function (d) {
                return y(d[button_selection]);
            });

        //var line_color = d3.scale.category10();
        var line_color = colorbrewer.BrBG[7]


        svg2.append("path")      // Add the valueline2 path.
            .transition()
            .duration(800)
            .attr("class", "line")
            .style("stroke", line_color[color_index])// Add the colours dynamically
            .attr("d", valueline1(data))
            .attr("id", button_selection.replace(/\s+/g, '_'))




    //})

}


d3.select("#button1").on("click", function() {
    button_selection = d3.select("#button1").property("value");
    index = selected.indexOf(button_selection)
    if(index == -1){
        selected.push(button_selection)
        color_index = 0;
        UpdateLineChart(data_original)
    } else{
        selected.splice(index, 1);
        d3.select("#"+button_selection.replace(/\s+/g, '_')).remove()

    }
})
d3.select("#button2").on("click", function() {
    button_selection = d3.select("#button2").property("value");
    index = selected.indexOf(button_selection)
    if(index == -1){
        selected.push(button_selection)
        color_index = 1;
        UpdateLineChart(data_original)
    } else{
        selected.splice(index, 1);
        d3.select("#"+button_selection.replace(/\s+/g, '_')).remove()
    }

})
d3.select("#button3").on("click", function() {
    button_selection = d3.select("#button3").property("value");
    index = selected.indexOf(button_selection)
    if(index == -1){
        selected.push(button_selection)
        color_index = 2;
        UpdateLineChart(data_original)
    } else{
        selected.splice(index, 1);
        d3.select("#"+button_selection.replace(/\s+/g, '_')).remove()

    }
})
d3.select("#button4").on("click", function() {
    button_selection = d3.select("#button4").property("value");
    index = selected.indexOf(button_selection)
    if(index == -1){
        selected.push(button_selection)
        color_index = 3;
        UpdateLineChart(data_original)
    } else{
        selected.splice(index, 1);
        d3.select("#"+button_selection.replace(/\s+/g, '_')).remove()

    }
})
d3.select("#button5").on("click", function() {
    button_selection = d3.select("#button5").property("value");
    index = selected.indexOf(button_selection)
    if(index == -1){
        selected.push(button_selection)
        color_index = 4;
        UpdateLineChart(data_original)
    } else{
        selected.splice(index, 1);
        d3.select("#"+button_selection.replace(/\s+/g, '_')).remove()

    }

})
d3.select("#button6").on("click", function() {
    button_selection = d3.select("#button6").property("value");
    index = selected.indexOf(button_selection)
    if(index == -1){
        selected.push(button_selection)
        color_index = 5;
        UpdateLineChart(data_original)
    } else{
        selected.splice(index, 1);
        d3.select("#"+button_selection.replace(/\s+/g, '_')).remove()

    }
})
d3.select("#button7").on("click", function() {
    button_selection = d3.select("#button7").property("value");
    index = selected.indexOf(button_selection)
    if(index == -1){
        selected.push(button_selection)
        color_index = 6;
        UpdateLineChart(data_original)
    } else{
        selected.splice(index, 1);
        d3.select("#"+button_selection.replace(/\s+/g, '_')).remove()
    }
})

