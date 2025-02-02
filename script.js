document.addEventListener("DOMContentLoaded", () => {
    let map = L.map('map').setView([52.52, 13.405], 12); // Default to Berlin

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    let startMarker = null;
    let endMarker = null;
    let routeLayer = null;

    // Click to set start & end points
    map.on("click", function (e) {
        if (!startMarker) {
            startMarker = L.marker(e.latlng, { draggable: true }).addTo(map)
                .bindPopup("Start Point").openPopup();
        } else if (!endMarker) {
            endMarker = L.marker(e.latlng, { draggable: true }).addTo(map)
                .bindPopup("Destination").openPopup();
            calculateRoute();
        }
    });

    function calculateRoute() {
        if (!startMarker || !endMarker) return;

        let startCoords = startMarker.getLatLng();
        let endCoords = endMarker.getLatLng();
        let url = `https://routing.openstreetmap.de/routed-foot/route/v1/driving/${startCoords.lng},${startCoords.lat};${endCoords.lng},${endCoords.lat}?overview=full&geometries=geojson`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (routeLayer) {
                    map.removeLayer(routeLayer);
                }

                let routeCoords = data.routes[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
                routeLayer = L.polyline(routeCoords, { color: "green", weight: 5 }).addTo(map);
                
                let distance = (data.routes[0].distance / 1000).toFixed(2); // Convert meters to km
                let estimatedTime = Math.ceil(data.routes[0].duration / 60); // Convert seconds to minutes
                let ecoModes = ["Walking", "Cycling", "Public Transport"];
                let chosenMode = ecoModes[Math.floor(Math.random() * ecoModes.length)];

                document.getElementById("mode").innerText = chosenMode;
                document.getElementById("distance").innerText = `${distance} km`;
                document.getElementById("time").innerText = `${estimatedTime} mins`;
            })
            .catch(error => console.error("Error fetching route:", error));
    }

    // Reset Map
    document.getElementById("reset").addEventListener("click", () => {
        if (startMarker) map.removeLayer(startMarker);
        if (endMarker) map.removeLayer(endMarker);
        if (routeLayer) map.removeLayer(routeLayer);
        startMarker = null;
        endMarker = null;
        routeLayer = null;
        document.getElementById("mode").innerText = "";
        document.getElementById("distance").innerText = "";
        document.getElementById("time").innerText = "";
    });

    // Dark Mode Toggle
    document.getElementById("toggleTheme").addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });
});
