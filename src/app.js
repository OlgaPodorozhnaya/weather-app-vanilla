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


function showTemp(response) {
  console.log(response.data)
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt*1000);

}




let apiKey = "0c669309e9b69198d164920a0d742074"; 
let url = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`

axios.get(url).then(showTemp);


