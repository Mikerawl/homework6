const apiKey = "c439a2b6de2ccb2a87cb0290ffef83a0";
let searchedCities = JSON.parse(localStorage.getItem("searched-cities")) || [];
var currentWeather = document.getElementById("current-weather");
let fiveDayWeather = document.getElementById("five-day-weather");
let city;
let lat;
let lon;

async function getCity() {
  var form = document.querySelector("form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    city = document.querySelector("form").firstElementChild.value;
    getWeather();
  });
}
getCity();

async function getWeather() {
  var response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`
  );
  var weatherData = await response.json();
  // variables for city latitude and longitude information.
  lat = weatherData.city.coord.lat;
  lon = weatherData.city.coord.lon;

  generalWeather();
  cityData();
}

function retrieveData() {
  var viewedCities = document.getElementById("searched-cities");

  let location = "";

  searchedCities.forEach((place) => {
    location += `<li>
      <button class="city-button" type="submit">${place.city}</button>
      <div class="lat-button">${place.lat}</div>
      <div class="lon-button">${place.lon}</div>
    </li>`;
  });

  viewedCities.innerHTML = location;
}
retrieveData();

// This is the code that stores the data into local memory.
function cityData() {
  var addEntry = {
    lat: lat,
    lon: lon,
    city: city,
  };

  cityExists = searchedCities.some((obj) => obj.city === addEntry.city);

  if (!cityExists) {
    localStorage.setItem("addEntry", JSON.stringify(addEntry));
    searchedCities.push(addEntry);
    localStorage.setItem("searched-cities", JSON.stringify(searchedCities));
  }
}

firstSearch();

async function firstSearch() {
  if (searchedCities) {
    city = searchedCities[0].city;
    lat = searchedCities[0].lat;
    lon = searchedCities[0].lon;

    generalWeather();
  }
}

async function generalWeather() {
  var res = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${apiKey}&units=imperial`
  );

  var weather = await res.json();

  // This is for the current day's weather (day)
  currentWeather.innerHTML = `<div class="card-title">${city}</div>  
  <h1 id="w-location">${weather.current.dt}</h1>
<h3 class="text-dark" id="w-desc">${weather.current.weather[0].description}</h3>
<p id="w-string">${weather.current.temp}</p>
<p>Wind ${weather.current.wind_deg}</p>
<p>Humidity ${weather.current.humidity}</p>
<img id="w-icon" style = "width: 100px" src="https://openweathermap.org/img/w/${weather.current.weather[0].icon}.png"/>`;

  // This is for the five day forcast

  let day = "";
  const dailies = weather.daily;

  dailies.pop();
  dailies.pop();
  dailies.pop();

  dailies.forEach((daily) => {
    day += `
    <div class="col-md-2"><h1 id="w-location">${daily.dt}</h1>
<h3 class="text-dark" id="w-desc">${daily.weather[0].description}</h3>
<p id="w-string">${daily.temp.day}</p>
<p>Wind ${daily.wind_deg}</p>
<p>Humidity ${daily.humidity}</p>
<p class="uv-index">UV Index <span class="uv-number">${daily.uvi}</span></p>
<img id="w-icon" style = "width: 100px" src="https://openweathermap.org/img/w/${daily.weather[0].icon}.png"/>
</div>`;
  });

  fiveDayWeather.innerHTML = day;
}

function retLatLon() {
  let previousCities = document.querySelectorAll(".city-button");

  previousCities.forEach((indivCity) => {
    indivCity.addEventListener("click", (event) => {
      // info coming from the DOM
      let latSearched = indivCity.nextElementSibling;
      let lonSearched = latSearched.nextElementSibling;

      city = indivCity.innerText;
      lat = latSearched.innerText;
      lon = lonSearched.innerText;
      console.log(city, lat, lon);

      generalWeather();
    });
  });
}
retLatLon();
