//Date
function formatDate(date) {
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    let day = days[date.getDay()];

    let hour = date.getHours();
    if (hour < 10) {
        hour = `0${hour}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    return `${day} ${hour}:${minutes}`;
}

let newDateTime = new Date();
let currentDate = document.querySelector("#day");

currentDate.innerHTML = formatDate(newDateTime);

//input city

let searchCity = document.querySelector("#searchIcon");
searchCity.addEventListener("click", searching);

function searching(event) {
    event.preventDefault();
    let whatCity = document.querySelector("#inputCity");
    let city = whatCity.value;
    let cityName = document.querySelector("#city");
    cityName.innerHTML = city;
    let apiKey = `9f983349ddb8c26dfc6cae681695c977`;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(showWeather);
}
function showWeather(response) {
    let cityName = document.querySelector("#city");
    cityName.innerHTML = response.data.name;
    let countryName = document.querySelector("#country");
    countryName.innerHTML = response.data.sys.country;
    let currentTemperature = document.querySelector("#currentTemperature");
    currentTemperature.innerHTML = Math.round(response.data.main.temp);
    let minTemperatureToday = document.querySelector("#minTempNow");
    minTemperatureToday.innerHTML = Math.round(response.data.main.temp_min);
    let humidity = response.data.main.humidity;
    let getTip = document.querySelector("#tip");
    if (humidity > 75) {
        getTip.innerHTML = "You might need this";
    } else {
        getTip.innerHTML = "You don't need this";
    }
}
let localIcon = document.querySelector("#locationIcon");
localIcon.addEventListener("click", showLocation);

function showLocation(location) {
    navigator.geolocation.getCurrentPosition(showCoords);
}
function showCoords(response) {
    let lat = response.coords.latitude;
    let lon = response.coords.longitude;
    let apiKey = `9f983349ddb8c26dfc6cae681695c977`;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(showWeather);
}

/*
//Converting temperatures


let changeTemp = document.querySelector("#fahreinheitButton");
changeTemp.addEventListener("click", changingToFahreinheit);

function changingToFahreinheit(event) {
  let temperatureElement = document.querySelector(".value");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  let tempNow = document.querySelector("#tempNow")
  tempNow.innerHTML = `${Math.round((temperature + 9) / 5 + 32)} ºF`;
}

let changeTempC = document.querySelector("#celsiusButton");
changeTempC.addEventListener("click", changingToCelsius);

function changingToCelsius(event) {
  let tempValue = document.querySelector(".value");
  tempValue.innerHTML = 10;
}*/
