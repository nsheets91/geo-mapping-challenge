var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>", tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
});

// var earthquakes = new L.LayerGroup();

var myMap = L.map("map", {
  center: [0, 0],
  zoom: 2,
  // layers: [lightmap, earthquakes]
});

lightmap.addTo(myMap)

d3.json(queryUrl, function (incomingGeojsonURLdata) {
  console.log(incomingGeojsonURLdata)
  L.geoJson(incomingGeojsonURLdata, {
    pointToLayer: function (earthquake, latlong) {
      return L.circleMarker(latlong);
    },
    style: getStyle,
    onEachFeature: function (earthquake, layer) {
      layer.bindPopup("pop up message success")
    },
  }).addTo(myMap)
})


// Here we create a leaflet control object (AKA legend)
var legend = L.control({
  position: "bottomright"
});

// Then add all the details for the legend
legend.onAdd = function () {
  var div = L.DomUtil.create("div", "legend-control");

  var grades = [0, 10, 30, 50, 70, 90];
  var colors = [
    "#74B34C",
    "#ACB800",
    "#FAB750",
    "#FF8E18",
    "#e50914",
    "#4A148C"
  ];
  // if (earthquakeData.geometry.coordinates[2] <= 10) {
  //   color = "#74B34C";
  // }
  // else if (earthquakeData.geometry.coordinates[2] <= 30) {
  //   color = "#ACB800";
  // }
  // else if (earthquakeData.geometry.coordinates[2] <= 50) {
  //   color = "#FAB750";
  // }
  // else if (earthquakeData.geometry.coordinates[2] <= 70) {
  //   color = "#FF8E18";
  // }
  // else if (earthquakeData.geometry.coordinates[2] <= 90) {
  //   color = "#e50914";
  // }
  // else if (earthquakeData.geometry.coordinates[2] > 90) {
  //   color = "#4A148C";
  // }
  // Looping through our intervals to generate a label with a colored square for each interval.
  for (var i = 0; i < grades.length; i++) {
    div.innerHTML += "<i style='background: " + colors[i] + "'></i> " + grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
  }
  return div;
};

// Finally, add legend to the map.
legend.addTo(myMap);
// earthquakes.addTo(myMap)


// creating a function to get the style for markers
function getStyle(earthquakeData) {

  // function to dynamically change the size of the marker
  function markerSize(mag) { return mag * 4; }

  //conditional to get the correct color for marker
  var color = "#000";
  if (earthquakeData.geometry.coordinates[2] <= 10) {
    color = "#74B34C";
  }
  else if (earthquakeData.geometry.coordinates[2] <= 30) {
    color = "#ACB800";
  }
  else if (earthquakeData.geometry.coordinates[2] <= 50) {
    color = "#FAB750";
  }
  else if (earthquakeData.geometry.coordinates[2] <= 70) {
    color = "#FF8E18";
  }
  else if (earthquakeData.geometry.coordinates[2] <= 90) {
    color = "#e50914";
  }
  else if (earthquakeData.geometry.coordinates[2] > 90) {
    color = "#4A148C";
  }

  // returning a dictionary
  return {
    stroke: false,
    fillOpacity: 0.90,
    stroke: true,
    color: color,
    weight: 1,
    fillColor: color,
    radius: markerSize(earthquakeData.properties.mag)
    // radius: 100
  };
}

