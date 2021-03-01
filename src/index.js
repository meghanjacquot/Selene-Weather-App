//Date function
 function formatDate(timestamp) {
    let now = new Date(timestamp);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]
    let day = days[now.getDay()];
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let month = months[now.getMonth()];
    let daily = now.getDate();
    let year = now.getFullYear();
    return `Today is ${day}, ${month} ${daily}, ${year}`;

}

//Time function
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

//calling the date function
let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

//City function
function searchCity(City) {
  let city = document.querySelector("#city-input").value;
  let apiKey = "955d3ec2ddb7dbaebd9db1a9e829cd75";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);

    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(dispalyForecast);
}

//Geolocation function
function showMyPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "955d3ec2ddb7dbaebd9db1a9e829cd75";
  let apiAddress = "https://api.openweathermap.org/data/2.5/weather?q=";
 let apinewUrl = `${apiAddress}${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apinewUrl).then(showMyPosition);
}
//Current Position function
function currentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showMyPosition);
}
//Temperature and Weather Detail Function
function showTemp(response) {
 
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#description").innerHTML = response.data.weather[0].main;
  document.querySelector("#icon").innerHTML = response.data.icon[0].main;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

}

//Showing the upcoming weather
function dispalyForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col-2">
    <h4>
        ${formatHours(forecast.dt * 1000)}
      </h4>
<img
        src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png"
      />
      <div class="weather-forecast-temperature">
        <strong>
          ${Math.round(forecast.main.temp_max)}°
        </strong>
        ${Math.round(forecast.main.temp_min)}°
      </div>
    </div>
  `;
  }
}

//Replacing the H2 with the search value function
  function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input").value;
    searchCity(cityInputElement);
  }
  //Calling the replacement of the H2 function
  let form = document.querySelector("#searching-city");
  form.addEventListener("submit", handleSubmit);
  
  //Calling the button click and geolocation and search city functions
  let currentLocationButton = document.querySelector("#current-location-button");
  currentLocationButton.addEventListener("click", currentPosition);
 
  
//The units are set to metric, which means Celcius, so we have a function to convert to Fahrenheit. 
function convertToFahrenheitLink(event) {
 event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);

}

//Displaying Celcius temperatures 
function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

//Calling the Fahrenheit conversion by clicking the link
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheitLink);

//Calling for the Celcius conversion by clking the link
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

//Calling for the searching of a city
 searchCity("Chicago");