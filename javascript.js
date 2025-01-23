let map = null;
let issMarker = null;

function initMap() {
    map = L.map('map').setView([0, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    const issIcon = L.icon({
        iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/International_Space_Station.svg',
        iconSize: [50, 30],
        iconAnchor: [25, 15]
    });
    
    issMarker = L.marker([0, 0], {icon: issIcon}).addTo(map);
}

async function fetchISSPosition() {
    try {
        const response = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
        const data = await response.json();
        
        const lat = data.latitude.toFixed(2);
        const lon = data.longitude.toFixed(2);
        
        const latElement = document.querySelector('#lat');
        const lonElement = document.querySelector('#long');
        
        latElement.innerHTML = `<i class="fas fa-latitude"></i> Latitude: ${lat}°`;
        lonElement.innerHTML = `<i class="fas fa-longitude"></i> Longitude: ${lon}°`;
        
        issMarker.setLatLng([data.latitude, data.longitude]);
        map.setView([data.latitude, data.longitude]);
        
        document.querySelector('#speed').textContent = `${Math.round(data.velocity)} km/h`;
        
    } catch (error) {
        const latElement = document.querySelector('#lat');
        const lonElement = document.querySelector('#long');
        
        if (latElement && lonElement) {
            latElement.innerHTML = `<i class="fas fa-latitude"></i> Latitude: --.-°`;
            lonElement.innerHTML = `<i class="fas fa-longitude"></i> Longitude: --.-°`;
        }
    }
}

async function fetchCrewData() {
    try {
        const response = await fetch('http://api.open-notify.org/astros.json');
        const data = await response.json();
        
        const issCrewMembers = data.people.filter(person => 
            person.craft === "ISS"
        );
        
        const crewList = document.querySelector('#crew-list');
        if (crewList) {
            crewList.innerHTML = issCrewMembers.map(member => 
                `<div class="crew-member">${member.name}</div>`
            ).join('');
        }
    } catch (error) {
        const crewList = document.querySelector('#crew-list');
        if (crewList) {
            crewList.innerHTML = '<div class="crew-member">Unable to load crew data</div>';
        }
    }
}

function refreshData() {
    fetchISSPosition();
    fetchCrewData();
}

initMap();
refreshData();
setInterval(refreshData, 5000);
