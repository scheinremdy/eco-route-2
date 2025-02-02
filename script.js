const weatherApiKey = 95e6e13f56fa93bf3300e4a6844dc074; 

// Initialize Leaflet Map
let map = L.map('map').setView([52.52, 13.405], 12); // Default: Berlin

// Load map tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

let routeLayer = L.layerGroup().addTo(map);

// Function to get route
function getRoute() {
    let start = document.getElementById("start").value;
    let end = document.getElementById("end").value;

    if (!start || !end) {
        alert("Please enter both start and destination.");
        return;
    }

    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${start}`)
        .then(res => res.json())
        .then(startData => {
            if (startData.length === 0) throw new Error("Start location not found");
            return fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${end}`)
                .then(res => res.json())
                .then(endData => {
                    if (endData.length === 0) throw new Error("Destination not found");

                    let startCoords = [startData[0].lat, startData[0].lon];
                    let endCoords = [endData[0].lat, endData[0].lon];

                    routeLayer.clearLayers(); // Clear previous routes

                    L.Routing.control({
                        waypoints: [L.latLng(startCoords), L.latLng(endCoords)],
                        routeWhileDragging: true
                    }).addTo(routeLayer);

                    map.setView(startCoords, 12);
                });
        })
        .catch(error => alert(error.message));
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
            if (data.main && data.weather) {
                let weatherInfo = `🌡 ${data.main.temp}°C | ${data.weather[0].description}`;
                document.getElementById("weatherInfo").innerText = weatherInfo;
            } else {
                throw new Error("Invalid weather data");
            }
        })
        .catch(error => {
            console.error("Weather data error:", error);
            document.getElementById("weatherInfo").innerText = "Failed to load weather data.";
        });
}

// Toggle Dark Mode
document.getElementById("toggleTheme").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

// Add event listener for route search
document.getElementById("findRoute").addEventListener("click", getRoute);

// Load weather data when the page loads
window.onload = () => {
    getWeather();
};
