// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!
const input = document.getElementById("state-input");
const button = document.getElementById("fetch-alerts");
const alertsDisplay = document.getElementById("alerts-display");
const errorMessage = document.getElementById("error-message");

function displayAlerts(data) {
alertsDisplay.innerHTML = "";

const summary = document.createElement("h2");

summary.textContent = `${data.title}: ${data.features.length}`;

alertsDisplay.appendChild(summary);

data.features.forEach(alert => {
const alertItem = document.createElement("p");

alertItem.textContent = alert.properties.headline;

alertsDisplay.appendChild(alertItem);
});
}

function fetchWeatherAlerts(state) {
fetch(`${weatherApi}${state}`)
.then(response => response.json())
.then(data => {
displayAlerts(data);

input.value = "";

errorMessage.textContent = "";
errorMessage.classList.add("hidden");
})
.catch(error => {
errorMessage.textContent = error.message;

errorMessage.classList.remove("hidden");
});
}

button.addEventListener("click", () => {
const state = input.value.toUpperCase();

fetchWeatherAlerts(state);
});