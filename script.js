let map;
let directionsService;
let directionsRenderer;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 48.8566, lng: 2.3522 }, // Default: Paris
        zoom: 12
    });

    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    // Enable autocomplete for start and end locations
    new google.maps.places.Autocomplete(document.getElementById("start"));
    new google.maps.places.Autocomplete(document.getElementById("end"));
}

function calculateRoute() {
    const start = document.getElementById("start").value;
    const end = document.getElementById("end").value;
    const travelMode = document.getElementById("travelMode").value;

    if (!start || !end) {
        alert("Please enter both start and destination locations!");
        return;
    }

    const request = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode[travelMode]
    };

    directionsService.route(request, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(result);

            const route = result.routes[0].legs[0];
            document.getElementById("routeDetails").innerHTML = `
                <strong>Distance:</strong> ${route.distance.text} <br>
                <strong>Duration:</strong> ${route.duration.text}
            `;
        } else {
            alert("Could not find a route, try different locations!");
        }
    });
}

// Initialize the map when the window loads
window.onload = initMap;
