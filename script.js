// Leaflet.js map initialization
let map = L.map('map').setView([51.505, -0.09], 13); // Default location (London)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Routing control
let routeControl;

function calculateRoute() {
    let start = document.getElementById("start-location").value;
    let end = document.getElementById("end-location").value;

    if (!start || !end) {
        alert("Please enter both start and destination.");
        return;
    }

    // Convert locations to coordinates using Nominatim API
    getCoordinates(start, function (startCoords) {
        getCoordinates(end, function (endCoords) {
            if (routeControl) {
                map.removeControl(routeControl);
            }

            routeControl = L.Routing.control({
                waypoints: [
                    L.latLng(startCoords.lat, startCoords.lon),
                    L.latLng(endCoords.lat, endCoords.lon)
                ],
                routeWhileDragging: true
            }).addTo(map);
        });
    });
}

// Function to get coordinates from address
function getCoordinates(location, callback) {
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${location}`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                callback({ lat: data[0].lat, lon: data[0].lon });
            } else {
                alert("Location not found.");
            }
        })
        .catch(error => console.log("Error:", error));
}

// Fetch weather data
function getWeather() {
    let apiKey = "d2b6bd9d10b94f1f6e1a10110407fed7"; // OpenWeather API Key
    let city = "Berlin"; // Default city (changeable)
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            let weatherInfo = `🌡 Temp: ${data.main.temp}°C | 🌦 Condition: ${data.weather[0].description}`;
            document.getElementById("weather-data").innerText = weatherInfo;
        })
        .catch(error => console.log("Error:", error));
}

// Load weather on startup
window.onload = getWeather;
