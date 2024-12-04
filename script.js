let map;

// Initialize Map
function initMap() {
  map = L.map('map').setView([10.3157, 123.8854], 13); // Default view

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);
}

// Geocode Locations
async function geocode(address) {
  const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`);
  const data = await response.json();
  return data[0] ? [parseFloat(data[0].lat), parseFloat(data[0].lon)] : null;
}

// Detect User Location
function detectUserLocation() {
  if (!navigator.geolocation) {
    alert('Geolocation is not supported by your browser.');
    return;
  }

  navigator.geolocation.getCurrentPosition(
    position => {
      const { latitude, longitude } = position.coords;
      map.setView([latitude, longitude], 14);
      L.marker([latitude, longitude]).addTo(map).bindPopup('You are here!').openPopup();
    },
    () => alert('Unable to retrieve your location.')
  );
}

// Find Route
async function findRoute() {
  const startAddress = document.getElementById('start-location').value;
  const endAddress = document.getElementById('goal-destination').value;
  const transportMode = document.getElementById('transport-mode').value;

  const startCoords = await geocode(startAddress);
  const endCoords = await geocode(endAddress);

  if (!startCoords || !endCoords) {
    alert('Could not locate one or both addresses.');
    return;
  }

  L.marker(startCoords).addTo(map).bindPopup('Start').openPopup();
  L.marker(endCoords).addTo(map).bindPopup('Destination').openPopup();

  // Draw route (simulation)
  L.polyline([startCoords, endCoords], {
    color: transportMode === 'walking' ? 'green' : 'blue',
    weight: 5
  }).addTo(map);
}

// Language Toggle
function toggleLanguage(lang) {
  const elements = {
    en: {
      title: 'Eco-Friendly Route Finder',
      placeholderStart: 'Enter your location',
      placeholderEnd: 'Enter destination',
      modalMessage: 'Eco-friendly routes successfully displayed on the map!'
    },
    de: {
      title: 'Umweltfreundlicher Routenfinder',
      placeholderStart: 'Geben Sie Ihren Standort ein',
      placeholderEnd: 'Ziel eingeben',
      modalMessage: 'Umweltfreundliche Routen wurden erfolgreich auf der Karte angezeigt!'
    }
  };

  const langData = elements[lang];
  document.getElementById('title').innerText = langData.title;
  document.getElementById('start-location').placeholder = langData.placeholderStart;
  document.getElementById('goal-destination').placeholder = langData.placeholderEnd;
  document.getElementById('modal-message').innerText = langData.modalMessage;
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  initMap();

  document.getElementById('find-route').addEventListener('click', findRoute);
  document.getElementById('detect-location').addEventListener('click', detectUserLocation);
  document.getElementById('lang-en').addEventListener('click', () => toggleLanguage('en'));
  document.getElementById('lang-de').addEventListener('click', () => toggleLanguage('de'));
});
