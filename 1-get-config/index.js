let map;
let mapListener;

let originMarker;
let destinationMarker;
let waypointMarkers = [];

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
}

function addOrigin() {
  // Remove current origin marker
  if (originMarker) {
    originMarker.setMap(null);
  }

  document.getElementById("originButton").disabled = true;

  // Add new origin marker
  mapListener = map.addListener("click", function (e) {
    console.log(e);
    originMarker = new google.maps.Marker({
      map: map,
      position: e.latLng,
    });
    updateConfig();
    google.maps.event.removeListener(mapListener);
    document.getElementById("originButton").disabled = false;
  });
}

function addDestination() {
  // Remove current destination marker
  if (destinationMarker) {
    destinationMarker.setMap(null);
  }

  document.getElementById("destinationButton").disabled = true;

  // Add new destination marker
  mapListener = map.addListener("click", function (e) {
    console.log(e);
    destinationMarker = new google.maps.Marker({
      map: map,
      position: e.latLng,
    });
    updateConfig();
    google.maps.event.removeListener(mapListener);
    document.getElementById("destinationButton").disabled = false;
  });
}

function addWaypoint() {
  document.getElementById("waypointButton").disabled = true;

  // Add new waypoint marker
  mapListener = map.addListener("click", function (e) {
    let newWaypointMarker;
    console.log(e);
    newWaypointMarker = new google.maps.Marker({
      map: map,
      position: e.latLng,
    });
    waypointMarkers.push(newWaypointMarker);
    updateConfig();
    google.maps.event.removeListener(mapListener);
    document.getElementById("waypointButton").disabled = false;
  });
}

function updateConfig() {
  let originCoords;
  let destinationCoords;
  let waypointCoords;

  if (originMarker) {
    originCoords =
      originMarker.getPosition().lat() +
      ", " +
      originMarker.getPosition().lng();
  }
  if (destinationMarker) {
    destinationCoords =
      destinationMarker.getPosition().lat() +
      ", " +
      destinationMarker.getPosition().lng();
  }

  if (waypointMarkers.length > 0) {
    waypointCoords = `"waypoints": [`;

    waypointMarkers.forEach((marker, i) => {
      if (i + 1 != waypointMarkers.length) {
        let newWaypointString = `
        {
            "location": "${
              marker.getPosition().lat() + ", " + marker.getPosition().lng()
            }"
        },
      `;
        waypointCoords += newWaypointString;
      } else {
        let newWaypointString = `
        {
            "location": "${
              marker.getPosition().lat() + ", " + marker.getPosition().lng()
            }"
        }
      `;
        waypointCoords += newWaypointString;
      }
    });

    waypointCoords += `
    ],`;
  }

  document.getElementById("config").textContent = `{
    ${originCoords ? `"origin": "${originCoords}",` : ""}
    ${destinationCoords ? `"destination": "${destinationCoords}",` : ""}
    ${waypointMarkers.length > 0 ? waypointCoords : ""}
    "travelMode": "DRIVING"
}`;
}
