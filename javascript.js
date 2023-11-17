let longField = document.querySelector("#long");
let latField = document.querySelector("#lat");
let time = document.querySelector("#time");
let refreshButton = document.querySelector("#refresh");
let issData = [];

refreshButton.addEventListener('click', refreshData);

function refreshData() {
    fetchISSAPI();
    console.log('Button Clicked');
}

async function fetchISSAPI() {
    try {
        const response = await fetch('http://api.open-notify.org/iss-now.json')
        const data = await response.json();
        issData.push(data);
        pushLocations();
        pushTimes();
    } catch (e) {
        console.log('Error: ', e)
    }
}

function pushLocations() {
    longField.textContent = `Longitude: ${issData[0].iss_position.longitude}`;
    latField.textContent = `Latitude: ${issData[0].iss_position.latitude}`;
}
function pushTimes() {
    let timestamp = (issData[0].timestamp) * 1000;
    let dateObj = new Date(timestamp);
    let date = dateObj.toLocaleDateString('en-US')
    let time2 = dateObj.toLocaleTimeString('en-US')
    time.textContent = `Timestamp: ${date} at ${time2}`;
}
fetchISSAPI();
console.log(issData[0])
