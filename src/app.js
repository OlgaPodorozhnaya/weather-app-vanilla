function formatDate(timestemp) {
  let date = new Date(timestemp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = weekDays[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  } 
   if (hours < 10) {
     hours = `0${hours}`;
   } 
  return `${day} ${hours}:${minutes}`;
}

function formateDay(timestemp) {
  let date = new Date(timestemp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
  
}


function displayForecast(response) {
  // console.log(response.data.daily);
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  // let days = ["Thu", "Fri", "Sat", "Sun"];
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
              <div class="col-2">
                <div class="weather-forecast-date">${formateDay(forecastDay.dt)}</div>

                <img
                  src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
                  alt=""
                  width="46px"
                />
                <div class="weather-forecast-temperature">
                  <span class="weather-forecast-temperature-max">${Math.round(forecastDay.temp.max)}°</span>
                  <span class="weather-forecast-temperature-min">${Math.round(forecastDay.temp.min)}°</span>
                </div>
              </div> 
          `;
    };
  })
  

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

 function getForecast(coordinates) {
   console.log(coordinates);
  //  0c669309e9b69198d164920a0d742074
   let apiKey = "0c669309e9b69198d164920a0d742074";
   let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
   console.log(apiUrl);
   axios.get(apiUrl).then(displayForecast);
 }

function showTemp(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemp = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt*1000);
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`); 
  iconElement.setAttribute("alt", response.data.weather[0].description)
  
  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "0c669309e9b69198d164920a0d742074";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showTemp);
} 

function definecity(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value)
} 

function changecelsius(event) {
  event.preventDefault();
  
  let elementTemp = document.querySelector("#temperature");
  celsiuslink.classList.remove("active"); 
  fahrenheitlink.classList.add("active");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  elementTemp.innerHTML = Math.round(fahrenheitTemp);
}

function changefahrenheit(event) {
  event.preventDefault();
  fahrenheitlink.classList.remove("active");
  celsiuslink.classList.add("active");
  let elementTemp = document.querySelector("#temperature");
  elementTemp.innerHTML = Math.round(celsiusTemp);
}


let celsiusTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", definecity);

let fahrenheitlink = document.querySelector("#fahrenheit-link");
fahrenheitlink.addEventListener('click', changecelsius);

let celsiuslink = document.querySelector("#celsius-link");
celsiuslink.addEventListener("click", changefahrenheit);

search("New York");

