// Map
function dropdown() {
  const dropdownButtons = document.querySelectorAll(".dropdown-button");

  dropdownButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const dropdownItem = button.nextElementSibling;
      const arrowIcon = button.querySelector(".arrow");

      if (dropdownItem.classList.contains("shown")) {
        // Collapse the dropdown
        dropdownItem.style.height = `${dropdownItem.scrollHeight}px`; // Set to current height first
        requestAnimationFrame(() => {
          dropdownItem.style.height = "0px"; // Then transition to 0px
        });
        dropdownItem.classList.remove("shown");
        arrowIcon.classList.remove("rotated");
      } else {
        // Expand the dropdown
        dropdownItem.classList.add("shown");
        dropdownItem.style.height = "0px"; // Ensure it starts from 0px
        requestAnimationFrame(() => {
          dropdownItem.style.height = `${dropdownItem.scrollHeight}px`; // Transition to the full height
        });

        // After the transition ends, reset the height to auto
        dropdownItem.addEventListener(
          "transitionend",
          function onTransitionEnd() {
            if (dropdownItem.classList.contains("shown")) {
              dropdownItem.style.height = "auto";
            }
            dropdownItem.removeEventListener("transitionend", onTransitionEnd);
          }
        );
        arrowIcon.classList.add("rotated");
      }
    });
  });
}

function map() {
  // Initialize the map and set its view to Madrid
  var map = L.map("map").setView([40.4168, -3.7038], 5); // Center over Madrid

  // Add OpenStreetMap tiles
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  // Marker for the Rias Baixas
  var riasMarker = L.marker([42.363, -8.734]).addTo(map);
  riasMarker.bindPopup("<b>Rias Baixas</b>").openPopup();

  // Add markers for Combarro and Baiona
  var combarroMarker = L.marker([42.42783, -8.70422]);
  var baionaMarker = L.marker([42.120494, -8.844767]);

  // Define the provided route points
  var routePoints = [
    [42.42783, -8.70422],
    [42.4192, -8.7084],
    [42.387, -8.7568],
    [42.3683, -8.857],
    [42.3515, -8.8708],
    [42.257, -8.8879],
    [42.1727, -8.8797],
    [42.14921, -8.85241],
    [42.12841, -8.84022],
    [42.120494, -8.844767],
  ];

  // Function to interpolate points between two points
  function interpolate(p1, p2, steps) {
    const latStep = (p2[0] - p1[0]) / steps;
    const lngStep = (p2[1] - p1[1]) / steps;
    const points = [];

    for (let i = 0; i <= steps; i++) {
      points.push([p1[0] + latStep * i, p1[1] + lngStep * i]);
    }

    return points;
  }

  // Generate the smooth curve points
  var smoothPoints = [];
  const stepsBetweenPoints = 30; // Number of interpolated points between each pair

  for (let i = 0; i < routePoints.length - 1; i++) {
    const segmentPoints = interpolate(
      routePoints[i],
      routePoints[i + 1],
      stepsBetweenPoints
    );
    smoothPoints = smoothPoints.concat(segmentPoints.slice(0, -1)); // Avoid duplicate points
  }

  // Create a polyline for the route
  var polyline = L.polyline(smoothPoints, {
    color: "blue",
    weight: 2,
  });

  // Event listener for zoom changes
  map.on("zoomend", function () {
    var zoomLevel = map.getZoom(); // Get current zoom level
    if (zoomLevel >= 8) {
      map.removeLayer(riasMarker); // Remove the Rias Baixas marker from the map
      riasMarker.closePopup();
      combarroMarker.addTo(map); // Add the Combarro marker back to the map when zoomed out
      baionaMarker.addTo(map); // Add the Baiona marker back to the map when zoomed out
      polyline.addTo(map);
    } else {
      map.removeLayer(polyline);
      riasMarker.addTo(map);
      riasMarker.openPopup();
      map.removeLayer(combarroMarker); // Remove the Combarro marker from the map
      map.removeLayer(baionaMarker); // Remove the Baiona marker from the map
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
    map();
    dropdown();
});