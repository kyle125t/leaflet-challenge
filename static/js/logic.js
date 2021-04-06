// Anchor map w/ background image
var myMap = L.map("map", {
    // center of the United States
    center: [39.8283, -98.5795],
    zoom: 0
  });
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: "pk.eyJ1Ijoia3lsZTEyNXQiLCJhIjoiY2tsc25kZGVwMGJxNjJvbDhtcG9jaW1hbSJ9.gR7NsrGBYIZugXwP1BrpCA"
  }).addTo(myMap);

  // Set URL variable as All Earthquakes from the last month
  var queryURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

  // Legend/magnitude colors
  // green: #ff3333
  // yellow green: #ff8333
  // yellow: #ffbe33
  // orange: #fcff33
  // orange red: #c4ff33
  // red: #2ecc71

  d3.json(queryUrl, function(data) {
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
    });