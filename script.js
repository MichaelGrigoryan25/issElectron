const longitudeSp = document.getElementById("longitude");
const latitudeSp = document.getElementById("latitude");
const timestampSp = document.getElementById("timestamp");
const apiStatusContSp = document.getElementById("status");

/*
 * LEAFLET MAP START
 */ 

// Set the initial location of the marker (0,0) with zoom of 4
const map = L.map("map").setView([0, 0], 7);
L.terminator().addTo(map);

// Set the icon for the ISS
const icon = L.icon({
    iconUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d0/International_Space_Station.svg",
    iconSize: [84, 84],
});

// Create a marker constant
const marker = L.marker([0, 0], {
    icon: icon
}).addTo(map);

// Add the OpenStreetMap tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);
/*
 * LEAFLET MAP END
 */ 

async function getISS() {
    // Make an async request to the API
    var response = await fetch("http://api.michaelgrigoryan.com/iss-api");

    // Await JSON data
    var data = await response.json();

    // Set and convert lat and lng to Num type
    var latitude = Number(data.details.iss_position.latitude);
    var longitude = Number(data.details.iss_position.longitude);

    latitudeSp.innerHTML = latitude;
    longitudeSp.innerHTML = longitude;
    timestampSp.innerHTML = Number(data.details.timestamp);
    apiStatusContSp.innerHTML = data.apiStatus;

    // Recenter the ISS marker every time it changes positions
    map.flyTo([latitude, longitude]);

    // Set the lat and lng every time they change
    marker.setLatLng([latitude, longitude]);
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function changeMapInfoText() {
    await sleep(10000);
    document.getElementById("map-info").innerHTML = "<h5>Initialized</h5?";
    await sleep(3000);
    document.getElementById("map-info").innerHTML = "";
}

// Auto update every 10 seconds
changeMapInfoText();
setInterval(getISS, 10000);
console.log("%cConnected to the Server", "color: lightgreen");
