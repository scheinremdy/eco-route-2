// API Keys
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
    const destinationInput = new google.maps.places.Autocomplete(document.getElementById("end"));
}

// Calculate Route
function calculateRoute() {
    let start = document.getElementById("start").value;
    let destination = document.getElementById("end").value;
    let transportMode = "DRIVING";  // Default to driving for now (can add more modes like walking, cycling)

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

// Load functions on window load
window.onload = () => {
    initMap();
    document.getElementById("findRoute").addEventListener("click", calculateRoute);
};

