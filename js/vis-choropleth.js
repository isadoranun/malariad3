

// --> CREATE SVG DRAWING AREA
var width = 500,
    height = 600;

var svg = d3.select("#chart-area").append("svg")
    .attr("width", width)
    .attr("height", height)
    //.append("g")

var projection = d3.geo.mercator()
    .scale(350)
    .center([50, 0]);

var path = d3.geo.path()
    .projection(projection);


//Define global variables
var selection = "UN_population";
var format = "thousands";
var Json;
var originalJson;
var AfricaData;
var color;

// Use the Queue.js library to read two files

queue()
  .defer(d3.json, "data/africa.topo.json")
  .defer(d3.csv, "data/global-malaria-2015.csv")
  .await(function(error, mapTopJson, malariaDataCsv){
    
    // --> PROCESS DATA

      malariaDataCsv.forEach(function(d){

          // Convert numeric values to 'numbers'
          d.UN_population = +d.UN_population;
          d.At_risk = +d.At_risk;
          d.At_high_risk = +d.At_high_risk;
          d.Suspected_malaria_cases = +d.Suspected_malaria_cases;
          d.Malaria_cases = +d.Malaria_cases;
      });

      //We select only African countries
      AfricaData = malariaDataCsv.filter(function(d) {
          return d.WHO_region == "African";
      });

      //console.log(AfricaData);

      //We create an array where the keys are the countries IDs.
      var malariaDataByCountryID = {}

      AfricaData.forEach(function(d){malariaDataByCountryID[d['Code']]=d;})

      //console.log(malariaDataByCountryID)

      Json = mapTopJson;
      originalJson = mapTopJson;



      // Update choropleth
    updateChoropleth(mapTopJson, AfricaData);
  });


function updateChoropleth(Json, AfricaData) {

  // --> Choropleth implementation

    Json = originalJson;


    var collection = topojson.feature(Json, Json.objects.collection).features

    //We define the min and max of the domain depending on the selected filter
    if (selection=="At_risk" || selection=="At_high_risk"){
        min = 0
        max = 100
    } else {
        min = d3.min(AfricaData, function(d) { return d[selection] })
        max = d3.max(AfricaData, function(d) { return d[selection] })
    }

        color = d3.scale.quantize()

        .domain([min , max])
        .range(colorbrewer.BrBG[10]);

    console.log(colorbrewer.BrBG[10])

    //console.log(malariaDataByCountryID[])
    for (var i = 0; i < AfricaData.length; i++) {

        //Grab state name
        var dataCountry = AfricaData[i].Code;

        //Grab data values
        var Country =  AfricaData[i]['Country'];
        var UN_population = AfricaData[i]['UN_population'];
        var At_risk = AfricaData[i]['At_risk'];
        var At_high_risk = AfricaData[i]['At_high_risk'];
        var Suspected_malaria_cases = AfricaData[i]['Suspected_malaria_cases'];
        var Malaria_cases = AfricaData[i]['Malaria_cases'];


        //Find the corresponding state inside the GeoJSON
        for (var j = 0; j < Json.objects.collection.geometries.length; j++) {

            var jsonState = collection[j].properties.adm0_a3_is;

            if (dataCountry == jsonState) {

                //Copy the data values into the JSON
                Json.objects.collection.geometries[j].properties['Country'] = Country;
                Json.objects.collection.geometries[j].properties['UN_population'] = UN_population;
                Json.objects.collection.geometries[j].properties['At_risk'] = At_risk;
                Json.objects.collection.geometries[j].properties['At_high_risk'] = At_high_risk;
                Json.objects.collection.geometries[j].properties['Suspected_malaria_cases'] = Suspected_malaria_cases;
                Json.objects.collection.geometries[j].properties['Malaria_cases'] = Malaria_cases;


                //Stop looking through the JSON
                break;

            }
        }
    }

    var collection = topojson.feature(Json, Json.objects.collection).features

    //console.log(collection)

    //We remove all the previous paths
    d3.select("svg")
        .selectAll("path")
        .remove();

    var appendPath = svg.selectAll("svg")
        .data(collection)

    //We add new elements
    appendPath
        .enter()
        .append("path")

    //We update existing elements
    appendPath
        .attr("d", path)
        .attr("class", "countries")
        .style("fill", function(d) {
            //Get data value
            var value = d.properties[selection];

            return color_value(value)

        })


    // rollover functionality to display tool tips
        .on("mouseover", function (d) {
            if (isNaN(d.properties.UN_population)){
                tip.hide(d)
            }else{
            tip.show(d)
            d3.select(this)
                .transition().duration(200)
                .style("fill", "purple");}
        })
        .on("mouseout", function () {
            tip.hide()
            d3.select(this)
                .transition().duration(200)
                .style("fill",
                    function (d) {
                        //console.log(d)
                        return color_value(d.properties[selection]);
                    });
        });


        d3.select('#legend')
        .selectAll('ul')
        .remove();

    var legend = d3.select('#legend')
        .append('ul')
        .attr('class', 'list-inline');

    var keys = legend.selectAll('li.key')
        .data(color.range());

    //We define the format of the legend values (either percentage or SI)
    var formats = {
        percent: d3.format(),
        thousands: d3.format(" .2s")}; //,.0f


    keys.enter().append('li')
        .attr('class', 'key')
        .style('border-top-color', String)
        .text(function(d) {
            var r = color.invertExtent(d);
            if (selection=="At_risk" || selection=="At_high_risk"){
                return formats.percent(r[0])+"%";
            } else {
                return formats.thousands(r[0]);
            }

        });

    d3.select("#legendTitle")
        .text(selection.replace(/_/g , " "))

    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([0, 10])
        //.direction(function(d) {
            //if (d.id <= 'S01003045') {return 'n'}
            //if (d.id >= 'S01003700') {return 's'}
            //else {return 'e'}
            //;})
        .html(function (d) {

            var country = d.properties.Country;
            var pop = d.properties.UN_population;
            var risk = d.properties.At_risk;
            var high_risk = d.properties.At_high_risk;
            var suspected = d.properties.Suspected_malaria_cases;
            var cases =  d.properties.Malaria_cases;

        return "<span class ='toolTipHead'><b>Country: " + country + "</b><br/>" +
            "UN population: " + d3.format(",.2")(pop) + "<br/>" +
            "Population at risk: " + risk + "% <br/>" +
            "Populaton at high risk: " + high_risk + "% <br/>" +
            "Suspected malaria cases: " + d3.format(",.2")(suspected) + "<br/>" +
            "Malaria cases: " + d3.format(",.2")(cases)
        })

    svg.call(tip);

}

d3.select("#selection-type").on("change", function() {
    selection = d3.select("#selection-type").property("value")
    console.log(selection)



    updateChoropleth(Json, AfricaData)
});

function color_value(value){
    if (value) {
        return color(value);
    } else if (isNaN([value])){
        //If value is NaN…
        return "#ccc";
    } else {
        //If value is undefined…
        return "#ccc"}
}

