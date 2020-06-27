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

    return `${day} ${formatHours(date)} `;
}

let date = new Date();
let currentDate = document.querySelector("#day");

currentDate.innerHTML = formatDate(date);

function formatHours(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    return `${hours}:${minutes}`;
}

function showWeather(response) {
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

function displayForecast(response) {
    let forecastElement = document.querySelector('#forecast');
    forecastElement.innerHTML = null;
    let forecast = null;

    for (let index = 0; index < 6; index++) {
        forecast = response.data.list[index];
        forecastElement.innerHTML +=
            `<div class="row" id="nextDaysWeather">
            <div class="col-2">
            <img
            src="http://openweathermap.org/img/wn/${
            forecast.weather[0].icon
            }@2x.png" width="40px"/>
            </div>
            <div class="col-4">
                <h3 id="hours">
                ${formatHours(forecast.dt * 1000)}
                </h3>
            </div>
            <div class="col-6">
                <p class="temp" id="temps">
                    <span class="tempMax">
            ${Math.round(forecast.main.temp_max)}</span><span>º</span>
            |
                <span class="tempMin">${Math.round(forecast.main.temp_min)}º</span>                
                </p>
            </div>
        </div>`;
    }
}
function searching(city) {
    let apiKey = `9f983349ddb8c26dfc6cae681695c977`;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(showWeather);

    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);

}
function handleSubmit(event) {
    event.preventDefault();
    let wCity = document.querySelector("#inputCity");
    searching(wCity.value);
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
/*
let forecastTempMax = document.querySelectorAll(".tempMax");
console.log(forecastTempMax);

for (let index = 0; index < 6; index++) {
    let tempMaxValue = forecastTempMax[index];
    forecastTempMax[index].innerHTML = (tempMaxValue + 9) / 5 + 32;
}*/


function changingToCelsius(event) {
    event.preventDefault();
    let tempValue = document.querySelector("#tempNow");
    tempValue.innerHTML = `${Math.round(celsiusTemperature)}ºC`;

    let minTemperatureInCelsius = document.querySelector('#tempMinToday');
    minTemperatureInCelsius.innerHTML = `${Math.round(minCelsiusTemperature)} ºC`;

    //let forecastMaxTemperature = document.querySelector("#tempMax");
    //forecastMaxTemperature.innerHTML = `${Math.round(forecast.main.temp_max)}ºC;

    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
}

let searchCity = document.querySelector("#searchIcon");
searchCity.addEventListener("click", handleSubmit);

let localIcon = document.querySelector("#locationIcon");
localIcon.addEventListener("click", showLocation);

let fahrenheitLink = document.querySelector("#fahreinheitButton");
fahrenheitLink.addEventListener("click", changingToFahreinheit);

let celsiusLink = document.querySelector("#celsiusButton");
celsiusLink.addEventListener("click", changingToCelsius);

let celsiusTemperature = null;
let minCelsiusTemperature = null;
searching("Paris");