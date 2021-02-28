//Date function
 function formatDate(timestamp) {
    let now = new Date(timestamp);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]
    let day = days[now.getDay()];
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let month = months[now.getMonth()];
    let daily = now.getDate();
    let year = now.getFullYear();
    return `This is a test ${day}, ${month} ${daily}, ${year}`;

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
  axios.get(apiUrl).then(City);
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
function showTemp(event) {
  event.preventDefault(); 
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#description").innerHTML = response.data.weather[0].main;

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

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

 searchCity("Chicago");