const API_KEY = "YOUR_OPENWEATHER_API_KEY"; // Replace with your OpenWeather API key
const map = L.map('map').setView([51.505, -0.09], 13); 

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

document.getElementById("findRoute").addEventListener("click", function() {
    const startLocation = document.getElementById("start").value;
    const endLocation = document.getElementById("end").value;

    if (startLocation && endLocation) {
        alert(`Finding the best eco-friendly route from ${startLocation} to ${endLocation}...`);
        fetchWeather();
    } else {
        alert("Please enter both locations.");
    }
});

function fetchWeather() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=Berlin&appid=${API_KEY}&units=metric`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("weatherInfo").textContent = `Weather: ${data.weather[0].description}, Temp: ${data.main.temp}°C`;
        })
        .catch(error => console.error("Weather data error:", error));
}

document.getElementById("toggleTheme").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});
