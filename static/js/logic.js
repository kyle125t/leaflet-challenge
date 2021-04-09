// Anchor map w/ background image
// Tile layer
var tileMap = L.tileLayer(
  "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
  {
    attribution:
      "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/light-v10",
    accessToken: API_KEY
  });

// Map object
var myMap = L.map("mapid", {
  center: [
    39.8283, -98.5795
  ],
  zoom: 5
});

// Add tile layer to map
tileMap.addTo(myMap);

// Set URL variable as All Earthquakes from the last month
// var queryURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

// d3.json(queryURL, function(data) {
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson").then(function(data) {
  function magStyle(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: magColor(feature.properties.mag),
      color: "#000000",
      radius: magRadius(feature.properties.mag),
      stroke: true,
      weight: 0.75
    };
  }

  // Legend/mag colors
  // green: #ff3333
  // yellow green: #ff8333
  // yellow: #ffbe33
  // orange: #fcff33
  // orange red: #c4ff33
  // red: #2ecc71

  // Define colors for each magnitude
  function magColor(mag) {
      switch (true) {   
      case mag > 1:
          return "#ff8333";

      case mag > 2:
          return "#ffbe33";

      case mag > 3:
          return "#fcff33";

      case mag > 4:
          return "#c4ff33";

      case mag > 5:
          return "#2ecc71";

      default:
          return "#ff3333";
      };
    };

  // Define radius for circles based off magnitude size  
  function magRadius(mag) {
    if (mag === 0) {
      return 1;
    };
    return mag * 5;
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

  // Create legend 
  var legend = L.control({
    position: "bottomright"
  });
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    var magLevel = [0, 1, 2, 3, 4, 5];
    var colors = ["#ff3333", "#ff8333", "#ffbe33", "#fcff33", "#c4ff33", "#2ecc71"];
    for (var i = 0; i < magLevel.length; i++) {
      div.innerHTML += "<i style='background: " + colors[i] + "'></i> " + magLevel[i] + (magLevel[i + 1] ? "&ndash;" + magLevel[i + 1] + "<br>" : "+");
      }
    return div;
  };
  // Add legend
  legend.addTo(myMap);
});
