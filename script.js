document.addEventListener("DOMContentLoaded", () => {
  const map = L.map("map").setView([0, 0], 2); // Default world view

  // Add OpenStreetMap tiles
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  let routingControl;

  const startInput = document.getElementById("start-location");
  const goalInput = document.getElementById("goal-destination");
  const languageSelect = document.getElementById("language");
  const detectLocationButton = document.getElementById("detect-location");
  const findRouteButton = document.getElementById("find-route");

  // Multilingual support
  const translations = {
    en: {
      title: "Eco-Friendly Route Planner",
      start: "Start Location:",
      goal: "Goal Destination:",
      language: "Language:",
      detect: "Detect Location",
      find: "Find Route",
    },
    de: {
      title: "Umweltfreundlicher Routenplaner",
      start: "Startpunkt:",
      goal: "Zielort:",
      language: "Sprache:",
      detect: "Standort erkennen",
      find: "Route finden",
    },
  };

  const setLanguage = (lang) => {
    document.querySelector("[data-lang='title']").textContent = translations[lang].title;
    document.querySelector("[data-lang='start']").textContent = translations[lang].start;
    document.querySelector("[data-lang='goal']").textContent = translations[lang].goal;
    document.querySelector("[data-lang='language']").textContent = translations[lang].language;
    detectLocationButton.textContent = translations[lang].detect;
    findRouteButton.textContent = translations[lang].find;
  };

  // Detect user location and set it as the start location
  const detectUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          startInput.value = `${latitude}, ${longitude}`;
          map.setView([latitude, longitude], 13);
        },
        () => {
          alert("Unable to detect location. Please enter it manually.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  // Geocode city/province names to coordinates
  const geocodeLocation = async (location) => {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.length === 0) throw new Error("Location not found.");
    return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
  };

  // Find and display the route
  const findRoute = async () => {
    const startLocation = startInput.value.trim();
    const goalDestination = goalInput.value.trim();

    if (!startLocation || !goalDestination) {
      alert("Please provide both start and goal locations.");
      return;
    }

    try {
      const [startCoords, goalCoords] = await Promise.all([
        geocodeLocation(startLocation),
        geocodeLocation(goalDestination),
      ]);

      // Remove existing routing control if present
      if (routingControl) map.removeControl(routingControl);

      // Add new routing control
      routingControl = L.Routing.control({
        waypoints: [L.latLng(startCoords[0], startCoords[1]), L.latLng(goalCoords[0], goalCoords[1])],
        routeWhileDragging: true,
        lineOptions: {
          styles: [{ color: "blue", weight: 5 }],
        },
      }).addTo(map);
      map.setView(startCoords, 10);
    } catch (error) {
      alert(error.message);
    }
  };

  // Event Listeners
  detectLocationButton.addEventListener("click", detectUserLocation);
  findRouteButton.addEventListener("click", findRoute);
  languageSelect.addEventListener("change", (e) => setLanguage(e.target.value));

  // Set default language
  setLanguage("en");
});
