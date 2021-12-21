let now = new Date();
let h2 = document.querySelector("h2");

let hours = now.getHours();
let minutes = now.getMinutes();

function formatDate(date) {
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
}
formatDate();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thrusday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];

h2.innerHTML = `(${day}, ${hours}:${minutes})`;

function showWeatherData(response) {
  let temperatureElement = document.querySelector("#show-temperature");
  let cityElement = document.querySelector("#cities");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let descriptionElement = document.querySelector("#description");
  let iconElement = document.querySelector("#icon");
  let minTempElement = document.querySelector("#min");
  let maxTempElement = document.querySelector("#max");

  let tempCelsius = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(tempCelsius);
  minTempElement.innerHTML = Math.round(response.data.main.temp_min);
  maxTempElement.innerHTML = Math.round(response.data.main.temp_max);
  cityElement.innerHTML = response.data.name;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  descriptionElement.innerHTML = response.data.weather[0].description;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function text(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#new-city");
  let h1 = document.querySelector("#cities");
  h1.innerHTML = cityInput.value;
  searchCity(cityInput.value);
}

let cityForm = document.querySelector("#search-city");
cityForm.addEventListener("submit", text);

function temperatureF(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#show-temperature");
  let fahrenheiTemperature = (temperatureElement.innerHTML * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
  let minTempElement = document.querySelector("#min");
  let minTemperature = (minTempElement.innerHTML * 9) / 5 + 32;
  minTempElement.innerHTML = Math.round(minTemperature);

  let maxTempElement = document.querySelector("#max");
  let maxTemperature = (maxTempElement.innerHTML * 9) / 5 + 32;
  maxTempElement.innerHTML = Math.round(maxTemperature);

  let minUnit = document.querySelector("#minUnit");
  let maxUnit = document.querySelector("#maxUnit");
  let unitFahrenheit = " F";
  minUnit.innerHTML = unitFahrenheit;
  maxUnit.innerHTML = unitFahrenheit;
}

let change2fahrenheit = document.querySelector("#fahrenheit");
change2fahrenheit.addEventListener("click", temperatureF);

function temperatureC(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#show-temperature");
  let celciusTemperature = (temperatureElement.innerHTML - 32) / 1.8;
  temperatureElement.innerHTML = Math.round(celciusTemperature);
  let minTempElement = document.querySelector("#min");
  let minTemperature = (minTempElement.innerHTML - 32) / 1.8;
  minTempElement.innerHTML = Math.round(minTemperature);

  let maxTempElement = document.querySelector("#max");
  let maxTemperature = (maxTempElement.innerHTML - 32) / 1.8;
  maxTempElement.innerHTML = Math.round(maxTemperature);

  let minUnit = document.querySelector("#minUnit");
  let maxUnit = document.querySelector("#maxUnit");
  let unitFahrenheit = " ºC";
  minUnit.innerHTML = unitFahrenheit;
  maxUnit.innerHTML = unitFahrenheit;
}

let change2celcius = document.querySelector("#celcius");
change2celcius.addEventListener("click", temperatureC);

let tempCelsius = null;

function searchCity(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeatherData);
}

searchCity("Lisbon");
