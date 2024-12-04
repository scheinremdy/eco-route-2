document.addEventListener("DOMContentLoaded", () => {
  const map = L.map("map").setView([0, 0], 2); // Default to world view

  // Add OpenStreetMap tiles
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  let userMarker, routingControl;

  const startInput = document.getElementById("start-location");
  const goalInput = document.getElementById("goal-destination");
  const detectLocationButton = document.getElementById("detect-location");
  const findRouteButton = document.getElementById("find-route");

  // Detect user location and set it as the start location
  const detectUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          startInput.value = `${latitude}, ${longitude}`;
          if (userMarker) map.removeLayer(userMarker);
          userMarker = L.marker([latitude, longitude])
            .addTo(map)
            .bindPopup("Your Location")
            .openPopup();
          map.setView([latitude, longitude], 13);
        },
        () => {
          alert("Unable to detect location. Please enter manually.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  // Find and display the route
  const findRoute = () => {
    const startLocation = startInput.value.trim();
    const goalDestination = goalInput.value.trim();

    if (!startLocation || !goalDestination) {
      alert("Please provide both start and goal locations.");
      return;
    }

    const [startLat, startLng] = startLocation.split(",").map(Number);
    const [goalLat, goalLng] = goalDestination.split(",").map(Number);

    if (isNaN(startLat) || isNaN(startLng) || isNaN(goalLat) || isNaN(goalLng)) {
      alert("Invalid location format. Use 'latitude, longitude'.");
      return;
    }

    // Remove existing routing control if present
    if (routingControl) map.removeControl(routingControl);

    // Add new routing control
    routingControl = L.Routing.control({
      waypoints: [L.latLng(startLat, startLng), L.latLng(goalLat, goalLng)],
      routeWhileDragging: true,
      lineOptions: {
        styles: [{ color: "green", weight: 4 }],
      },
    }).addTo(map);
  };

  // Event Listeners
  detectLocationButton.addEventListener("click", detectUserLocation);
  findRouteButton.addEventListener("click", findRoute);
});
