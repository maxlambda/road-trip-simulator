let finalLocations = [];
let map;
let directionsService;
let directionsRender;
let pinImage;

function initMap() {
  directionsService = new google.maps.DirectionsService();
  directionsRender = new google.maps.DirectionsRenderer();
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
  directionsRender.setMap(map);
}

function addMarker(map, latLng) {
  let marker = new google.maps.Marker({
    position: latLng,
    map: map,
  });
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

// Function to calculate distance (in metress) between two coordinates
// source: https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates
function getDistance(point1, point2) {
  let r = 6371; // radius of the earth in km
  let dLat = deg2rad(point2.lat - point1.lat);
  let dLon = deg2rad(point2.lng - point1.lng);
  let a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(point1.lat)) *
      Math.cos(deg2rad(point2.lat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  let d = r * c * 1000;
  return d;
}

// Calculates each location along the given config route in 10-metre intervals.
// Renders the directions on the map and pastes the location list into the text
// area at the bottom of the page.

// sources:
// https://stackoverflow.com/questions/68126047/obtaining-distance-from-google-maps-api-and-storing-it-in-a-global-variable
function calculate() {
  document.getElementById("error").style.setProperty("visibility", "hidden");
  let config = JSON.parse(document.getElementById("config").value);
  directionsService.route(config, function (response, status) {
    if (status === "OK") {
      directionsRender.setDirections(response);
      directions = directionsRender.getDirections();
      let route = directions.routes[0];
      let points = new Array();
      for (i = 0; i < route.legs.length; i++) {
        let steps = route.legs[i].steps;
        for (j = 0; j < steps.length; j++) {
          let nextSegment = steps[j].path;
          for (k = 0; k < nextSegment.length; k++) {
            points.push({
              lat: nextSegment[k].lat(),
              lng: nextSegment[k].lng(),
            });
          }
        }
      }
      let lastPoint = points[0];
      for (let i = 1; i < points.length; i++) {
        let distance = getDistance(points[i], lastPoint);
        if (distance > 15) {
          let numberSteps = ~~(distance / 15); // ~~ is floor for +ve numbers

          let segment = {
            lat: (points[i].lat - lastPoint.lat) / (numberSteps + 1),
            lng: (points[i].lng - lastPoint.lng) / (numberSteps + 1),
          };

          for (let j = 1; j <= numberSteps; j++) {
            finalLocations.push({
              lat: lastPoint.lat + segment.lat * j,
              lng: lastPoint.lng + segment.lng * j,
              intermediate: true,
            });
          }

          lastPoint = points[i];
          finalLocations.push(points[i]);
        } else if (distance < 10) {
          // Do nothing if the distance is less than 10 metres:
          // this way, we have pictures for every 10 metres
        } else {
          lastPoint = points[i];
          finalLocations.push(points[i]);
        }
      }

      let locationListHtml = "";
      for (let i = 0; i < finalLocations.length; i++) {
        finalLocations[i].angle = 0;
        if (i > 0) {
          let lat = finalLocations[i].lat - finalLocations[i - 1].lat;
          let lng = finalLocations[i].lng - finalLocations[i - 1].lng;
        }

        let angle = 0;
        if (i > 0)
          angle =
            (Math.atan2(
              finalLocations[i].lng - finalLocations[i - 1].lng,
              finalLocations[i].lat - finalLocations[i - 1].lat
            ) *
              180.0) /
            Math.PI;
        finalLocations[i].angle = angle;
        locationListHtml +=
          finalLocations[i].lat +
          "," +
          finalLocations[i].lng +
          "," +
          finalLocations[i].angle +
          "\n";
      }

      let locationList = document.getElementById("locationList");
      locationList.value = locationListHtml;
    } else {
      document.getElementById("error").textContent =
        "ERROR. Failed to get directions: " + status;
      document
        .getElementById("error")
        .style.setProperty("visibility", "visible");
    }
  });
}
