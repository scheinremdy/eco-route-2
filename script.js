document.addEventListener("DOMContentLoaded", () => {
  const map = L.map("map").setView([0, 0], 2); // Initial world view

  // Add OpenStreetMap tile layer
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  let userMarker;
  let destinationMarker;
  let routeLayer;

  const startInput = document.getElementById("start-location");
  const goalInput = document.getElementById("goal-destination");
  const transportSelect = document.getElementById("transport-mode");
  const detectLocationButton = document.getElementById("detect-location");
  const findRouteButton = document.getElementById("find-route");
  const modal = document.getElementById("modal");
  const closeModal = document.getElementById("close-modal");

  // Function to detect user location
  const detectUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          startInput.value = `${latitude}, ${longitude}`;
          if (userMarker) map.removeLayer(userMarker);
          userMarker = L.marker([latitude, longitude]).addTo(map).bindPopup("Your Location").openPopup();
          map.setView([latitude, longitude], 13);
        },
        (error) => {
          alert("Failed to detect location. Please enter manually.");
          console.error(error);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  // Function to fetch and display a route
  const findRoute = async () => {
    const startLocation = startInput.value;
    const goalDestination = goalInput.value;
    const transportMode = transportSelect.value;

    if (!startLocation || !goalDestination) {
      alert("Please provide both start and goal locations.");
      return;
    }

    // Remove existing route layer if present
    if (routeLayer) map.removeLayer(routeLayer);

    // Fetch route from OpenRouteService API (replace with your API key)
    const apiKey = "your-api-key-here"; // Replace with your OpenRouteService API key
    const [startLat, startLng] = startLocation.split(",").map(Number);
    const [goalLat, goalLng] = goalDestination.split(",").map(Number);

    const url = `https://api.openrouteservice.org/v2/directions/${transportMode}?api_key=${apiKey}&start=${startLng},${startLat}&end=${goalLng},${goalLat}`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch route.");
      const data = await response.json();

      const coordinates = data.features[0].geometry.coordinates.map(([lng, lat]) => [lat, lng]);

      // Add route to map
      routeLayer = L.polyline(coordinates, { color: "green", weight: 4 }).addTo(map);
      map.fitBounds(routeLayer.getBounds());

      // Add destination marker
      if (destinationMarker) map.removeLayer(destinationMarker);
      destinationMarker = L.marker([goalLat, goalLng]).addTo(map).bindPopup("Destination").openPopup();

      // Show success modal
      modal.style.display = "block";
    } catch (error) {
      alert("Failed to display route. Please check your input.");
      console.error(error);
    }
  };

  // Event Listeners
  detectLocationButton.addEventListener("click", detectUserLocation);
  findRouteButton.addEventListener("click", findRoute);
  closeModal.addEventListener("click", () => (modal.style.display = "none"));

  // Close modal when clicking outside of it
  window.addEventListener("click", (event) => {
    if (event.target === modal) modal.style.display = "none";
  });
});
