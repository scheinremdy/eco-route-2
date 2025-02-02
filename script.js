// API Keys (DO NOT expose these in public code)
const weatherApiKey = "YOUR_OPENWEATHER_API_KEY";
const googleMapsApiKey = "YOUR_GOOGLE_MAPS_API_KEY";

let map, directionsService, directionsRenderer;

// Initialize Google Map
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 52.5200, lng: 13.4050 }, // Default: Berlin
        zoom: 12
    });

    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    // Auto-complete for input fields
    new google.maps.places.Autocomplete(document.getElementById("start"));
    new google.maps.places.Autocomplete(document.getElementById("end"));
}

// Calculate Route
function calculateRoute() {
    let start = document.getElementById("start").value;
    let destination = document.getElementById("end").value;
    let transportMode = document.getElementById("transport-mode").value;

    if (!start || !destination) {
        alert("Please enter both start and destination.");
        return;
    }

    let request = {
        origin: start,
        destination: destination,
        travelMode: google.maps.TravelMode[transportMode]
    };

    directionsService.route(request, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(result);
        } else {
            alert("Could not find a route. Try different locations.");
        }
    });
}

// Fetch Weather Data
function getWeather() {
    let city = "Berlin"; // Default location

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("weatherInfo").innerText = `🌡 ${data.main.temp}°C | ${data.weather[0].description}`;
        })
        .catch(error => console.error("Weather data error:", error));
}

// Dark Mode Toggle
document.getElementById("toggleTheme").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

// Load functions on window load
window.onload = () => {
    getWeather();
    initMap();
    document.getElementById("findRoute").addEventListener("click", calculateRoute);
};
