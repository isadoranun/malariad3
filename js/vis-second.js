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




var button_selection = "Global_Fund";
var button_selection = "Global_Fund";
var selected = [button_selection];
var line;
var data_original;
var yAxis, yAxisGroup, maxY;
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
            d["Global_Fund"] = +d["Global Fund"];
            d["United_States"] = +d["United States"];
            d["Domestic_Resources"] = +d["Domestic Resources"];
            d["United_Kingdom"] = +d["United Kingdom"];
            d["World_Bank"] = +d["World Bank"];
            d["All_Other_Sources"] = +d["All Other Sources"];
            d["Total"] = +d["Total"];

        });

       //console.log(data)

        data_original = data;

        line = d3.svg.line()
            .defined(function(d) { return !isNaN(d[button_selection]); })
            .x(function(d) { return x(d.Year); })


        path2 = svg2.append("path")
                .attr("class","line")


        svg2.append("g")
                .attr("class", "y axis")
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text("Funding (millions USD)");

        xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom")



        xAxisGroup = svg2.append("g")
            .attr("class", "x-axis axis")
            .attr("transform", "translate(0, "+height+")");



        yAxis = d3.svg.axis()
                .scale(y)
                .orient("left");

        yAxisGroup = svg2.append("g")
            .attr("class", "y-axis axis");


        //console.log(maximums)


        UpdateLineChart(data)
        });



    }

function UpdateLineChart(data) {

        d3.select("g")
        .selectAll("path")
        .remove();

        maxY = 0;

        var line_color = colorbrewer.BrBG[8]

        selected.forEach(function (s, i) {


            maxY = d3.max(data, function(d) { return Math.max(maxY, d[s])})

        })

        selected.forEach(function (s, i) {

            y.domain([0,maxY])

            line
                .defined(function(d) { return !isNaN(d[s]); })
                .y(function (d) {
                    return y(d[s]);
                });


            svg2.append("path")      // Add the valueline2 path.
                .attr("class", "line")
                .style("stroke", line_color[i])// Add the colours dynamically
                .attr("d", line(data))
                //.attr("id", s.replace(/\s+/g, '_'))
                .attr("id", s+"_line")


            d3.select("#"+s).style("color", line_color[i]);
            //d3.select("#"+s).style("border", line_color[i]);


            svg2.select(".y-axis")
                .transition()
                .duration(800)
                .call(yAxis);


            svg2.select(".x-axis")
                .transition()
                .duration(800)
                .call(xAxis);


        })
}


d3.select("#Global_Fund").on("click", function() {
    button_selection = "Global_Fund"
    index = selected.indexOf(button_selection)
    if(index == -1){
        selected.push(button_selection)
        color_index = 0;
    } else{
        selected.splice(index, 1);
        //d3.select("#"+button_selection.replace(/\s+/g, '_')).remove()
        d3.select("#"+button_selection+"_line").remove()
        d3.select("#"+button_selection).style("color", "black");


    }
    UpdateLineChart(data_original)

})
d3.select("#United_States").on("click", function() {
    button_selection = "United_States"
    index = selected.indexOf(button_selection)
    if(index == -1){
        selected.push(button_selection)
        color_index = 1;
    } else{
        selected.splice(index, 1);
        //d3.select("#"+button_selection.replace(/\s+/g, '_')).remove()
        d3.select("#"+button_selection+"_line").remove()
        d3.select("#"+button_selection).style("color", "black");


    }
    UpdateLineChart(data_original)


})
d3.select("#Domestic_Resources").on("click", function() {
    button_selection = "Domestic_Resources"
    index = selected.indexOf(button_selection)
    if(index == -1){
        selected.push(button_selection)
        color_index = 2;
    } else{
        selected.splice(index, 1);
        d3.select("#"+button_selection+"_line").remove()
        d3.select("#"+button_selection).style("color", "black");

    }
    UpdateLineChart(data_original)

})
d3.select("#United_Kingdom").on("click", function() {
    button_selection = "United_Kingdom";
    index = selected.indexOf(button_selection)
    if(index == -1){
        selected.push(button_selection)
        color_index = 3;
    } else{
        selected.splice(index, 1);
        d3.select("#"+button_selection+"_line").remove()
        d3.select("#"+button_selection).style("color", "black");

    }
    UpdateLineChart(data_original)

})
d3.select("#World_Bank").on("click", function() {
    button_selection = "World_Bank";
    index = selected.indexOf(button_selection)
    if(index == -1){
        selected.push(button_selection)
        color_index = 4;
    } else{
        selected.splice(index, 1);
        d3.select("#"+button_selection+"_line").remove()
        d3.select("#"+button_selection).style("color", "black");

    }
    UpdateLineChart(data_original)

})
d3.select("#All_Other_Sources").on("click", function() {
    button_selection = "All_Other_Sources";
    index = selected.indexOf(button_selection)
    if(index == -1){
        selected.push(button_selection)
        color_index = 5;
    } else{
        selected.splice(index, 1);
        d3.select("#"+button_selection+"_line").remove()
        d3.select("#"+button_selection).style("color", "black");


    }
    UpdateLineChart(data_original)
})
d3.select("#Total").on("click", function() {
    button_selection = "Total"
    index = selected.indexOf(button_selection)
    if(index == -1){
        selected.push(button_selection)
        color_index = 6;
    } else{
        selected.splice(index, 1);
        d3.select("#"+button_selection+"_line").remove()
        d3.select("#"+button_selection).style("color", "black");
    }
    UpdateLineChart(data_original)

})

