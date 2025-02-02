document.addEventListener("DOMContentLoaded", () => {
    // Initialize Map
    let map = L.map('map').setView([52.52, 13.405], 12); // Default to Berlin

    // Load OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // User Location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            map.setView([latitude, longitude], 14);
            L.marker([latitude, longitude]).addTo(map).bindPopup("You are here!");
        });
    }

    document.getElementById("findRoute").addEventListener("click", () => {
        let start = document.getElementById("start").value;
        let end = document.getElementById("end").value;

        if (!start || !end) {
            alert("Please enter both start and destination.");
            return;
        }

        suggestEcoRoute(start, end);
    });

    function suggestEcoRoute(start, end) {
        let ecoModes = ["Walking", "Cycling", "Public Transport"];
        let chosenMode = ecoModes[Math.floor(Math.random() * ecoModes.length)];
        let estimatedTime = Math.floor(Math.random() * (50 - 10) + 10); // Random 10-50 mins

        document.getElementById("mode").innerText = chosenMode;
        document.getElementById("time").innerText = `${estimatedTime} mins`;

        // Placeholder for future route visualization
        alert(`Suggested mode: ${chosenMode}\nEstimated time: ${estimatedTime} mins`);
    }

    // Dark Mode Toggle
    document.getElementById("toggleTheme").addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });
});
