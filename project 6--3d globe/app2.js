// Your OpenWeatherMap API key
const weatherApiKey = 'YOUR_OPENWEATHERMAP_API_KEY';

// Initialize the Cesium Viewer
const viewer = new Cesium.Viewer('cesiumContainer');

// InfoBox elements
const placeNameElem = document.getElementById('placeName');
const coordsElem = document.getElementById('coords');
const weatherElem = document.getElementById('weather');

// Function to get weather data
async function getWeather(lat, lon) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=a1f4a4c68c9acad0c9932c0be555bc2d&units=metric`);
    const data = await response.json();
    return data;
}

// Function to get place name using reverse geocoding (e.g., OpenStreetMap Nominatim API)
async function getPlaceName(lat, lon) {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`);
    const data = await response.json();
    return data.display_name;
}

// Add click event listener
viewer.screenSpaceEventHandler.setInputAction(async function (click) {
    const pickedObject = viewer.scene.pick(click.position);
    const cartesian = viewer.camera.pickEllipsoid(click.position, viewer.scene.globe.ellipsoid);

    if (cartesian) {
        const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
        const lat = Cesium.Math.toDegrees(cartographic.latitude);
        const lon = Cesium.Math.toDegrees(cartographic.longitude);

        // Fetch weather and place name
        const weatherData = await getWeather(lat, lon);
        const placeName = await getPlaceName(lat, lon);

        // Update the info box
        placeNameElem.innerHTML =` Place: ${placeName}`;
        coordsElem.innerHTML = `Coordinates: ${lat.toFixed(2)}, ${lon.toFixed(2)}`;
        weatherElem.innerHTML = `Weather: ${weatherData.weather[0].description}, ${weatherData.main.temp}°C`;
    }
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);
