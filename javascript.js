let longField = document.querySelector("#long");
let latField = document.querySelector("#lat");
let time = document.querySelector("#time");
let refreshButton = document.querySelector("#refresh");
let issData = null;

refreshButton.addEventListener('click', refreshData);

function refreshData() {
    fetchISSAPI();
    document.querySelector('div').classList.add('refreshing');
    setTimeout(() => {
        document.querySelector('div').classList.remove('refreshing');
    }, 250);
}

async function fetchISSAPI() {
    try {
        const response = await fetch('http://api.open-notify.org/iss-now.json')
        const data = await response.json();
        issData = data;
        pushLocations();
        pushTimes();
    } catch (e) {
        console.log('Error: ', e)
    }
}

function pushLocations() {
    longField.textContent = `Longitude: ${parseFloat(issData.iss_position.longitude).toFixed(4)}°`;
    latField.textContent = `Latitude: ${parseFloat(issData.iss_position.latitude).toFixed(4)}°`;
}
function pushTimes() {
    let timestamp = (issData.timestamp) * 1000;
    let dateObj = new Date(timestamp);
    let date = dateObj.toLocaleDateString('en-US')
    let time2 = dateObj.toLocaleTimeString('en-US')
    time.textContent = `Timestamp: ${date} at ${time2}`;
}
fetchISSAPI();
console.log(issData)
