function getStackChart(fileName,id){
  var margin = {top: 40, right: 20, bottom: 40, left: 100},
      width = 1200 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom;


  var x = d3.scale.ordinal()
      .rangeRoundBands([0, width], .1);

  var y = d3.scale.linear()
      .rangeRound([height, 0]);

  var color = d3.scale.ordinal()
      .range(["rgb(255, 77, 245)","#1ba0d7"]);

  var svg = d3.select(id).append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .tickFormat(d3.format(".2s"));
      var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0]);


    var div = d3.select(id).append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);
        var tip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])






  svg.call(tip);
  d3.json(fileName, function(error, data) {
    if (error) throw error;

    color.domain(d3.keys(data[0]).filter(function(key) { return key !== "Year"; }));

    data.forEach(function(d) {
      var y0 = 0;
      d.ages = color.domain().map(function(name) { return {name: name, y0: y0, y1: y0 += d[name]}; });
      d.total = d.ages[d.ages.length - 1].y1;
    });

    //data.sort(function(a, b) { return b.total - a.total; });

    x.domain(data.map(function(d) { return d.Year }));
    y.domain([0, d3.max(data, function(d) { return d.total; })]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Values");

    var state = svg.selectAll(".state")
        .data(data)
      .enter().append("g")
        .attr("class","g")
        .attr("transform", function(d) { return "translate(" + x(d.Year) + ",0)"; });

    state.selectAll("rect")
        .data(function(d) { return d.ages; })
      .enter().append("rect")
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y(d.y1); })
        .attr("height", function(d) { return y(d.y0) - y(d.y1); })
        .style("fill", function(d) { return color(d.name)})
        .on("mouseover", function(d) {
              div.transition()
                  .duration(200)
                  .style("opacity", 1);
              div	.html(d.name +" : " + (parseFloat(d.y1)-parseFloat(d.y0)))
                  .style("left", (d3.event.pageX) + "px")
                  .style("top", (d3.event.pageY - 28) + "px");
              })
          .on("mouseout", function(d) {
              div.transition()
                  .duration(500)
                  .style("opacity", 0);});


    var legend = svg.selectAll(".legend")
        .data(color.domain().slice().reverse())
      .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + (i+1) * 20 + ")"; });

    legend.append("rect")
        .attr("x", width - 29)
        .attr("y","-60px")
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", color);

    legend.append("text")
        .attr("x", width - 9)
        .attr("y", 9)
        .attr("dy", "-53px")
        .attr("dx","30px")
        .style("text-anchor", "end")
        .text(function(d) { return d; });

  });

}
function getMultiLineChart(fileName,id){
  var margin = {top: 20, right: 80, bottom: 30, left: 50},
    width = 1025 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;


var parseDate = d3.time.format("%Y").parse;
var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.category10();

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.line()
    .interpolate("basis")
    .x(function(d) { ;return x(d.year); })
    .y(function(d) { ;return y(d.rate); });

var svg = d3.select(id).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json(fileName, function(error, data) {
  if (error) throw error;

  color.domain(d3.keys(data[0]).filter(function(key) { return key !== "Year"; }));

  data.forEach(function(d) {
    //alert(d.Year);

    d.Year = parseDate(d.Year.toString());
  });

  var cities = color.domain().map(function(name) {
    return {
      name: name,
      values: data.map(function(d) {
        return {year: d.Year, rate: +d[name]};
      })
    };
  });

  x.domain(d3.extent(data, function(d) { return d.Year; }));

  y.domain([
    d3.min(cities, function(c) { return d3.min(c.values, function(v) { return v.rate; }); }),
    d3.max(cities, function(c) { return d3.max(c.values, function(v) { return v.rate; }); })
  ]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Values ")


  var city = svg.selectAll(".city")
      .data(cities)
    .enter().append("g")
      .attr("class", "city");

  city.append("path")
      .attr("class", "line")
      .attr("d", function(d) { return line(d.values); })
      .style("stroke", function(d) { return color(d.name); })
      .style("fill", "none");

  city.append("text")
      .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
      .attr("transform", function(d) { return "translate(" + x(d.value.year) + "," + y(d.value.rate) + ")"; })
      .attr("x", 3)
      .attr("dy", ".35em")
      .text(function(d) { return d.name; });
});
}
function getPieChart(fileName,id){

  var width = 960,
    height = 500,
    radius = Math.min(width, height) / 2;

var color = d3.scale.ordinal()
    .range(["#98abc5", "#8a89a6"]);

var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

var labelArc = d3.svg.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40);

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d["Total cases"]; });

var svg = d3.select(id).append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

d3.json(fileName,  function(error, data) {
  if (error) throw error;

  var g = svg.selectAll(".arc")
      .data(pie(data))
    .enter().append("g")
      .attr("class", "arc");

  g.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data.Category); });

  g.append("text")
      .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .text(function(d) { return d.data.Category; });
});




}
