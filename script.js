// API Keys
const weatherApiKey = "YOUR_OPENWEATHER_API_KEY";  // Replace with your OpenWeather API Key
const googleMapsApiKey = "YOUR_GOOGLE_MAPS_API_KEY"; // Replace with your Google Maps API Key

let map;
let directionsService;
let directionsRenderer;

// Initialize Google Map
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 52.5200, lng: 13.4050 }, // Default: Berlin
        zoom: 12
    });

    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    // Auto-complete input fields
    const startInput = new google.maps.places.Autocomplete(document.getElementById("start"));
    const destinationInput = new google.maps.places.Autocomplete(document.getElementById("destination"));
}

// Calculate Route
function calculateRoute() {
    let start = document.getElementById("start").value;
    let destination = document.getElementById("destination").value;
    let transportMode = document.getElementById("transport-mode").value;

    if (!start || !destination) {
        alert("Please enter both start and destination.");
        return;
    }

    let request = {
        origin: start,
        destination: destination,
        travelMode: transportMode
    };

    directionsService.route(request, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(result);
        } else {
            alert("Could not find a route. Please try different locations.");
        }
    });
}

// Fetch Weather Data
function getWeather() {
    let city = "Berlin"; // Default city

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric`)
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return response.json();
        })
        .then(data => {
            let weatherInfo = `🌡 ${data.main.temp}°C | ${data.weather[0].description}`;
            document.getElementById("weather-data").innerText = weatherInfo;
        })
        .catch(error => console.error("Weather data error:", error));
}

// Load functions on window load
window.onload = () => {
    getWeather();
    initMap();
};
