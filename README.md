# Eco-Friendly Route Planner

## Beschreibung
Der Eco-Friendly Route Planner ist eine interaktive Webanwendung, die umweltfreundliche Routen für Nutzer berechnet. Die App verwendet OpenStreetMap (OSM) und Leaflet.js, um nachhaltige Reiseoptionen wie zu Fuß, Fahrrad oder öffentliche Verkehrsmittel zu empfehlen.  
Die Benutzer können entweder ihren aktuellen Standort automatisch erkennen lassen oder eine Start- und Zieladresse eingeben, um eine Route zu berechnen.  

### Hauptfunktionen:
- Automatische Standorterkennung  
- Eingabe von Start- und Zielorten zur Routenberechnung  
- Dynamische Kartendarstellung mit OpenStreetMap   
- Anzeige von umweltfreundlichen Transportmöglichkeiten  
- Berechnung von Distanz und geschätzter Reisezeit  
- Dunkelmodus für eine moderne Benutzererfahrung  

---

## Erlernte Fähigkeiten
Dieses Projekt hat verschiedene wichtige IT-Fähigkeiten geschärft, darunter:

- Webentwicklung (HTML, CSS, JavaScript) – Strukturierung, Styling und Interaktivität  
- Leaflet.js & OpenStreetMap – Nutzung von Karten ohne API-Schlüssel  
- Asynchrone Programmierung (fetch API) – Verarbeitung von Standort- und Routing-Daten  
- Geocoding & Routenberechnung – Umwandlung von Adressen in Koordinaten  
- Benutzerfreundliches UI-Design – Responsive Layouts & Dark Mode  
- Debugging & Fehlerbehebung – Optimierung und Problembehebung für eine reibungslose Nutzung  

---

## Herausforderungen  
Bei der Entwicklung dieser Anwendung gab es mehrere Herausforderungen:  

1. **Fehlende API-Schlüssel**  
   - Lösung: Nutzung von OpenStreetMap & Leaflet.js, die keine kostenpflichtigen API-Schlüssel erfordern.  

2. **Richtige Geolocation-Erkennung**  
   - Herausforderung: Zugriff auf den aktuellen Standort des Benutzers und die genaue Anzeige auf der Karte.  
   - Lösung: Verwendung von `navigator.geolocation`, um den Standort zu erfassen und die Karte darauf zu fokussieren.  

3. **Echtzeit-Routenberechnung ohne Google Maps API**  
   - Herausforderung: Ein dynamisches System zu entwickeln, das Straßenrouten mit Entfernung und Zeit berechnet.  
   - Lösung: Einbindung von OpenStreetMap Routing API, um die beste Route zwischen zwei Punkten zu berechnen.  

4. **Dynamische UI & Dark Mode**  
   - Herausforderung: Die Benutzererfahrung ansprechend und modern zu gestalten.  
   - Lösung: Einführung eines Dark Modes sowie eine übersichtliche und intuitive Benutzeroberfläche.  

---

## Installation & Nutzung
### 1. Projekt herunterladen
```sh
git clone https://github.com/deinusername/Eco-Friendly-Route-Planner.git
