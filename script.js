async function getCity() {
  var form = document.querySelector("form");
  console.log(form);
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    var city = document.querySelector("form").firstElementChild.value;
    getWeather();
  });
}
getCity();

async function getWeather() {
  const apiKey = "c439a2b6de2ccb2a87cb0290ffef83a0";
  var wlocation = document.getElementById("w-location");
  var wdesc = document.getElementById("w-desc");
  var wstring = document.getElementById("w-string");
  var wicon = document.getElementById("w-icon");
  var currentWeather = document.getElementById("current-weather");
  var city = document.querySelector("form").firstElementChild.value;
  // city = city.value;
  console.log(city);

  var response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`
  );
  var weatherData = await response.json();
  // variables for city latitude and longitude information.
  const lat = weatherData.city.coord.lat;
  const lon = weatherData.city.coord.lon;

  var res = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${apiKey}&units=imperial`
  );

  var weather = await res.json();
  console.log(weather.current.temp);

  // This is for the current day's weather (day)
  currentWeather.innerHTML = `<h1 id="w-location">${city} and ${weather.current.dt}</h1>
  <h3 class="text-dark" id="w-desc">${weather.current.weather[0].description}</h3>
  <p id="w-string">${weather.current.temp}</p>
  <p>Wind ${weather.current.wind_deg}</p>
  <p>Humidity ${weather.current.humidity}</p>
  <p>UV Index ${weather.current.uvi}</p>
  <img id="w-icon" style = "width: 100px" src="https://openweathermap.org/img/w/${weather.current.weather[0].icon}.png"/>`;

  // This is for the five day forcast

  var currentWeather = document.getElementById("current-weather");
  let fiveDayWeather = document.getElementById("five-day-weather");
  let day = "";
  const dailies = weather.daily;
  console.log(fiveDayWeather);
  dailies.pop();
  dailies.pop();
  dailies.pop();
  console.log(dailies);

  dailies.forEach((daily) => {
    day += `<h1 id="w-location">${daily.dt}</h1>
  <h3 class="text-dark" id="w-desc">${daily.weather[0].description}</h3>
  <p id="w-string">${daily.temp.day}</p>
  <p>Wind ${daily.wind_deg}</p>
  <p>Humidity ${daily.humidity}</p>
  <p>UV Index ${daily.uvi}</p>
  <img id="w-icon" style = "width: 100px" src="https://openweathermap.org/img/w/${daily.weather[0].icon}.png"/>`;
  });

  fiveDayWeather.innerHTML = day;
}

function storeData() {
  const addEntry = {
    lat: lat,
    lon: lon,
    city: city,
  };
  searchedCities = JSON.parse(localStorage.getItem("searched-cities"));

  cityExists = searchedCities.some((obj) => obj.city === addEntry.city);

  if (!cityExists) {
    localStorage.setItem("addEntry", JSON.stringify(addEntry));
    searchedCities.push(addEntry);
    localStorage.set("searched-cities", JSON.stringify(searchedCity));
  }
}
