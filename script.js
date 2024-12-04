// Initialize the map
let map;

function initMap() {
  map = L.map('map').setView([10.3157, 123.8854], 13); // Example: Cebu City coordinates

  // Add OpenStreetMap tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);
}

// Fetch and display eco-friendly routes
async function fetchEcoRoutes() {
  // Simulate eco-friendly route data
  return [
    { coordinates: [[10.3157, 123.8854], [10.3180, 123.8860], [10.3200, 123.8900]] },
    { coordinates: [[10.3157, 123.8854], [10.3120, 123.8800], [10.3100, 123.8780]] }
  ];
}

async function displayEcoRoutes() {
  const routes = await fetchEcoRoutes();

  routes.forEach(route => {
    L.polyline(route.coordinates, {
      color: 'green',
      weight: 4,
      opacity: 0.7
    }).addTo(map);
  });

  // Show modal
  showModal();
}

// Show modal
function showModal() {
  const modal = document.getElementById('modal');
  if (modal) modal.style.display = 'flex';
}

// Close modal
function closeModal() {
  const modal = document.getElementById('modal');
  if (modal) modal.style.display = 'none';
}

// Add event listeners after DOM loads
document.addEventListener('DOMContentLoaded', () => {
  // Initialize the map
  initMap();

  // Find route button event listener
  const findRouteButton = document.getElementById('find-route');
  if (findRouteButton) {
    findRouteButton.addEventListener('click', displayEcoRoutes);
  }

  // Close modal event listener
  const closeModalButton = document.getElementById('close-modal');
  if (closeModalButton) {
    closeModalButton.addEventListener('click', closeModal);
  }
});
