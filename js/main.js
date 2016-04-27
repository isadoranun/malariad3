var width = 1000,
    height = 600;

var svg = d3.select("#chart-area").append("svg")
    .attr("width", width)
    .attr("height", height)


//For mercator projection
//var projection = d3.geo.mercator()
//    //.scale((width + 1) / 2 / Math.PI)
//    .translate([width / 2, height / 2])
//    .precision(.1)
//    .scale(140)
//    .center([0,40])


function loadData() {
    d3.csv("data/global-malaria-2015.csv", function(error, csv) {

        csv.forEach(function(d){

            // Convert numeric values to 'numbers'
            d.UN_population = +d.UN_population;
            d.At_risk = +d.At_risk;
            d.At_high_risk = +d.At_high_risk;
            d.Suspected_malaria_cases = +d.Suspected_malaria_cases;
            d.Malaria_cases = +d.Malaria_cases;
        });


    var malariaDataByCountryID = {}

    data.forEach(function(d){malariaDataByCountryID[d['Code']]=d;})

    console.log(malariaDataByCountryID)


})
};


//var q = queue();
//
//q.defer(d3.json, "data/africa.topo.json")
//    .defer(d3.json, "data/airports.json")
//    .await(createVisualization);
//
//function createVisualization(error, data1, data2) {
//
//};