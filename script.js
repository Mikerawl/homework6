

async function getCity() {
    var form = document.querySelector("form");
    console.log(form);
    form.addEventListener("submit", (event) => {

        event.preventDefault();
        var city = document.querySelector("form").firstElementChild.value;
    getWeather()    
    })

}
getCity()

async function getWeather() {
    const apiKey = "c439a2b6de2ccb2a87cb0290ffef83a0";   
    var wlocation = document.getElementById("w-location");
    var wdesc = document.getElementById("w-desc");
    var wstring = document.getElementById("w-string");
    var wicon = document.getElementById("w-icon");

    var city = document.querySelector("form").firstElementChild.value;
    // city = city.value;
console.log(city);

    var response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`)
    
 
    
var weatherData =  await response.json();
    console.log(weatherData);
    wlocation = weatherData.name;
    wdesc = weatherData.weather[0].description
    wstring = weatherData.main.temp
    wicon = weatherData.weather[0].icon
    console.log(wdesc);
    



}
