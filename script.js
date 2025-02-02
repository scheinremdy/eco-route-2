let map;
let routeControl;

// Initialize Leaflet Map
function initMap() {
    // Create a map centered on Berlin
    map = L.map('map').setView([52.5200, 13.4050], 12);

    // Set up OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Initialize the route control
    routeControl = L.Routing.control({
        waypoints: [],
        routeWhileDragging: true
    }).addTo(map);
}

// Find route using Leaflet Routing Machine
function calculateRoute() {
    let start = document.getElementById("start").value;
    let end = document.getElementById("end").value;

    if (!start || !end) {
        alert("Please enter both start and destination.");
        return;
    }

    // Use Nominatim API (OpenStreetMap's geocoding service) to get coordinates for the locations
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${start}`)
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) {
                alert("Starting location not found.");
                return;
            }
            const startCoords = [data[0].lat, data[0].lon];

            fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${end}`)
                .then(response => response.json())
                .then(data => {
                    if (data.length === 0) {
                        alert("Destination not found.");
                        return;
                    }
                    const endCoords = [data[0].lat, data[0].lon];

                    // Set the route on the map
                    routeControl.setWaypoints([L.latLng(startCoords), L.latLng(endCoords)]);
                });
        });
}

// Load functions on window load
window.onload = () => {
    initMap();
    document.getElementById("findRoute").addEventListener("click", calculateRoute);
};
