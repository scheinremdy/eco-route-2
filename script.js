document.addEventListener("DOMContentLoaded", () => {
    const findRouteBtn = document.getElementById("findRoute");
    const startLocationInput = document.getElementById("startLocation");
    const endLocationInput = document.getElementById("endLocation");
    const transportModeSelect = document.getElementById("transportMode");
    const mapElement = document.getElementById("map");
    
    let map = new google.maps.Map(mapElement, {
        center: { lat: 48.8566, lng: 2.3522 }, // Default to Paris
        zoom: 12,
    });

    let directionsService = new google.maps.DirectionsService();
    let directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    findRouteBtn.addEventListener("click", () => {
        const startLocation = startLocationInput.value;
        const endLocation = endLocationInput.value;
        const transportMode = transportModeSelect.value.toUpperCase();

        if (!startLocation || !endLocation) {
            alert("Please enter both start and end locations.");
            return;
        }

        const request = {
            origin: startLocation,
            destination: endLocation,
            travelMode: google.maps.TravelMode[transportMode],
        };

        directionsService.route(request, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                directionsRenderer.setDirections(result);
            } else {
                alert("Could not find route. Please try again.");
            }
        });
    });
});
