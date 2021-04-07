// Anchor map w/ background image
var tileMap = L.tileLayer(
  "https://api.mapbox.com/styles/v4/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "light-v10",
    accessToken: API_KEY
  });

// We create the map object with options.
var myMap = L.map("mapid", {
  center: [
    40.7, -94.5
  ],
  zoom: 3
});

tileMap.addTo(myMap);

// Set URL variable as All Earthquakes from the last month
// var queryURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

// Legend/magnitude colors
// green: #ff3333
// yellow green: #ff8333
// yellow: #ffbe33
// orange: #fcff33
// orange red: #c4ff33
// red: #2ecc71

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson", function(error, data) {
  function magStyle(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: magColor(feature.properties.mag),
      color: "#000000",
      radius: magRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }
  function magColor(magnitude) {
      switch (true) {   
      case magnitude > 1:
          return "#ff8333";

      case magnitude > 2:
          return "#ffbe33";

      case magnitude > 3:
          return "#fcff33";

      case magnitude > 4:
          return "#c4ff33";

      case magnitude > 5:
          return "#2ecc71";

      default:
          return "#ff3333";
      };
    };
  function magRadius(magnitude) {
    if (magnitude === 0) {
      return 1;
    };
    return magnitude * 4;
  };

  L.geoJson(data, {
    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng);
    },
    style: magStyle,
    onEachFeature: function(feature, layer) {
      layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
    }
  }).addTo(myMap);

  var legend = L.control({
    position: "bottomright"
  });
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    var grades = [0, 1, 2, 3, 4, 5];
    var colors = ["#ff3333", "#ff8333", "#ffbe33", "#fcff33", "#c4ff33", "#2ecc71"];
    for (var i = 0; i < grades.length; i++) {
      div.innerHTML +=
      "<i style='background: " + colors[i] + "'></i> " +
      grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
      }
    return div;
  };
  legend.addTo(myMap);
});
