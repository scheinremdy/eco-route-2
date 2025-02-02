document.addEventListener("DOMContentLoaded", () => {
    let map = L.map('map').setView([52.52, 13.405], 12); // Default to Berlin

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    let routeLayer = null;
    
    document.getElementById("findRoute").addEventListener("click", () => {
        let startLocation = document.getElementById("start-location").value;
        let endLocation = document.getElementById("end-location").value;

        if (!startLocation || !endLocation) {
            alert("Please enter both start and destination locations!");
            return;
        }

        getCoordinates(startLocation, (startCoords) => {
            getCoordinates(endLocation, (endCoords) => {
                drawRoute(startCoords, endCoords);
            });
        });
    });

    function getCoordinates(place, callback) {
        let url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(place)}`;
        
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    callback({ lat: data[0].lat, lng: data[0].lon });
                } else {
                    alert(`Could not find location: ${place}`);
                }
            })
            .catch(error => console.error("Geolocation Error:", error));
    }

    function drawRoute(startCoords, endCoords) {
        let url = `https://routing.openstreetmap.de/routed-foot/route/v1/driving/${startCoords.lng},${startCoords.lat};${endCoords.lng},${endCoords.lat}?overview=full&geometries=geojson`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (routeLayer) map.removeLayer(routeLayer);

                let routeCoords = data.routes[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
                routeLayer = L.polyline(routeCoords, { color: "green", weight: 5 }).addTo(map);
                
                let distance = (data.routes[0].distance / 1000).toFixed(2);
                let estimatedTime = Math.ceil(data.routes[0].duration / 60);
                let ecoModes = ["Walking", "Cycling", "Public Transport"];
                let chosenMode = ecoModes[Math.floor(Math.random() * ecoModes.length)];

                document.getElementById("mode").innerText = chosenMode;
                document.getElementById("distance").innerText = `${distance} km`;
                document.getElementById("time").innerText = `${estimatedTime} mins`;

                map.fitBounds(routeLayer.getBounds());
            })
            .catch(error => console.error("Error fetching route:", error));
    }

    document.getElementById("reset").addEventListener("click", () => {
        if (routeLayer) map.removeLayer(routeLayer);
        document.getElementById("mode").innerText = "";
        document.getElementById("distance").innerText = "";
        document.getElementById("time").innerText = "";
    });

    document.getElementById("toggleTheme").addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });
});
