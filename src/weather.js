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

function showWeather(response) {
    event.preventDefault();

    let cityName = document.querySelector("#city");
    cityName.innerHTML = response.data.name;

    let countryName = document.querySelector("#country");
    countryName.innerHTML = response.data.sys.country;

    let currentTemperature = document.querySelector("#currentTemperature");
    celsiusTemperature = response.data.main.temp;
    currentTemperature.innerHTML = Math.round(celsiusTemperature);

    let minTemperatureToday = document.querySelector("#minTempNow");
    minCelsiusTemperature = response.data.main.temp_min;
    minTemperatureToday.innerHTML = Math.round(minCelsiusTemperature);

    let humidity = response.data.main.humidity;
    let getTip = document.querySelector("#tip");
    if (humidity > 75) {
        getTip.innerHTML = "You might need this";
    } else {
        getTip.innerHTML = "You don't need this";
    }
}
function searching(event) {
    event.preventDefault();
    let wCity = document.querySelector("#inputCity");
    let city = wCity.value;
    let cityName = document.querySelector("#city");
    cityName.innerHTML = city;
    let apiKey = `9f983349ddb8c26dfc6cae681695c977`;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(showWeather);
}
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
function changingToFahreinheit(event) {
    event.preventDefault();
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");

    let fahrenheitTemperature = (celsiusTemperature + 9) / 5 + 32;
    let currentTemp = document.querySelector('#tempNow');
    currentTemp.innerHTML = `${Math.round(fahrenheitTemperature)} ºF`;

    let minFahrenheitTemperature = (minCelsiusTemperature + 9) / 5 + 32;
    let minTemperatureToday = document.querySelector('#tempMinToday');
    minTemperatureToday.innerHTML = `${Math.round(minFahrenheitTemperature)} ºF`;
}
function changingToCelsius(event) {
    event.preventDefault();
    let tempValue = document.querySelector("#tempNow");
    tempValue.innerHTML = `${Math.round(celsiusTemperature)}ºC`;

    let minTemperatureInCelsius = document.querySelector('#tempMinToday');
    minTemperatureInCelsius.innerHTML = `${Math.round(minCelsiusTemperature)} ºC`;

    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
}

let searchCity = document.querySelector("#searchIcon");
searchCity.addEventListener("click", searching);

let localIcon = document.querySelector("#locationIcon");
localIcon.addEventListener("click", showLocation);

let fahrenheitLink = document.querySelector("#fahreinheitButton");
fahrenheitLink.addEventListener("click", changingToFahreinheit);

let celsiusLink = document.querySelector("#celsiusButton");
celsiusLink.addEventListener("click", changingToCelsius);

let celsiusTemperature = null;
let minCelsiusTemperature = null;
searching("Paris");