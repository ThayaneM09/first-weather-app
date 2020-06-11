//Date
let newDateTime = new Date();

let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];
let day = days[newDateTime.getDay()];

let hour = newDateTime.getHours();
let minutes = newDateTime.getMinutes();

let currentDate = document.querySelector("#day");
currentDate.innerHTML = `${day} ${hour}:${minutes}`;

//input city

//let whatCity = document.querySelector(#inputCity");
