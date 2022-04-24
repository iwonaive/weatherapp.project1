

let now = new Date();
let h3 = document.querySelector("h3");

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
h3.innerHTML = `${day} ${hours}:${minutes}`;

function search(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-city");

    let h2 = document.querySelector("h2");
        h2.innerHTML = `${searchInput.value}`;
}
let formSearch = document.querySelector("#search-form");
   formSearch.addEventListener("submit", search); 

function searchEngine(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
}

function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city");
  let cityName = document.querySelector("#city");
  cityName.innerHTML = `${city.value}`;
  searchEngine(city.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", showCity);

function showTemp(response) {
  let h1 = document.querySelector("#tempNow");
  let temperature = Math.round(response.data.main.temp);
  h1.innerHTML = `${temperature}°C`;



  let cityName = document.querySelector("#city");
  cityName.innerHTML = response.data.name;
  let humidity = document.querySelector("#humidity");
  let humidityCity = response.data.main.humidity;
  humidity.innerHTML = `Humidity: ${humidityCity}%`;
  let windSpeed = document.querySelector("#wind");
  let citySpeed = Math.round(response.data.wind.speed);
  windSpeed.innerHTML = `Wind: ${citySpeed} km/h`;
  let weatherDescription = response.data.weather[0].description;
  let showCityDescription = document.querySelector("#weather-description");
  showCityDescription.innerHTML = `${weatherDescription}`;
}



function showLocation(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showTemp);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

let button = document.querySelector("button");
button.addEventListener("click", currentLocation);
